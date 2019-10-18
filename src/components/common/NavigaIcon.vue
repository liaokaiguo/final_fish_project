<template>
	<!-- 右上角导航按钮 -->
	<div class="navigaIcon" id="navigaIconID">
		<img class="goBack" src="../../assets/backico.png" alt="后退" v-on:click="goBack"
		     v-bind:title="tipMsg.goBack">
		<img class="goHome" src="../../assets/homeico.png" alt="回到主页" v-on:click="goHome"
		     v-bind:title="tipMsg.goHome">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: "NavigaIcon",
				// Tips提示
				tipMsg:{
					goBack: '后退',
					goHome: '主页',
				},
			}
		},
		methods:{
			goBack() {
				this.$router.back(-1);
			},
			goHome() {
				this.$router.push('/welcome')
			},
		}
	}
</script>

<style scoped>
	.navigaIcon {
		position: absolute;
		right: 2vw;
		width: 15vw;
		height: 5vh;
		margin-top: 3.3vh;
		margin-bottom: 0.1vh;
		/* background-color 测试用 */
		/* background-color: #FFFFFF; */
	}

	.navigaIcon .goBack {
		cursor: pointer;
		position: absolute;
		right: 50%;
		height: 90%;
	}

	.navigaIcon .goHome {
		cursor: pointer;
		position: absolute;
		right: 28%;
		height: 90%;
	}
</style>
    
