// eslint-plugin-custom.js
module.exports = {
    rules: {
      "no-moment": {
        meta: {
          type: "problem",
          docs: {
            description: "Disallow the use of moment library",
          },
          schema: [],
        },
        create(context) {
          return {
            ImportDeclaration(node) {
              if (node.source && node.source.value === "moment") {
                context.report({
                  node: node.source,
                  message: "Importing 'moment' is not allowed...",
                });
              }
            },
            CallExpression(node) {
              if (
                node.callee.name === "require" &&
                node.arguments.length === 1 &&
                node.arguments[0].type === "Literal" &&
                node.arguments[0].value === "moment"
              ) {
                context.report({
                  node: node.arguments[0],
                  message: "Requiring 'moment' is not allowed...",
                });
              }
            },
            };
        },
        },
     
    },
};
