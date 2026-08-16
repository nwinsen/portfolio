# Existing AWS and Cloudflare zones remain authoritative during migration.
data "aws_route53_zone" "main" {
  name         = var.site_domain
  private_zone = false
}

data "cloudflare_zone" "main" {
  filter = {
    name = var.site_domain
    account = {
      id = var.cloudflare_account_id
    }
  }
}

# Publish the existing CloudFront endpoint in the Cloudflare zone. Route 53 is
# intentionally left untouched until the Cloudflare cutover is verified.
resource "cloudflare_dns_record" "root" {
  zone_id = data.cloudflare_zone.main.id
  name    = "@"
  type    = "CNAME"
  ttl     = 1
  content = trimsuffix(var.cloudfront_domain_name, ".")
  proxied = false
}
