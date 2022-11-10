require('dotenv').config({ path: '.env.local' })

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOST,
  generateRobotsTxt: true,
  exclude: ['/sitemaps/*'],
  sitemapSize: 50000,
  changefreq: 'weekly',
  priority: '0.5',
  robotsTxtOptions: {
    policies: [{ userAgent: '*', disallow: '/' }],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_HOST}/sitemaps/cases-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_HOST}/sitemaps/ideas-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_HOST}/sitemaps/kitchens-sitemap.xml`,
      // `${process.env.NEXT_PUBLIC_HOST}/sitemaps/materials-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_HOST}/sitemaps/sinks-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_HOST}/sitemaps/specials-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_HOST}/sitemaps/technics-sitemap.xml`,
    ],
  },
}
