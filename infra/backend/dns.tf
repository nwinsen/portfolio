# --- REFERENCE EXISTING HOSTED ZONE ---
# The Route53 hosted zone for winsen.dev is created in /infra/frontend/dns.tf.
# We look it up here by name — Terraform reads it from AWS but doesn't manage it.
data "aws_route53_zone" "main" {
  name = var.site_domain
}

# --- ACM CERTIFICATE ---
# Issues an SSL cert for api.winsen.dev. Must use the us_east_1 provider because
# API Gateway (like CloudFront) only accepts certs from us-east-1.
# create_before_destroy ensures zero-downtime cert rotation if it's ever replaced.
resource "aws_acm_certificate" "api_cert" {
  provider          = aws.us_east_1
  domain_name       = "${var.api_subdomain}.${var.site_domain}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# --- CERTIFICATE DNS VALIDATION RECORDS ---
# To prove we own the domain, ACM gives us DNS records to add to Route53.
# The for_each iterates over those records (usually just one) and creates them.
# allow_overwrite is safe here — if the record already exists from a previous apply,
# we just overwrite it with the same value.
resource "aws_route53_record" "api_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.api_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

# --- CERTIFICATE VALIDATION WAITER ---
# This resource doesn't create anything — it just blocks tofu apply until ACM
# confirms the DNS validation succeeded and the cert is issued. Usually takes
# 1-2 minutes.
resource "aws_acm_certificate_validation" "api_cert" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.api_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.api_cert_validation : record.fqdn]
}

# --- API GATEWAY CUSTOM DOMAIN ---
# Tells API Gateway to accept traffic for api.winsen.dev using our cert.
# Without this, the API is only reachable via the auto-generated *.execute-api.amazonaws.com URL.
resource "aws_apigatewayv2_domain_name" "api" {
  domain_name = "${var.api_subdomain}.${var.site_domain}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.api_cert.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [aws_acm_certificate_validation.api_cert]
}

# --- API MAPPING ---
# Connects the custom domain to the $default stage of our API.
# This is what makes requests to api.winsen.dev actually reach the routes.
resource "aws_apigatewayv2_api_mapping" "api" {
  api_id      = aws_apigatewayv2_api.api.id
  domain_name = aws_apigatewayv2_domain_name.api.id
  stage       = aws_apigatewayv2_stage.default.id
}

# --- DNS RECORD: api.winsen.dev -> API GATEWAY ---
# An A record alias that points api.winsen.dev to the API Gateway regional endpoint.
# Aliases are AWS-specific — they're free, support apex domains, and auto-update
# if the target IP changes (unlike a CNAME with a hardcoded IP).
resource "aws_route53_record" "api" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${var.api_subdomain}.${var.site_domain}"
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
