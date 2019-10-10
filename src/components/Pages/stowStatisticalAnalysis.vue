<template>
	<!-- 张网作业方式统计分析 stow net statistic and analysis -->
	<div>
		<!-- 背景 -->
		<div id="backGround">
			<img class="bgimg" src="../../assets/background_high.png"/>
		</div>

		<!-- 主要内容 -->
		<div id="main-content">
			<!-- 主标题 -->
			<div class="mainTitle">
				<p class="title" @click="refreshPage" v-bind:title="thisPageTips">张网作业方式统计分析</p>
			</div>
			<!-- 右上角导航按钮 -->
			<div class="navigaIcon" id="navigaIcon">
				<img class="goBack" src="../../assets/rebackLastIcon.png" alt="后退" v-on:click="goBack"
				     v-bind:title="backTips">
				<img class="goHome" src="../../assets/rebackMainIcon.png" alt="主页" v-on:click="goHome"
				     v-bind:title="homeTips">
			</div>
			<!-- 菜单栏 -->
			<div class="setMenu">
				<!-- 选择时间菜单 -->
				<div class="selectDT">
					<form method="post">
						日期：
						<input type="date" v-model="startDate" v-bind:title="startDateTips"/>
						&nbsp;到&nbsp;
						<input type="date" v-model="endDate" v-bind:title="endDateTips"/>
					</form>
				</div>
				<!-- 菜单按钮 -->
				<div class="menuButtons">
					<div class="button">
						<button @click="search" v-bind:title="checkTips">查询</button>
						<button @click="save" v-bind:title="saveTips">保存</button>
						<button @click="reset" v-bind:title="resetTips">重置</button>
					</div>
				</div>
			</div>


			<!-- 左侧透明导航栏 -->
			<div id="leftNavigaList" >
				<ul>
					<li class="leftNavTitle">目&nbsp;&nbsp;&nbsp;&nbsp;录</li>
					<li><router-link to="/mapShow">地图显示</router-link></li>
					<li><router-link to="/passPort" >渔船出入港</router-link></li>
					<li><router-link to="/workModeSta" >渔船作业方式<br>统计及查询</router-link></li>
					<li><router-link to="#" >船舶明细</router-link></li>
					<li><router-link to="/purseSeineAnalysis" >围网作业方式<br>统计及分析</router-link></li>
					<li><router-link to="/trawlSA" >拖网作业方式<br>统计及分析</router-link></li>
					<li><router-link to="/gillNetStAnalysis" >刺网作业方式<br>统计及分析</router-link></li>
					<li><router-link to="/stowSA" >张网作业方式<br>统计及分析</router-link></li>
