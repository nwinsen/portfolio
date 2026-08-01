resource "cloudflare_zone" "main" {
  account = {
    id = var.cloudflare_account_id
  }

  name = var.site_domain
  type = "full"
}

#Next, we create an SSL Certificate
resource "aws_acm_certificate" "cert" {
  # Use the "us_east_1" alias because CloudFront is particular about region ?
  provider          = aws.us_east_1
  domain_name       = var.site_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# 3. Create the "Proof of Ownership" Records in Cloudflare DNS.
# The zone itself is hosted by Cloudflare now, but ACM still consumes the
# resulting records from public DNS exactly the same way.
resource "cloudflare_dns_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name            = trimsuffix(each.value.name, ".")
  content         = trimsuffix(each.value.record, ".")
  ttl             = 60
  type            = each.value.type
  zone_id         = cloudflare_zone.main.id
  proxied         = false
}

# This tells Tofu to wait for the handshake to finish before moving to the next file
resource "aws_acm_certificate_validation" "cert" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in cloudflare_dns_record.cert_validation : record.name]
}

resource "cloudflare_dns_record" "root" {
  zone_id = cloudflare_zone.main.id
  name    = "@"
  type    = "CNAME"
  ttl     = 1
  content = aws_cloudfront_distribution.s3_distribution.domain_name
  proxied = false
}