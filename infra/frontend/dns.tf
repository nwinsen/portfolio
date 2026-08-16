# Existing AWS and Cloudflare zones remain authoritative during migration.
data "aws_route53_zone" "main" {
  name         = var.site_domain
  private_zone = false
}

data "cloudflare_zone" "main" {
  name = var.site_domain
}

# CloudFront remains in AWS. Terraform reads its hostname instead of trying to
# recreate the live distribution during the DNS migration.
data "aws_cloudfront_distribution" "existing" {
  id = var.cloudfront_distribution_id
}

# Publish the existing CloudFront endpoint in the Cloudflare zone. Route 53 is
# intentionally left untouched until the Cloudflare cutover is verified.
resource "cloudflare_dns_record" "root" {
  zone_id = data.cloudflare_zone.main.id
  name    = "@"
  type    = "CNAME"
  ttl     = 1
  content = trimsuffix(data.aws_cloudfront_distribution.existing.domain_name, ".")
  proxied = false
}
