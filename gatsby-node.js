const path = require("path");

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/*// You can delete this file if you're not using it
exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}*/

exports.createPages = ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info


 const productsQuery =  graphql(`
    {
      vendure {
        products {
          items {
            id
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.vendure.products.items.forEach(product => {
      actions.createPage({
        path: "products/" + product.slug,
        component: path.resolve(`./src/templates/ProductDetail.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          id: product.id,
        },
      });
    });
  });

  const collectionsQuery = graphql(`
    {
      vendure {
        collections {
          items {
            id
            name
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.vendure.collections.items.forEach(collection => {
      actions.createPage({
        path: "collections/" + collection.slug,
        component: path.resolve(`./src/templatesCollection/collectionDetail.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          id: collection.id,
          slug:collection.slug
        },
      });
    });
  });
  return Promise.all([productsQuery, collectionsQuery]);
};


