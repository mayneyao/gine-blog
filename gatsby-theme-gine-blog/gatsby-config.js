module.exports = {
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-plugin-netlify-cache",
            options: {
                cachePublic: true
            }
        },
        {
            resolve: `gatsby-source-notion-database`,
            options: {
                configTable: "https://www.notion.so/65b35da1762e4f259904bb4cc38e54fd?v=89e80623e52e4419a35f20e54056cfb8"
            }
        }
    ]
}