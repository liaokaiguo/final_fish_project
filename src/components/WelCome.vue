<template>
	<div>
		<!-- 背景 -->
		<div id="backGround"></div>
		<!--主要内容-->
		<div id="main-content">
			<!-- 主标题 -->
			<MainTitle v-bind:titleName="titleName" v-bind:tip="tipMsg.pageName"></MainTitle>
			<!-- 右上角导航按钮 -->
			<NavigaIcon></NavigaIcon>
			<!--个人信息中心-->
			<UserInfo></UserInfo>

			<!--主要内容分为3栏-->
			<!--左模块-->
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
						<table id="leftTopTable">
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
						<div id="L_M_EchartID" class="myEchart"></div>
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
						<div id="L_B_EchartID" class="myEchart"></div>
					</div>
				</div>
			</div>
			<!--中模块-->
			<div class="wholemiddle">
				<!--上方地图-->
				<div class="middletopImage" id="MiddleTopMainMap"></div>
				<!--下方两个Echarts-->
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
						<div id="M_B_L_EchartID" class="myEchart"></div>
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
						<div id="M_B_R_EchartID" class="myEchart"></div>
					</div>
				</div>
			</div>
			<!--右模块-->
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
						<div id="R_T_EchartID" class="myEchart"></div>
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
						<div id="R_M_EchartID" class="myEchart"></div>
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
						<div id="R_B_EchartID" class="myEchart"></div>
					</div>
				</div>
			</div>

			<!--底部导航栏-->
			<BottomNav></BottomNav>
		</div>
	</div>

</template>

