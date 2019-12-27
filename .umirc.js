
console.log(process.env.UMI_ENV,1)
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        // ,Routes: ['src/components/Authorized'],
        { path: '/add', component: '../pages/product/index' },
        { path: '/', component: '../pages/product/list' },
        { path: '/login', component: '../pages/login/index' },
        { path: '/editor/:id/:editor', component: '../pages/product/index'},
      ]
    }
  ],
  
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },

      antd: true,
      // polyfills: ['ie9'],
      locale: {},
      library: 'react',
      dynamicImport: {
        webpackChunkName: true,
        // loadingComponent: 'src/components/loading',
      },
      title: 'abc',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      // http://10.17.3.116
      "target": 'http://120.27.27.183:8080',
      "pathRewrite": {'^/api' : ''}
    }
  }
}
