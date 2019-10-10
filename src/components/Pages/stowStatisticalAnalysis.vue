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
				<p class="titleP" @click="refreshPage" v-bind:title="thisPageTips">张网作业方式统计分析</p>
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
				<div class="topright">

				</div>
				<div class="topmiddle">

				</div>
				<div class="topleft">

				</div>
				<div class="bottomright">

				</div>
				<div class="bottomleft">

				</div>

				<div class="topEcharts">
					<div class="illLineTitle">非法作业统计折线图</div>
					<div class="lineEcharts" id="lineEchartsId"></div>
				</div>
				<div class="bottomEcharts">
					<div class="illPieTitle">非法作业统计占比图</div>
					<div class="pieEcharts" id="pieEchartsId"></div>
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

				// 默认渔场设置
				fishGround: '所有渔场',
				// 渔场列表
				FGoptions: [{
					value: '所有渔场'
				},
					{
						value: '舟山渔场'
					},
					{
						value: '舟外渔场'
					},
					{
						value: '长江口渔场'
					},
					{
						value: '江外渔场'
					},
					{
						value: '吕泗渔场'
					},
					{
						value: '大沙渔场'
					},
					{
						value: '鱼山渔场'
					},
					{
						value: '鱼外渔场'
					},
					{
						value: '温台渔场'
					},
					{
						value: '温外渔场'
					},
					{
						value: '闽东渔场'
					},
					{
						value: '闽外渔场'
					}
				],
				// 默认时间设置
				startDate: '2019-07-15',
				endDate: '2019-08-31',

				//渔场地图信息
				centerPoint: '',//地图中心点坐标
				centerLng: "124.80",//地图中心经纬度
				centerLat: "30.60",
				level: "6",//地图级别
				selectedBorderColor: 'red',//渔场区域选中颜色
				selectedBorderWidth: 4,//渔场区域选中框宽度
				forbidLable: 0,//是否禁止区域被清除
				defaultBorderColor: 'gray',//渔场区域默认边框颜色
				defaultBorderWidth: 2,
				//渔场经纬度位置信息
				/*fishArea:[
					{leftLng:120.2,leftLat:32,rightLng:122.5,rightLat:34},//吕泗渔场
					{leftLng:122.5,leftLat:32,rightLng:125,rightLat:34},//大沙渔场
					{leftLng:122.2,leftLat:31,rightLng:125,rightLat:32},//长江口渔场
					{leftLng:121.8,leftLat:29.5,rightLng:125,rightLat:31},//舟山渔场
					{leftLng:121,leftLat:28,rightLng:125,rightLat:29.5},//鱼山渔场
					{leftLng:120,leftLat:27,rightLng:125,rightLat:28},//温台渔场
					{leftLng:125,leftLat:32,rightLng:128,rightLat:34},//沙外渔场
					{leftLng:125,leftLat:31,rightLng:128,rightLat:32},//江外渔场
					{leftLng:125,leftLat:29.5,rightLng:128,rightLat:31},//舟外渔场
					{leftLng:125,leftLat:28,rightLng:127,rightLat:29.5},//鱼外渔场
					{leftLng:125,leftLat:27,rightLng:127.5,rightLat:28},//温外渔场
				],*/

				//非法作业折线图选项
				LineOption: {
					color: "#f44",
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "line",
							lineStyle: {
								type: "dashed",
							},
						},
					},
					grid: {
						left: "10%",
						top: "10%",
						width: "80%",
						height: "70%",
					},
					xAxis: {
						// name: "日期",
						// nameLocation: "middle",
						// nameTextStyle: {
						// 	color: "#58a0ee",
						// 	fontWeight: "normal",
						// 	fontSize: 12,
						// },
						// nameGap: 20,
						type: "category",
						// data 为横坐标
						axisTick: {
							show: true,
							inside: true,
							alignWithLabel: true,

						},
						axisLine: {
							lineStyle: {
								color: "#58a0ee",
								width: 2,
							}
						},
						axisLabel: {
							fontSize: 14,
							color: "#58a0ee",
							rotate: 0,
						},
						splitLine: {
							show: false,
						},
					},
					yAxis: {
						// name: "次数",
						// nameLocation: "middle",
						// nameTextStyle: {
						// 	color: "#58a0ee",
						// 	fontWeight: "normal",
						// 	fontSize: 12,
						// },
						// nameGap: 16,
						minInterval: 1,
						type: "value",
						axisTick: {
							show: true,
							inside: true,
							alignWithLabel: true,
						},
						axisLine: {
							lineStyle: {
								color: "#58a0ee",
								width: 2,
							}
						},
						scale: false,
						axisLabel: {
							fontSize: 14,
							color: "#58a0ee",
							rotate: 0,
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: "#ccc",
								width: 1,
								type: "dashed",
							},
						},
					},
					series: [{
						name: "非法作业次数",
						type: "line",
						symbolSize: 2,
						showSymbol: false,
						cursor: 'pointer',
						step: false,
						smooth: false,
						lineStyle: {
							color: "#ed7d31",
							width: 2,
						},
					}],

				},
				//非法作业占比图选项
				PieOption: {
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					grid: {
						left: "30%",
						top: "0%",
						width: "80%",
						height: "80%",
					},
					legend: {
						orient: "vertical",
						left: "10%",
						top: "middle",
						data: ["正常作业", "非法作业"],
						textStyle: {
							color: "default",
							fontSize: 16,
						}
					},
					series: [{
						name: "占比情况",
						type: "pie",
						radius: "80%",
						center: ["66.15%", "50%"],
						label: {
							show: false,
							fontSize: 25,
						},
						data: [],
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
				// 存储数据长度
				dataLength: 0,
				//存储正常作业与非法作业次数
				pieData: {
					normal: {
						value: 0,
						name: '正常作业',
					},
					illegal: {
						value: 0,
						name: '非法作业',
					},
				},
				//存储非法作业数据
				illDataByDate: [],
				//存储日期序列
				dateArray: [],
			};
		},


		mounted() {
			//this.init();
			//this.baiduMap();
			//this.fishMap(this.centerLng, this.centerLat, this.level);
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

			//数据请求及返回数据处理
			dataAskDeal() {
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

	.mainTitle .titleP {
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


	/* 显示结果区域 */
	#main-content .showResult {
		position: absolute;
		width: 85vw;
		height: 74vh;
		left: 12vw;
		top: 20vh;
		margin-top: 0vh;
		margin-bottom: 0vh;
		/* background-color 测试用 */
		 background-color: #FFFFFF;

	}

	#main-content .showStatistics {
		position: absolute;
		width: 33%;
		height: 95%;
		right: 2%;
		top: 5%;
		/* background-color 测试用 */
		/* background-color: #FFFFFF; */
	}


	#main-content .showStatistics .topEcharts {
		position: absolute;
		top: 2%;
		left: 0%;
		height: 50%;
		width: 100%;
		/* background-color 测试用 */
		/* background-color: greenyellow; */
	}

	#main-content .showStatistics .topEcharts .illLineTitle {
		position: absolute;
		top: -5%;
		left: 20%;
		height: 5%;
		width: 60%;
		font-size: 2.8vh;
		letter-spacing: 0.1vw;
		color: #58a0ee;
		/* background-color 测试用 */
		/* background-color: #0000FF; */
	}

	#main-content .showStatistics .topEcharts .lineEcharts {
		position: absolute;
		top: 6%;
		height: 94%;
		left: 0%;
		width: 100%;
		/* background-color 测试用 */
		/* background-color: #FFFFFF; */
	}

	#main-content .showStatistics .bottomEcharts {
		position: absolute;
		top: 55%;
		left: 0%;
		height: 50%;
		width: 100%;
		/* background-color 测试用 */
		/* background-color: darkred; */
	}

	#main-content .showStatistics .bottomEcharts .illPieTitle {
		position: absolute;
		top: -5%;
		left: 20%;
		height: 5%;
		width: 60%;
		font-size: 2.8vh;
		letter-spacing: 0.1vw;
		color: #58a0ee;
		/* background-color 测试用 */
		/* background-color: #FFFFFF; */
	}

	#main-content .showStatistics .bottomEcharts .pieEcharts {
		position: absolute;
		top: 6%;
		height: 94%;
		left: 0%;
		width: 100%;
		/* background-color 测试用 */
		/* background-color: #FFFFFF; */
	}

</style>