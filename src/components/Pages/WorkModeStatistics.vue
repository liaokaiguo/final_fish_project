<template>
  <div class="background">
    <div>
      <div class="lefttext">渔船作业方式统计及查询</div>
      <div class="centTitle">渔船作业方式智能识别系统</div>
      <!--          <div class="rightleftIcon">-->
      <!--            <span v-on:click="$router.back(-1)">-->
      <!--              <img class="backico-class" src="../../assets/backico.png" style="cursor:pointer" alt="返回">-->
      <!--            </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
      <!--            <router-link to="/welcome">-->
      <!--              <img class="homeico-class" src="../../assets/homeico.png">-->
      <!--            </router-link>-->
      <!--          </div>-->
      <!-- 右上角导航按钮 -->
      <NavigaIcon></NavigaIcon>
      <!--个人信息中心-->
      <UserInfo></UserInfo>
    </div>
    <div>

      <div class="searchBox">
        <el-form ref="selectForm"
                 size="small"
                 :model="select" :inline="true" class="select-form-Box">
          <el-form-item prop="startDate">
            <el-date-picker
              v-model="select.startDate"
              type="date"
              placeholder="作业日期"
              value-format="yyyy-MM-dd" style="width: 10vw;">
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="legal">
            <el-select v-model="select.legal" placeholder="是否合规" style="width: 10vw;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="workMode">
            <el-select v-model="select.workMode" placeholder="作业方式" style="width: 10vw;">
              <el-option
                v-for="item in workOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item align="center">
            <el-button type="primary" @click="search(select)" style="width: 10vw;">查询</el-button>
            <el-button @click="resetForm('selectForm')" style="width: 10vw;">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="dataBox">
        <el-table
          class="table-data-class"
          height="98%"
          size="small"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          v-loading="tableDataLoading"
          element-loading-text="数据量较大，玩命加载中"
          border
          :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}">
          <el-table-column
            prop="legal"
            label="是否合规">
            <template slot-scope="scope">
              <span>{{scope.row.idtfyFlag=== 1?'正常作业':'违规作业'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ship.shipNo"
            label="渔船编号">
          </el-table-column>
          <el-table-column
            prop="idtfyJobtype"
            label="作业方式">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="jobTime"
            label="持续时间(h)">
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class="pagingBox">
        <el-pagination align='cneter' @size-change="handleSizeChange" class="paging-info-class"
                       small
                       background
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,5,10,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData.length">
        </el-pagination>
      </div>

      <div class="wmEchartsBox">
        <div id="workModeEcharts" class="work-mode-class">
        </div>
      </div>


    </div>

  </div>
</template>
<script>
    import echarts from 'echarts'
    import NavigaIcon from "@/components/common/NavigaIcon";
    import UserInfo from "@/components/common/UserInfo";

    export default {
        components: {
            UserInfo,
            NavigaIcon,
        },
        data() {
            return {
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 10, // 每页的数据条数

                options: [{
                    value: '1',
                    label: '正常作业'
                }, {
                    value: '0',
                    label: '违规作业'
                }],
                workOptions: [
                    {
                        value: '围网',
                        label: '围网'
                    },
                    {
                        value: '拖网',
                        label: '拖网'
                    },
                    {
                        value: '张网',
                        label: '张网'
                    },
                    {
                        value: '刺网',
                        label: '刺网'
                    },
                    {
                        value: '钓具',
                        label: '钓具'
                    },
                    {
                        value: '杂渔具',
                        label: '杂渔具'
                    },
                    {
                        value: '笼壶',
                        label: '笼壶'
                    }],

                select: {
                    startDate: '',
                    legal: '',
                    workMode: '',
                },

                tableData: [],
                tableDataLoading: true,
                workModeEchartsOption: {
                    grid: {
                        left: "10%",
                        top: "5%",
                        width: "80%",
                        height: "80%"
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: "horizontal",
                        x: "center",
                        top: "5%",
                        data: ["围网", "拖网", "张网", "刺网", "其它"],
                        textStyle: {
                            color: "default",
                            fontSize: "90%",
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
                                        fontSize: "90%",
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
                                {value: 300, name: "围网"},
                                {value: 300, name: "拖网"},
                                {value: 300, name: "张网"},
                                {value: 300, name: "刺网"},
                                {value: 300, name: "其它"}
                            ]
                        }
                    ],
                    color: ["#6bc1ff", "#3cedbc", "#eeb110", "#ffd989",
                        "#eea5d1"]
                },


            }

        },
        mounted() {
            this.drawGraph();
            this.initWorkModeStatistic();
        },
        methods: {
            //分页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentPage = val;
            },

            /*画饼图*/
            drawGraph() {
                let myEcharts = this.$echarts.init(document.getElementById("workModeEcharts"));
                myEcharts.setOption(this.workModeEchartsOption);
                //获取后端数据
                this.axios(
                    {
                        method: 'post',
                        url: '/statisShipJob',
                        data: {
                            dateTime: "",
                            idtfyFlag: "",
                        }
                    }).then(res => {
                    myEcharts.hideLoading(); //加载出来隐藏加载动画
                    myEcharts.setOption({  //数据添加
                        series: [{
                            data: [
                                {value: res.data.weiWang, name: "围网"},
                                {value: res.data.tuoWang, name: "拖网"},
                                {value: res.data.zhangWang, name: "张网"},
                                {value: res.data.ciWang, name: "刺网"},
                                {value: res.data.other, name: "其它"}]
                        }]
                    })
                })
                window.addEventListener("resize", function () {
                    myEcharts.resize();
                });
            },
            beforeDestroy() {
                if (this.myEcharts) {
                    this.myEcharts.clear();
                }
            },

            /*重置表单*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.initWorkModeStatistic();
                this.drawGraph();
            },

            /*列表数据初始加载*/
            initWorkModeStatistic() {
                this.tableDataLoading = true; //先loading动画
                this.axios({
                    method: "post",
                    url: "/queryShipJob",
                    data: {
                        dateTime: "",
                        idtfyJobtype: "",
                        idtfyFlag: "",
                    }
                }).then((response) => {
                    this.tableDataLoading = false;// loading动画去掉
                    this.tableData = response.data;
                }).catch((response) => {
                    console.log(response);
                })
            },

            /*按条件查询*/
            search(select) {
                //列表数据更新
                console.log(this.select.startDate)
                console.log(this.select.workMode)
                console.log(this.select.legal)
                this.tableDataLoading = true; //先loading动画
                this.axios({
                    method: "post",
                    url: "/queryShipJob",
                    data: {
                        dateTime: this.select.startDate,
                        idtfyJobtype: this.select.workMode,
                        idtfyFlag: this.select.legal,
                    }
                }).then((response) => {
                    this.tableDataLoading = false;// loading动画去掉
                    this.tableData = response.data;

                }).catch((response) => {
                    console.log(response);
                })

                //饼图数据更新
                let myEcharts = this.$echarts.init(document.getElementById("workModeEcharts"));
                this.axios(
                    {
                        method: 'post',
                        url: '/statisShipJob',
                        data: {
                            dateTime: this.select.startDate,
                            idtfyFlag: this.select.legal,
                        }
                    }).then(res => {
                    myEcharts.hideLoading(); //加载出来隐藏加载动画
                    myEcharts.setOption({  //数据添加
                        series: [{
                            data: [
                                {value: res.data.weiWang, name: "围网"},
                                {value: res.data.tuoWang, name: "拖网"},
                                {value: res.data.zhangWang, name: "张网"},
                                {value: res.data.ciWang, name: "刺网"},
                                {value: res.data.other, name: "其它"}]
                        }]
                    })
                })
            },

        },


    }
