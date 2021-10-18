module.exports.rules = {
  "must-log": {
    create(context) {
      const functionNames = ["get", "post", "put", "delete"];

      return {
        CallExpression: (node) => {
          if (!node.callee.object || node.callee.object.name !== "app") {
            return;
          }

          if (
            !node.callee.property ||
            !functionNames.includes(node.callee.property.name)
          ) {
            return;
          }

          const log = node.arguments.find(
            (arg) =>
              arg.type === "CallExpression" && arg.callee.name === "logger"
          );

          if (!log) {
            context.report(node, "need logging middleware");
          }
        },
      };
    },
  },
};
