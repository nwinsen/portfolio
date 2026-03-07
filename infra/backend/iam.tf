# --- LAMBDA EXECUTION ROLE ---
# Every Lambda function needs an IAM role to assume at runtime. The assume_role_policy
# says "only the Lambda service is allowed to assume this role" — nothing else can
# impersonate it.
resource "aws_iam_role" "lambda_exec" {
  name = "${var.project_name}-lambda-exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Effect    = "Allow"
        Principal = { Service = "lambda.amazonaws.com" }
      }
    ]
  })
}

# --- DYNAMODB ACCESS POLICY ---
# Grants Lambda only the three DynamoDB operations it actually needs.
# Scoped to the BlogPosts table ARN — Lambda cannot touch any other table.
resource "aws_iam_policy" "lambda_dynamodb" {
  name = "${var.project_name}-lambda-dynamodb"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:GetItem"]
        Resource = aws_dynamodb_table.blog_posts.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_dynamodb.arn
}

# --- CLOUDWATCH LOGS POLICY ---
# AWS managed policy that grants Lambda permission to create log groups and write
# log events. Required for any Lambda output to appear in CloudWatch.
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# --- GITHUB ACTIONS: LAMBDA DEPLOY PERMISSIONS ---
# The GitHub Actions IAM user is created in /infra/frontend/iam.tf.
# We look it up here via a data source (read-only, Terraform doesn't manage it)
# and attach an additional policy so CI/CD can push new Lambda code on each deploy.
data "aws_iam_user" "github_deployer" {
  user_name = "github-actions-deployer-portfolio"
}

resource "aws_iam_user_policy" "deployer_lambda" {
  name = "LambdaDeployPolicy"
  user = data.aws_iam_user.github_deployer.user_name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["lambda:UpdateFunctionCode", "lambda:GetFunction"]
        Resource = aws_lambda_function.api.arn
      }
    ]
  })
}
