module.exports = {
    siteMetadata: {
        title: `Mayne's Blog`,
        pageSize: 3,
        description: `All things about Mayne`,
        siteUrl: `https://gine.me`,
    },
    plugins: [
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
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
                feeds: [
                    {
                        serialize: ({ query: { site, allPost } }) => {
                            return allPost.edges.map(edge => {
                                return {
                                    title: edge.node.name,
                                    description: edge.node.brief,
                                    date: edge.node.public_date,
                                    url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                    guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                    custom_elements: [{ "content:encoded": edge.node.html }],
                                }
                            })
                        },
                        query: `
                    {
                      allPost(limit: 1000,sort: { order: DESC, fields: [public_date] },) {
                        edges {
                          node {
                            brief
                            html
                            slug 
                            name
                            public_date
                          }
                        }
                      }
                    }
                  `,
                        output: "/rss.xml",
                        title: "GiNE RSS Feed",
                    },
                ],
            },
        },
    ],
}
