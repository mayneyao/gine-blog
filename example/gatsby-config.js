module.exports = {
    plugins: [
        {
            resolve: `gatsby-theme-gine-blog`,
            options: {
                configTable: "https://www.notion.so/985e04f545f844a3b76cd53452597ce3?v=a8a081148ad84e8f9d0f859931fa0274"
            }
        },
        {
            resolve: `gatsby-source-notion-database`,
            options: {
                configTable: "https://www.notion.so/993b4be5b3c943379d748ad377d3ae7d?v=ea2e5358c6c349c6b4e421c6636a3384"
            }
        }
    ],
}