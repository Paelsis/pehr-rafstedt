/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it{

  // fs dependency is a Node.js library for working with the filesystem.
const fs = require("fs")
// Path is a Node.js library with utilities for working with file paths.
const path = require("path")

// Use the onPostBuild Node API, which runs after the build has been completed.
// Note that we have to use an async function here because the Remark plugin
// writes the html property asynchronously.
exports.onPostBuild = async ({ graphql }) => {
  // Run the GraphQL query (from example above).
  await graphql(`
  {
    allFile(filter: {sourceInstanceName: {eq: "images"}, relativePath: {regex: "/IMG/"}}, sort: {order: ASC, fields: name}) {
      edges {
        node {
          sourceInstanceName
          relativeDirectory
          relativePath
          absolutePath
          name
        }
      }
    }
  }
    `).then((result) => {
    // A reference to where we are going to put the files. Note that the public
    // directory already exists because the build has been completed (since
    // we're in the onPostBuild hook).
    const postsPath = "./public/jsonFiles"

    // Collect the data for all earworms. This simply digs into the query result
    // and extracts the objects we care about.
    const images = result.data.allFile.edges.map(({ node }) => node)

    // If we don't already have the posts directory inside the public directory,
    // create it.
    if (!fs.existsSync(postsPath)) fs.mkdirSync(postsPath)

    // Loop through each (filtered) result from the query and write them to
    // file.

    fs.writeFileSync(`${postsPath}/images.json`, '[\n')
    const length = images.length
    images.map((img, ndx) => {
      // The slug is pulled from the name of the markdown file.
      const slug = path.basename(img.absolutePath, path.extname(img.absolutePath))

      // We then combine the frontmatter object with the slug and body (the
      // converted HTML) to form our data object. This will give us the shape we
      // want as mentioned when we wrote the original markdown file.
      const data = {
          originalName: img.relativePath,
          title:"Here you set the title for image " + img.name + " in file images.json",
          publicName:"Here you set the public name of your picure WEB",
          height:"0 cm", 
          width:"0 cm",
          price: "5000 SEK / 500 EUR / 550 USD",
          hover:true, 
      }

      // Using the slug as the filename, write a file containing the data
      // object, after converting it to JSON format.
      let json =  JSON.stringify(data, null, 4)
      if (ndx !== length - 1) {
          json += ','
      }

      fs.writeFileSync(`${postsPath}/images.json`, json + '\n', {flag:'a'})
    })
    fs.writeFileSync(`${postsPath}/images.json`, ']\n', {flag:'a'})
  })
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    // Update the page.
    createPage(page)
  }
}
