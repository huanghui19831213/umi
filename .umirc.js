
console.log(process.env.UMI_ENV,1)
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/users/list' },
        { path: '/404', component: '../pages/404' },
        { path: '/list', component: '../pages/users/list' },
        { path: '/index', component: '../pages/users/index' },
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
      dynamicImport: false,
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
      "target": 'http://10.17.3.116:8080',
      "pathRewrite": {'^/api' : ''}
    }
  }
}
