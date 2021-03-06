// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vant from 'vant'
// import 'vant/lib/index.css'


// Vue.use(Vant)


import { Button, Row, Col, Swipe, SwipeItem, Lazyload,List,Field,NavBar ,Toast,Tab,Tabs,PullRefresh,Stepper,Tabbar,TabbarItem,Cell,CellGroup} from 'vant'


Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Toast).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
