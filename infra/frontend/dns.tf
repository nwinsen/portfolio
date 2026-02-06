resource "aws_route53_zone" "main" {
    name = var.site_domain
}

#Next, we create an SSL Certificate
resource "aws_acm_certificate" "cert" {
    # Use the "us_east_1" alias because CloudFront is particular about region ?
    provider = aws.us_east_1
    domain_name = var.site_domain
    validation_method = "DNS"

    lifecycle {
        create_before_destroy = true
    }
}

# 3. Create the "Proof of Ownership" Record
# This automatically puts the 'secret code' from the cert into your new Hosted Zone
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name = each.value.name
  records = [each.value.record]
  ttl = 60
  type = each.value.type
  zone_id = aws_route53_zone.main.zone_id
}

# 4. The "Waiter"
# This tells Tofu to wait for the handshake to finish before moving to the next file
resource "aws_acm_certificate_validation" "cert" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}