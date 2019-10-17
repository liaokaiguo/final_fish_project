<template>
	<div>
		<!-- 背景 -->
		<div id="backGround"></div>
		<!--主要内容-->
		<div id="main-content">
			<!-- 主标题 -->
			<div class="mainTitle">
				<p class="title" @click="refreshPage" v-bind:title="tipMsg.thisPageName">渔船作业方式智能识别系统</p>
			</div>

			<!--the left/ middle /right/ model-->
			<!--the left model-->
			<div class="wholeleft">
				<!--the left-top model code-->
				<div id="lefttopBox">
					<div class="msgTitle">
						<span class="msgMainTitle">渔船出入港</span>
						<router-link to="/passPort">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="/passPort">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<table class="leftTopTable">
							<tr>
								<td>
									<span></span>
								</td>
								<td>本地渔船</td>
								<td>外地渔船</td>
							</tr>
							<tr>
								<td>入港</td>
								<td>{{LinNum}}</td>
								<td>{{NLinNum}}</td>
							</tr>
							<tr>
								<td>出港</td>
								<td>{{LoutNum}}</td>
								<td>{{NLoutNum}}</td>
							</tr>
						</table>
					</div>
				</div>
				<!--the left-middle model code-->
				<div id="leftmidBox">
					<div class="msgTitle">
						<span class="msgMainTitle">作业占比</span>
						<router-link to="#">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="#">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<div id="leftmiddleEchartId" class="leftmiddleEchart"></div>
					</div>
				</div>
				<!--the left-bottom model code-->
				<div id="leftbotBox">
					<div class="msgTitle">
						<span class="msgMainTitle">围网统计</span>
						<router-link to="/seineSA">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="/seineSA">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<el-row>
							<el-col :span="24">
								<rightBottomEcharts v-bind:echartId="'leftBottomEchartsId'" :OptionData="leftBottomOption"></rightBottomEcharts>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>

			<!--the middle model-->
			<div class="wholemiddle">
				<div class="middletopImage" id="MiddleTopMainMap"></div>
				<div id="midbotleftBox">
					<div class="msgTitle">
						<span class="msgMainTitle">拖网统计</span>
						<router-link to="/trawlSA">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="/trawlSA">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<el-row>
							<el-col :span="24">
								<middleBottomLREcharts v-bind:echartId="'middleBottomLEchartsId'" :OptionData="middleBottomLOption"></middleBottomLREcharts>
							</el-col>
						</el-row>
					</div>
				</div>
				<div id="midbotrightBox">


					<div class="msgTitle">
						<span class="msgMainTitle">张网统计</span>
						<router-link to="/stowSA">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="/stowSA">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<el-row>
							<el-col :span="24">
								<middleBottomLREcharts v-bind:echartId="'middleBottomREchartsId'" :OptionData="middleBottomROption"></middleBottomLREcharts>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
			<!--个人信息中心-->
			<div class="userInfo">
				<el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <img class="user_logo" src="../assets/img/海天.jpg">
            </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
						<el-dropdown-item command="loginOut">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<!--the whole right model-->
			<div class="wholeright">
				<div id="righttopBox">
					<div class="msgTitle">
						<span class="msgMainTitle">渔船作业统计</span>
						<router-link to="/workModeSta">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="/workModeSta">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<rightBottomEcharts v-bind:echartId="'rightTopEchartsId'" :OptionData="rightTopOption"></rightBottomEcharts>
					</div>
				</div>
				<div id="rightmidBox">
					<div class="msgTitle">
						<span class="msgMainTitle">非法作业统计</span>
						<router-link to="/workModeSta">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="/workModeSta">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<rightBottomEcharts v-bind:echartId="'rightMiddleEchartsId'" :OptionData="rightMiddleOption"></rightBottomEcharts>
					</div>
				</div>
				<div id="rightbotBox">
					<div class="msgTitle">
						<span class="msgMainTitle">刺网统计</span>
						<router-link to="gillSA">
							<span class="moreText">详情</span>
						</router-link>
						<router-link to="gillSA">
							<img class="moreIco" src="../assets/moreICO.png" alt="更多">
						</router-link>
					</div>
					<div class="msgContent">
						<el-row>
							<el-col :span="24">
								<rightBottomEcharts v-bind:echartId="'rightBottomEchartsId'" :OptionData="rightBottomOption"></rightBottomEcharts>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>

			<!-- the last bottom Nav-->
			<div class="lastbottom">
				<ul>
					<li>
						<router-link to="/mapShow" class="lastbottomtext">地图显示</router-link>&nbsp;&nbsp;
						<router-link to="/passPort" class="lastbottomtext">渔船出入港</router-link>&nbsp;&nbsp;
						<router-link to="/workModeSta" class="lastbottomtext">渔船作业方式统计及查询</router-link>&nbsp;&nbsp;
						<router-link to="#" class="lastbottomtext">船舶明细</router-link>&nbsp;&nbsp;
						<router-link to="/seineSA" class="lastbottomtext">围网作业方式统计及分析</router-link>&nbsp;&nbsp;
						<router-link to="/trawlSA" class="lastbottomtext">拖网作业方式统计及分析</router-link>&nbsp;&nbsp;
						<router-link to="/gillSA" class="lastbottomtext">刺网作业方式统计及分析</router-link>&nbsp;&nbsp;
						<router-link to="/stowSA" class="lastbottomtext">张网作业方式统计及分析</router-link>&nbsp;&nbsp;
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
	// the common line echarts vue including the middle-bottom-left and the middle-bottom-right echarts
	import middleBottomLREcharts from "@/components/common/MiddleBottomEchartsUtils";
	// the common echarts vue including the right-top,right-middle and right-bottom echarts
	import rightBottomEcharts from "@/components/common/RightEchartsUtils";

	import BottomNav from "@/components/common/BottomNav";

	export default {
		name: "WelCome",
		data() {
			return {
				tipMsg:{
					thisPageName: '渔船作业方式智能识别系统',
					goBack: '后退',
					goHome: '主页',
				},
				userName: '中电36所', //默认登录用户名

				//fishing number out or in the harbour
				LoutNum: "",
				LinNum: "",
				// no-local fishing number out or in the harbour
				NLoutNum: "",
				NLinNum: "",
				// the vessel normal fishing number and the illegel fishing number
				normalFishingNum: "",
				illegelFishingNum: "",

				shipLocationArr: [], //渔船位置数组
				//define
				leftMiddleOption: {
					grid: {
						left: "0%",
						top: "0%",
						width: "100%",
						height: "100%",
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						right: "1%",
						top: "10%",
						data: ["非法作业", "正常作业"],
						textStyle: {
							color: "default",
							fontSize:"90%"
						}
					},
					series: [{
						name: "占比情况",
						type: "pie",
						radius: "65%",
						center: ["40%", "45%"],
						label:{
							fontSize:"90%",
						},
						labelLine:{
							length:8,
							length2:6
						},
						data: [
							// { value: 890, name: "正常作业" },
							// { value: 200, name: "非法作业" }// 请求后台
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}],
					color: ["#5b9bff", "#ed7d31"]
				},
				leftBottomOption: {
					color: ["#f44"],
					grid: {
						left: "15%",
						top: "10%",
						width: "75%",
						height: "75%",
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					xAxis: [{
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月"
						],
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							lineStyle: {
								color: "#5bbdff"
							}
						}
					}],
					yAxis: [{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#5bbdff"
							}
						},
						scale: true,
						axisLabel: {
							margin: 5
						}
					}],
					series: [{
						name: "每月数量",
						type: "line",
						smooth: true,
						// data: [995, 566, 744, 348, 554, 736, 245, 446, 746, 425, 547, 356],
						data: [],
						lineStyle: {
							color: {
								type: "radial",
								x: 0.5,
								y: 0.5,
								r: 0.7,
								colorStops: [{
									offset: 0,
									color: "red" // 0% 处的颜色
								},
									{
										offset: 1,
										color: "blue" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						},
						areaStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: "red" // 0% 处的颜色
								},
									{
										offset: 1,
										color: "blue" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						}
					}]
				},
				middleBottomLOption: {
					color: ["#5b9bff", "#ed7d31"],
					grid: {
						left: "15%",
						top: "10%",
						width: "75%",
						height: "75%",
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					xAxis: [{
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月"
						],
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							lineStyle: {
								color: "#5b9bff"
							}
						}
					}],
					yAxis: [{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#5b9bff"
							}
						},
						scale: true,
						axisLabel: {
							margin: 5
						}
					}],
					series: [{
						name: "每月数量",
						type: "line",
						smooth: true,
						// data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356],
						data: [],
						lineStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: "white" // 0% 处的颜色
								},
									{
										offset: 1,
										color: "red" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						}
					}]
				},
				middleBottomROption: {
					color: ["#f44"],
					grid: {
						left: "15%",
						top: "10%",
						width: "75%",
						height: "75%",
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					xAxis: [{
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月"
						],
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							lineStyle: {
								color: "#5bbdff"
							}
						}
					}],
					yAxis: [{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#5bbdff"
							}
						},
						scale: true,
						axisLabel: {
							margin: 5
						}
					}],
					series: [{
						name: "每月数量",
						type: "line",
						smooth: true,
						// data: [895, 566, 744, 348, 554, 736, 245, 446, 746, 425, 547, 356],
						data: [],
						lineStyle: {
							color: {
								type: "radial",
								x: 0.5,
								y: 0.5,
								r: 0.7,
								colorStops: [{
									offset: 0,
									color: "red" // 0% 处的颜色
								},
									{
										offset: 1,
										color: "blue" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						}
					}]
				},
				rightTopOption: {
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "60%",
						top: "10%",
						data: ["围网","拖网", "张网", "刺网", "其它"],
            itemWidth:20,
            itemHeight:12,
						textStyle: {
							color: "default",
							fontSize:"100%",
						}
					},
					series: [{
						name: "统计分析",
						type: "pie",
						center: ["30%", "50%"],
						radius: ["35%", "70%"],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: "center"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: "100%",
									fontWeight: "bold"
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [
							// { value: 335, name: "拖网" }, 请求后台数据
							// { value: 310, name: "刺网" },
							// { value: 234, name: "围网" },
							// { value: 135, name: "其它" }
						]
					}],
					color: ["#6bc1ff", "#3cedbc", "#eeb110", "#ffd989",
						"#eea5d1"]
				},
				rightMiddleOption: {
					grid: {
						left: "1%",
						top: "10%",
						width: "75%",
						height: "100%",
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "60%",
						top: "10%",
						data: ["围网","拖网", "张网","刺网", "其它" ],
						textStyle: {
							color: "default",
							fontSize:"100%"
						}
					},
					series: [{
						name: "占比情况",
						type: "pie",
						radius: "65%",
						center: ["34%", "52%"],
						data: [
							// { value: 890, name: "拖网" },
							// { value: 123, name: "张网" },
							// { value: 200, name: "围网" }
						],
						labelLine:{
							length:8,
							length2:6,
						},
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"

							}
						}
					}],
					color: ["#62c1ff", "#eea5d1", "#d5fdff","#8ceed9",
						"#beb1ff"]
				},
				rightBottomOption: {
					color: ["#f44"],
					grid: {
						left: "15%",
						top: "10%",
						width: "75%",
						height: "75%",
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow"
						}
					},
					xAxis: [{
						type: "category",
						data: [
							"1月",
							"2月",
							"3月",
							"4月",
							"5月",
							"6月",
							"7月",
							"8月",
							"9月",
							"10月",
							"11月",
							"12月"
						],
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							lineStyle: {
								color: "#5bbdff"
							}
						}
					}],
					yAxis: [{
						type: "value",
						axisLine: {
							lineStyle: {
								color: "#5bbdff"
							}
						},
						scale: true,
						axisLabel: {
							margin: 5
						}
					}],
					series: [{
						name: "每月数量",
						type: "line",
						smooth: true,
						// data: [995, 566, 744, 348, 554, 736, 245, 446, 746, 425, 547, 356],
						data: [],
						lineStyle: {
							color: {
								type: "radial",
								x: 0.5,
								y: 0.5,
								r: 0.7,
								colorStops: [{
									offset: 0,
									color: "red" // 0% 处的颜色
								},
									{
										offset: 1,
										color: "blue" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						},
						areaStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: "red" // 0% 处的颜色
								},
									{
										offset: 1,
										color: "blue" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						}
					}]
				}
			};
		},
		components: {
			middleBottomLREcharts,
			rightBottomEcharts,
			BottomNav,
		},

		computed: {
			username() {
				let username = sessionStorage.getItem('ms_username');
				return username ? username : this.userName;
			}
		},
		mounted() {
			//the draw left-bottom echarts function
			this.drawLeftMiddleCharts();
			/*var leftbottomChart = this.$echarts.init(
			  document.getElementById("leftbottomEchartId")
			);
			leftbottomChart.setOption(this.leftBottomOption);
			window.addEventListener("resize", function() {
			  leftbottomChart.resize();
			});*/

			/* 向后台请求数据 */

			this.initPortData() // 出港入港数量
			this.initLeftBottomEchartsOption(); //围网
			this.initMiddleBottomLEchartsOption(); //拖网
			this.initMiddleBottomREchartsOption(); //张网
			this.initRightTopEchartsOption(); //作业方式统计
			this.initRightMiddleEchartsOption(); //非法作业统计
			this.initRightBottomEchartsOption(); //刺网
			this.baiduMap(); //初始化地图
			this.getShipLocationArr(); //获取后台渔船位置数据并标注
		},
		methods: {
			refreshPage() {
				this.$router.go(0);
			},

			goBack() {
				this.$router.back(-1);
			},

			goHome() {
				this.$router.push('/welcome')
			},

			/*获取当前日期yyyy-MM-dd HH:mm:ss*/
			getFormatTime(date) {
				// var date = new Date();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentDate = (date.getFullYear() - 1) + "-" + month + "-" + strDate +
					" " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
				return currentDate;
			},

			//the function of draw left-bottom echarts 左下角
			drawLeftMiddleCharts() {
				var leftmiddleChart = this.$echarts.init(
					document.getElementById("leftmiddleEchartId")
				);
				leftmiddleChart.setOption(this.leftMiddleOption);
				//数据没有加载出来显示加载动画,样式添加todo
				leftmiddleChart.showLoading();
				//获取数据
				this.axios({
					method: 'post',
					url: '/getIllegal',
					data: {
						dateTime: ""
					}
				}).then(res => {
					// setTimeout(()=>{  //未来让加载动画效果明显,这里加入了setTimeout,实现2s延时
					this.normalFishingNum = res.data.normal;
					this.illegelFishingNum = res.data.illegal;
					leftmiddleChart.hideLoading(); //加载出来隐藏加载动画
					leftmiddleChart.setOption({ //数据添加
						series: [{
							data: [{
								value: res.data.normal,
								name: "正常作业"
							},
								{
									value: res.data.illegal,
									name: "非法作业"
								}
							]
						}]
					})
					// }, 1000 )
				})

				window.addEventListener("resize", function() {
					leftmiddleChart.resize();
				});
			},

			/*出入港口后台数据 */
			initPortData() {
				// this.axios.get('/getPortTraffic').then((response) => {
				//   this.LinNum = response.data.in[0];
				//   this.LoutNum = response.data.out[0];
				//   this.NLinNum = response.data.in[1];
				//   this.NLoutNum = response.data.out[1];
				// }).catch((response) => {
				//   console.log(response)
				// })
				this.LinNum = 376;
				this.LoutNum = 547;
				this.NLinNum = 213;
				this.NLoutNum = 189;
			},

			/*围网后台数据 */
			initLeftBottomEchartsOption() {
				var date = new Date();
				var year = date.getFullYear();
				console.log(year)
				var leftBottomEChart = this.$echarts.init(
					document.getElementById("leftBottomEchartsId")
				);
				leftBottomEChart.setOption(this.leftBottomOption);
				//数据没有加载出来显示加载动画,样式添加todo
				leftBottomEChart.showLoading();
				this.axios({
					method: 'post',
					url: '/getDataByMonthOrDay',
					data: {
						jobType: "围网",
						startTime: year + "-01-01 00:00:00",
						endTime: year + "-12-31 23:59:59",
						byDay: 0,
					}
				}).then(res => {
					leftBottomEChart.hideLoading(); //加载出来隐藏加载动画
					leftBottomEChart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})

				})
			},

			/*拖网后台数据 */
			initMiddleBottomLEchartsOption() {
				var date = new Date();
				var year = date.getFullYear();
				var middleBottomLeftEChart = this.$echarts.init(
					document.getElementById("middleBottomLEchartsId")
				);
				middleBottomLeftEChart.setOption(this.middleBottomLOption);
				//数据没有加载出来显示加载动画,样式添加todo
				middleBottomLeftEChart.showLoading();
				this.axios({
					method: 'post',
					url: '/getDataByMonthOrDay',
					data: {
						jobType: "拖网",
						startTime: year + "-01-01 00:00:00",
						endTime: year + "-12-31 23:59:59",
						byDay: 0,
					}
				}).then(res => {
					middleBottomLeftEChart.hideLoading(); //加载出来隐藏加载动画
					middleBottomLeftEChart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})

				})
			},

			/*张网后台数据 */
			initMiddleBottomREchartsOption() {
				var date = new Date();
				var year = date.getFullYear();
				var middleBottomRightEChart = this.$echarts.init(
					document.getElementById("middleBottomREchartsId")
				);
				middleBottomRightEChart.setOption(this.middleBottomROption);
				//数据没有加载出来显示加载动画,样式添加todo
				middleBottomRightEChart.showLoading();
				this.axios({
					method: 'post',
					url: '/getDataByMonthOrDay',
					data: {
						jobType: "张网",
						startTime: year + "-01-01 00:00:00",
						endTime: year + "-12-31 23:59:59",
						byDay: 0,
					}
				}).then(res => {
					middleBottomRightEChart.hideLoading(); //加载出来隐藏加载动画
					middleBottomRightEChart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})

				})
			},

			/*作业方式统计后台数据 */
			initRightTopEchartsOption() {
				var rightTopEChart = this.$echarts.init(
					document.getElementById("rightTopEchartsId")
				);
				rightTopEChart.setOption(this.rightTopOption);
				//数据没有加载出来显示加载动画,样式添加todo
				rightTopEChart.showLoading();
				this.axios({
					method: 'post',
					url: '/statisShipJob',
					data: {
						dateTime: "",
						idtfyFlag: "",
					}
				}).then(res => {
					rightTopEChart.hideLoading(); //加载出来隐藏加载动画
					rightTopEChart.setOption({ //数据添加
						series: [{
							data: [
								{
									value: res.data.weiWang,
									name: "围网"
								},
								{
									value: res.data.tuoWang,
									name: "拖网"
								},
								{
									value: res.data.ciWang,
									name: "刺网"
								},
								{
									value: res.data.zhangWang,
									name: "张网"
								},
								{
									value: res.data.other,
									name: "其它"
								}
							]
						}]
					})

				})
			},

			/*非法作业方式统计后台数据 */
			initRightMiddleEchartsOption() {
				var rightMiddleEChart = this.$echarts.init(
					document.getElementById("rightMiddleEchartsId")
				);
				rightMiddleEChart.setOption(this.rightMiddleOption);
				//数据没有加载出来显示加载动画,样式添加todo
				rightMiddleEChart.showLoading();
				this.axios({
					method: 'post',
					url: '/statisShipJob',
					data: {
						dateTime: "",
						idtfyFlag: 0,
					}
				}).then(res => {
					console.log(res.data);
					rightMiddleEChart.hideLoading(); //加载出来隐藏加载动画
					rightMiddleEChart.setOption({ //数据添加
						series: [{
							data: [
								{
									value: res.data.weiWang,
									name: "围网"
								},
								{
									value: res.data.tuoWang,
									name: "拖网"
								},
								{
									value: res.data.ciWang,
									name: "刺网"
								},
								{
									value: res.data.zhangWang,
									name: "张网"
								},
								{
									value: res.data.other,
									name: "其它"
								}
							]
						}]
					})

				})
			},

			/*刺网后台数据 */
			initRightBottomEchartsOption() {
				var date = new Date();
				var year = date.getFullYear();
				var rightBottomEChart = this.$echarts.init(
					document.getElementById("rightBottomEchartsId")
				);
				rightBottomEChart.setOption(this.rightBottomOption);
				//数据没有加载出来显示加载动画,样式添加todo
				rightBottomEChart.showLoading();
				this.axios({
					method: 'post',
					url: '/getDataByMonthOrDay',
					data: {
						jobType: "刺网",
						startTime: year + "-01-01 00:00:00",
						endTime: year + "-12-31 23:59:59",
						byDay: 0,
					}
				}).then(res => {
					rightBottomEChart.hideLoading(); //加载出来隐藏加载动画
					rightBottomEChart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})

				})
			},


			/*首页中间的地图显示*/
			baiduMap() {
				//创建实例
				var map = new BMap.Map("MiddleTopMainMap", {
					enableMapClick: false
				});
				//创建坐标点
				var point = new BMap.Point(122.20, 30.00);
				map.addControl(new BMap.MapTypeControl({
					mapTypes: [
						BMAP_NORMAL_MAP,
						BMAP_SATELLITE_MAP,
						BMAP_HYBRID_MAP
					]
				}));
				// map.addControl(new BMap.NavigationControl()); 缩放比例尺

				//初始化实例，传入坐标点并设置地图级别
				map.centerAndZoom(point, 12);
				map.enableScrollWheelZoom(true);
				window.map = map; //将map变量存储在全局
				map.setMapStyle({
					style: 'midnight'
				});

			},

			/* 从后端获取渔船位置数据 放入shipArr*/
			getShipLocationArr() {
				var date = new Date();
				var now = this.getFormatTime(date);
				date.setTime(date.getTime() - 1000 * 60 * 2); // 2分钟前
				var before = this.getFormatTime(date);
				console.log(now)
				console.log(before)
				this.axios({
					method: 'post',
					url: '/queryTrail',
					data: {
						shipId: "",
						startTime: before,
						endTime: now,
						jobTypes: [],
						businessTypes: [],

					}
				}).then(res => {

					this.shipLocationArr = res.data.tAcqDatas;
					console.log("渔船数量" + this.shipLocationArr.length)
					// console.log(this.shipLocationArr)
					this.addShipMarker();

				}).catch((response) => {
					console.log(response)
				})
			},

			addShipMarker() {

				var shipPoints = new Array(); //定义数组标注经纬信息
				for (var i = 0; i < this.shipLocationArr.length; i++) { //遍历
					shipPoints[i] = new window.BMap.Point(this.shipLocationArr[i].longitude, this.shipLocationArr[i].latitude);
				}

				/*新方法:使用海量点*/
				if (document.createElement('canvas').getContext) { // 判断当前浏览器是否支持绘制海量点
					var _this = this;
					var options = {
						size: BMAP_POINT_SIZE_NORMAL,
						// shape: BMAP_POINT_SHAPE_STAR,
						color: '#2fed19'
					}
					var pointCollection = new BMap.PointCollection(shipPoints, options); // 初始化PointCollection
					pointCollection.addEventListener('click', function(e) {
						// 循环查出值
						for (var i = 0; i < _this.shipLocationArr.length; i++) {
							if (_this.shipLocationArr[i].longitude == e.point.lng && _this.shipLocationArr[i].latitude == e.point
								.lat) { // 经度==点击的,维度
								break;
							}
						}
						var targetPoint = new BMap.Point(e.point.lng, e.point.lat);

						var opts = {
							width: 300, // 信息窗口宽度
							height: 70, // 信息窗口高度
							title: "渔船信息", // 信息窗口标题
							//enableMessage: false,// 设置允许信息窗发送短息
						}
						var Content = "<div style='width:300px;'>" +
							"<p>渔船id：" + _this.shipLocationArr[i].shipId + "</p>" +
							"<p>渔船编号：" + _this.shipLocationArr[i].ship.shipNo + "</p>" +
							"<p>渔船名：" + _this.shipLocationArr[i].ship.shipName + "</p>" +
							"<p>渔船作业类型：" + _this.shipLocationArr[i].ship.jobType + "</p>" +
							"<p>渔船业务类型：" + _this.shipLocationArr[i].ship.businessType + "</p>" +
							"<p>航行时速(节)：" + _this.shipLocationArr[i].speed + "</p>" +
							"<p>定位时间：" + _this.shipLocationArr[i].acqTime + "</p>" +
							"<p>地址经度：" + _this.shipLocationArr[i].longitude + "</p>" +
							"<p>地址纬度：" + _this.shipLocationArr[i].latitude + "</p>" +
							"</div>";
						var infoWindow = new BMap.InfoWindow(Content); // 创建信息窗口对象
						map.openInfoWindow(infoWindow, targetPoint); //开启信息窗口
					});
					map.addOverlay(pointCollection); // 添加Overlay
				} else {
					alert('请在chrome、safari、IE8+以上浏览器查看本示例');
				}
			},

			/*用户中心/退出*/
			handleCommand(command) {
				if (command == 'loginOut') {
					sessionStorage.removeItem('ms_username')
					this.$router.push('/');
				} else if (command == 'userCenter') {
					this.$message({
						message: '啊哈，用户中心还没实现',
						type: 'warning'
					});
				}
			}



		}
	};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/* #1 底层背景样式，窗口自适应 */
	/* 底层背景 */
	#backGround {
		background-image: url("../assets/bg.png");
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
		position: absolute;
		background-repeat: no-repeat;
		/* 底层背景层 */
		z-index: 1;
		overflow: hidden;
	}
	/* #2 主要内容样式，窗口自适应 */
	/* 主要内容 */
	#main-content {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		/* 内容层 */
		z-index: 80;
	}

	/* #2.1 中心标题样式 */
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

	/* #2.2 左侧栏目 */
	/*the whole div style*/
	.wholeleft {
		position: absolute;
		width: 23%;
		height: 86%;
		top: 9%;
		left: 3%;
		/* background-color 测试用 */
		/*background-color: #ff5234;*/
	}
	/*the left-top background style*/
	#lefttopBox{
		position: absolute;
		height: 32%;
		width: 96%;
		top: 1%;
		left: 2%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	/*the left-middle background style*/
	#leftmidBox{
		position: absolute;
		height: 32%;
		width: 96%;
		top: 33%;
		left: 2%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	#leftbotBox{
		position: absolute;
		height: 32%;
		width: 96%;
		top: 66%;
		left: 2%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.msgTitle{
		position: absolute;
		height: 10%;
		width: 90%;
		top: 2%;
		left: 7%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
	}

	.msgMainTitle {
		position: absolute;
		left: 0%;
		width: 60%;
		top: 6%;
		height: 94%;
		font-size: 1vw;
		color: #f7f7f7;
		text-align: left;
		/* background-color 测试用 */
		/*background-color: #276dff;*/
		-webkit-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
	}

	/*the "more" and the ICON style.same with other title*/
	.moreText {
		position: absolute;
		left: 73%;
		width: 20%;
		top: 6%;
		height: 94%;
		font-size: 1vw;
		color: #f7f7f7;
		text-align: left;
		/* background-color 测试用 */
		/*background-color: #276dff;*/
	}

	.moreIco {
		position: absolute;
		left: 85%;
		width: 4%;
		top: 18%;
		height: 45%;
		text-align: left;
		background-image: url("../assets/moreICO.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		/* background-color 测试用 */
		/*background-color: #276dff;*/
	}

	.msgContent{
		position: absolute;
		height: 78%;
		width: 94%;
		top: 15%;
		left: 2.5%;
		/* background-color 测试用 */
		/*background-color: rgba(255, 36, 24, 0.4);*/
	}

	/*左上表格的样式*/
	.leftTopTable {
		position: absolute;
		left: 4%;
		top: 2.5%;
		width: 92%;
		height: 95%;
		opacity: 1;
		border: #55a6ee solid 0.1em;
	}

	.leftTopTable td {
		border: #55a6ee solid 0.1em;
		color: #f7f7f7;
	}

	.leftmiddleEchart {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0%;
		top: 0%;
		padding: 0;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
	}

	/* #2.3 中部栏目 */
	/*the whole middle div style*/
	.wholemiddle {
		position: absolute;
		width: 46%;
		height: 86%;
		top: 9%;
		left: 27%;
		/* background-color 测试用 */
		/*background-color: rgba(42, 255, 77, 0.21);*/
	}

	.middletopImage {
		/*float: left;*/
		position: absolute;
		top:1%;
		left: 2%;
		width: 96%;
		height: 63%;
	}
	/* 地图 infowindow 边框圆角 */
	.middletopImage .BMap_pop div:nth-child(1) div{
		border-radius:12px 0 0 0;
	}
	.middletopImage .BMap_pop div:nth-child(3) div{
		border-radius:0 12px 0 0 ;
	}
	.middletopImage .BMap_pop div:nth-child(5) div{
		border-radius:0 0 0 12px;
	}
	.middletopImage .BMap_pop div:nth-child(7) div {
		border-radius:0 0 12px 0;
	}

	#midbotleftBox{
		position: absolute;
		height: 32%;
		width: 48%;
		top: 66%;
		left: 1%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	#midbotrightBox{
		position: absolute;
		height: 32%;
		width: 48%;
		top: 66%;
		left: 51%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}


	/* #2.4 右侧栏目 */
	/*the whole right div style*/
	.wholeright {
		position: absolute;
		width: 23%;
		height: 86%;
		top: 9%;
		left: 74%;
		/* background-color 测试用 */
		/*background-color: #ff41fd;*/
	}

	#righttopBox{
		position: absolute;
		height: 32%;
		width: 96%;
		top: 1%;
		left: 2%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	#rightmidBox{
		position: absolute;
		height: 32%;
		width: 96%;
		top: 33%;
		left: 2%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	#rightbotBox{
		position: absolute;
		height: 32%;
		width: 96%;
		top: 66%;
		left: 2%;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
		background-image:url("../assets/msgBg2.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	/* #2.5 右上角个人信息中心栏目 */
	#main-content .userInfo{
		position:absolute;
		right:2.8vw;
		width:5vh;
		margin-top: 3vh;
		height: 5vh;
		/*background-color: #a2cdff;*/
	}
	#main-content .el-dropdown-link {
		display: inline-block;
		width:5vh;
		height:5vh;
		cursor: pointer;
		color: #fbffa4;
	}
	#main-content .user_logo{
		position: absolute;
		left:0vw;
		width: 4.6vh;
		height: 4.6vh;
		top:0.6vh;
		border-radius: 10%;
	}

	/* #2.6 底部栏目 */
	/*the last bottom image and text style*/
	.lastbottom {
		align-content: center;
		background-image: url("../assets/lastbottomBg.png");
		background-size: 100% 100%;
		position: absolute;
		top:94%;
		left: 10%;
		width: 80%;
		height: 3%;
		opacity: 0.66;
	}

	.lastbottomtext {
		height: 100%;
		font-size: 1vw;
		color: #f7f7f7;
		text-decoration: none;
	}
</style>
