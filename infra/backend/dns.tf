data "cloudflare_zone" "main" {
  filter = {
    name = var.site_domain
    account = {
      id = var.cloudflare_account_id
    }
  }
}

resource "cloudflare_dns_record" "api" {
  zone_id = data.cloudflare_zone.main.id
  name    = var.api_subdomain
  type    = "CNAME"
  ttl     = 1
  content = trimsuffix(var.api_gateway_target_domain_name, ".")
  proxied = false
}
