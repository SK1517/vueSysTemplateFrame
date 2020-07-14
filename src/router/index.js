import Vue from 'vue'
import VueRouter from 'vue-router'

import Content from '../Content'
import Search from "./Search";
import Search1 from "./Search1";

// import Login from '../components/Login'

Vue.use(VueRouter)
// const beforeEnter = (to, from, next) => {
//     if (to.meta && to.meta.title) {
//         document.title = to.meta.title;
//     }
//     if (window.$rootVue) {
//         window.$rootVue.currentRoutePath = to.path;
//     }
//     next()
// }
const routes = [
    {
        path: '/',
        name: 'Content',
        meta: {title: 'Vue Sys Template'},
        component: Content,
        redirect: '/router/Search1',
        children: [
            {path: '/router/Search', component: Search, title: 'search'},
            {path: '/router/Search1', component: Search1, title: 'search1'},
        ]
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
