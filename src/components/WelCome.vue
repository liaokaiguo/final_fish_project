<template>
  <div class="background">
    <div>
      <ul>
        <li class="centTitle">{{TitleMsg}}</li>
      </ul>
    </div>
    <!--the left/ middle /right/ model-->
    <!--the left model-->
    <div class="wholeleft">
      <!--the left-top model code-->
      <div class="lefttopbackground">
        <ul>
          <li>
            <span class="leftbackgroundTitle">渔船出入港</span>
            <span class="leftmoreText">更多</span>
            <router-link to="/passPort">
              <img class="leftmoreICO" src="../assets/moreICO.png">
            </router-link>
          </li>
          <!--换行后有利于布局，相互之间不影响-->
          <br>
          <li>
            <table class="leftTopTable" border="1">
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
          </li>
        </ul>
      </div>
      <!--the left-middle model code-->
      <div class="leftmiddlebackground">
        <ul>
          <li>
            <span class="leftbackgroundTitle">渔船作业</span>
            <span class="leftmoreText">更多</span>
            <a href="#">
              <img class="leftmoreICO" src="../assets/moreICO.png">
            </a>
          </li>
          <!--换行后有利于布局，相互之间不影响-->
          <br>
          <li>
            <table class="leftmiddletable" border="0">
              <tr>
                <td class="leftmiddleContent">正常作业 :</td>
                <td class="leftmiddleContentNum" align="left">{{normalFishingNum}}</td>
              </tr>
              <tr>
                <td class="leftmiddleContent">非法作业 :</td>
                <td class="leftmiddleContentNum" align="left">{{illegelFishingNum}}</td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
      <!--the left-bottom model code-->
      <div class="leftbottombackground">
        <ul>
          <li>
            <span class="leftbottombackgroundTitle">非法作业占比</span>
            <span class="leftbottommoreText">更多</span>
            <a href="#">
              <img class="leftmoreICO" src="../assets/moreICO.png">
            </a>
          </li>
          <!--换行后有利于布局，相互之间不影响 -->
          <br>
          <li>
            <div id="leftbottomEchartId" class="leftbottomEchart"></div>
          </li>
        </ul>
      </div>
    </div>
    <!--the left-top model code end-->
    <!--the middle whole div style DASDFA-->
    <div class="wholemiddle">
      <div class="middletopImage" id="MiddleTopMainMap"></div>
      <!--break the different div-->
      <div class="wholemiddlebottom">
        <div class="middlebottomleftbackground">
          <ul>
            <li>
              <span class="leftbackgroundTitle">拖网统计</span>
              <span class="leftmoreText">更多</span>
              <router-link to="/trawlSA">
                <img class="leftmoreICO" src="../assets/moreICO.png">
              </router-link>
            </li>
            <!--换行后有利于布局，相互之间不影响-->
            <br>
            <li>
              <el-row>
                <el-col :span="24">
                  <middleBottomLREcharts
                    v-bind:echartId="'middleBottomLEchartsId'"
                    :OptionData="middleBottomLOption"
                  ></middleBottomLREcharts>
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>
        <!--the right-middle model code-->
        <div class="middlebottomrightbackground">
          <ul>
            <li>
              <span class="leftbackgroundTitle">张网统计</span>
              <span class="leftmoreText">更多</span>
              <router-link to="/seineSA">
                <img class="leftmoreICO" src="../assets/moreICO.png">
              </router-link>
            </li>
            <!--换行后有利于布局，相互之间不影响-->
            <br>
            <li>
              <el-row>
                <el-col :span="24">
                  <middleBottomLREcharts
                    v-bind:echartId="'middleBottomREchartsId'"
                    :OptionData="middleBottomROption"
                  ></middleBottomLREcharts>
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--the middle whole div style end -->
    <!--the whole right model code-->
    <div class="wholeright">
      <!--the left-top model code-->
      <div class="righttopbackground">
        <ul>
          <li>
            <span class="rightbackgroundTitle">渔船作业统计</span>
            <span class="rightmoreleftText">更多</span>
            <a href="#">
              <img class="rightmoreleftICO" src="../assets/moreICO.png">
            </a>
          </li>
          <!--换行后有利于布局，相互之间不影响-->
          <br>
          <li>
            <el-row>
              <el-col :span="24">
                <rightBottomEcharts
                  v-bind:echartId="'rightTopEchartsId'"
                  :OptionData="rightTopOption"
                ></rightBottomEcharts>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
      <!--the right-middle model code-->
      <div class="rightmiddlebackground">
        <ul>
          <li>
            <span class="rightbackgroundTitle">非法作业统计</span>
            <span class="rightmoreleftText">更多</span>
            <a href="#">
              <img class="rightmoreleftICO" src="../assets/moreICO.png">
            </a>
          </li>
          <!--换行后有利于布局，相互之间不影响-->
          <br>
          <li>
            <el-row>
              <el-col :span="24">
                <rightBottomEcharts
                  v-bind:echartId="'rightMiddleEchartsId'"
                  :OptionData="rightMiddleOption"
                ></rightBottomEcharts>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
      <!--the right-bottom model code-->
      <div class="rightbottombackground">
        <ul>
          <li>
            <span class="rightbackgroundTitle">刺网统计</span>
            <span class="rightmoreleftText">更多</span>
            <router-link to="/gillNetStAnalysis">
              <img class="rightmoreleftICO" src="../assets/moreICO.png">
            </router-link>
          </li>
          <!--换行后有利于布局，相互之间不影响-->
          <br>
          <li>
            <el-row>
              <el-col :span="24">
                <rightBottomEcharts
                  v-bind:echartId="'rightBottomEchartsId'"
                  :OptionData="rightBottomOption"
                ></rightBottomEcharts>
              </el-col>
            </el-row>
          </li>
        </ul>
      </div>
    </div>
    <!--the whole right model code-->
    <!-- <img src="../assets/bg.jpg" width="100%" height="100%">-->
    <!-- the last bottom Nav-->
    <div class="lastbottom">
      <ul>
        <li>
          <router-link to="/mapShow" class="lastbottomtext">地图显示</router-link>&nbsp;&nbsp;
          <router-link to="/passPort" class="lastbottomtext">渔船出入港</router-link>&nbsp;&nbsp;
          <router-link to="/workModeSta" class="lastbottomtext">渔船作业方式统计及查询</router-link>&nbsp;&nbsp;
          <router-link to="#" class="lastbottomtext">船舶明细</router-link>&nbsp;&nbsp;
          <router-link to="/trawlSA" class="lastbottomtext">拖网作业方式统计及分析</router-link>&nbsp;&nbsp;
          <router-link to="/gillNetStAnalysis" class="lastbottomtext">刺网作业方式统计及分析</router-link>&nbsp;&nbsp;
          <router-link to="/seineSA" class="lastbottomtext">张网作业方式统计及分析</router-link>&nbsp;&nbsp;
        </li>
      </ul>
    </div>
    <!--<div class="lastbottom">
      <BottomNav></BottomNav>
    </div>-->
    <!--the last bottom Nav end-->
  </div>
