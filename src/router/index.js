import Vue from 'vue'
import Router from 'vue-router'
// 主页
import WelCome from '@/components/WelCome'
// 刺网
import gillSA from '@/components/Pages/gillStatisticalAnalysis'
// 拖网
import trawlSA from '@/components/Pages/trawlStatisticalAnalysis'
// 围网
import seineSA from '@/components/Pages/seineStatisticalAnalysis'
// 张网
import stowSA from '@/components/Pages/stowStatisticalAnalysis'
import mapShow from "@/components/Pages/BaiduMapShow";
import passPort from "@/components/Pages/EntryAndExitPort";
import workModeSta from "@/components/Pages/WorkModeStatistics";
import loginIndex from '@/components/LoginIndex'

//import ElementUI from 'element-ui'
//import '/element-ui/lib/theme-default/index.css'
//Vue.use(ElementUI)

Vue.use(Router)

export default new Router({
	mode:'hash',
  base:'./',
	routes: [
		{
			path: '/',
			name: 'loginIndex',
			component: loginIndex
		},
		{
			path: '/welcome',
			name: 'WelCome',
			component: WelCome
		},
		//四种作业方式
		{
			path: '/gillSA',
			name: 'gillSA',
			component: gillSA
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
			path: '/stowSA',
			name: 'stowSA',
			component: stowSA
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
		},
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
