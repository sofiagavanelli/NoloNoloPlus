import Vue from 'vue'
import Router from 'vue-router'

//const IntroPage = () => import("./components/IntroPage.vue")
//const Foo  = () => import('./Foo.vue')
import IntroPage from "./components/IntroPage.vue"
//import AboutUs from "./components/AboutUs.vue"
import LoginModal from "./components/LoginModal.vue"
import ProfilePage from "./components/ProfilePage.vue"
import RentPage from "./components/RentPage.vue"
import NewRegistration from "./components/NewRegistration.vue"
import EditRent from "./components/EditRent.vue"
//const AboutUs = () => import("./components/AboutUs.vue")
//const LoginModal = () => import("./components/LoginModal.vue")

Vue.use(Router)

export default new Router({
  /*routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },*/
    routes: [
      {
        path: '/home', alias: '/',
        component: IntroPage,
        //props: true,
        //props: params => ({ data: params.query.data })
      },
      /*{
        path: '/about',
        component: AboutUs
      },*/
      {
        path: '/login', 
        component: LoginModal,
      },
      {
        path: '/profile',
        component: ProfilePage
      },
      {
        path: '/new-client',
        component: NewRegistration
      },
      {
        path: '/edit-rent',
        name: 'editRent',
        component: EditRent,
        props: true
      },
      {
        path: '/rent-page',
        name: 'rentPage',
        component: RentPage,
        props: true
      },
      /*{
        path: '/rent',
        component: RentPage
      }*/,
    ],
  })