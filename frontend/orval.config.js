module.exports = {
  trackYourTime: {
    output: {
      mode: "tags-split",
      target: "src/api/trackYourTime.ts",
      schemas: "src/api/model",
      client: "swr",
      mock: false,
    },
    input: {
      target: "./api.json",
    },
  },
};