<script>
	import MainTitle from "@/components/common/MainTitle";
	import BottomNav from "@/components/common/BottomNav";
	import NavigaIcon from "@/components/common/NavigaIcon";
	import UserInfo from "@/components/common/UserInfo";

	export default {
		name: "WelCome",
		data() {
			return {
				titleName: '渔船作业方式智能识别系统', //标题名字
				tipMsg:{
					pageName: '渔船作业方式智能识别系统', //用于鼠标悬停提示
				},
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
						right: "8%",
						top: "10%",
						data: ["非法作业", "正常作业"],
						textStyle: {
							color: "default",
							fontSize:"120%"
						}
					},
					series: [{
						name: "占比情况",
						type: "pie",
						radius: "65%",
						center: ["30%", "55%"],
						label: {
							normal: {
								show: false,
								position: "center"
							},
							emphasis: {
								show: false,
								textStyle: {
									fontSize: "140%",
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
						minInterval:10,
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
						minInterval:10,
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
						minInterval:10,
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
						left: "70%",
						top: "8%",
						data: ["围网","拖网", "张网", "刺网", "其它"],
						// itemWidth:20,
						// itemHeight:14,
						// itemGap:12,
						textStyle: {
							color: "default",
							fontSize:"120%",
						}
					},
					series: [{
						name: "统计分析",
						type: "pie",
						center: ["38%", "50%"],
						radius: ["35%", "75%"],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: "center"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: "140%",
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
						left: "70%",
						top: "8%",
						data: ["围网","拖网", "张网","刺网", "其它" ],
						textStyle: {
							color: "default",
							fontSize:"120%"
						}
					},
					series: [{
						name: "占比情况",
						type: "pie",
						radius: "75%",
						center: ["38%", "55%"],
						data: [
							// { value: 890, name: "拖网" },
							// { value: 123, name: "张网" },
							// { value: 200, name: "围网" }
						],
						label:{
							show:false
						}
					}],
					color: ["#6bc1ff", "#3cedbc", "#eeb110", "#ffd989",
						"#eea5d1"]
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
						minInterval:10,
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
			MainTitle,
			UserInfo,
			NavigaIcon,
			BottomNav,
		},
		computed: {

		},
		mounted() {
			this.initPortData();// 出港入港数量
			this.initWorkProportionData(); // 作业占比数据
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

			/*作业占比数据*/
			initWorkProportionData() {
				var leftmiddleEchart = this.$echarts.init(
					document.getElementById("L_M_EchartID")
				);
				leftmiddleEchart.setOption(this.leftMiddleOption);
				//数据没有加载出来显示加载动画,样式添加todo
				leftmiddleEchart.showLoading();
				//获取数据
				this.axios({
					method: 'post',
					url: '/getIllegal',
					data: {
						dateTime: ""
					}
				}).then(res => {
					this.normalFishingNum = res.data.normal;
					this.illegelFishingNum = res.data.illegal;
					leftmiddleEchart.hideLoading(); //加载出来隐藏加载动画
					leftmiddleEchart.setOption({ //数据添加
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
				});
				window.addEventListener("resize", function() {
					leftmiddleEchart.resize();
				});
			},

			/*围网后台数据 */
			initLeftBottomEchartsOption() {
				//获得当前年份
				var date = new Date();
				var year = date.getFullYear();
				var leftbottomEchart = this.$echarts.init(
					document.getElementById("L_B_EchartID")
				);
				leftbottomEchart.setOption(this.leftBottomOption);
				//数据没有加载出来显示加载动画,样式添加todo
				leftbottomEchart.showLoading();
				//获取数据
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
					leftbottomEchart.hideLoading(); //加载出来隐藏加载动画
					leftbottomEchart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})
				});
				window.addEventListener("resize", function() {
					leftbottomEchart.resize();
				});
			},

			/*拖网后台数据 */
			initMiddleBottomLEchartsOption() {
				//获得当前年份
				var date = new Date();
				var year = date.getFullYear();
				var middleBottomLeftEchart = this.$echarts.init(
					document.getElementById("M_B_L_EchartID")
				);
				middleBottomLeftEchart.setOption(this.middleBottomLOption);
				//数据没有加载出来显示加载动画,样式添加todo
				middleBottomLeftEchart.showLoading();
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
					middleBottomLeftEchart.hideLoading(); //加载出来隐藏加载动画
					middleBottomLeftEchart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})
				});
				window.addEventListener("resize", function() {
					middleBottomLeftEchart.resize();
				});
			},

			/*张网后台数据 */
			initMiddleBottomREchartsOption() {
				var date = new Date();
				var year = date.getFullYear();
				var middleBottomRightEchart = this.$echarts.init(
					document.getElementById("M_B_R_EchartID")
				);
				middleBottomRightEchart.setOption(this.middleBottomROption);
				//数据没有加载出来显示加载动画,样式添加todo
				middleBottomRightEchart.showLoading();
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
					middleBottomRightEchart.hideLoading(); //加载出来隐藏加载动画
					middleBottomRightEchart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})
				});
				window.addEventListener("resize", function() {
					middleBottomRightEchart.resize();
				});
			},

			/*作业方式统计后台数据 */
			initRightTopEchartsOption() {
				var rightTopEchart = this.$echarts.init(
					document.getElementById("R_T_EchartID")
				);
				rightTopEchart.setOption(this.rightTopOption);
				//数据没有加载出来显示加载动画,样式添加todo
				rightTopEchart.showLoading();
				this.axios({
					method: 'post',
					url: '/statisShipJob',
					data: {
						dateTime: "",
						idtfyFlag: "",
					}
				}).then(res => {
					rightTopEchart.hideLoading(); //加载出来隐藏加载动画
					rightTopEchart.setOption({ //数据添加
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
				});
				window.addEventListener("resize", function() {
					rightTopEchart.resize();
				});
			},

			/*非法作业方式统计后台数据 */
			initRightMiddleEchartsOption() {
				var rightMiddleEchart = this.$echarts.init(
					document.getElementById("R_M_EchartID")
				);
				rightMiddleEchart.setOption(this.rightMiddleOption);
				//数据没有加载出来显示加载动画,样式添加todo
				rightMiddleEchart.showLoading();
				this.axios({
					method: 'post',
					url: '/statisShipJob',
					data: {
						dateTime: "",
						idtfyFlag: 0,
					}
				}).then(res => {
					rightMiddleEchart.hideLoading(); //加载出来隐藏加载动画
					rightMiddleEchart.setOption({ //数据添加
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
				});
				window.addEventListener("resize", function() {
					rightMiddleEchart.resize();
				});
			},

			/*刺网后台数据 */
			initRightBottomEchartsOption() {
				var date = new Date();
				var year = date.getFullYear();
				var rightBottomEchart = this.$echarts.init(
					document.getElementById("R_B_EchartID")
				);
				rightBottomEchart.setOption(this.rightBottomOption);
				//数据没有加载出来显示加载动画,样式添加todo
				rightBottomEchart.showLoading();
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
					rightBottomEchart.hideLoading(); //加载出来隐藏加载动画
					rightBottomEchart.setOption({ //数据添加
						series: [{
							data: res.data.total
						}]
					})
				});
				window.addEventListener("resize", function() {
					rightBottomEchart.resize();
				});
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
				// console.log("现在：" + now)
				// console.log("2分钟前：" + before)
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
					// console.log("渔船数量：" + this.shipLocationArr.length)
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
	#leftTopTable {
		position: absolute;
		left: 4%;
		top: 2.5%;
		width: 92%;
		height: 95%;
		opacity: 1;
		border: #55a6ee solid 0.1em;
	}

	#leftTopTable td {
		border: #55a6ee solid 0.1em;
		color: #f7f7f7;
	}

	.myEchart {
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
		border: 1.5px solid #22a9ff;
		top:1%;
		left: 2%;
		width: 96%;
		height: 63%;
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

	/* #2.6 底部栏目 */

</style>

<style>
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
</style>
