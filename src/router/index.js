import Vue from 'vue'
import Router from 'vue-router'
import WelCome from '@/components/WelCome'
import wel from '@/components/testpage'
import gillNetStAnalysis from '@/components/Pages/gillNetStatisticalAnalysis'
import trawlSA from '@/components/Pages/trawlStatisticalAnalysis'
import seineSA from '@/components/Pages/seineStatisticalAnalysis'
import mapShow from "@/components/Pages/BaiduMapShow";
import passPort from "@/components/Pages/EntryAndExitPort";
import workModeSta from "@/components/Pages/WorkModeStatistics";
//import ElementUI from 'element-ui'
//import '/element-ui/lib/theme-default/index.css'
//Vue.use(ElementUI)

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'WelCome',
      component: WelCome
    },
    {
      path: '/he',
      name: 'he',
      component: wel
    },
    {
      path: '/gillNetStAnalysis',
      name: 'gillNetStA',
      component: gillNetStAnalysis
    },
    {
      path: '/trawlSA',
      name: 'trawlSA',
      component: trawlSA
    },
    {
      path: '/seineSA',
      name: 'seineSA',
      component: seineSA
    },
    {
      path: '/mapShow',
      name: 'mapShow',
      component: mapShow
    },
    {
      path: '/passPort',
      name: 'passPort',
      component: passPort
    },
    {
      path: '/workModeSta',
      name: 'workModeSta',
      component: workModeSta
    }

  ],
  /*页面跳转滚动条在顶端*/
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
      return saveTop;
    } else {
      return {x: 0, y: 0}
    }
  }
})
