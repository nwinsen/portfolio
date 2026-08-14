output "state_bucket_name" {
  description = "Use this value for the GitHub production secret TF_STATE_BUCKET"
  value       = aws_s3_bucket.state.id
}

output "state_bucket_region" {
  description = "AWS region containing the Terraform state bucket"
  value       = var.aws_region
}

output "state_bucket_arn" {
  description = "ARN of the Terraform state bucket"
  value       = aws_s3_bucket.state.arn
}