<!--					<li><a href="#">一级菜单1</a>-->
<!--						<ul>-->
<!--							<li><a href="#">二级菜单1</a></li>-->
<!--							<li><a href="#">二级菜单2</a></li>-->
<!--							<li><a href="#">二级菜单3</a></li>-->
<!--						</ul>-->
<!--					</li>-->
				</ul>
			</div>

			<!--主要内容展示区域-->
			<div class="showResult">
				<div class="normalBar">
					<div class="GraphTitle">正常作业统计柱状图</div>
					<div class="GraphEcharts" id="normalBarEchartsId"></div>
				</div>
				<div class="normalShipRadar">
					<div class="GraphTitle">正常作业渔船类型分布图</div>
					<div class="GraphEcharts" id="normalSREchartsId"></div>
				</div>
				<div class="illegalShipRadar">
					<div class="GraphTitle">非法作业渔船类型分布图</div>
					<div class="GraphEcharts" id="illegalSREchartsId"></div>
				</div>
				<div class="illegalOSBroken">
					<div class="GraphTitle">非法作业统计折线图</div>
					<div class="GraphEcharts" id="BrokenEchartsId"></div>
				</div>
				<div class="illegalOSPercentage">
					<div class="GraphTitle">非法作业统计占比图</div>
					<div class="GraphEcharts" id="PerIOSEchartsId"></div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	//张网 stow net statistic and analysis
	export default {
		data() {
			return {
				// Tips提示
				thisPageTips: '张网作业方式统计分析',
				backTips: '后退',
				homeTips: '主页',
				selectFGTips: '请选择渔场',
				startDateTips: '请选择起始日期',
				endDateTips: '请选择终止日期',
				checkTips: '查询结果',
				resetTips: '重置条件',
				saveTips: '保存结果',
				//定义辐射图数据的个数
				numIndex:0,
				// 默认时间设置
				startDate: '2019-07-15',
				endDate: '2019-08-31',

				//非法作业折线图选项
				BrokenOption: {
					color: ["#f44"],
					grid:{
						left: "10%",
						top: "10%",
						width: "80%",
						height: "70%",
					},//使得图表覆盖整个div
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "line",
							lineStyle: {
								type: "dashed",
							},
						},
					},
					xAxis: [
						{
							type: "category",
							data: [],
							axisTick: {
								show: true,
								inside: true,
								alignWithLabel: true
							},
							axisLine: {
								lineStyle: {
									color: "#5bbdff",
									width: 2,
								}
							},
							axisLabel: {
								fontSize: 14,
								color: "#5b9bd5",
								rotate: 0,
							}
						}
					],
					yAxis: [
						{
							minInterval: 1,
							type: "value",
							axisTick: {
								show: true,
								inside: true,
								alignWithLabel: true,
							},
							axisLine: {
								lineStyle: {
									color: "#5bbdff",
									width: 2,
								},
							},
							scale: false,
							axisLabel: {
								fontSize: 14,
								color: "#5b9bd5"
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: "#ccc",
									width: 1,
									type: "dashed",
								},
							},
						}
					],
					series: [
						{
							name: "每日数量",
							type: "line",
							smooth: true,
							symbolSize: 2,
							showSymbol: false,
							cursor: 'pointer',
							step: false,
							lineStyle: {
								color: "#ed7d31",
								width: 2,
							},
							data: [],
						}
					]
				},
				//非法作业占比图选项
				PercentageOption: {
					grid: {
						left: "10%",
						top: "0%",
						width: "80%",
						height: "100%",
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: "vertical",
						left: "4%",
						top: "middle",
						data: ["正常作业", "非法作业"],
						textStyle: {
							color: "default",
							fontSize:"100%",
						}
					},
					series: [
						{
							name: "占比情况",
							type: "pie",
							radius: "75%",
							center: ["50%", "50%"],
							labelLine: {
								show: false,
							},
							label:{
								show: false,
							},
							data: [],
							/*data: [
								{ value: 890, name: "非法作业" },
								{ value: 123, name: "正常作业" },
							],*/
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: "rgba(0, 0, 0, 0.5)"
								}
							}
						}
					],
					color: ["#5b9bff", "#ed7d31",]
				},
				//正常作业柱状图选项
				NormalBarOption:{
					grid:{
						left: "10%",
						top: "10%",
						width: "80%",
						height: "70%",
					},//使得图表覆盖整个div
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "line",
							lineStyle: {
								type: "dashed",
							},
						},
					},
					xAxis: [
						{
							type: "category",
							data: [],
							axisTick: {
								show: true,
								inside: false,
								alignWithLabel: true
							},
							axisLine: {
								lineStyle: {
									color: "#5bbdff",
									width: 2,
								}
							},
							axisLabel: {
								fontSize: 14,
								color: "#5b9bd5",
								rotate: 0,
							}
						}
					],
					yAxis: [
						{
							minInterval: 1,
							type: "value",
							axisTick: {
								show: true,
								inside: true,
								alignWithLabel: true,
							},
							axisLine: {
								lineStyle: {
									color: "#5bbdff",
									width: 2,
								},
							},
							scale: false,
							axisLabel: {
								fontSize: 14,
								color: "#5b9bd5"
							},
							splitLine: {
								show: true,
								lineStyle: {
									color: "#ccc",
									width: 1,
									type: "dashed",
								},
							},
						}
					],
					series:[
						{
							name:"每日数量",
							type:"bar",
							data:[],
						}
					],
					color:"#5b9bff",
				},
				//正常作业渔船类型星状图选项
				NormalShipOption:{
					tooltip:{},
					radar:
						{
							center:["43%","46%"],
							radius:"60%",
							name:{
								color:"#58a0ee",
								fontStyle:'normal',
								fontSize:14,
							},
							nameGap:12,
							shape:"circle",
							axisLine:{
								show:true,
								lineStyle:{
									color:"#58a0ee",
									width:1,
									opacity:1,
									type:"dashed",
								}
							},
							splitLine:{
								lineStyle:{
									color:"#CCC",
									opacity:0.1,
								}
							},
							splitArea:{
								show:false,
							},
							indicator:[
								{name:"养殖船", min:0},
								{name:"国内捕捞船",min:0},
								{name:"捕捞辅助船",min:0},
								{name:"其他辅助船",min:0},
								{name:"专业远洋渔船",min:0},
								{name:"非专业远洋渔船",min:0}
							]
						},
					series:[
						{
							name:"正常作业",
							type:"radar",
							symbol:"none",
							lineStyle:{
								color:"#58a0ee",
								width:2,
								opacity:1,
							},
							areaStyle:{
								color:'#58a0ee',
								opacity:0.6,
							},
							data:[],
						}
					]
				},
				//非法作业渔船类型星状图选项
				IllegalShipOption:{
					tooltip:{},
					radar:
						{
							center:["43%","46%"],
							radius:"60%",
							name:{
								color:"#58a0ee",
								fontStyle:'normal',
								fontSize:14,
							},
							nameGap:12,
							shape:"circle",
							axisLine:{
								show:true,
								lineStyle:{
									color:"#58a0ee",
									width:1,
									opacity:1,
									type:"dashed",
								}
							},
							splitLine:{
								lineStyle:{
									color:"#CCC",
									opacity:0.1,
								}
							},
							splitArea:{
								show:false,
							},
							indicator:[
								{name:"养殖船",min:0},
								{name:"国内捕捞船",min:0},
								{name:"捕捞辅助船",min:0},
								{name:"其他辅助船",min:0},
								{name:"专业远洋渔船",min:0},
								{name:"非专业远洋渔船",min:0}
							]
						},
					series:[
						{
							name:"正常作业",
							type:"radar",
							symbol:"none",
							lineStyle:{
								color:"#ed7d31",
								width:2,
								opacity:1,
							},
							areaStyle:{
								color:'#ed7d31',
								opacity:0.6,
							},
							data:[],
						}
					]
				},

				// 存储数据长度(天数)
				dataLength: 0,
				//存储占比图数据
				data: {
					normal: {value: 0, name: '正常作业'},
					illegal: {value: 0, name: '非法作业'},
				},
				shipType:['养殖船','国内捕捞船','捕捞辅助船','其他辅助船','专业远洋渔船','非专业远洋渔船'],
				/*存储返回的数据以及时间序列*/
				saveData:[],
				/*存储渔船星状图数据*/
				radarData:[],
			};
		},


		mounted() {
			this.initCharts();
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

			//初始化图表
			init() {
				var myDate = new Date();
				console.log("----------" + myDate.toLocaleString() + "----------");
				console.log("正在执行init()...");
				this.dataAskDeal();
			},
			initCharts(){
				//初始化图表
				this.dataAskDeal();
			},
			//画出两个Echarts图
			drawPurseCharts() {
				var brokenEChart = this.$echarts.init(
					document.getElementById("BrokenEchartsId")
				);
				var percentageEChart = this.$echarts.init(
					document.getElementById("PerIOSEchartsId")
				);
				var normalBarEcharts = this.$echarts.init(
					document.getElementById("normalBarEchartsId")
				);
				var normalSEcharts = this.$echarts.init(
					document.getElementById("normalSREchartsId")
				);
				var illegalSEcharts = this.$echarts.init(
					document.getElementById("illegalSREchartsId")
				);
				illegalSEcharts.setOption(this.IllegalShipOption);
				illegalSEcharts.setOption({
					series:[{
						data:[this.radarData.illegal],
					}]
				});
				normalSEcharts.setOption(this.NormalShipOption);
				normalSEcharts.setOption({
					series:[{
						data:[this.radarData.normal],
					}]
				});
				normalBarEcharts.setOption(this.NormalBarOption);
				normalBarEcharts.setOption({
					xAxis:[{
						data:this.saveData.time,
					}],
					series:[{
						data:this.saveData.normal,
					}]
				});
				brokenEChart.setOption(this.BrokenOption);
				brokenEChart.setOption({
					xAxis:[{
						data:this.saveData.time,
					}],
					series:[{
						data:this.saveData.illegal,
					}]
				});
				percentageEChart.setOption(this.PercentageOption);
				percentageEChart.setOption({
					series:[{
						data:[this.data.normal,this.data.illegal],
					}]
				});
				//percentageEChart.showLoading();
				window.addEventListener("resize", function() {
					brokenEChart.resize();
				});
				window.addEventListener("resize", function() {
					percentageEChart.resize();
				});
				window.addEventListener("resize", function() {
					normalBarEcharts.resize();
				});
				window.addEventListener("resize", function() {
					normalSEcharts.resize();
				});
				window.addEventListener("resize", function() {
					illegalSEcharts.resize();
				});
			},
			//查询方法
			SearCh () {
				//请求数据
				var startTime = this.getDate(this.fisrtTime);
				var endTime = this.getDate(this.lastTime);
				if (endTime.getTime() - startTime.getTime() < 0) {
					alert("终止时间不得早于起始时间！");
				} else {
					this.dataAskDeal();
				}
			},

			//数据请求及返回数据处理
			dataAskDeal () {
				this.saveData.time=[];
				var i=0;//i作为time数组的索引
				var startTime = this.getDate(this.startDate);
				var endTime = this.getDate(this.endDate);
				while((endTime.getTime()-startTime.getTime())>=0) {
					var year = startTime.getFullYear();
					var x = startTime.getMonth() + 1;//JS中的月份是0-11
					var month = x.toString().length == 1 ? "0" + x.toString() : x;

					var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
					//保存时间序列
					this.saveData.time[i]=year + '-' + month + '-' + day;
					i +=1;
					startTime.setDate(startTime.getDate() + 1);
				}
				console.log("开始提取数据");
				this.axios({
					method: "post",
					url: "/getDataByMonthOrDay",
					data: {
						jobType :'张网',
						startTime : this.startDate + ' 00:00:00',
						endTime : this.endDate + ' 23:59:59',
						byDay:1,
					}
				}).then((response)=>{
					var sumlegal=0;
					var sumillegal=0;
					for(var j=0;j<response.data.normal.length;j++){
						sumlegal += response.data.normal[j];
					};
					for(var j=0;j<response.data.illegal.length;j++){
						sumillegal += response.data.illegal[j];
					};
					this.saveData.normal = (response).data.normal;
					this.saveData.illegal = (response).data.illegal;
					this.data.normal.value=sumlegal;
					this.data.illegal.value=sumillegal;
					this.drawPurseCharts();
					//onsole.log(this.saveData);
				}).catch((response)=>{
					console.log(response);
				});

				this.axios({
					method:"post",
					url:"/countBstype",
					data:{
						startTime : this.startDate + ' 00:00:00',
						endTime : this.endDate + ' 23:59:59',
						jobType :"张网",
					}
				}).then((res)=>{
					var normalNum=[];
					var illegalNum=[];
					for(var j=0;j<6;j++){
						normalNum[j]=(res).data.normal[this.shipType[j]];
						illegalNum[j]=(res).data.illegal[this.shipType[j]];
					}
					this.radarData.normal=normalNum;
					this.radarData.illegal=illegalNum;
					this.drawPurseCharts();
				}).catch((res)=>{
					console.log(res);
				});
				//console.log(this.radarData);
			},


			dataAskDeal11() {
				console.log("正在执行dataAskDeal()...");
				console.log("startDate:" + this.startDate);
				console.log("endDate:" + this.endDate);

				this.dateArray = [];
				var i = 0;
				var startTime = this.getDate(this.startDate);
				var endTime = this.getDate(this.endDate);
				while ((endTime.getTime() - startTime.getTime()) >= 0) {
					var year = startTime.getFullYear();
					var x = startTime.getMonth() + 1;
					var month = x.toString().length == 1 ? "0" + x.toString() : x;
					var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
					//保存时间序列
					this.dateArray[i] = year + '-' + month + '-' + day;
					i += 1;
					startTime.setDate(startTime.getDate() + 1);
				}
				this.axios({
					method: "post",
					url: "/getDataByMonthOrDay",
					data: {
						jobType: '张网',
						startTime: this.startDate + ' 00:00:00',
						endTime: this.endDate + ' 23:59:59',
						byDay: 1
					},
				}).then((response) => {
					console.log("响应正常...");
					var sum_nor = 0;
					var sum_ill = 0;
					var length = response.data.total.length;
					this.dataLength = length;
					console.log("数据总长度：" + length);
					for (var i = 0; i < response.data.normal.length; i++) {
						sum_nor += response.data.normal[i];
					}
					;
					for (var i = 0; i < response.data.illegal.length; i++) {
						sum_ill += response.data.illegal[i];
					}
					;
					console.log("正常总数:" + sum_nor);
					console.log("非法总数:" + sum_ill);
					this.pieData.normal.value = sum_nor;
					this.pieData.illegal.value = sum_ill;
					this.illDataByDate = response.data.illegal;
					this.drawStowCharts(length);
				}).catch((response) => {
					console.log("响应错误...");
					console.log("错误是：" + response);
				})
			},

			//String to Date 时间调整函数 月份-1，适配Date类型
			getDate(datestr) {
				var temp = datestr.split("-");
				var date = new Date(temp[0], temp[1] - 1, temp[2]);
				return date;
			},

			drawStowCharts(len) {
				var lineEchart = this.$echarts.init(
					document.getElementById("lineEchartsId")
				);
				var pieEchart = this.$echarts.init(
					document.getElementById("pieEchartsId")
				);

				console.log("echarts实例创建完成");
				lineEchart.setOption(this.LineOption);
				lineEchart.setOption({
					xAxis: {
						data: this.dateArray,
						axisLabel: {
							interval: function (idx, val) {
								if (idx == 0 || idx == Math.floor((len - 1) / 3) || idx == Math.floor((len - 1) / 3 * 2) || idx == len - 1) {
									return true;
								}
							},
						},
					},
					series: {
						data: this.illDataByDate,
					},
				});


				pieEchart.setOption(this.PieOption);
				pieEchart.setOption({
					series: {

						data: [this.pieData.normal, this.pieData.illegal],
					}
				});

				// pieEchart.showLoading();
				window.addEventListener("resize", function () {
					lineEchart.resize();
				});
				window.addEventListener("resize", function () {
					pieEchart.resize();
				});
			},

			// 查询方法
			search() {
				var startTime = this.getDate(this.startDate);
				var endTime = this.getDate(this.endDate);
				if (endTime.getTime() - startTime.getTime() < 0) {
					alert("终止时间不得早于起始时间！");
				} else {
					this.dataAskDeal();
				}
			},
			//保存报告
			save() {
				console.log("我要保存报告到本地！");
				// 先查询，后保存
				var nowTime = new Date();
				this.exportData("张网统计报告 " + nowTime.toLocaleString() + ".txt", this.dealDataToExport());
			},
			//重置方法 恢复到默认渔场、默认时间
			reset() {
				this.fishGround = '所有渔场';
				this.startDate = '2019-07-15';
				this.endDate = '2019-08-31';
				this.dataAskDeal();
			},

			fake_click(obj) {
				var ev = document.createEvent("MouseEvents");
				ev.initMouseEvent(
					"click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
				);
				obj.dispatchEvent(ev);
			},

			exportData(name, data) {
				var urlObject = window.URL || window.webkitURL || window;
				var downloadData = new Blob([data]);
				var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
				save_link.href = urlObject.createObjectURL(downloadData);
				save_link.download = name;
				this.fake_click(save_link);
			},

			dealDataToExport() {
				var datatoexport = "";
				var allsum = this.pieData.normal.value + this.pieData.illegal.value;
				var normalPer = (this.pieData.normal.value / allsum * 100).toFixed(2);
				var illegalPer = (this.pieData.illegal.value / allsum * 100).toFixed(2);
				datatoexport += "作业方式：张网\n"
				datatoexport += "渔场范围：" + this.fishGround + "\n";
				datatoexport += "时间范围：" + this.startDate + "\t到\t" + this.endDate + "\n\n";
				datatoexport += "总作业次数：" + allsum
					+ "\t正常作业次数：" + this.pieData.normal.value + "\t非法作业次数：" + this.pieData.illegal.value + "\n";
				datatoexport += "正常作业占比：" + normalPer + "%";
				datatoexport += "\t非法作业占比：" + illegalPer + "%" + "\n\n";
				var i;
				datatoexport += "时间" + "\t\t\t" + "违法作业次数\n"
				for (i = 0; i < this.dataLength; i++) {
					datatoexport += this.dateArray[i] + "\t\t" + this.illDataByDate[i] + "\n";
				}

				return datatoexport;
			},

		},

	};