</template>

<script>
// the common line echarts vue including the middle-bottom-left and the middle-bottom-right echarts
import middleBottomLREcharts from "@/components/common/MiddleBottomEchartsUtils";
// the common echarts vue including the right-top,right-middle and right-bottom echarts
import rightBottomEcharts from "@/components/common/RightEchartsUtils";
import BottomNav from "@/components/common/BottomNav";
//the gill net statistical analysis in the fill
import gillNetStAnalysis from "@/components/Pages/gillNetStatisticalAnalysis";
import trawlSA from "@/components/Pages/trawlStatisticalAnalysis";
import seineSA from "@/components/Pages/seineStatisticalAnalysis";
import mapShow from "@/components/Pages/BaiduMapShow";
import passPort from "@/components/Pages/EntryAndExitPort";
import workModeSta from "@/components/Pages/WorkModeStatistics"

export default {
  name: "WelCome",
  data() {
    return {
      TitleMsg: "渔船作业方式智能识别系统",
      //fishing number out or in the harbour
      LoutNum: "123",
      LinNum: "834",
      // no-local fishing number out or in the harbour
      NLoutNum: "103",
      NLinNum: "889",
      // the vessel normal fishing number and the illegel fishing number
      normalFishingNum: "890",
      illegelFishingNum: "897",
      //define
      leftBottomOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          top: "5%",
          data: ["非法作业", "正常作业"],
          textStyle: {
            color: "default"
          }
        },
        series: [
          {
            name: "占比情况",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 890, name: "正常作业" },
              { value: 200, name: "非法作业" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        color: ["#5b9bff", "#ed7d31"]
      },
      middleBottomLOption: {
        color: ["#5b9bff", "#ed7d31"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: [
          {
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
          }
        ],
        yAxis: [
          {
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
          }
        ],
        series: [
          {
            name: "每月数量",
            type: "line",
            smooth: true,
            data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356],
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
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
          }
        ]
      },
      middleBottomROption: {
        color: ["#f44"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: [
          {
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
          }
        ],
        yAxis: [
          {
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
          }
        ],
        series: [
          {
            name: "每月数量",
            type: "line",
            smooth: true,
            data: [895, 566, 744, 348, 554, 736, 245, 446, 746, 425, 547, 356],
            lineStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.7,
                colorStops: [
                  {
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
          }
        ]
      },
      rightTopOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          top: "5%",
          data: ["拖网", "刺网", "围网", "其它"],
          textStyle: {
            color: "default"
          }
        },
        series: [
          {
            name: "统计分析",
            type: "pie",
            center: ["50%", "60%"],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
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
              { value: 335, name: "拖网" },
              { value: 310, name: "刺网" },
              { value: 234, name: "围网" },
              { value: 135, name: "其它" }
            ]
          }
        ],
        color: ["#5b9bff", "#ed7d31", "#a5a5a5", "#efab00"]
      },
      rightMiddleOption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          top: "5%",
          data: ["拖网", "张网", "围网"],
          textStyle: {
            color: "default"
          }
        },
        series: [
          {
            name: "占比情况",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 890, name: "拖网" },
              { value: 123, name: "张网" },
              { value: 200, name: "围网" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ],
        color: ["#5b9bff", "#ed7d31", "#005ec2"]
      },
      rightBottomOption: {
        color: ["#f44"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: [
          {
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
          }
        ],
        yAxis: [
          {
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
          }
        ],
        series: [
          {
            name: "每月数量",
            type: "line",
            smooth: true,
            data: [995, 566, 744, 348, 554, 736, 245, 446, 746, 425, 547, 356],
            lineStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.7,
                colorStops: [
                  {
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
                colorStops: [
                  {
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
          }
        ]
      }
    };
  },
  components: {
    // LeftTop
    middleBottomLREcharts,
    rightBottomEcharts,
    BottomNav,
    gillNetStAnalysis,
    trawlSA,
    seineSA,
    mapShow,
    passPort,
    workModeSta
  },
  created() {
        /* 向后台请求数据 */
        this.axios.get('http://192.168.0.221:8080/test').then((response) => {
            // this.normalNum = response.data.normal;
            // this.illegalNum = response.data.illegal;
            console.log(response.data)
        }).catch((response) => {
            console.log(response)
        })
   },
  mounted() {
    //the draw left-bottom echarts function
    this.drawLeftBottomCharts();
    /*var leftbottomChart = this.$echarts.init(
      document.getElementById("leftbottomEchartId")
    );
    leftbottomChart.setOption(this.leftBottomOption);
    window.addEventListener("resize", function() {
      leftbottomChart.resize();
    });*/
    this.baiduMap();
  },
  methods: {
    //the function of draw left-bottom echarts
    drawLeftBottomCharts() {
      var leftbottomChart = this.$echarts.init(
        document.getElementById("leftbottomEchartId")
      );
      leftbottomChart.setOption(this.leftBottomOption);
      window.addEventListener("resize", function() {
        leftbottomChart.resize();
      });
    },
      baiduMap() {
         //创建实例
          var map = new BMap.Map("MiddleTopMainMap");
          //创建坐标点
          var point = new BMap.Point(122.20, 30.00);
          //初始化实例，传入坐标点并设置地图级别
          map.centerAndZoom(point, 12);
          map.enableScrollWheelZoom(true);
      }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
a,
input,
button,
select,
span,
td,
table {
  margin: 0;
  font-weight: normal;
  padding: 0;
  list-style: none;
}


/*the whole web background style*/
.background {
  background-image: url("../assets/bg.png");
  background-size: 100% 100%;
  height: 1080px;
  position: absolute;
  width: 1920px;
  background-repeat: no-repeat;
}
/*the whole div style*/
.wholeleft {
  margin-top: 58px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 35px;
  padding-left: 0px;
  width: 22.5%;
  height: 85%;
  float: left;
  position: absolute;
  /* background-color: #f7f7f7;*/
  align-content: center;
}
/*the left-top background style*/
.lefttopbackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 33%;
  width: 99%;
  margin: 0px;
  padding: 0px;
  float: left;
}
/*the left-middle background style*/
.leftmiddlebackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 33%;
  width: 99%;
  margin-top: 304px;
  padding-bottom: 1px;
  float: left;
}
/*the left middle content text illeage fishing and normal fishing number*/
.leftmiddleContent {
  /*margin-top: 60px;
  margin-left: 40px;*/
  width: 150px;
  height: 36px;
  font-family: MicrosoftYaHei;
  font-size: 36px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -4px;
  color: #5b9bd5;
  /*float: left;*/
}
.leftmiddleContentNum {
  width: 130px;
  height: 36px;
  font-family: LcdD;
  font-size: 36px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 7px;
  color: #efab00;
}
/*the content text layer*/
.leftmiddletable {
  width: 350px;
  height: 172px;
  opacity: 1;
  margin-left: 39px;
  margin-top: 41px;
}

/*the left-bottom background style*/
.leftbottombackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 33%;
  width: 99%;
  margin-top: 606px;
  padding-bottom: 1px;
  float: left;
}
.leftbottombackgroundTitle {
  width: 120px;
  height: 21px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #f7f7f7;
  margin-top: 5px;
  margin-left: 36px;
  float: left;
}
.leftbottommoreText {
  width: 38px;
  height: 21px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #f7f7f7;
  margin-top: 5px;
  margin-left: 170px;
  float: left;
}
.leftbottomEchart {
  /*width: 350px;*/
  width: 80%;
  height: 240px;
  opacity: 1;
  margin-left: 39px;
  margin-top: 10px;
  padding: 0;
}
/*the left-top title style. same with other title*/
.leftbackgroundTitle {
  width: 98px;
  height: 21px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #f7f7f7;
  margin-top: 5px;
  margin-left: 36px;
  float: left;
}
/*the "more" and the ICON style.same with other title*/
.leftmoreText {
  width: 38px;
  height: 21px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #f7f7f7;
  margin-top: 5px;
  margin-left: 198px;
  float: left;
}
.leftmoreICO {
  /*background-image: url("../assets/moreICO.png");
  background-size: 100% 100%;*/
  width: 14px;
  height: 11px;
  margin-top: 12px;
  margin-left: 5px;
  float: left;
  overflow: auto;
  /*position: absolute;*/
}
/*左上表格的样式*/
.leftTopTable {
  width: 350px;
  height: 172px;
  opacity: 1;
  margin-left: 39px;
  margin-top: 41px;
}
.leftTopTable td {
  color: #f7f7f7;
}
/*中间“渔船作业方式智能识别系统”文字的样式*/
.centTitle {
  margin-top: 25px;
  margin-left: 670px;
  width: 586px;
  height: 43px;
  font-family: FZDHTJW--GB1-0;
  font-size: 43px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 5px;
  color: #5696da;
  position: absolute;
  float: left;
}
/*the whole middle div style*/
.wholemiddle {
  margin-top: 109px;
  margin-left: 492px;
  float: left;
  position: absolute;
  /* background-color: #f7f7f7;*/
  height: 80%;
  width: 48%;
}
.middletopImage {
  /*float: left;*/
  position: absolute;
  background-color: blue;
  width: 100%;
  height: 61%;
  margin: 0px;
  padding-bottom: 0px;

}
.wholemiddlebottom {
  /*float: left;*/
  position: absolute;
  /*background-color: red;*/
  width: 100%;
  height: 38.8%;
  margin-top: 529px;
  padding: 0;
}
.middlebottomleftbackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 88%;
  width: 47%;
  margin-top: 30px;
  margin-left: 20px;
  padding-bottom: 1px;
  float: left;
}
/*the left and the right echarts css*/
.middlebottomleftEcharts {
  margin-top: 45px;
  margin-left: 10px;
  position: absolute;
  float: left;
  width: 342px;
  height: 173px;
}
.middlebottomrightbackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 88%;
  width: 47%;
  margin-top: 30px;
  margin-left: 480px;
  padding: 0px;
  float: left;
}
/*the whole right div style*/
.wholeright {
  margin-top: 58px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 1436px;
  padding-left: 0px;
  width: 22.5%;
  height: 85%;
  float: left;
  position: absolute;
  /*background-color: #f7f7f7;*/
  align-content: center;
}
/*the right-top background style*/
.righttopbackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 33%;
  width: 99%;
  margin: 0px;
  padding: 0px;
  float: left;
}
/*the right-middle background style*/
.rightmiddlebackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 33%;
  width: 99%;
  margin-top: 304px;
  padding-bottom: 1px;
  float: left;
}
/*the right-bottom background style*/
.rightbottombackground {
  align-content: center;
  background-image: url("../assets/msgBg.png");
  background-size: 100% 100%;
  position: absolute;
  height: 33%;
  width: 99%;
  margin-top: 606px;
  padding-bottom: 1px;
  float: left;
}
/*the whole right div background title style*/
.rightbackgroundTitle {
  width: 140px;
  height: 21px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #f7f7f7;
  margin-top: 5px;
  margin-left: 36px;
  float: left;
}
/*the "more" and the ICON style in the right dive*/
.rightmoreleftText {
  width: 38px;
  height: 21px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #f7f7f7;
  margin-top: 5px;
  margin-left: 150px;
  float: left;
}
.rightmoreleftICO {
  /*background-image: url("../assets/moreICO.png");
  background-size: 100% 100%;*/
  width: 14px;
  height: 11px;
  margin-top: 12px;
  margin-left: 4px;
  float: left;
  overflow: auto;
  /*position: absolute;*/
}
/*the last bottom image and text style*/
.lastbottom {
  align-content: center;
  background-image: url("../assets/lastbottomBg.png");
  background-size: 100% 100%;
  position: absolute;
  width: 1425px;
  height: 22px;
  opacity: 0.66;
  margin-top: 1016px;
  margin-left: 252px;
  margin-bottom: 42px;
  padding-bottom: 1px;
  float: left;
}
.lastbottomtext {
  height: 20px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #f7f7f7;
  text-decoration: none;
}

</style>
