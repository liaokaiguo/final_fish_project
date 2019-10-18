<template>
	<div class="BottomNav">
		<ul>
			<li>
				<router-link to="/mapShow" class="BottomNavText">地图显示</router-link>&nbsp;&nbsp;
				<router-link to="/passPort" class="BottomNavText">渔船出入港</router-link>&nbsp;&nbsp;
				<router-link to="/workModeSta" class="BottomNavText">渔船作业方式统计及查询</router-link>&nbsp;&nbsp;
				<router-link to="#" class="BottomNavText">船舶明细</router-link>&nbsp;&nbsp;
				<router-link to="/seineSA" class="BottomNavText">围网作业方式统计及分析</router-link>&nbsp;&nbsp;
				<router-link to="/trawlSA" class="BottomNavText">拖网作业方式统计及分析</router-link>&nbsp;&nbsp;
				<router-link to="/gillSA" class="BottomNavText">刺网作业方式统计及分析</router-link>&nbsp;&nbsp;
				<router-link to="/stowSA" class="BottomNavText">张网作业方式统计及分析</router-link>&nbsp;&nbsp;
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "BottomNav",
	}
</script>

<style scoped>
	.BottomNav {
		align-content: center;
		background-image: url("../../assets/lastbottomBg.png");
		background-size: 100% 100%;
		position: absolute;
		top:94%;
		left: 10%;
		width: 80%;
		height: 3%;
		opacity: 0.66;
	}
	.BottomNavText {
		height: 100%;
		font-size: 1vw;
		color: #f7f7f7;
		text-decoration: none;
	}
</style>
    
