module.exports = {
  siteMetadata: {
    title: `RAFSTEDT - DESIGN & PHOTOS`,
    galleries:['2020','2019', '2018', '2017', '2016'],
    author: `Per Eskilson`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `limelight`,
          'varela',
          `lobster`,
          `crimson`,
          `Work Sans`,
        ],
        display: 'swap'
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/tk_logotype.png`, // This path is relative to the root of the site.
      },
      
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/state/createStore',
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
          // otherwise `JSON.parse` is used
          isJSON: true,
          unsafe: false,
          ignoreFunction: true,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: '__PRELOADED_STATE__',
      },
    },
    {
      resolve: "gatsby-theme-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyANMhWbIj_gBrIeuUAodU5BtRd1io4s9iE",
          authDomain: "pehr-rafstedt.firebaseapp.com",
          databaseURL: "https://pehr-rafstedt.firebaseio.com",
          projectId: "pehr-rafstedt",
          storageBucket: "pehr-rafstedt.appspot.com",
          messagingSenderId: "487298408450",
          appId: "1:487298408450:web:e668b86e11c4309972871b",
          measurementId: "G-6W70PXWKYF"
        },
        loginPath: "/login",
        loginRedirectPath: "/app/profile",
        socialLogins: ["google"],
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

