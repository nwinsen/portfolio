resource "aws_s3_bucket" "website_bucket" {
    bucket = "${var.site_domain}-fe-assets"
}

resource "aws_s3_bucket_public_access_block" "website_bucket_privacy" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# --- THE SECURITY GATE (OAC) ---
# This is the "ID Badge" CloudFront uses to talk to S3
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "${var.project_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# --- THE DELIVERY SERVICE (CloudFront) ---
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.site_domain]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = {
      Sid       = "AllowCloudFrontServicePrincipalReadOnly"
      Effect    = "Allow"
      Principal = {
        Service = "cloudfront.amazonaws.com"
      }
      Action   = "s3:GetObject"
      Resource = "${aws_s3_bucket.website_bucket.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
        }
      }
    }
  })
}

resource "aws_s3_object" "assets" {
  for_each = fileset("${path.module}/dist/assets", "**/*")

  bucket       = aws_s3_bucket.website_bucket.id
  key          = "assets/${each.value}"
  source       = "${path.module}/dist/assets/${each.value}"
  
  # This dynamic lookup maps the file extension to the correct MIME type
  content_type = lookup({
    "png"  = "image/png"
    "jpg"  = "image/jpeg"
    "jpeg" = "image/jpeg"
    "svg"  = "image/svg+xml"
    "webp" = "image/webp"
    "css"  = "text/css"
    "js"   = "application/javascript"
    "html" = "text/html"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")

  etag = filemd5("${path.module}/dist/assets/${each.value}")
}