module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'BDE CESI AIX', // Navigation and Site Title
  titleAlt: 'BDE CESI AIX', // Title for JSONLD
  description:
    "Le site du bureau des étudiants du CESI d'Aix-en-Provence (BDE CESI AIX)",
  url: 'https://bde-cesi-aix.fr', // Domain of your site. No trailing slash!
  siteUrl: 'https://bde-cesi-aix.fr', // url + pathPrefix
  siteLanguage: 'fr', // Language Tag on <html> element
  logo: 'static/logo/logo.png', // Used for SEO
  banner: 'static/logo/banner.png',
  // JSONLD / Manifest
  favicon: 'static/logo/favicon.png', // Used for manifest favicon generation
  shortName: 'BDECESIAIX', // shortname for manifest. MUST be shorter than 12 characters
  author: 'BDE CESI AIX', // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
};
