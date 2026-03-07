output "api_url" {
  description = "Custom domain URL for the API"
  value       = "https://${var.api_subdomain}.${var.site_domain}"
}

output "api_gateway_url" {
  description = "Default API Gateway URL (available immediately after apply)"
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "lambda_function_name" {
  description = "Lambda function name (used in CI/CD)"
  value       = aws_lambda_function.api.function_name
}

output "dynamodb_table_name" {
  description = "DynamoDB table name"
  value       = aws_dynamodb_table.blog_posts.name
}
