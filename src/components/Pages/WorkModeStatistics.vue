<template>
  <div class="background">
    <div>
      <el-row>
        <el-col :span="6">
          <div class="lefttext">渔船作业方式统计及查询</div>
        </el-col>
        <el-col :span="12">
          <div class="centTitle">渔船作业方式智能识别系统</div>
        </el-col>
        <el-col :span="6">
          <div class="rightleftIcon">
            <span v-on:click="$router.back(-1)">
              <img src="../../assets/rebackLastIcon.png" style="cursor:pointer" alt="返回">
            </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/welcome">
              <img src="../../assets/rebackMainIcon.png">
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
         <el-col :span="24" >
          <div >
            <el-form ref="selectForm" :model="select" :inline="true" class="searchBox">
              <el-form-item prop="workDate" >
                <el-input v-model="select.wordDate"
                          placeholder="作业日期">
                </el-input>
              </el-form-item>

              <el-form-item prop="legal" >
                <el-select v-model="select.legal" placeholder="是否合规">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="workMode" >
                <el-select v-model="select.workMode" placeholder="作业方式">
                  <el-option
                    v-for="item in workOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item align="center">
                <el-button type="primary" @click="search(select)">查询</el-button>
                <el-button  @click="resetForm('selectForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16" >
          <div class="dataBox">
            <el-table
            :data="tableData"
            style="width: 100%"
            border
            :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}">
              <el-table-column
                prop="legal"
                label="是否合规"
                width="120">
              </el-table-column>
              <el-table-column
                prop="boatid"
                label="渔船编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="workmode"
                label="作业方式"
                width="120">
              </el-table-column>
              <el-table-column
                prop="starttime"
                label="开始时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="endtime"
                label="结束时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="duration"
                label="作业持续时间"
                width="140">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="wmEchartsBox" id="workModeEcharts" >

          </div>
        </el-col>
      </el-row>


    </div>

  </div>
</template>
<script>
    import echarts from 'echarts'
export default {
  data() {
      return{
          options: [{
              value: '1',
              label: '正常作业'
          },  {
              value: '0',
              label: '违规作业'
          }],
          workOptions: [{
              value: '1',
              label: '拖网'
          },  {
              value: '2',
              label: '张网'
          }, {
              value: '3',
              label: '刺网'
          }, {
              value: '4',
              label: '围网'
          }, {
              value: '5',
              label: '钓网'
          }],

          select:{
              wordDate:'',
              legal:'',
              workMode:'',
          },

          tableData: [{
              legal: '正常作业',
              boatid: 'MESS3377373',
              workmode: '拖网',
              starttime: '2019-08-08 12:22:33',
              endtime: '2019-08-08 19:22:33',
              duration:'7h'
          }, {
              legal: '正常作业',
              boatid: 'MSDS33567',
              workmode: '拖网',
              starttime: '2019-08-18 10:22:33',
              endtime: '2019-08-18 14:22:33',
              duration:'4h'
          }, {
              legal: '正常作业',
              boatid: 'WWDSQ1233473',
              workmode: '张网',
              starttime: '2019-08-12 08:22:33',
              endtime: '2019-08-12 18:22:33',
              duration:'10h'
          }, {
              legal: '违规作业',
              boatid: 'WSDW987876',
              workmode: '刺网',
              starttime: '2019-08-31 20:22:33',
              endtime: '2019-08-31 23:22:33',
              duration:'3h'
          }],

          workModeEchartsOption: {
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
                      color: "default",
                      fontSize: "26",
                  }
              },
              series: [
                  {
                      name: "统计分析",
                      type: "pie",
                      center: ["50%", "60%"],
                      radius: ["40%","70%"],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                              show: false,
                              position: "center"
                          },
                          emphasis: {
                              show: true,
                              textStyle: {
                                  fontSize: "40",
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
              color: ["#6bc1ff", "#3cedbc", "#eeb110", "#ef09ed"]
          },


      }

  },
    mounted() {
        this.drawGraph();
    },
    methods: {
        drawGraph() {

            let myEcharts = this.$echarts.init(document.getElementById("workModeEcharts"));
            myEcharts.setOption(this.workModeEchartsOption);

        },
        beforeDestroy() {
            if (this.myEcharts) {
                this.myEcharts.clear();
            }
        },

        ///重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        search(select) {
            console.log(select.inOrOut)
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
  background-image: url("../../assets/bg.png");
  background-size: 100% 100%;
  height: 1080px;
  position: absolute;
  width: 1920px;
  background-repeat: no-repeat;
}
/*the center title sytle*/
.centTitle {
  width: 586px;
  height: 43px;
  font-family: FZDHTJW--GB1-0;
  font-size: 43px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 5px;
  color: #58a0ee;
  margin-top: 20px;
  margin-left: 200px;
  float: left;
}
.lefttext {
  margin-left: 70px;
  margin-top: 40px;
  float: left;
  font-size: 32px;
  color: #ffffff;
}
.rightleftIcon {
  margin-left: 300px;
  margin-top: 50px;
  float: left;
}
.searchBox{
  margin-left: 100px;
  margin-top: 50px;
  float: left;
  }
.dataBox{
  margin-left: 100px;
  margin-top: 20px;
  float: left;
}
.wmEchartsBox{
  margin-left: 0px;
  width: 400px;
  height: 400px;
  float: left;
}






</style>
