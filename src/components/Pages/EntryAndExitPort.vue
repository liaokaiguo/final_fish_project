<template>
  <div class="background">
    <div>

      <div class="lefttext">渔船出入港查询</div>
      <!-- 主标题 -->
      <MainTitle v-bind:titleName="titleName" v-bind:tip="tipMsg"></MainTitle>
      <!--      <div class="centTitle">渔船作业方式智能识别系统</div>-->
      <!--          <div class="rightleftIcon">-->
      <!--            <span v-on:click="$router.back(-1)">-->
      <!--              <img class= "backico-class " src="../../assets/backico.png" style="cursor:pointer" alt="返回">-->
      <!--            </span>-->
      <!--            <router-link to="/welcome">-->
      <!--              <img src="../../assets/homeico.png" class="homeico-class">-->
      <!--            </router-link>-->
      <!--          </div>-->
      <!-- 右上角导航按钮 -->
      <NavigaIcon></NavigaIcon>
      <!--个人信息中心-->
      <UserInfo></UserInfo>
      <!-- 左侧透明导航栏 -->
      <LeftNavigaList></LeftNavigaList>
    </div>

    <div>
      <!--搜索框 -->
      <div class="searchBox">
        <el-form ref="selectForm" :model="select" :inline="true"
                 size="small"
                 class="select-form-class">
          <el-form-item prop="boatId">
            <el-input v-model="select.boatId" style="width: 12vw;"
                      placeholder="渔船编号">
            </el-input>
          </el-form-item>

          <el-form-item prop="inOrOut">
            <el-select v-model="select.inOrOut" placeholder="出港/入港" style="width: 12vw">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="passDate">
            <el-date-picker style="width: 12vw"
                            v-model="select.passDate"
                            type="date"
                            placeholder="日期时间"
                            align="right"
                            default-time="12:00:00"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="portName">
            <el-input v-model="select.portName" style="width: 12vw"
                      placeholder="港口名">
            </el-input>
          </el-form-item>

          <el-form-item align="center">
            <el-button type="primary" @click="search(select)" style="width: 8vw">搜索</el-button>
            <el-button @click="resetForm('selectForm')" style="width: 8vw">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 数据表显示-->
      <div class="dataBox">
        <el-table
          height="98%"
          class="table-data-class"
          size="small"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          v-loading="tableDataLoading"
          element-loading-text="数据量较大，玩命加载中"
          border
          :header-cell-style="{color:'#333',fontFamily:'MicrosoftYaHeiUI',fontSize:'14px',fontWeight:900}">
          <el-table-column
            prop="shipId"
            label="渔船编号">
          </el-table-column>
          <el-table-column
            prop="iof"
            label="出港/入港">
            <template slot-scope="scope">
              <span>{{scope.row.iof===-1?'出港':'入港'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="acqTime"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="ship.portName"
            label="港口名">
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

    </div>

  </div>
</template>
<script>
    //seine（围网）fishing vessel statistic and analysis
    import MainTitle from "@/components/common/MainTitle";
    import NavigaIcon from "@/components/common/NavigaIcon";
    import UserInfo from "@/components/common/UserInfo";
    import LeftNavigaList from "@/components/common/LeftNavigaList";

    export default {
        components: {
            MainTitle,
            UserInfo,
            NavigaIcon,
            LeftNavigaList
        },
        data() {
            return {
                titleName:'渔船作业方式智能识别系统',
                tipMsg:'渔船作业方式智能识别系统',
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 10, // 每页的数据条数

                options: [{
                    value: '-1',
                    label: '出港'
                }, {
                    value: '1',
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
                select: {
                    boatId: '',
                    inOrOut: '',
                    passDate: '',
                    portName: '',
                },

                tableData: [],
                tableDataLoading: true,

            }

        },

        mounted() {
            this.initTableData();
        },

        methods: {

            /*获取日期yyyy-MM-dd*/
            getFormatDate(date) {

                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }

                // todo 只有去年数据
                var currentDate = (date.getFullYear() - 1) + "-" + month + "-" + strDate;
                return currentDate;
            },

            ///重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.initTableData();
            },
            /*页面初始加载获取后台数据*/
            initTableData() {
                this.tableDataLoading = true; //先loading动画
                var date = new Date();
                var nowDay = this.getFormatDate(date);
                console.log(nowDay);

                this.axios({
                    method: "post",
                    url: "/queryPortTrafficWithoutJoin",
                    data: {
                        shipId: '',
                        iof: '', //目前数据库iof均为-1，原因不明
                        acqTime: nowDay, //默认当天
                        portName: '',
                    }
                }).then((response) => {
                    console.log("出入港数据量: " + response.data.length)
                    this.tableDataLoading = false;// loading动画去掉
                    this.tableData = response.data;

                }).catch((response) => {
                    console.log(response);
                })

            },

            /*搜索特定船只信息*/
            search(select) {
                this.tableDataLoading = true; //先loading动画
                var date = new Date();
                var nowDay = this.getFormatDate(date);
                if (this.select.passDate === null || this.select.passDate === '') {// null会引发后端请求错误
                    this.$message({
                        message: '日期不选，数据量较大，系统默认当前日期!!!',
                        showClose: 'true',
                        duration: 5000,
                    })
                    this.select.passDate = nowDay;
                }
                this.axios({
                    method: "post",
                    url: "/queryPortTrafficWithoutJoin",
                    data: {
                        shipId: this.select.boatId,
                        iof: this.select.inOrOut, //目前数据库iof均为-1，原因不明
                        acqTime: this.select.passDate,
                        portName: this.select.portName,
                    }
                }).then((response) => {
                    console.log("选择后出入港数据量: " + response.data.length)
                    this.tableDataLoading = false;// loading动画去掉
                    this.tableData = response.data;

                }).catch((response) => {
                    console.log(response);
                })
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
    left: 20vw;
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
    width: 80%;
    height: 10%;
    top: 10vh;
    left: 10vw;
  }

  .select-form-class {
    position: absolute;
    top: 10%;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .dataBox {
    position: absolute;
    width: 80%;
    height: 72%;
    top: 18vh;
    left: 10vw;
  }

  .table-data-class {
    position: absolute;
    left: 2%;
    width: 95%;
    height: 95%;
  }

  .pagingBox {
    position: absolute;
    width: 50%;
    height: 6%;
    left: 20vw;
    bottom: 1vh;
  }

  .paging-info-class {
    width: auto;
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
