const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuex-module-decorators'
  ],
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/scss/variables.scss";'
      }
    }
  }
})