</script>
<style scoped>

  table {
    margin: 0;
    font-weight: normal;
    padding: 0;
    list-style: none;
  }

  /*the whole web background style*/
  .background {
    background-image: url("../../assets/background_high.png");
    background-size: 100% 100%;
    height: 100%;
    position: absolute;
    width: 100%;
    background-repeat: no-repeat;
  }

  /*the center title sytle*/
  .centTitle {
    position: absolute;
    left: 35vw;
    width: 30vw;
    top: 0;
    height: 5.4vh;
    text-align: center;
    font-family: Microsoft YaHei;
    font-size: 2.3vw;
    display: inline-block;
    letter-spacing: 0.2vw;
    color: #5bb1ff;
  }

  .lefttext {
    position: absolute;
    float: left;
    left: 3%;
    top: 5vh;
    font-size: 1.8vw;
    color: #ffffff;
  }

  .rightleftIcon {
    position: absolute;
    width: 10%;
    height: 10%;
    left: 25vw;
    top: 5vh;
  }

  .backico-class {
    position: absolute;
    left: 10%;
    width: 18%;
  }

  .homeico-class {
    position: absolute;
    left: 50%;
    width: 18%;
  }

  .searchBox {
    position: absolute;
    width: 60%;
    height: 10%;
    top: 10vh;
    left: 3vw;
    overflow: hidden;
  }

  .select-form-Box {
    position: absolute;
    top: 10%;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .dataBox {
    position: absolute;
    width: 60%;
    height: 75%;
    top: 18vh;
    left: 3vw;
  }

  .table-data-class {
    position: absolute;
    left: 1%;
    width: 98%;
    height: 95%;
  }

  .pagingBox {
    position: absolute;
    width: 50%;
    height: 6%;
    left: 2vw;
    bottom: 1vh;
  }

  .paging-info-class {
    width: auto;
  }

  .wmEchartsBox {
    position: absolute;
    width: 30%;
    height: 45%;
    top: 30vh;
    right: 5vw;
  }

  .work-mode-class {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
  }


</style>
<style>
  .table-data-class .el-table__header th, .table-data-class .el-table__header tr {
    color: black !important;
    text-align: center !important;
  }

  .table-data-class .el-table__body td, .table-data-class.el-table__body th {
    color: black !important;
    text-align: center !important;
  }

  /*滚动条小方块*/
  .table-data-class .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .table-data-class .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #58a0ee;
    border-radius: 3px;
  }

  .pagingBox .el-pagination__total {
    color: white !important;
  }

  .pagingBox .el-pagination__jump {
    color: white !important;
  }

</style>
