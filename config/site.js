module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Bureau des Etudiants de l\'Arbois', // Navigation and Site Title
  titleAlt: 'Bureau des Etudiants de l\'Arbois', // Title for JSONLD
  description:
    "Le site du bureau des étudiants du CESI d'Aix-en-Provence (BEA CESI AIX)",
  url: 'https://bde-cesi-aix.fr', // Domain of your site. No trailing slash!
  siteUrl: 'https://bde-cesi-aix.fr', // url + pathPrefix
  siteLanguage: 'fr', // Language Tag on <html> element
  logo: 'static/logo/logo.png', // Used for SEO
  banner: 'static/logo/banner.png',
  // JSONLD / Manifest
  favicon: 'static/logo/favicon.png', // Used for manifest favicon generation
  shortName: 'BEACESIAIX', // shortname for manifest. MUST be shorter than 12 characters
  author: 'BEA CESI AIX', // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
};
