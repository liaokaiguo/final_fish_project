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
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../assets/img/dog.jpg">
                    {{username}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
      name: '夹克',//默认登录用户名
      TitleMsg: "渔船作业方式智能识别系统",
      //fishing number out or in the harbour
      LoutNum: "",
      LinNum: "",
      // no-local fishing number out or in the harbour
      NLoutNum: "",
      NLinNum: "",
      // the vessel normal fishing number and the illegel fishing number
      normalFishingNum: "",
      illegelFishingNum: "",
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
            // data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356],
            data:[],
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
            // data: [895, 566, 744, 348, 554, 736, 245, 446, 746, 425, 547, 356],
            data:[],
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
              // { value: 335, name: "拖网" }, 请求后台数据
              // { value: 310, name: "刺网" },
              // { value: 234, name: "围网" },
              // { value: 135, name: "其它" }
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
              // { value: 890, name: "拖网" },
              // { value: 123, name: "张网" },
              // { value: 200, name: "围网" }
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
            // data: [995, 566, 744, 348, 554, 736, 245, 446, 746, 425, 547, 356],
            data:[],
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

  computed:{
      username() {
          let username = sessionStorage.getItem('ms_username');
          return username ? username : this.name;
      }
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

    /* 向后台请求数据 */

    this.initPortData()// 出港入港数量
    this.initMiddleBottomLEchartsOption(); //拖网
    this.initMiddleBottomREchartsOption(); //张网
    this.initRightTopEchartsOption(); //作业方式统计
    this.initRightMiddleEchartsOption(); //非法作业统计
    this.initRightBottomEchartsOption(); //刺网
    this.baiduMap();
  },
  methods: {
    //the function of draw left-bottom echarts 左下角
    drawLeftBottomCharts() {
      var leftbottomChart = this.$echarts.init(
        document.getElementById("leftbottomEchartId")
      );
      leftbottomChart.setOption(this.leftBottomOption);
        //数据没有加载出来显示加载动画,样式添加todo
        leftbottomChart.showLoading();
        //获取数据
        this.axios(
            {
                method:'post',
                url:'/getIllegal',
                data:{
                    dateTime:""
                }
            }).then(res => {
            // setTimeout(()=>{  //未来让加载动画效果明显,这里加入了setTimeout,实现2s延时
            this.normalFishingNum = res.data.normal;
            this.illegelFishingNum = res.data.illegal;
            leftbottomChart.hideLoading(); //加载出来隐藏加载动画
            leftbottomChart.setOption({  //数据添加
                series: [{
                    data: [
                        {value: res.data.normal, name: "正常作业"},
                        {value: res.data.illegal, name: "非法作业"}
                    ]
                }]
            })
            // }, 1000 )
        })

      window.addEventListener("resize", function() {
        leftbottomChart.resize();
      });
    },

      /*出入港口后台数据 */
      initPortData(){
          this.axios.get('/getPortTraffic').then((response) => {
              this.LinNum = response.data.in[0];
              this.LoutNum = response.data.out[0];
              this.NLinNum = response.data.in[1];
              this.NLoutNum = response.data.out[1];
          }).catch((response) => {
              console.log(response)
          })
      },

      /*拖网后台数据 */
      initMiddleBottomLEchartsOption(){
          var middleBottomLeftEChart = this.$echarts.init(
              document.getElementById("middleBottomLEchartsId")
          );
          middleBottomLeftEChart.setOption(this.middleBottomLOption);
          //数据没有加载出来显示加载动画,样式添加todo
          middleBottomLeftEChart.showLoading();
          this.axios.get('/getTuowangStatistic').then(res => {
              middleBottomLeftEChart.hideLoading(); //加载出来隐藏加载动画
              middleBottomLeftEChart.setOption({  //数据添加
                  series: [{
                      data: res.data.tuowang
                  }]
              })

          })
      },

      /*张网后台数据 */
      initMiddleBottomREchartsOption(){
          var middleBottomRightEChart = this.$echarts.init(
              document.getElementById("middleBottomREchartsId")
          );
          middleBottomRightEChart.setOption(this.middleBottomROption);
          //数据没有加载出来显示加载动画,样式添加todo
          middleBottomRightEChart.showLoading();
          this.axios.get('/getZhangwangStatistic').then(res => {
              middleBottomRightEChart.hideLoading(); //加载出来隐藏加载动画
              middleBottomRightEChart.setOption({  //数据添加
                  series: [{
                      data: res.data.zhangwang
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
          this.axios(
              {
                  method:'post',
                  url:'/statisShipJob',
                  data:{
                      dateTime:"",
                      idtfyFlag:"",
                  }
              }).then(res => {
              rightTopEChart.hideLoading(); //加载出来隐藏加载动画
              rightTopEChart.setOption({  //数据添加
                  series: [{
                      data: [
                          { value: res.data.tuoWang, name: "拖网" },
                          { value: res.data.ciWang, name: "刺网" },
                          { value: res.data.weiWang, name: "围网" },
                          { value: res.data.other, name: "其它" }]
                  }]
              })

          })
      },

      /*非法作业方式统计后台数据 */
      initRightMiddleEchartsOption(){
          var rightMiddleEChart = this.$echarts.init(
              document.getElementById("rightMiddleEchartsId")
          );
          rightMiddleEChart.setOption(this.rightMiddleOption);
          //数据没有加载出来显示加载动画,样式添加todo
          rightMiddleEChart.showLoading();
          this.axios.get('/getIllegalOperationStatistic').then(res => {
              console.log(res.data)
              rightMiddleEChart.hideLoading(); //加载出来隐藏加载动画
              rightMiddleEChart.setOption({  //数据添加
                  series: [{
                      data: [
                          { value: res.data.tuowang, name: "拖网" },
                          { value: res.data.zhangwang, name: "张网" },
                          { value: res.data.weiwang, name: "围网" }]
                  }]
              })

          })
      },

      /*刺网后台数据 */
      initRightBottomEchartsOption() {
          var rightBottomEChart = this.$echarts.init(
              document.getElementById("rightBottomEchartsId")
          );
          rightBottomEChart.setOption(this.rightBottomOption);
          //数据没有加载出来显示加载动画,样式添加todo
          rightBottomEChart.showLoading();
          this.axios.get('/getCiwangStatistic').then(res => {
              rightBottomEChart.hideLoading(); //加载出来隐藏加载动画
              rightBottomEChart.setOption({  //数据添加
                  series: [{
                      data: res.data.ciwang
                  }]
              })

          })
      },


      /*首页中间的地图显示*/
      baiduMap() {
         //创建实例
          var map = new BMap.Map("MiddleTopMainMap");
          //创建坐标点
          var point = new BMap.Point(122.20, 30.00);
          map.addControl(new BMap.MapTypeControl({
              mapTypes:[
                  BMAP_NORMAL_MAP,
                  BMAP_SATELLITE_MAP,
                  BMAP_HYBRID_MAP
              ]}));
          // map.addControl(new BMap.NavigationControl()); 缩放比例尺

          //初始化实例，传入坐标点并设置地图级别
          map.centerAndZoom(point, 12);
          map.enableScrollWheelZoom(true);
          window.map = map;//将map变量存储在全局

          /* 渔船标注位置*/
          this.addMarker();

      },
      addMarker(){

          // var markerArr=this.deviceArry
          var markerArr = [
              {name :"船1",terminalid: "草帽",speed : 100,locationdate:"2019-09-12 14:44:20",longitude : 122.21,latitude :29.8991},
              {name :"船2",terminalid: "红发",speed : 98,locationdate:"2019-09-12 14:44:20",longitude : 122.012123,latitude :30.0111},
              {name :"船3",terminalid: "百兽",speed : 94,locationdate:"2019-09-12 14:44:20",longitude : 122.43531,latitude :30.04511},
              {name :"船4",terminalid: "黑胡子",speed : 97,locationdate:"2019-09-12 14:44:20",longitude : 122.39631,latitude :30.08911},
              {name :"船5",terminalid: "大麻",speed : 92,locationdate:"2019-09-12 14:44:20",longitude : 122.42631,latitude :30.02311},
              {name :"船6",terminalid: "海军",speed : 95,locationdate:"2019-09-12 14:44:20",longitude : 122.3139631,latitude :30.07611},
              {name :"船7",terminalid: "和之国",speed : 88,locationdate:"2019-09-12 14:44:20",longitude : 122.181131,latitude :29.90411},
              {name :"船8",terminalid: "名1",speed : 82,locationdate:"2019-09-12 14:44:20",longitude : 122.095131,latitude :29.90411},
              {name :"船9",terminalid: "名2",speed : 81,locationdate:"2019-09-12 14:44:20",longitude : 122.011331,latitude :29.97451},
              {name :"船10",terminalid: "名3",speed : 83,locationdate:"2019-09-12 14:44:20",longitude : 122.081131,latitude :29.91721},
              {name :"船11",terminalid: "和2",speed : 84,locationdate:"2019-09-12 14:44:20",longitude : 122.180131,latitude :29.94411},
              {name :"船12",terminalid: "国5",speed : 58,locationdate:"2019-09-12 14:44:20",longitude : 122.282116,latitude :29.88481},
              {name :"船13",terminalid: "国6",speed : 28,locationdate:"2019-09-12 14:44:20",longitude : 122.282131,latitude :29.91411}];
          var point = new Array();//定义数组标注经纬信息
          var marker = new Array();//定义数组点对象信息
          var info = new Array();//定义悬浮提示信息
          //设置icon信息
          var width = 32;
          var height = 32;
          var imgSrc = require("../assets/ship32.png"); //引入icon图片 本地图要用require
          var myIcon = new BMap.Icon(imgSrc, new BMap.Size(width,height));//配置icon
          for(var i = 0; i < markerArr.length; i++){//遍历
              point[i] = new window.BMap.Point(markerArr[i].longitude,markerArr[i].latitude);
              marker[i] = new window.BMap.Marker(point[i],{icon:myIcon});//把icon和坐标添加到Marker中
              map.addOverlay(marker[i]);
              var label = new window.BMap.Label(markerArr[i].name);
              label.setStyle({  //设置提示框的样式
                  color : "#000",
                  fontSize : "12px",
                  backgroundColor :"#d5fdff",
                  border :"1px solid #ccc",
                  borderRadius:"2px",
                  padding :"2px 6px"
              });
              // marker[i].setLabel(label);
              info[i] = new window.BMap.InfoWindow(
                  "<div style='width:300px;'>"
                  +"<p>渔船编号："+markerArr[i].name+"</p>"
                  +"<p>渔船名："+markerArr[i].terminalid+"</p>"
                  +"<p>航行时速(m/s)："+markerArr[i].speed+"</p>"
                  +"<p>定位时间："+markerArr[i].locationdate+"</p>"
                  +"<p>地址经度："+markerArr[i].longitude+"</p>"
                  +"<p>地址纬度："+markerArr[i].latitude+"</p>"
                  // +"<p>详细地址："+markerArr[i].address+"</p>"
                  +"</div>"
              );//悬浮提示信息
              this.addInfo(info[i],marker[i])
          }
      },
      addInfo(info,marker){
          marker.addEventListener("click", function(e){
              var p = e.target
              var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
              map.centerAndZoom(point, 14);
              this.openInfoWindow(info)
          })
      },

      /*用户中心/退出*/
      handleCommand(command) {
          if(command == 'loginOut'){
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
  margin-top: 88px;
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
  height: 66%;
  margin: 0px;
  padding-bottom: 0px;

}
.wholemiddlebottom {
  /*float: left;*/
  position: absolute;
  /*background-color: red;*/
  width: 100%;
  height: 38.8%;
  margin-top: 559px;
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
  margin-top: 38px;
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
  margin-top: 40px;
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
  margin-top: 344px;
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
  margin-top: 646px;
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

/*用户信息*/

.user-info {
  float: right;
  padding-right: 10px;
  margin-top: 5px;
  font-size: 16px;
  color: #fff;
}
.user-info .el-dropdown-link{
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}
.user-info .user-logo{
  position: absolute;
  left:-10px;
  top:-10px;
  width:40px;
  height:40px;
  border-radius: 50%;
}
.el-dropdown-menu__item{
  width :80px;
  text-align: center;
}

</style>
