import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    // import(/* webpackChunkName: "about" */ "../components/lib/AdminLib.vue"),
  },
  {
    path: "/user",
    name: "user",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserView.vue"),
  },
  {
    path: "/book",
    name: "book",
    component: () => import("../views/BookView.vue"),
  },
  {
    path: "/publisher",
    name: "publisher",
    component: () => import("../views/PublisherView.vue"),
  },
  {
    path: "/rental",
    name: "rental",
    component: () => import("../views/RentalView.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: HomeView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
