
module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Disallow the use of moment library",
      },
      schema: [],
      messages: {
        noMoment: "Importing or requiring 'moment' is not allowed.",
      },
    },
  
    create(context) {
      return {
        ImportDeclaration(node) {
          if (node.source && node.source.value === "moment") {
            context.report({
              node: node.source,
              messageId: "noMoment",
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
              messageId: "noMoment",
            });
          }
        },
      };
    },
  };
  