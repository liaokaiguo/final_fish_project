<template>
	<!-- 左侧透明导航栏 -->
	<div id="leftNavigaList">
		<ul>
			<li class="leftNavTitle">目&nbsp;&nbsp;&nbsp;&nbsp;录</li>
			<li>
				<router-link to="/mapShow" @click.native="refreshPage">地图显示</router-link>
			</li>
			<li>
				<router-link to="/passPort">渔船出入港</router-link>
			</li>
			<li>
				<router-link to="/workModeSta">渔船作业方式<br>统计及查询</router-link>
			</li>
			<li>
				<router-link to="#">船舶明细</router-link>
			</li>
			<li>
				<router-link to="/seineSA">围网作业方式<br>统计及分析</router-link>
			</li>
			<li>
				<router-link to="/trawlSA">拖网作业方式<br>统计及分析</router-link>
			</li>
			<li>
				<router-link to="/gillSA">刺网作业方式<br>统计及分析</router-link>
			</li>
			<li>
				<router-link to="/stowSA">张网作业方式<br>统计及分析</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "LeftNavigaList",
		methods: {
			//router-link 单次渲染， 每次重新刷新进入地图页面，否则地图实例销毁不了，路径回放出错
			refreshPage() {
				this.$router.go(0);
			}
		}
	}
</script>

<style scoped>
	#leftNavigaList {
		position: absolute;
		top: 18vh;
		left: 1vw;
		width: 8vw;
		height: 72vh;
		z-index: 99;
		/*text-align: center;*/
		background-color: rgba(0, 0, 0, 0.24);
		border-radius: 0.5rem;
	}

	#leftNavigaList ul {
		/* 清除ul标签的默认样式 */
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		margin: 0;
		padding: 0;
		font-size: 1vw;
		list-style-type: none;
		display: block;
		/*background-color: #3f72c5;*/
	}

	#leftNavigaList .leftNavTitle {
		float: top; /* 使li内容纵向浮动 */
		margin-top: 0; /* 两个li之间的距离 */
		display: block;
		color: #62dbff;
		text-align: center;
		padding: 1vh 1vh;
		font-size: 1vw;
		font-weight: bold;
		border-bottom: #55a6ee 1px solid;
	}

	#leftNavigaList li {
		float: top; /* 使li内容纵向浮动 */
		margin-top: 0.5vh; /* 两个li之间的距离 */
		/*border: solid 1px #191762;*/
	}

	#leftNavigaList li a {
		/* 设置链接内容显示的格式*/
		/* 把链接显示为块元素可使整个链接区域可点击 */
		display: block;
		color: #62dbff;
		text-align: center;
		padding: 1vh 1vh;
		/* 去除下划线 */
		text-decoration: none;
	}

	#leftNavigaList li a:hover {
		color: #0c034b;
		/* 鼠标选中时背景变色 */
		/*用背景色*/
		/* 浏览器不支持的时候显示 */
		/*background-color: #40c0ff;*/
		/* 标准的语法（必须放在最后） */
		background-image: radial-gradient(#96f0ff, #5ee4ff, #40c0ff);
		/*用图片*/
		/*height:100%;*/
		/*width:100%;*/
		/*overflow: hidden;*/
		/*background-size:cover;*/
		/*或者background-size:100%;*/
		/*background-image: url("../../assets/菜单选中背景.png");*/
		/*background-repeat: no-repeat;*/
	}
</style>