</script>


<style scoped>
	/* 1 底层背景样式，窗口自适应 */
	/* 底层背景 */
	#backGround {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		/* 底层背景层 */
		z-index: 1;
	}
	/* 底层背景图片 */
	#backGround .bgimg {
		width: 100%;
		height: 100%;
		/* 底层背景图片层 */
		z-index: 2;
	}

	/* 2 主要内容样式，窗口自适应 */
	/* 主要内容 */
	#main-content {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		/* 内容层 */
		z-index: 80;
	}

	/* 中心标题样式 */
	.mainTitle {
		position: absolute;
		left: 35vw;
		width: 30vw;
		top: 0;
		height: 5.4vh;
		text-align:center;
		/* background-color 测试用 */
		/*background-color: #FFFFFF;*/
	}

	.mainTitle .title {
		font-family: FZDHTJW--GB1-0;
		color: #55a6ee;
		cursor: pointer;
		letter-spacing: 0.2vw;
		font-size: 4.3vh;
		display: inline-block;
		/* background-color 测试用 */
		/*background-color: #ff5234;*/
	}

	#main-content .navigaIcon {
		position: absolute;
		right: 2vw;
		width: 15vw;
		height: 5.5vh;
		margin-top: 5vh;
		margin-bottom: 0.1vh;
		/* background-color 测试用 */
		/* background-color: #FFFFFF; */
	}

	#main-content .navigaIcon .goBack {
		cursor: pointer;
		position: absolute;
		right: 50%;
		height: 80%;
	}

	#main-content .navigaIcon .goHome {
		cursor: pointer;
		position: absolute;
		right: 25%;
		height: 80%;
	}

	/* 菜单栏 */
	#main-content .setMenu {
		position: absolute;
		width: 80vw;
		height: 6vh;
		left: 10vw;
		top: 12vh;
		margin-top: 1vh;
		margin-bottom: 1vh;
		color: #58a0ee;
		/* background-color 测试用 */
		/* background-color: #FFFFFF; */
	}

	/*选择渔场菜单*/
	#main-content .setMenu .selectFG {
		position: absolute;
		width: 18%;
		height: 100%;
		color: #58a0ee;
		font-size: 2.8vh;
		/* background-color 测试用 */
		/* background-color: #0e0270; */
	}

	#main-content .setMenu .selectFG form select {
		width: 60%;
		height: 5vh;
		background-color: #0e0270;
		color: #58a0ee;
		border-color: #58a0ee;
		border-width: 1px;
	}


	/* 选择日期时间菜单 */
	#main-content .setMenu .selectDT {
		position: absolute;
		left: 20%;
		width: 50%;
		height: 100%;
		font-size: 2.8vh;
		/* background-color 测试用 */
		/* background-color: #0e0270; */
	}

	#main-content .setMenu .selectDT form input {
		width: 35%;
		height: 5vh;
		background-color: #0e0270;
		color: #58a0ee;
		border-color: #58a0ee;
	}

	/*  修改日历控件类型 */
	/*控制编辑区域的*/
	input[type="date"]::-webkit-datetime-edit {
	}

	/*控制年月日这个区域的*/
	input[type="date"]::-webkit-datetime-edit-fields-wrapper {
	}

	/*这是控制年月日之间的斜线或短横线的*/
	input[type="date"]::-webkit-datetime-edit-text {
		color: #58a0ee;
		padding: 0.5em;
	}

	/*控制年文字, 如2019四个字母占据的那片地方*/
	input[type="date"]::-webkit-datetime-edit-year-field {
		color: #58a0ee;
		background-color: #0e0270;
	}

	/*控制月文字*/
	input[type="date"]::-webkit-datetime-edit-month-field {
		color: #58a0ee;
		background-color: #0e0270;
	}

	/*控制日文字*/
	input[type="date"]::-webkit-datetime-edit-day-field {
		color: #58a0ee;
		background-color: #0e0270;
	}

	/*这是控制上下小箭头的*/
	input[type="date"]::-webkit-inner-spin-button {
		/* 直接隐藏 */
		visibility: hidden;
	}

	/*这是控制下拉小箭头的*/
	input[type="date"]::-webkit-calendar-picker-indicator {
		position: relative;
		right: 2%;
		border: 0.1em solid #58a0ee;
		border-radius: 0.2em;
		color: #0e0270;
		background-image: -webkit-linear-gradient(top, #58a0ee, #acc8e6);
	}

	/*控制清除按钮*/
	input[type="date"]::-webkit-clear-button {
		/* 直接隐藏 */
		visibility: hidden;
	}

	#main-content .setMenu .menuButtons {
		position: absolute;
		left: 75%;
		width: 25%;
		height: 100%;
		font-size: 2.8vh;
		/* background-color 测试用 */
		/* background-color: #0e0270; */
	}

	#main-content .setMenu .menuButtons button {
		width: 24%;
		height: 5vh;
		background-color: #0e0270;
		color: #58a0ee;
		border-color: #58a0ee;
		cursor: pointer;
	}

	/* 左侧透明导航栏 */
	#leftNavigaList{
		position: absolute;
		bottom: 10vh;
		left: 0.5vw;
		width: 8vw;
		height: 75vh;
		z-index: 99;
		/*text-align: center;*/
		/* background-color 测试用 */
		background-color: rgba(0, 0, 0, 0.24);
	}

	#leftNavigaList ul{
		/* 清除ul标签的默认样式 */
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		margin: 0;
		padding: 0;

		font-size: 2.2vh;
		list-style-type: none;
		display: block;
		/*background-color: #3f72c5;*/
	}
	#leftNavigaList .leftNavTitle{
		float: top;     /* 使li内容纵向浮动 */
		margin-top:0;   /* 两个li之间的距离 */
		display: block;
		color: #62dbff;
		text-align: center;
		padding: 1vh 1vh;
		font-size: 2.4vh;
		font-weight: bold;
		border-bottom: #55a6ee 1px solid;
	}
	#leftNavigaList li {
		float: top;     /* 使li内容纵向浮动 */
		margin-top:0;   /* 两个li之间的距离 */
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
	#leftNavigaList li a:hover{
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

	/*结果显示区域格式*/
	.showResult{
		position: absolute;
		width: 90vw;
		height: 85vh;
		left: 10vw;
		top: 18vh;
		margin-top: 0vh;
		margin-bottom: 0vh;
		/*background-color: #FFFFFF;*/
	}
	/*正常作业柱状图格式*/
	.normalBar{
		position: absolute;
		width: 30%;
		height: 40%;
		top: 5%;
		left:1%;
		background-image:url("../../assets/msgBg.png");
	}
	.GraphTitle{
		width: 60%;
		height: 5%;
		/*font-family: MicrosoftYaHei;*/
		font-size: 2.8vh;
		letter-spacing: 0.1vw;
		color: #58a0ee;
		top: 3.5%;
		left: 20%;
		position: absolute;
	}
	.GraphEcharts{
		top:15%;
		width: 100%;
		height: 94%;
		position: absolute;
		left:8%;
	}
	/*正常作业渔船星状图*/
	.normalShipRadar{
		position: absolute;
		width: 35%;
		height: 45%;
		left: 12%;
		top: 50%;
		background-image:url("../../assets/msgBg.png");
	}
	/*非法作业渔船星状图*/
	.illegalShipRadar{
		position: absolute;
		width: 35%;
		height: 45%;
		left: 52%;
		top: 50%;
		background-image:url("../../assets/msgBg.png");
	}
	/*非法作业折线图模块格式*/
	.illegalOSBroken {
		position: absolute;
		width: 30%;
		height: 40%;
		top: 5%;
		left:33%;
		/* background-color 测试用 */
		background-image:url("../../assets/msgBg.png");
	}
	/*非法作业占比图*/
	.illegalOSPercentage {
		position: absolute;
		width: 30%;
		height: 40%;
		top: 5%;
		left:65%;
		/* background-color 测试用 */
		background-image:url("../../assets/msgBg.png");
	}







</style>