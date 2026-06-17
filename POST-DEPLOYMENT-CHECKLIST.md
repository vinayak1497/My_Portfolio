# Post-Deployment Verification Checklist

## 1. Immediate Checks (After Deploy)

### Technical SEO
- [ ] Visit `https://vinayak-kundar.vercel.app/robots.txt` — verify all rules
- [ ] Visit `https://vinayak-kundar.vercel.app/sitemap.xml` — verify all URLs
- [ ] Run `curl -I https://vinayak-kundar.vercel.app/` — verify headers (X-Frame-Options, X-Content-Type-Options)
- [ ] Test canonical: `curl -I https://vinayak-kundar.vercel.app/projects` — verify `Link: <...>; rel="canonical"`
- [ ] Check 404 page: visit `https://vinayak-kundar.vercel.app/nonexistent-page`

### Metadata Verification
- [ ] Homepage: `<title>` should be "Vinayak Kundar | Computer Engineering Student, AI Builder & Full Stack Developer"
- [ ] Projects: `<title>` should contain "Projects | Vinayak Kundar"
- [ ] Blog: `<title>` should contain "{Blog Title} | Vinayak Kundar Blog"
- [ ] About: `<title>` should contain "About | Vinayak Kundar"

### Structured Data Validation
- [ ] Go to [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test homepage — should show Person + WebSite schema
- [ ] Test project page — should show SoftwareSourceCode
- [ ] Test blog page — should show BlogPosting
- [ ] Test badges page — should show EducationalOccupationalCredential
- [ ] Test contact page — should show ContactPage
- [ ] Test journey/pokedex — should show BreadcrumbList
- [ ] All validations should show "Page is eligible for rich results"

## 2. Core Web Vitals Check

### Run Lighthouse (Chrome DevTools)
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO = 100

### Check on PageSpeed Insights
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] TBT < 50ms

### Test on Mobile
- [ ] All pages pass mobile-friendly test
- [ ] Touch targets are properly sized
- [ ] Content scales correctly

## 3. Open Graph & Social Preview

- [ ] Test homepage on [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test project page on [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Test Twitter card with [Card Validator](https://cards-dev.twitter.com/validator)
- [ ] OG image generates at 1200×630 for all page types

## 4. Analytics & Monitoring

- [ ] Vercel Analytics shows pageviews after 24 hours
- [ ] Vercel Speed Insights shows CWV data after 24 hours
- [ ] PostHog (if configured) tracks pageviews
- [ ] Google Search Console shows property verified

## 5. Content Inventory

- [ ] All 4 projects have detail pages with unique metadata
- [ ] The 1 blog post has detail page with BlogPosting schema
- [ ] All 6 notes subjects indexed in sitemap
- [ ] All certifications listed on badges page
- [ ] About page has complete entity information

## 6. Search Console (7 Days Post-Deployment)

- [ ] Submit sitemap in Search Console
- [ ] Request indexing for 5-10 key pages
- [ ] Check for any index coverage errors
- [ ] Verify rich results are appearing
- [ ] Monitor for manual actions

## 7. 30-Day Review

- [ ] Check Search Console Performance for impressions/clicks
- [ ] Search for "Vinayak Kundar" — verify portfolio is top result
- [ ] Check ranking for secondary keywords
- [ ] Review Core Web Vitals in Search Console
- [ ] Update sitemap if new content was added
- [ ] Fix any crawl errors

## 8. 90-Day Review

- [ ] Analyze top search queries
- [ ] Check entity authority (Knowledge Panel eligibility)
- [ ] Review backlink profile if applicable
- [ ] Plan content additions based on search performance
- [ ] Update structured data if schema.org releases new types
