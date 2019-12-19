const router =[
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        // ,Routes: ['src/components/Authorized'],
        { path: '/', component: '../pages/product/index',title:'产品列表' },
        { path: '/404', component: '../pages/users/index' ,title:'添加产品'},
        // { path: '/index', component: '../pages/users/index' },
        { path: '/login', component: '../pages/login/index' },
      ]
    }
  ]
 export default router