module.exports = {
    siteMetadata: {
        title: `Mayne's Blog`,
        pageSize: 3,
        description: `All things about Mayne`,
        siteUrl: `https://gine.me`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-feed`,
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-89592481-3',
                head: true,
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                output: `/sitemap.xml`,
                exclude: [],
                query: `
                {
                  site {
                    siteMetadata {
                      siteUrl
                    }
                  }
        
                  allSitePage {
                    edges {
                      node {
                        path
                      }
                    }
                  }
              }`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Mayne's Blog`,
                short_name: `Mayne's Blog`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                display: `standalone`,
                icon: `src/static/41546411364_.pic.jpg`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/content`,
            },
        },
        `gatsby-plugin-sharp`,
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content`,
                name: 'content',
            },
        },
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-relative-images`,
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: 'language-',
                            inlineCodeMarker: {sh: 'bash'},
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                        },
                    },
                ],
            },
        },
    ],
}
