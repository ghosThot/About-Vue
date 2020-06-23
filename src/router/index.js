import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    name: "home",
    meta: {
      title: "Home", // 导航菜单项标题
      icon: "qq" // 导航菜单项图标
    }
  }
];

// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/About.vue"),
    name: "about",
    meta: {
      title: "About",
      icon: "denglong",
      roles: ['admin','editor']
    },
    children: [{
        path: "/ucenter",
        component: () =>
          import( /* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "ucenter",
        meta: {
          title: "用户中心",
          icon: "denglong",
          roles: ['admin', 'editor']
        },
      },
      {
        path: "/orders",
        component: () =>
          import( /* webpackChunkName: "home" */ "@/views/About.vue"),
        name: "orders",
        meta: {
          title: "订单",
          icon: "denglong",
          roles: ['admin']
        },
      }
    ]
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});
