<template>
	<!-- 主标题 -->
	<div class="mainTitle">
		<p class="title" @click="refreshPage" v-bind:title="tip">{{ titleName }}</p>
	</div>
</template>

<script>
	export default {
		name: "MainTitle",
		props: ['titleName','tip'],
		methods:{
			refreshPage() {
				this.$router.go(0);
			},
		}
	}
</script>

<style scoped>
	.mainTitle {
		position: absolute;
		left: 35vw;
		width: 30vw;
		top: 1vh;
		height: 5vh;
		text-align:center;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
	}
	.mainTitle .title {
		font-family: Microsoft YaHei;
		color: #5bb1ff;
		cursor: pointer;
		letter-spacing: 0.2vw;
		font-size: 2.2vw;
		display: inline-block;
		/* background-color 测试用 */
		/*background-color: #ff5234;*/
	}
</style>