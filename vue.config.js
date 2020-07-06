// configure only variables, mixins and functions as it repeats to each and every component
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/css/style.css";
        `,
      },
    },
  },
};
