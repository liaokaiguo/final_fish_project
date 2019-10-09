<template>
  <div>
    <div class="background"></div>

    <div class="content">
      <div class="centTitle">
        <p class="myp1">围网作业方式统计分析</p>
      </div>
      <div class="rightIcon">
        <span v-on:click="$router.back(-1)">
            <img class="goback" src="../../assets/rebackLastIcon.png" style="cursor:pointer" alt="返回">
          </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <router-link to="/welcome">
          <img class="gohome" src="../../assets/rebackMainIcon.png">
        </router-link>
      </div>
      <div class="setMenu">
        <div class="time">
          <form method="post">
            <label>日期：</label>
            <input id="fisrtTime" type="date" name="firstTime" v-model="fisrtTime"/>
            &nbsp;到&nbsp;
            <input id="lastTime" type="date" name="lastTime" v-model="lastTime" />
          </form>
        </div>
        <div class="button">
          <button class="buttonSearch" @click="SearCh">查询</button>
          <button class="buttonSave" @click="Save">保存</button>
          <button class="buttonReset" @click="ReSet">重置</button>
        </div>
      </div>
      <div class="showResult">
        <div class="normalBar">
          <div class="GraphTitle">正常作业柱状图</div>
          <div class="GraphEcharts" id="normalBarEchartsId"></div>
        </div>
        <div class="normalShipRadar">
          <div class="GraphTitle">正常作业渔船星状图</div>
          <div class="GraphEcharts" id="normalSREchartsId"></div>
        </div>
        <div class="illegalShipRadar">
          <div class="GraphTitle">非法作业渔船星状图</div>
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
    //围网 fishing vessel statistic and analysis
    export default {
        data() {
            return {
                fishMode: '所有渔场',
                fisrtTime: '2019-07-15',
                lastTime: '2019-08-31',
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
                            center:["50%","50%"],
                            radius:"75%",
                            indicator:[
                                {name:"养殖船", max:500},
                                {name:"国内捕捞船",max:500},
                                {name:"捕捞辅助船",max:500},
                                {name:"其他辅助船",max:500},
                                {name:"专业远洋渔船",max:500},
                                {name:"非专业远洋渔船",max:500}
                            ]
                        },
                    series:[
                        {
                            name:"正常作业",
                            type:"radar",
                            lineStyle:{
                                //color:"#000",
                                width:1,
                                opacity:0.2,
                            },
                            areaStyle:{
                                //color:'#000',
                                opacity:0.6,
                            },
                            data:[
                                [200,300,100,220,150,310]
                            ]
                        }
                    ]
                },
                //非法作业渔船类型星状图选项
                IllegalShipOption:{
                    tooltip:{},
                    radar:
                        {
                            center:["50%","50%"],
                            radius:"75%",
                            indicator:[
                                {name:"养殖船", max:500},
                                {name:"国内捕捞船",max:500},
                                {name:"捕捞辅助船",max:500},
                                {name:"其他辅助船",max:500},
                                {name:"专业远洋渔船",max:500},
                                {name:"非专业远洋渔船",max:500}
                            ]
                        },
                    series:[
                        {
                            name:"非法作业",
                            type:"radar",
                            lineStyle:{
                                //color:"#000",
                                width:1,
                                opacity:0.2,
                            },
                            areaStyle:{
                                //color:'#000',
                                opacity:0.6,
                            },
                            data:[
                                [200,300,100,220,150,310]
                            ]
                        }
                    ]
                },
                //渔场列表
                options: [
                    {value: '所有渔场'},
                    {value: '舟山渔场'},
                    {value: '舟外渔场'},
                    {value: '长江口渔场'},
                    {value: '江外渔场'},
                    {value: '吕泗渔场'},
                    {value: '大沙渔场'},
                    {value: '沙外渔场'},
                    {value: '鱼山渔场'},
                    {value: '鱼外渔场'},
                    {value: '温台渔场'},
                    {value: '温外渔场'},
                ],
                //存储占比图数据
                data: {
                    normal: {value: 0, name: '正常作业'},
                    illegal: {value: 0, name: '非法作业'},
                },
                /*存储返回的数据以及时间序列*/
                saveData:[],
            };
        },
        mounted() {
            this.initCharts();
        },
        methods: {
            reback() {
                this.$router.go(-1); //reback the last step
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
                normalSEcharts.setOption(this.NormalShipOption);
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
            //重置方法
            ReSet () {
                this.fishMode='所有渔场';
                this.fisrtTime='2019-07-15';
                this.lastTime='2019-08-31';
                this.initCharts();//重置图表
            },
            //保存报告
            Save () {
                this.axios({
                    method: "post",
                    url: "/downloadExcel",
                    data: {
                        jobType :'围网',
                        startTime : this.fisrtTime + ' 00:00:00',
                        endTime : this.lastTime + ' 23:59:59',
                        byDay:1
                    },
                    responseType:'blob'
                }).then((response)=>{
                    console.log(response);
                    const link = document.createElement('a');
                    let blob = new Blob([response.data],{type:'application/vnd.ms-excel'});
                    link.style.display = 'none';
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute('download','围网分析报告('+this.fisrtTime+'至'+this.lastTime+').xlsx');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }).catch((response)=> {
                    console.log(response);
                })
            },
            //时间函数
            getDate(datestr){
                var temp = datestr.split("-");
                var date = new Date(temp[0],temp[1]-1,temp[2]);
                return date;
            },
            //数据请求及返回数据处理
            dataAskDeal () {
                this.saveData.time=[];
                var i=0;//i作为time数组的索引
                var startTime = this.getDate(this.fisrtTime);
                var endTime = this.getDate(this.lastTime);
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
                //this.saveData.time = this.time;
                this.axios({
                    method: "post",
                    url: "/getDataByMonthOrDay",
                    data: {
                        jobType :'围网',
                        startTime : this.fisrtTime + ' 00:00:00',
                        endTime : this.lastTime + ' 23:59:59',
                        byDay:1
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
                    //this.Polydata.series=response.data.illegal;
                    this.drawPurseCharts();
                }).catch((response)=>{
                    console.log(response);
                })
            },
        }
    };
</script>
<style scoped>
  /*the whole web background style*/
  .background {
    background-image: url("../../assets/bg.png");
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
    background-repeat: no-repeat;
  }
  /*the center title sytle*/
  .content{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 90;
  }
  .centTitle {
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0.2vw;
    float: left;
    position: absolute;
    left: 30vw;
    cursor: pointer;
    width: 40vw;
    height: 5.5vh;
    top:1vh;
    margin-bottom: 0.3vh;
    font-family: FZDHTJW--GB1-0;
    font-size: 4.5vh;
    color: #58a0ee;
  }
  /*右上角按钮格式*/
  .rightIcon{
    position: absolute;
    right: 2vw;
    width: 15vw;
    height: 5.5vh;
    margin-top: 5vh;
    margin-bottom: 0.1vh;
  }
  .goback{
    cursor: pointer;
    position: absolute;
    right: 50%;
    height: 80%;
  }
  .gohome{
    cursor: pointer;
    position: absolute;
    right: 25%;
    height: 80%;
  }
  /*菜单栏*/
  .setMenu{
    position: absolute;
    width: 80vw;
    height: 6vh;
    left: 10vw;
    top: 12vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    color: #58a0ee;
    /* background-color 测试用 */
    /*background-color: #ffffff;*/
  }
  /*time为时间类别*/
  .time{
    position: absolute;
    left: 20%;
    width: 50%;
    height: 100%;
    font-size: 2.8vh;
  }
  #lastTime{
    border-color:#58a0ee;
    background-color:#0e0270;
    color:#58a0ee;
    width: 35%;
    height: 5vh;
  }
  #fisrtTime{
    border-color:#58a0ee;
    background-color:#0e0270;
    color:#58a0ee;
    width: 35%;
    height: 5vh;
  }
  /*按钮格式*/
  .button{
    position: absolute;
    left: 75%;
    width: 25%;
    height: 100%;
    font-size: 2.8vh;
  }
  /*查询按钮格式*/
  .buttonSearch{
    width:24%;
    height: 5vh;
    font-size: 2.8vh;
    background-color: #0e0270;
    color:#58a0ee;
    border-color:#58a0ee ;
    border-width: 2px;
    cursor: pointer;
  }
  /*重置按钮格式*/
  .buttonReset{
    width:24%;
    font-size: 2.8vh;
    background-color: #0e0270;
    color:#58a0ee;
    border-color:#58a0ee ;
    border-width: 2px;
    cursor: pointer;
    height: 5vh;
  }
  /*保存按钮格式*/
  .buttonSave{
    width:24%;
    font-size: 2.8vh;
    background-color: #0e0270;
    color:#58a0ee;
    border-color:#58a0ee ;
    border-width: 2px;
    cursor: pointer;
    height: 5vh;
  }
  /*结果显示区域格式*/
  .showResult{
    position: absolute;
    width: 90vw;
    height: 74vh;
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
    /*background-color: #d3dce6;*/
  }
  .GraphTitle{
    width: 60%;
    height: 5%;
    /*font-family: MicrosoftYaHei;*/
    font-size: 2.8vh;
    letter-spacing: 0.1vw;
    color: #58a0ee;
    top: -5%;
    left: 20%;
    position: absolute;
  }
  .GraphEcharts{
    top:6%;
    width: 100%;
    height: 94%;
    position: absolute;
  }
  /*正常作业渔船星状图*/
  .normalShipRadar{
    position: absolute;
    width: 30%;
    height: 40%;
    left: 12%;
    top: 50%;
    /*background-color: #d3dce6;*/
  }
  /*非法作业渔船星状图*/
  .illegalShipRadar{
    position: absolute;
    width: 30%;
    height: 40%;
    left: 46%;
    top: 50%;
    /*background-color: #d3dce6;*/
  }
  /*非法作业折线图模块格式*/
  .illegalOSBroken {
    position: absolute;
    width: 30%;
    height: 40%;
    top: 5%;
    left:33%;
    /* background-color 测试用 */
    /*background-color: greenyellow;*/
  }
  /*非法作业占比图*/
  .illegalOSPercentage {
    position: absolute;
    width: 30%;
    height: 40%;
    top: 5%;
    left:65%;
    /* background-color 测试用 */
    /*background-color: darkred;*/
  }
  input[type=date] {
    -moz-appearance:textfield;/*火狐浏览器*/
  }
  input[type=date]::-webkit-inner-spin-button,/*谷歌浏览器*/
  input[type=date]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /*去掉删除按钮*/
  input[type="date"]::-webkit-clear-button {
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
  /*年月日格式*/
  input[type="date"]::-webkit-datetime-edit-year-field {
    color: #58a0ee;
    background-color: #0e0270;
  }
  input[type="date"]::-webkit-datetime-edit-month-field {
    color: #58a0ee;
    background-color: #0e0270;
  }
  input[type="date"]::-webkit-datetime-edit-day-field {
    color: #58a0ee;
    background-color: #0e0270;
  }
  /*控制年月日之间的斜线或短横线的*/
  input[type="date"]::-webkit-datetime-edit-text {
    color: #58a0ee;
    padding: 0.5em;
  }
</style>
