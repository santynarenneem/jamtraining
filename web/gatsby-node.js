const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const {format} = require('date-fns')

async function createBlogPostPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const {id, slug = {}, publishedAt} = edge.node
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/blog/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/blog-post.js'),
        context: {id}
      })
    })
}
async function createHowToPostPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityHowToArticle {
        edges {
          node {
            id
            headline
            subheading
            tags {
              tagName
            }
            slug {
              current
            }
            seo {
              metaDescription
              metaKeywords
              metaTitle
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityHowToArticle || {}).edges || []

  postEdges

    .forEach((edge, index) => {
      const tagVal =[];
      const {id, slug = {},tags =[]} = edge.node
edge.node.tags.forEach((tag,index)=>{
tagVal.push(tag.tagName);
})
      const path = `how_to/${slug.current}`

      createPage({
        path : path,
        component: require.resolve('./src/pages/how_to_post.js'),
        context: {
          id:id,
          tagValue : tagVal
        }
      })
    })
}

exports.createPages = async ({graphql, actions}) => {
  await createBlogPostPages(graphql, actions)
  await createHowToPostPages(graphql, actions)
}







// exports.createPages = ({graphql, actions}) => {
//     const {createPage} = actions
//     const howToPostTemplate = path.resolve(`./src/pages/how_to_post.js`)

//     return graphql(`
//   query HowToQuery {
//     allSanityHowToArticle {
//       edges {
//         node {
//           id
//           headline
//           subheading
//           slug {
//             current
//           }
//           seo {
//             metaDescription
//             metaKeywords
//             metaTitle
//           }
//         }
//       }
//     }
//   }
//   `).then(result => {
//         if (result.errors) {
//             throw result.errors
//         }

//         // Create blog post pages.
//         result
//             .data
//             .allSanityHowToArticle
//             .edges
//             .forEach(edge => {
//                 createPage({
//                     // Path for this page — required
//                     path: `how_to/${edge.node.slug.current}`,
//                     component: howToPostTemplate,
//                     context: {
//                         pagePath: edge.node.slug.current
//                     }
//                 })
//             })
//     })
// }
