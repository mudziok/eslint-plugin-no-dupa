const getNastyWords = (text) => text.match(/[Dd][Uu][Pp][Aa]/);

const checkForNastyWords = (text, context, node) => {
  if (typeof text !== "string") return;
  const nastyWords = getNastyWords(text);

  if (nastyWords) {
    context.report({
      node: node,
      messageId: "includesDupa",
      data: {
        word: nastyWords[0],
      },
    });
  }
};

module.exports = {
  meta: {
    type: "suggestion",
    messages: {
      includesDupa: "Word '{{ word }}' is not allowed.",
    },
    fixable: "code",
  },
  create(context) {
    return {
      Literal(node) {
        checkForNastyWords(node.value, context, node);
      },
      Identifier(node) {
        checkForNastyWords(node.name, context, node);
      },
      JSXIdentifier(node) {
        checkForNastyWords(node.name, context, node);
      },
      JSXText(node) {
        checkForNastyWords(node.value, context, node);
      },
    };
  },
};
