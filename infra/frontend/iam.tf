# Create the IAM User
resource "aws_iam_user" "github_deployer" {
  name = "github-actions-deployer-portfolio"
}

# Create the Access Keys (Tofu will show these in the state file!)
resource "aws_iam_access_key" "github_deployer" {
  user = aws_iam_user.github_deployer.name
}

# Define the Policy
resource "aws_iam_user_policy" "deployer_policy" {
  name = "WebsiteDeployPolicy"
  user = aws_iam_user.github_deployer.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["s3:PutObject", "s3:ListBucket", "s3:DeleteObject"]
        Effect   = "Allow"
        Resource = [
          aws_s3_bucket.website_bucket.arn,
          "${aws_s3_bucket.website_bucket.arn}/*"
        ]
      },
      {
        Action   = "cloudfront:CreateInvalidation"
        Effect   = "Allow"
        Resource = aws_cloudfront_distribution.s3_distribution.arn
      }
    ]
  })
}