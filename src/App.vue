<template>
	<div id="app">
		<!--顶部视图-->
		<div></div>
		<router-view></router-view>
	</div>
</template>

<script>


	export default {
		name: "App",
		components: {
		}
	};
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		padding: 0;
		margin: 0;
	}
	/* 去掉百度地图logo */
	.BMap_cpyCtrl {
		display: none;
	}
	.anchorBL {
		display: none;
	}
	/*** el-popover是和app同级，全局样式  弹出框自定义*/
	.el-popper{
		border-radius: 10px 10px 10px 10px !important;
		padding-top: 0px !important;
		padding-right: 0px !important;
		padding-left: 0px !important;

	}
	.el-popover__title{
		border-radius: 10px 10px 0px 0px;
		margin-bottom: 10px;
		text-align: center;
		color: white !important;
		background-color: #5bb1ff ;
		font-size: 22px !important;
	}
</style>
