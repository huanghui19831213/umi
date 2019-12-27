const router =[
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        // ,Routes: ['src/components/Authorized'],
        { path: '/', component: '../pages/product/list',title:'产品列表' },
        { path: '/add', component: '../pages/product/index' ,title:'添加产品'},
      ]
    }
  ]
 export default router