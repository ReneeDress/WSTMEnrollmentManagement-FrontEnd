// 引入vue
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';
// 第三方库需要use一下才能用
Vue.use(VueRouter)

import Main from "@/components/Main.vue";
import CourseSel from "@/components/CourseSel.vue";
import CourseOpen from "@/components/CourseOpen.vue";
import CourseEdit from "@/components/CourseEdit.vue";
import CourseDetail from "@/components/CourseDetail.vue";
import CourseAll from "@/components/CourseAll.vue";
import GradeAll from "@/components/GradeAll.vue";
import GradeEdit from "@/components/GradeEdit.vue";
import GradeDetail from "@/components/GradeDetail.vue";
import GradeQuery from "@/components/GradeQuery.vue";
import People from "@/components/People.vue";
import Author from "@/components/Author.vue";


// 定义routes路由的集合，数组类型
const routes = [
    // 单个路由均为对象类型，path代表的是路径，component代表组件
    { path:'/', component: Main },
    { path:'/CourseSel', component: CourseSel },
    { path:'/CourseOpen', component: CourseOpen },
    { path:'/CourseEdit', component: CourseEdit },
    { path:'/CourseDetail/:xq/:kh/:gh', component: CourseDetail, props: true },
    { path:'/CourseAll', component: CourseAll },
    { path:'/GradeAll', component: GradeAll },
    { path:'/GradeEdit', component: GradeEdit },
    { path:'/GradeDetail/:xq/:kh/:gh', component: GradeDetail, props: true },
    { path:'/GradeQuery', component: GradeQuery },
    { path:'/People', component: People },
    { path:'/Author', component: Author },
    { path:"*", component: Main }
]

// 实例化VueRouter并将routes添加进去
const router = new VueRouter({
// ES6简写，等于routes：routes
    mode: 'history',
    routes,
    base: '/School/',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

// 抛出这个这个实例对象方便外部读取以及访问
export default router