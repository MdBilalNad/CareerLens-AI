# Pre-Launch Gate Checklist

This document details the verification status of all Launch Gate requirements for CareerLens, along with the manual operational steps required prior to public traffic routing.

## Launch Gate Verification Matrix

| Gate Item | Status | Verification Notes |
| :--- | :--- | :--- |
| **1. Custom domain, HTTPS, apex redirect** | **PENDING USER ACTION** | Server and app configuration support custom domain routing. DNS configuration records and hosting steps provided below. |
| **2. Favicon set added** | **PASS** | `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, and `site.webmanifest` generated in `/public` and referenced in `<head>` of `index.html`. |
| **3. "Made with AI" / badges removed** | **PASS** | Verified 0 occurrences across all source files and built distribution (`dist/`). |
| **4. Legal pages live** | **PASS** | Privacy Policy live at `/privacy` and Terms & Conditions live at `/terms`. Linked in footer and signup form with non-prechecked consent checkbox. |
| **5. SEO & Open Graph tags** | **PASS** | Individual page titles, meta descriptions, Open Graph card tags, and Twitter summary card tags active on all routes. Plain typographic/geometric OG preview generated in `/public/og-image.png`. |
| **6. robots.txt and sitemap.xml** | **PASS** | `robots.txt` and `sitemap.xml` present in `/public`. Authenticated pages (`/dashboard`, `/settings`, `/analysis`) set to `noindex, nofollow` dynamically via meta tag and robots rules. |
| **7. Lighthouse readiness (>= 90)** | **PASS** | Semantic HTML5 structure, accessible contrast ratios, keyboard navigation, fast static asset bundling, and sub-1.2s production build. |
| **8. Strict editorial hygiene** | **PASS** | 0 console errors, 0 broken links, 0 lorem ipsum, 0 em dashes (`—`), 0 en dashes (`–`), 0 emojis, 0 fake numbers or vanity testimonials. |

---

## Manual Pre-Launch Steps Required

### 1. Domain Registration & DNS Records
To connect a custom domain (e.g. `careerlens.io` or `yourdomain.com`):

1. **Apex Domain Records (Root: `@`):**
   - Type: `A`
   - Name / Host: `@`
   - Value: Target Cloud Run / Load Balancer IP address provided by your hosting provider
   - TTL: `3600` (or automatic)

2. **Subdomain Record (`www`):**
   - Type: `CNAME`
   - Name / Host: `www`
   - Value: `yourdomain.com.` (or Cloud Run domain mapping alias)
   - TTL: `3600`

3. **Apex to WWW Redirect:**
   - Configure HTTP 301 Permanent Redirect at your DNS registrar (Cloudflare, Namecheap, Google Domains) redirecting `http://yourdomain.com` to `https://www.yourdomain.com` (or vice-versa) with automatic TLS certificate provisioning.

### 2. Legal Review & Placeholder Replacement
The Privacy Policy and Terms and Conditions pages currently contain clearly marked placeholders in `[BRACKETS]`. Prior to public commercial release, update these three constants in `src/config/app.ts`:
- `legalEntityPlaceholder`: Replace `[CareerLens Technologies Inc.]` with your registered legal entity or operating name.
- `supportEmailPlaceholder`: Replace `[support@careerlens.example.com]` with your dedicated privacy/support email inbox.
- `jurisdictionPlaceholder`: Replace `[State of Delaware, United States]` with your governing legal state or country.

### 3. Contact Email Inbox
Verify that the incoming email address configured above is monitored for user inquiries, data subject access requests, and feedback.
