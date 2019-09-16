<template>
  <div class="background">
    <div>
      <el-row>
        <el-col :span="6">
          <div class="lefttext">渔船出入港查询</div>
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
         <el-col :span="24" class="searchBox">
          <div >
            <el-form ref="selectForm" :model="select" :inline="true">
              <el-form-item prop="boatId" >
                <el-input v-model="select.boatId"
                          placeholder="渔船编号">
                </el-input>
              </el-form-item>

              <el-form-item prop="inOrOut" >
                <el-select v-model="select.inOrOut" placeholder="出港/入港">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item  prop="beginDate"  >
                <el-date-picker class="input-date-class"
                                v-model="select.passDate"
                                type="datetime"
                                placeholder="日期时间"
                                align="right"
                                default-time="12:00:00"
                                :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>

              <el-form-item prop="portName" >
                <el-input v-model="select.portName"
                          placeholder="港口名">
                </el-input>
              </el-form-item>

              <el-form-item align="center">
                <el-button type="primary" @click="search(select)">搜索</el-button>
                <el-button  @click="resetForm('selectForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" >
          <div class="dataBox">
            <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
            border
            :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}">
              <el-table-column
                prop="boatid"
                label="渔船编号"
                width="260">
              </el-table-column>
              <el-table-column
                prop="inorout"
                label="出港/入港"
                width="260">
              </el-table-column>
              <el-table-column
                prop="passdate"
                label="时间"
                width="300">
              </el-table-column>
              <el-table-column
                prop="portname"
                label="港口名"
                width="300">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" :offset="6">
          <!-- 分页器 -->
          <div class="pagingBox" style="margin-top:15px;">
            <el-pagination align='cneter' @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[1,5,10,20]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="tableData.length">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

    </div>

  </div>
</template>
<script>
//seine（围网）fishing vessel statistic and analysis
export default {
  data() {
      return{
          currentPage: 1, // 当前页码
          total: 20, // 总条数
          pageSize: 10, // 每页的数据条数

          options: [{
              value: '1',
              label: '出港'
          },  {
              value: '2',
              label: '入港'
          }],

          pickerOptions: {
              shortcuts: [{
                  text: '今天',
                  onClick(picker) {
                      picker.$emit('pick', new Date());
                  }
              }, {
                  text: '昨天',
                  onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                  }
              }, {
                  text: '一周前',
                  onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                  }
              }]
          },
          select:{
              boatId:'',
              inOrOut:'',
              passDate:'',
              portName:'',
          },

          tableData: [{
              boatid: 'MESS3377373',
              inorout: '出港',
              passdate: '2019-08-08',
              portname:'舟山南港'
          }, {
              boatid: 'FXGG778688',
              inorout: '入港',
              passdate: '2018-12-02',
              portname:'舟山东港'
          }, {
              boatid: 'DRDRR3328688',
              inorout: '入港',
              passdate: '2019-02-21',
              portname:'舟山东港'
          }, {
              boatid: 'AAWW12121',
              inorout: '出港',
              passdate: '2019-07-13',
              portname:'舟山港'
          }, {
              boatid: 'GGTT342342',
              inorout: '入港',
              passdate: '2019-07-25',
              portname:'舟山南港'
          }, {
              boatid: 'UUYN887997',
              inorout: '出港',
              passdate: '2019-05-23',
              portname:'舟山东港'
          }, {
              boatid: 'AAWW12121',
              inorout: '出港',
              passdate: '2019-07-13',
              portname:'舟山港'
          }, {
              boatid: 'AAWW12121',
              inorout: '出港',
              passdate: '2019-07-13',
              portname:'舟山港'
          }, {
              boatid: 'KKLI734348',
              inorout: '入港',
              passdate: '2019-06-23',
              portname:'舟山东港'
          }, {
              boatid: 'TTYY7313123',
              inorout: '入港',
              passdate: '2019-06-10',
              portname:'舟山东港'
          }, {
              boatid: 'MMJJ731238',
              inorout: '入港',
              passdate: '2019-06-30',
              portname:'宁波东港'
          }, {
              boatid: 'OPPS761009',
              inorout: '出港',
              passdate: '2019-08-29',
              portname:'上海港'
          }]

      }

  },

  methods: {

      ///重置表单
      resetForm(formName) {
          this.$refs[formName].resetFields();
      },
      search(select){
          console.log(select.inOrOut)
      },

      //分页
      handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.currentPage = 1;
          this.pageSize = val;
      },
      handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage = val;
      }

  }
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
  margin-top: 50px;
  float: left;
  }
.dataBox{
  margin-left: 340px;
  margin-top: 20px;
  float: left;
}
.pagingBox{
  float: right;
  background-color: white;
}





</style>
