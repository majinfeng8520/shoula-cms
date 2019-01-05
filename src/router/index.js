import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import HelloWorld from '@/components/HelloWorld'
import Layout from '@/components/Layout/Layout'
import Cuser from '@/components/Cuser/Cuser'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        // {
        //     path: '/',
        //     name: 'Layout',
        //     component: Layout
        // },
        {
            path: '/HelloWorld',
            name: 'HelloWorld',
            component: Layout,
            children: [{
                path: '/HelloWorld',
                component: HelloWorld
            }]
        },
        {
            path: '/Cuser',
            name: 'Cuser',
            component: Layout,
            children: [{
                path: '/Cuser',
                component: Cuser
            }]
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//             next();
//         }
//         else {
//             next({
//                 path: '/login',
//                 query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//             })
//         }
//     }
//     else {
//         next();
//     }
// })
// export default router
