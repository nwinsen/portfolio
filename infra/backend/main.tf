# --- DYNAMODB TABLE ---
# Stores blog posts with slug as the primary key.
# PAY_PER_REQUEST means no provisioned capacity to manage — you pay per operation.
resource "aws_dynamodb_table" "blog_posts" {
  name         = "BlogPosts"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "slug"

  attribute {
    name = "slug"
    type = "S"
  }
}

# --- CLOUDWATCH LOG GROUPS ---
# Pre-creating log groups lets us control retention. If we didn't, AWS would
# auto-create them with no expiry and logs would accumulate forever.
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${var.project_name}-api"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_group" "api_gw_logs" {
  name              = "/aws/apigateway/${var.project_name}-api"
  retention_in_days = 7
}

# --- LAMBDA FUNCTION ---
# The handler is index.handler — meaning the `handler` export in dist/index.js.
# filename points to a placeholder zip for the initial tofu apply. After that,
# CI/CD owns deployments via `aws lambda update-function-code`, so Terraform
# ignores changes to filename and source_code_hash.
resource "aws_lambda_function" "api" {
  function_name = "${var.project_name}-api"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  timeout       = 10
  memory_size   = 128

  filename = "${path.module}/placeholder.zip"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.blog_posts.name
    }
  }

  lifecycle {
    ignore_changes = [filename, source_code_hash]
  }

  depends_on = [
    aws_cloudwatch_log_group.lambda_logs,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}

# --- API GATEWAY HTTP API ---
# HTTP API (v2) is cheaper and simpler than REST API (v1).
# CORS is handled here so Lambda doesn't need to set any headers itself —
# API Gateway automatically responds to OPTIONS preflight requests.
resource "aws_apigatewayv2_api" "api" {
  name          = "${var.project_name}-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://${var.site_domain}"]
    allow_methods = ["POST", "PATCH", "OPTIONS"]
    allow_headers = ["Content-Type"]
    max_age       = 3600
  }
}

# --- DEFAULT STAGE ---
# $default is a special stage name that matches all requests without a stage prefix
# in the URL. auto_deploy means route changes take effect immediately without a
# manual deployment step.
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw_logs.arn
    format = jsonencode({
      requestId      = "$context.requestId"
      ip             = "$context.identity.sourceIp"
      requestTime    = "$context.requestTime"
      httpMethod     = "$context.httpMethod"
      routeKey       = "$context.routeKey"
      status         = "$context.status"
      responseLength = "$context.responseLength"
    })
  }
}

# --- LAMBDA INTEGRATION ---
# AWS_PROXY means API Gateway forwards the full request to Lambda and returns
# whatever Lambda returns directly — no transformation in between.
# payload_format_version 2.0 matches the APIGatewayProxyEventV2 type in the handler.
resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}

# --- ROUTES ---
# Each route maps an HTTP method + path pattern to the Lambda integration.
# {slug} becomes a path parameter available as event.pathParameters.slug in the handler.
resource "aws_apigatewayv2_route" "post_blog" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /blog"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "patch_blog" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "PATCH /blog/{slug}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# --- LAMBDA INVOKE PERMISSION ---
# By default Lambda denies all invocations. This grants API Gateway permission
# to call our function. source_arn scopes it to this specific API only.
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}
