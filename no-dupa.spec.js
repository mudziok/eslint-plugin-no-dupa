const { RuleTester } = require("eslint");
const noDupaRule = require("./no-dupa");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("no-dupa", noDupaRule, {
  valid: [
    {
      code: `console.log('Something nice and kind')`,
    },
    {
      code: `const nice = 'nice string :)'`,
    },
    {
      code: `const component = <Nice />`,
    },
    {
      code: `const niceComponent = <Nice>Kind words</Nice>`,
    },
    {
      code: `const niceComponent = <Nice>{kind}</Nice>`,
    },
  ],

  invalid: [
    {
      code: `{ console.log('dupa'); }`,
      errors: [{ messageId: "includesDupa", data: { word: "dupa" } }],
    },
    {
      code: `{ const dupa = 'nice string :)'; }`,
      errors: [{ messageId: "includesDupa", data: { word: "dupa" } }],
    },
    {
      code: `{ const component = <Dupa /> }`,
      errors: [{ messageId: "includesDupa", data: { word: "Dupa" } }],
    },
    {
      code: `{ const componentWithNastyChildren = <Nasty>dupa</Nasty> }`,
      errors: [{ messageId: "includesDupa", data: { word: "dupa" } }],
    },
    {
      code: `{ const componentWithNastyChildren = <Nasty>{dupa}</Nasty> }`,
      errors: [{ messageId: "includesDupa", data: { word: "dupa" } }],
    },
  ],
});
