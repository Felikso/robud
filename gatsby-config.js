const path = require("path");
const { title, keywords, description, author, phone, phoneCode, mail, defaultLang, trackingId, realizations, gallery, policy } = require("./config/site");

module.exports = {
  siteMetadata: {
    title,
    keywords,
    description,
    author,
    phone,
    phoneCode,
    mail,
    realizations,
    gallery,
    policy,
  },
  plugins: [
    "gatsby-plugin-image",
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: title,
        short_name: "RoBud",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#fed136",
        display: "minimal-ui",
        icon: "content/assets/logo.png",
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolios`,
        path: `${__dirname}/content/assets/images/portfolios/`,
      },
    },
    "gatsby-plugin-eslint",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        checkSupportedExtensions: false,
      },
    },
    "@paulkre/gatsby-transformer-svg",
    'gatsby-plugin-svgr',
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: `@import "core.scss";`,
        includePaths: [path.resolve(__dirname, "src/style")],
      },
    },
    {
      resolve: "gatsby-omni-font-loader",
      options: {
        preconnect: ["https://fonts.gstatic.com"],
        web: [
          {
            name: "Droid Sans",
            file: "https://fonts.googleapis.com/css2?family=Droid+Sans&display=swap",
          },
          {
            name: "Montserrat",
            file: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
          },
          {
            name: "Kaushan Script",
            file: "https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap",
          },
          {
            name: "Roboto Slab",
            file: "https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: defaultLang,
        useLangKeyLayout: false,
        pagesPaths: ["/content/"],
      },
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: true,
      },
    },
    `gatsby-plugin-minify`,
    `gatsby-plugin-preact`,
    `gatsby-plugin-netlify`,
  ],
};
