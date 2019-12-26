
console.log(process.env.UMI_ENV,1)
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        // ,Routes: ['src/components/Authorized'],
        { path: '/', component: '../pages/product/index',title:'产品列表' },
        { path: '/users', component: '../pages/users/index' ,title:'添加产品'},
        { path: '/404', component: '../pages/404' },
        // { path: '/index', component: '../pages/users/index' },
        { path: '/login', component: '../pages/login/index' },
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
      "target": 'http://120.27.27.183:8080',
      "pathRewrite": {'^/api' : ''}
    }
  }
}
