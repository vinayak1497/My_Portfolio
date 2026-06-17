# Google Search Console Setup Guide

## 1. Property Verification

### Option A: Domain Property (Recommended)
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Select **Domain** property type
3. Enter your domain (e.g., `vinayak-kundar.vercel.app` or your custom domain)
4. Add DNS TXT record at your domain registrar (Vercel DNS or external)
5. Click **Verify**

### Option B: URL Prefix Property
1. Select **URL Prefix** property type
2. Enter `https://vinayak-kundar.vercel.app`
3. Choose **HTML tag** verification method
4. If using Vercel, add the meta tag to your root layout
   - Already supported via `metadata` export in layout.tsx

## 2. Sitemap Submission

1. In Search Console, go to **Sitemaps** section (left sidebar)
2. Enter: `https://vinayak-kundar.vercel.app/sitemap.xml`
3. Click **Submit**
4. Verify sitemap status shows **Success** (may take 1-2 days to process)

## 3. URL Inspection Workflow

1. Go to **URL Inspection** tool
2. Enter: `https://vinayak-kundar.vercel.app/`
3. Click **Test Live URL**
4. Verify:
   - ✓ Page is indexable
   - ✓ Canonical URL is correct
   - ✓ Sitemap is referenced
   - ✓ Structured data is valid
5. Click **Request Indexing** for important pages:
   - Homepage
   - Each project page
   - Each blog post
   - About page
   - Resume page

## 4. Verification Checklist

### Check these in Search Console:

| Item | Status | Notes |
|------|--------|-------|
| Property verified | ☐ | Verify via DNS or HTML tag |
| Sitemap submitted | ☐ | Submit sitemap.xml |
| Index coverage | ☐ | Check for errors |
| Mobile usability | ☐ | Test all pages |
| Core Web Vitals | ☐ | Monitor LCP, CLS, INP |
| Rich results | ☐ | Validate structured data |
| Manual actions | ☐ | Check for penalties |
| Security issues | ☐ | Verify no malware |

## 5. Monitor These Dashboards

After setup, regularly check:

### Performance
- **Top search queries**: Look for "Vinayak Kundar" variants
- **Top pages**: Identify which pages get impressions
- **Countries**: Mumbai/Thane region should be primary

### Enhancement
- **Structured data**: Verify all JSON-LD types appear
- **Sitelinks searchbox**: Should appear after WebSite schema is indexed

### Index
- **Pages with errors**: Fix 404s, soft 404s
- **Pages with warnings**: Address any crawl anomalies

## 6. Expected Timeline

| Milestone | Expected Time |
|-----------|---------------|
| Property verification | Immediate |
| Sitemap processing | 1-3 days |
| Initial indexing | 3-14 days |
| Rich result validation | 7-21 days |
| Search ranking stabilization | 30-90 days |
| Entity authority establishment | 60-120 days |
