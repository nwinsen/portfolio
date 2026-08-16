data "cloudflare_zone" "main" {
  name       = var.site_domain
  account_id = var.cloudflare_account_id
}

# Read the live API Gateway target from Route 53 instead of recreating the API
# custom domain or certificate during the DNS migration.
data "aws_route53_records" "api" {
  zone_id    = data.aws_route53_zone.main.zone_id
  name_regex = "^${var.api_subdomain}\\.${var.site_domain}\\.$"
}

locals {
  api_alias = one([
    for record in data.aws_route53_records.api.resource_record_sets : record
    if record.type == "A" && record.alias_target != null
  ])
}

resource "cloudflare_dns_record" "api" {
  zone_id = data.cloudflare_zone.main.id
  name    = var.api_subdomain
  type    = "CNAME"
  ttl     = 1
  content = trimsuffix(local.api_alias.alias_target.name, ".")
  proxied = false
}
