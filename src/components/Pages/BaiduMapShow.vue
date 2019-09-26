<template>
  <div class="background">


    <el-row>
      <el-col>
        <div class="mapContext" id="allmap"></div>
      </el-col>
      <el-col>
        <div class="centTitle"><a src="#">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#ffffff"
            text-color="#000"
            active-text-color="#ffd04b">

            <el-submenu index="1">
              <template slot="title">
                <span>渔船位置</span>
                <i class="el-icon-location"></i>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-refresh"></i>
                <span>实时刷新</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-edit-outline"></i>
                <span>条件选择</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <span>违规作业分布图</span>
                <i class="el-icon-picture-outline"></i>
              </template>
              <el-submenu index="2-1">
                <template slot="title">围网</template>
                <el-menu-item index="2-1-1">热力图</el-menu-item>
                <el-menu-item index="2-1-2">分布图</el-menu-item>
                <el-menu-item index="2-1-3">卫星图</el-menu-item>
              </el-submenu>
              <el-menu-item index="2-2">拖网</el-menu-item>
              <el-menu-item index="2-3">张网</el-menu-item>
              <el-menu-item index="2-4">刺网</el-menu-item>
              <el-menu-item index="2-5">钓具</el-menu-item>
              <el-menu-item index="2-6">杂渔具</el-menu-item>
              <el-menu-item index="2-7">笼壶</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <span>渔船轨迹回放</span>
                <i class="el-icon-document"></i>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-edit-outline"></i>
                <span>条件选择</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <span>渔场区域选择</span>
                <i class="el-icon-search"></i>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-picture-outline"></i>
                <span>渔场图层覆盖</span>
              </el-menu-item>
              <el-menu-item index="4-2">
                <i class="el-icon-picture-outline"></i>
                <span>渔场图层取消</span>
              </el-menu-item>
            </el-submenu>

          </el-menu>

        </a></div>
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

    <!--轨迹回放时 才显示 -->
    <el-row  class="track-replay-content" >
      <el-col :span="6" :offset="18" >
        <div v-if="trackBoxShow">
          <el-button type="primary" @click="trackReplayStart">开始</el-button><br><br>
          <el-button type="danger" @click="trackReplayPause">暂停</el-button><br><br>
          <el-button type="info" @click="trackReplayStop">停止</el-button>
        </div>
      </el-col>
    </el-row>

    <!--渔船位置信息选择弹出框-->
    <el-dialog title="渔船位置信息选择" :visible.sync="shipLocationDialog" @close="resetForm('shipLocationForm')">
      <el-form ref="shipLocationForm" :model="selectLocation" :label-width="formLabelWidth">
        <el-form-item label="渔船编号:" prop="boatId">
          <el-input v-model="selectLocation.boatId" class="select-input-data"
                    autocomplete="off" placeholder="请输入编号"></el-input>
        </el-form-item>

        <el-form-item label="航行时间:" prop="sailingTime">
          <el-date-picker class="select-input-data"
                          v-model="selectLocation.sailingTime"
                          type="datetime"
                          placeholder="请输入时间"
                          align="right"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="渔船作业类型:" prop="workType">
          <el-checkbox-group v-model="selectLocation.workType" class="select-input-data">
            <el-checkbox label="围网" name="workType"></el-checkbox>
            <el-checkbox label="拖网" name="workType"></el-checkbox>
            <el-checkbox label="张网" name="workType"></el-checkbox>
            <el-checkbox label="刺网" name="workType"></el-checkbox>
            <el-checkbox label="钓具" name="workType"></el-checkbox>
            <el-checkbox label="杂渔具" name="workType"></el-checkbox>
            <el-checkbox label="笼壶" name="workType"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="渔船业务类型:" prop="businessType">
          <el-select v-model="selectLocation.businessType" placeholder="请选择类型"
                     class="select-input-data" style="width: 30%">
            <el-option
              v-for="item in businessTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="select-footer-class">
        <el-button @click="shipLocationDialog = false">取 消</el-button>
        <el-button type="primary" @click="locationConfirm"
                   style="margin-left: 60px;margin-right: 60px">确定
        </el-button>
        <el-button @click="resetForm('shipLocationForm')">重置</el-button>
      </div>
    </el-dialog>

    <!--轨迹回放选择弹出框-->
    <el-dialog title="渔船航行信息选择" :visible.sync="shipTrackDialog" @close="resetForm('shipTrackForm')">
      <el-form ref="shipTrackForm" :model="select" :label-width="formLabelWidth">
        <el-form-item label="渔船编号:" prop="boatId">
          <el-input class="select-input-data" v-model="select.boatId"
                    autocomplete="off" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="航行开始时间:" prop="beginDate">
          <el-date-picker class="select-input-data"
                          v-model="select.beginDate"
                          type="datetime"
                          placeholder="请输入时间"
                          align="right"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="航行结束时间:" prop="endDate">
          <el-date-picker class="select-input-data"
                          v-model="select.endDate"
                          type="datetime"
                          placeholder="请输入时间"
                          align="right"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="select-input-data" label="算法库:" prop="algorithmMode">
          <el-select v-model="select.algorithmMode" placeholder="请选择算法">
            <el-option
              v-for="item in algorithmOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center;margin-top: 40px">
        <el-button @click="shipTrackDialog = false">取 消</el-button>
        <el-button type="primary" @click="trackReplay"
                   style="margin-left: 60px;margin-right: 60px">航行轨迹显示
        </el-button>
        <el-button @click="resetForm('shipTrackForm')">重置</el-button>
      </div>
    </el-dialog>

  </div>


</template>
<script>
    //seine（围网）fishing vessel statistic and analysis
    export default {
        data() {
            return {
                user: {},
                shipLocationDialog: false,//渔船位置信息弹窗
                shipTrackDialog: false,//航行轨迹弹窗
                formLabelWidth: '200px',//弹窗宽度
                businessTypeOptions: [{
                    value: '养殖船',
                    label: '养殖船'
                }, {
                    value: '国内捕捞船',
                    label: '国内捕捞船'
                }, {
                    value: '捕捞辅助船',
                    label: '捕捞辅助船'
                }, {
                    value: '其他辅助船',
                    label: '其他辅助船'
                }, {
                    value: '专业远洋渔船',
                    label: '专业远洋渔船'
                }, {
                    value: '非专业远洋渔船',
                    label: '非专业远洋渔船'
                }],

                algorithmOptions: [{
                    value: '1',
                    label: 'XGBOOT'
                }, {
                    value: '2',
                    label: '卷积神经网络'
                }, {
                    value: '3',
                    label: '小波神经网络'
                },],

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
                selectLocation: {
                    boatId: '',
                    fisheryId: '',
                    sailingTime: '',
                    workType: [],
                    businessType: '',

                },
                select: {
                    boatId: '',
                    beginDate: '',
                    endDate: '',
                    algorithmMode: '',
                },

                //渔船信息
                shipArr: [
                    {
                        name: "船1",
                        terminalid: "草帽",
                        speed: 100,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.22341,
                        latitude: 29.8231
                    },
                    {
                        name: "船2",
                        terminalid: "红发",
                        speed: 98,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.07957123,
                        latitude: 30.178611
                    },
                    {
                        name: "船3",
                        terminalid: "百兽",
                        speed: 94,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.41231,
                        latitude: 30.03451
                    },
                    {
                        name: "船4",
                        terminalid: "黑胡子",
                        speed: 97,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.5731,
                        latitude: 30.03411
                    },
                    {
                        name: "船5",
                        terminalid: "大麻",
                        speed: 92,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.00091,
                        latitude: 30.034521
                    },
                    {
                        name: "船6",
                        terminalid: "海军",
                        speed: 95,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.3345631,
                        latitude: 30.0523511
                    },
                    {
                        name: "船7",
                        terminalid: "和之国",
                        speed: 88,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.1687131,
                        latitude: 29.880411
                    },
                    {
                        name: "船8",
                        terminalid: "名1",
                        speed: 82,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.0678131,
                        latitude: 29.89611
                    },
                    {
                        name: "船9",
                        terminalid: "名2",
                        speed: 81,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.008331,
                        latitude: 29.972551
                    },
                    {
                        name: "船10",
                        terminalid: "名3",
                        speed: 83,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.36131,
                        latitude: 29.972521
                    },
                    {
                        name: "船11",
                        terminalid: "和2",
                        speed: 84,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.364131,
                        latitude: 29.95611
                    },
                    {
                        name: "船12",
                        terminalid: "国5",
                        speed: 58,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.01116,
                        latitude: 29.983481
                    },
                    {
                        name: "船13",
                        terminalid: "国6",
                        speed: 28,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.286731,
                        latitude: 29.8937411
                    }],
                shipMarkerOpenOrClose :true,//渔船标注点开关

                // 单只渔船特定时间段航行轨迹点
                shipTrackArr: [
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "",
                        speed: 100,
                        locationdate: "2019-09-12 14:44:20",
                        longitude: 122.012123,
                        latitude: 30.0111
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 98,
                        locationdate: "2019-09-12 14:48:20",
                        longitude: 122.011331,
                        latitude: 29.97451
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 94,
                        locationdate: "2019-09-12 14:54:20",
                        longitude: 122.081131,
                        latitude: 29.91721
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 97,
                        locationdate: "2019-09-12 15:14:20",
                        longitude: 122.095131,
                        latitude: 29.90411
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 92,
                        locationdate: "2019-09-12 15:34:20",
                        longitude: 122.180131,
                        latitude: 29.94411
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 95,
                        locationdate: "2019-09-12 15:44:20",
                        longitude: 122.181131,
                        latitude: 29.90411
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 88,
                        locationdate: "2019-09-12 15:54:20",
                        longitude: 122.21,
                        latitude: 29.8991
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 82,
                        locationdate: "2019-09-12 16:04:20",
                        longitude: 122.282116,
                        latitude: 29.88481
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 81,
                        locationdate: "2019-09-12 17:14:20",
                        longitude: 122.42631,
                        latitude: 30.02311
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 83,
                        locationdate: "2019-09-12 17:24:20",
                        longitude: 122.43531,
                        latitude: 30.04511
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "拖网",
                        speed: 84,
                        locationdate: "2019-09-12 17:34:20",
                        longitude: 122.39631,
                        latitude: 30.08911
                    },
                    {
                        name: "船1",
                        terminalid: "草帽",
                        workMode: "",
                        speed: 58,
                        locationdate: "2019-09-12 17:44:20",
                        longitude: 122.3139631,
                        latitude: 30.07611
                    }],
                trackPathOpenOrClose:false, //轨迹路径开关
                trackBoxShow :false, //回放轨迹时 开始暂停按钮显示标志位
                luShu:"",
                luShuRunningFlag:false,// 路书运行标志
                trackPolyline:"", //路径线覆盖物
                trackMarker:"", // 路径上标注点覆盖物

                trackPointArr:[],//路书运行时画的轨迹
                trackPoly:"",
                trackMark:[], //路书运行时画的点



                /*网格相关*/
                centerPoint: '', //地图中心点
                centerLng: "122.20",//地图中心经纬度
                centerLat: "30.00",
                level: "12",//地图级别
                bounds: '',//当前地图的四个顶点
                span: '',//当前网格的跨度
                xgrids: [],//经线
                ygrids: [],//纬线
                beSelectBounds: [],
                existGrid: false,//是否存在网格

                heatMapOverlay: [],// 热力图覆盖物
                heatMapOpenOrClose: false,// 热力图开关
                // 热力图的点数据
                heatMapPointsForWei: [
                    {"lng": 122.218261, "lat": 29.921984, "count": 50},
                    {"lng": 122.223332, "lat": 29.916532, "count": 51},
                    {"lng": 122.219787, "lat": 29.930658, "count": 15},
                    {"lng": 122.218455, "lat": 29.920921, "count": 40},
                    {"lng": 122.218843, "lat": 29.915516, "count": 100},
                    {"lng": 122.22546, "lat": 29.918503, "count": 6},
                    {"lng": 122.223289, "lat": 29.919989, "count": 18},
                    {"lng": 122.218162, "lat": 29.915051, "count": 80},
                    {"lng": 122.222039, "lat": 29.91782, "count": 11},
                    {"lng": 122.21387, "lat": 29.917253, "count": 7},
                    {"lng": 122.21773, "lat": 29.919426, "count": 42},
                    {"lng": 122.221107, "lat": 29.916445, "count": 4},
                    {"lng": 122.217521, "lat": 29.917943, "count": 27},
                    {"lng": 122.219812, "lat": 29.920836, "count": 23},
                    {"lng": 122.220682, "lat": 29.91463, "count": 60},
                    {"lng": 122.215424, "lat": 29.924675, "count": 8},
                    {"lng": 122.419242, "lat": 29.914509, "count": 15},
                    {"lng": 122.422766, "lat": 29.921408, "count": 25},
                    {"lng": 122.421674, "lat": 29.824396, "count": 21},
                    {"lng": 122.427268, "lat": 29.82267, "count": 1},
                    {"lng": 122.417721, "lat": 29.820034, "count": 51},
                    {"lng": 122.412456, "lat": 29.82667, "count": 7},
                    {"lng": 122.420432, "lat": 29.819114, "count": 11},
                    {"lng": 122.425013, "lat": 29.821611, "count": 35},
                    {"lng": 122.418733, "lat": 29.831037, "count": 22},
                    {"lng": 122.419336, "lat": 29.831134, "count": 4},
                    {"lng": 122.413557, "lat": 29.823254, "count": 5},
                    {"lng": 122.418367, "lat": 29.82943, "count": 3},
                    {"lng": 122.424312, "lat": 29.819621, "count": 100},
                    {"lng": 122.123874, "lat": 29.919447, "count": 87},
                    {"lng": 122.124225, "lat": 29.923091, "count": 32},
                    {"lng": 122.117801, "lat": 29.921854, "count": 44},
                    {"lng": 122.117129, "lat": 29.928227, "count": 21},
                    {"lng": 122.126426, "lat": 29.922286, "count": 80},
                    {"lng": 122.121597, "lat": 29.91948, "count": 32},
                    {"lng": 122.123895, "lat": 29.920787, "count": 26},
                    {"lng": 122.123563, "lat": 29.921197, "count": 17},
                    {"lng": 122.117982, "lat": 29.922547, "count": 17},
                    {"lng": 122.126126, "lat": 29.921938, "count": 25},
                    {"lng": 122.12326, "lat": 29.915782, "count": 100},
                    {"lng": 122.119239, "lat": 29.916759, "count": 39},
                    {"lng": 122.117185, "lat": 29.929123, "count": 11},
                    {"lng": 122.217237, "lat": 29.927518, "count": 9},
                    {"lng": 122.117784, "lat": 29.915754, "count": 47},
                    {"lng": 122.120193, "lat": 29.917061, "count": 52},
                    {"lng": 122.422735, "lat": 29.815619, "count": 100},
                    {"lng": 122.418495, "lat": 29.815958, "count": 46},
                    {"lng": 122.416292, "lat": 29.831166, "count": 9},
                    {"lng": 122.419916, "lat": 29.824055, "count": 8},
                    {"lng": 122.42189, "lat": 29.821308, "count": 11},
                    {"lng": 122.413765, "lat": 29.729376, "count": 3},
                    {"lng": 122.418232, "lat": 29.720348, "count": 50},
                    {"lng": 122.417554, "lat": 29.730511, "count": 15},
                    {"lng": 122.418568, "lat": 29.7818161, "count": 23},
                    {"lng": 122.413461, "lat": 29.96306, "count": 3},
                    {"lng": 122.42232, "lat": 29.782161, "count": 13},
                    {"lng": 122.4174, "lat": 29.828616, "count": 6},
                    {"lng": 122.424679, "lat": 29.815499, "count": 21},
                    {"lng": 122.42171, "lat": 29.815738, "count": 29},
                    {"lng": 122.417836, "lat": 29.816998, "count": 99},
                    {"lng": 122.420755, "lat": 29.828001, "count": 10},
                    {"lng": 122.414077, "lat": 29.830655, "count": 14},
                    {"lng": 122.426092, "lat": 29.822995, "count": 16},
                    {"lng": 122.41535, "lat": 29.831054, "count": 15},
                    {"lng": 122.413022, "lat": 29.721895, "count": 13},
                    {"lng": 122.415551, "lat": 29.813373, "count": 17},
                    {"lng": 122.421191, "lat": 29.826572, "count": 1},
                    {"lng": 122.419612, "lat": 29.817119, "count": 9},
                    {"lng": 122.418237, "lat": 29.821337, "count": 54},
                    {"lng": 122.323776, "lat": 29.921919, "count": 26},
                    {"lng": 122.317694, "lat": 29.92536, "count": 17},
                    {"lng": 122.315377, "lat": 29.914137, "count": 19},
                    {"lng": 122.317434, "lat": 29.914394, "count": 43},
                    {"lng": 122.32588, "lat": 29.922622, "count": 27},
                    {"lng": 122.318345, "lat": 29.919467, "count": 8},
                    {"lng": 122.326883, "lat": 29.917171, "count": 3},
                    {"lng": 122.323877, "lat": 29.916659, "count": 34},
                    {"lng": 122.315712, "lat": 29.915613, "count": 14},
                    {"lng": 122.219869, "lat": 29.931416, "count": 12},
                    {"lng": 122.216956, "lat": 29.925377, "count": 11},
                    {"lng": 122.32066, "lat": 29.925017, "count": 38},
                    {"lng": 122.316244, "lat": 29.920215, "count": 91},
                    {"lng": 122.21929, "lat": 29.915908, "count": 54},
                    {"lng": 122.322116, "lat": 29.919658, "count": 21},
                    {"lng": 122.4183, "lat": 29.925015, "count": 15},
                    {"lng": 122.321969, "lat": 29.913527, "count": 3},
                    {"lng": 122.322936, "lat": 29.921854, "count": 24},
                    {"lng": 122.31905, "lat": 29.929217, "count": 12},
                    {"lng": 122.324579, "lat": 29.914987, "count": 57},
                    {"lng": 122.32076, "lat": 29.915251, "count": 70},
                    {"lng": 122.325867, "lat": 29.918989, "count": 8}
                ],
                heatMapPointsForTuo: [
                    {"lng": 122.118261, "lat": 29.83984, "count": 50},
                    {"lng": 122.123332, "lat": 29.836532, "count": 51},
                    {"lng": 122.119787, "lat": 29.830658, "count": 15},
                    {"lng": 122.218455, "lat": 29.830921, "count": 40},
                    {"lng": 122.118843, "lat": 29.835516, "count": 100},
                    {"lng": 122.12546, "lat": 29.838503, "count": 6},
                    {"lng": 122.123289, "lat": 29.839989, "count": 18},
                    {"lng": 122.118162, "lat": 29.835051, "count": 80},
                    {"lng": 122.122039, "lat": 29.83782, "count": 11},
                    {"lng": 122.11387, "lat": 29.837253, "count": 7},
                    {"lng": 122.11773, "lat": 29.839426, "count": 42},
                    {"lng": 122.121107, "lat": 29.836445, "count": 4},
                    {"lng": 122.117521, "lat": 29.837943, "count": 27},
                    {"lng": 122.119812, "lat": 29.830836, "count": 23},
                    {"lng": 122.120682, "lat": 29.83463, "count": 60},
                    {"lng": 122.115424, "lat": 29.834675, "count": 8},
                ],
                heatMapPointsForZhang: [
                    {"lng": 122.449242, "lat": 29.914509, "count": 15},
                    {"lng": 122.442766, "lat": 29.921408, "count": 25},
                    {"lng": 122.441674, "lat": 29.824396, "count": 21},
                    {"lng": 122.447268, "lat": 29.82267, "count": 1},
                    {"lng": 122.447721, "lat": 29.820034, "count": 51},
                    {"lng": 122.442456, "lat": 29.82667, "count": 7},
                    {"lng": 122.440432, "lat": 29.819114, "count": 11},
                    {"lng": 122.445013, "lat": 29.821611, "count": 35},
                    {"lng": 122.448733, "lat": 29.831037, "count": 22},
                    {"lng": 122.449336, "lat": 29.831134, "count": 4},
                    {"lng": 122.443557, "lat": 29.823254, "count": 5},
                    {"lng": 122.448367, "lat": 29.82943, "count": 3},
                    {"lng": 122.444312, "lat": 29.819621, "count": 100},
                ],
                heatMapPointsForCi: [
                    {"lng": 122.023874, "lat": 29.949447, "count": 87},
                    {"lng": 122.024225, "lat": 29.943091, "count": 32},
                    {"lng": 122.017801, "lat": 29.941854, "count": 44},
                    {"lng": 122.017129, "lat": 29.948227, "count": 21},
                    {"lng": 122.026426, "lat": 29.942286, "count": 80},
                    {"lng": 122.021597, "lat": 29.94948, "count": 32},
                    {"lng": 122.023895, "lat": 29.940787, "count": 26},
                    {"lng": 122.023563, "lat": 29.941197, "count": 17},
                    {"lng": 122.017982, "lat": 29.942547, "count": 17},
                    {"lng": 122.026126, "lat": 29.941938, "count": 25},
                    {"lng": 122.02326, "lat": 29.945782, "count": 100},
                    {"lng": 122.019239, "lat": 29.946759, "count": 39},
                    {"lng": 122.017185, "lat": 29.949123, "count": 11},
                    {"lng": 122.017237, "lat": 29.947518, "count": 9},
                    {"lng": 122.017784, "lat": 29.945754, "count": 47},
                    {"lng": 122.030193, "lat": 29.947061, "count": 52},
                    {"lng": 122.072735, "lat": 29.815619, "count": 100},
                    {"lng": 122.078495, "lat": 29.815958, "count": 46},
                    {"lng": 122.076292, "lat": 29.831166, "count": 9},
                    {"lng": 122.079916, "lat": 29.824055, "count": 8},
                    {"lng": 122.074077, "lat": 29.830655, "count": 14},
                    {"lng": 122.076092, "lat": 29.822995, "count": 16},
                    {"lng": 122.070929, "lat": 29.915908, "count": 54},
                    {"lng": 122.072116, "lat": 29.919658, "count": 21},
                    {"lng": 122.03083, "lat": 29.925015, "count": 15},
                    {"lng": 122.031969, "lat": 29.913527, "count": 3},
                    {"lng": 122.032936, "lat": 29.921854, "count": 24},
                    {"lng": 122.030905, "lat": 29.929217, "count": 12},
                    {"lng": 122.034579, "lat": 29.914987, "count": 57},
                    {"lng": 122.030076, "lat": 29.915251, "count": 70},
                    {"lng": 122.035867, "lat": 29.918989, "count": 8}
                ],
                heatMapPointsForDiao: [
                    {"lng": 122.520193, "lat": 30.0917061, "count": 52},
                    {"lng": 122.422735, "lat": 30.0815619, "count": 100},
                    {"lng": 122.418495, "lat": 30.0815958, "count": 46},
                    {"lng": 122.416292, "lat": 30.0831166, "count": 9},
                    {"lng": 122.419916, "lat": 30.0824055, "count": 8},
                    {"lng": 122.42189, "lat": 30.0821308, "count": 11},
                    {"lng": 122.413765, "lat": 30.0729376, "count": 3},
                    {"lng": 122.418232, "lat": 30.0720348, "count": 50},
                    {"lng": 122.417554, "lat": 30.0730511, "count": 15},
                    {"lng": 122.418568, "lat": 30.07818161, "count": 23},
                    {"lng": 122.413461, "lat": 30.096306, "count": 3},
                    {"lng": 122.42232, "lat": 30.07082161, "count": 13},
                    {"lng": 122.4174, "lat": 30.0828616, "count": 6},
                    {"lng": 122.424679, "lat": 30.0815499, "count": 21},
                    {"lng": 122.42171, "lat": 30.0815738, "count": 29},
                    {"lng": 122.417836, "lat": 30.0816998, "count": 99},
                    {"lng": 122.420755, "lat": 30.0828001, "count": 10},
                    {"lng": 122.414077, "lat": 30.0830655, "count": 14},
                    {"lng": 122.426092, "lat": 30.0822995, "count": 16},
                    {"lng": 122.51929, "lat": 30.0915908, "count": 54},
                    {"lng": 122.522116, "lat": 30.0919658, "count": 21},
                    {"lng": 122.5183, "lat": 30.0925015, "count": 15},
                    {"lng": 122.521969, "lat": 30.0913527, "count": 3},
                    {"lng": 122.3922936, "lat": 30.0921854, "count": 24},
                    {"lng": 122.391905, "lat": 30.0929217, "count": 12},
                    {"lng": 122.3924579, "lat": 30.0914987, "count": 57},
                    {"lng": 122.392076, "lat": 30.0915251, "count": 70},
                    {"lng": 122.3925867, "lat": 30.0918989, "count": 8}
                ],
                heatMapPointsForZa: [
                    {"lng": 122.417836, "lat": 29.816998, "count": 99},
                    {"lng": 122.420755, "lat": 29.828001, "count": 10},
                    {"lng": 122.414077, "lat": 29.830655, "count": 14},
                    {"lng": 122.426092, "lat": 29.822995, "count": 16},
                    {"lng": 122.21929, "lat": 29.915908, "count": 54},
                    {"lng": 122.322116, "lat": 29.919658, "count": 21},
                    {"lng": 122.4183, "lat": 29.925015, "count": 15},
                    {"lng": 122.321969, "lat": 29.913527, "count": 3},
                    {"lng": 122.322936, "lat": 29.921854, "count": 24},
                    {"lng": 122.31905, "lat": 29.929217, "count": 12},
                    {"lng": 122.324579, "lat": 29.914987, "count": 57},
                    {"lng": 122.32076, "lat": 29.915251, "count": 70},
                    {"lng": 122.325867, "lat": 29.918989, "count": 8}
                ],
                heatMapPointsForLong: [
                    {"lng": 122.1417836, "lat": 29.856998, "count": 99},
                    {"lng": 122.1320755, "lat": 29.8628001, "count": 10},
                    {"lng": 122.1514077, "lat": 29.8650655, "count": 14},
                    {"lng": 122.1526092, "lat": 29.8652995, "count": 16},
                    {"lng": 122.121929, "lat": 29.915908, "count": 54},
                    {"lng": 122.1322116, "lat": 29.919658, "count": 21},
                    {"lng": 122.14183, "lat": 29.925015, "count": 15},
                    {"lng": 122.1321969, "lat": 29.913527, "count": 3},
                    {"lng": 122.1322936, "lat": 29.921854, "count": 24},
                    {"lng": 122.131905, "lat": 29.929217, "count": 12},
                    {"lng": 122.1324579, "lat": 29.914987, "count": 57},
                    {"lng": 122.132076, "lat": 29.915251, "count": 70},
                    {"lng": 122.1325867, "lat": 29.918989, "count": 8}
                ],

            }

        },
        mounted() {
            this.getShipLocationArr();
            this.mapReady(this.centerLng, this.centerLat, this.level);
            //渔船标注位置
            this.addShipMarker();
        },
        methods: {
            /*获取当前日期yyyy-MM-dd HH:mm:ss*/
            getNowTime() {
                var date = new Date();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentDate = date.getFullYear() + "-" + month + "-" + strDate
                    + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                return currentDate;
            },

            /*返回*/
            reback() {
                this.$router.go(-1); //reback the last step
            },

            /* 菜单选择 */
            handleSelect(key, keyPath) {
                console.log(key, keyPath);

                if (this.luShuRunningFlag === true) {
                    this.$message({
                        type: "warning",
                        message: '请将当前页面的轨迹回放停止!!!',
                        showClose: 'true',
                        duration: 5000,
                    })
                } else {
                    switch (key) {
                        case "1-1":
                            alert("刷新中");
                            break;
                        case "1-2":
                            this.shipLocationDialog = true;// 渔船位置弹窗
                            break;

                        case "2-1-1":
                            this.initHeatMap(this.heatMapPointsForWei);//围网热力图
                            break;
                        case "2-2":
                            this.initHeatMap(this.heatMapPointsForTuo);//拖网热力图
                            break;
                        case "2-3":
                            this.initHeatMap(this.heatMapPointsForZhang);//张网热力图
                            break;
                        case "2-4":
                            this.initHeatMap(this.heatMapPointsForCi);//刺网热力图
                            break;
                        case "2-5":
                            this.initHeatMap(this.heatMapPointsForDiao);//钓具热力图
                            break;
                        case "2-6":
                            this.initHeatMap(this.heatMapPointsForZa);//杂渔具热力图
                            break;
                        case "2-7":
                            this.initHeatMap(this.heatMapPointsForLong);//笼壶热力图
                            break;

                        case "3-1":
                            this.shipTrackDialog = true;// 轨迹选择弹窗
                            break;

                        case "4-1":
                            this.initFisheryGrid();// 渔场显示
                            break;
                        case "4-2": {
                            //说明有网格覆盖层
                            if (this.existGrid === true) {
                                this.closeFisheryGrid();// 渔场取消
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: '当前地图没有渔场网格覆盖!!!',
                                    showClose: 'true',
                                    duration: 4000,
                                })
                            }
                            break;
                        }

                    }
                }


            },

            /* 重置表单 */
            resetForm(formName) {
                //表单重置
                this.$refs[formName].resetFields();

            },


            /* 大地图显示 */
            mapReady(lng, lat, level) {
                //创建实例
                var map = new BMap.Map("allmap", {enableMapClick: false});
                //创建坐标点
                this.centerPoint = new BMap.Point(lng, lat);
                //初始化实例，传入坐标点并设置地图级别
                map.centerAndZoom(this.centerPoint, level);
                map.enableScrollWheelZoom(true);
                window.map = map;

            },

            /* 从后端获取渔船位置数据 放入shipArr*/
            getShipLocationArr(){
                var time = this.getNowTime();
                console.log(time)
                this.axios({
                    method:'post',
                    url:'/queryTrail',
                    data:{
                        shipId :"",
                        dateTime : "2018-09-01 00:08:04",

                    }
                }).then(res => {
                    console.log(res)


                })
            },

            /* 初始加载所有渔船标注位置 */
            addShipMarker() {
                this.shipMarkerOpenOrClose =true;
                //清除覆盖物，若有网格重新加载网格
                if(this.existGrid === true){
                    this.deleteGrid()
                    map.clearOverlays();  //先关网格在清所有覆盖物 否则出错
                    this.heatMapOpenOrClose = false;// 另外两栏开关关闭
                    this.trackPathOpenOrClose =false;
                    this.trackBoxShow = false;
                    this.initFisheryGrid()
                }else{
                    map.clearOverlays();
                    this.heatMapOpenOrClose = false;// 另外两栏开关关闭
                    this.trackPathOpenOrClose =false;
                    this.trackBoxShow = false;
                }

                var point = new Array();//定义数组标注经纬信息
                var marker = new Array();//定义数组点对象信息
                var info = new Array();//定义悬浮提示信息
                //设置icon信息
                var width = 32;
                var height = 32;
                var imgSrc = require("../../assets/ship32.png"); //引入icon图片 本地图要用require
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(width, height));//配置icon
                for (var i = 0; i < this.shipArr.length; i++) {//遍历
                    point[i] = new window.BMap.Point(this.shipArr[i].longitude, this.shipArr[i].latitude);
                    marker[i] = new window.BMap.Marker(point[i], {icon: myIcon});//把icon和坐标添加到Marker中
                    map.addOverlay(marker[i]);
                    var label = new window.BMap.Label(this.shipArr[i].name);
                    label.setStyle({  //设置提示框的样式
                        color: "#000",
                        fontSize: "12px",
                        backgroundColor: "#d5fdff",
                        border: "1px solid #ccc",
                        borderRadius: "2px",
                        padding: "2px 6px"
                    });
                    // marker[i].setLabel(label);
                    info[i] = new window.BMap.InfoWindow(
                        "<div style='width:300px;'>"
                        + "<p>渔船编号：" + this.shipArr[i].name + "</p>"
                        + "<p>渔船名：" + this.shipArr[i].terminalid + "</p>"
                        + "<p>航行时速(m/s)：" + this.shipArr[i].speed + "</p>"
                        + "<p>定位时间：" + this.shipArr[i].locationdate + "</p>"
                        + "<p>地址经度：" + this.shipArr[i].longitude + "</p>"
                        + "<p>地址纬度：" + this.shipArr[i].latitude + "</p>"
                        + "</div>"
                    );//悬浮提示信息
                    this.addInfo(info[i], marker[i])
                }
            },

            /* 选择性显示渔船位置 */
            locationConfirm() {
                this.shipLocationDialog = false;

                this.addShipMarker();

            },

            /* 添加热力图覆盖物 */
            initHeatMap(points) {
                this.heatMapOpenOrClose =true;
                // // 清除图层(每次重新调用需要清除上一个覆盖物图层)
                // if(this.heatMapOverlay != ""){
                //     map.removeOverlay(this.heatMapOverlay);
                // }
                //清除覆盖物，若有网格重新加载网格
                if(this.existGrid === true){
                    this.deleteGrid()
                    map.clearOverlays();  //先关网格在清所有覆盖物 否则出错
                    this.shipMarkerOpenOrClose = false;// 另外两栏开关关闭
                    this.trackPathOpenOrClose =false;
                    this.trackBoxShow = false;
                    this.initFisheryGrid()
                }else{
                    map.clearOverlays();
                    this.shipMarkerOpenOrClose = false;// 另外两栏开关关闭
                    this.trackPathOpenOrClose =false;
                    this.trackBoxShow = false;
                }
                this.heatMapOverlay = new BMapLib.HeatmapOverlay({
                    // 热力图的每个点的半径大小
                    'radius': BMAP_POINT_SIZE_SMALL * 4,
                    // 热力的透明度0~1
                    'opacity': 0.8,
                    // 其中 key 表示插值的位置0~1，value 为颜色值
                    'gradient': {
                        0: 'rgb(102, 255, 0)',
                        .5: 'rgb(255, 170, 0)',
                        1: 'rgb(255, 0, 0)'
                    }
                })

                // 添加热力覆盖物
                map.addOverlay(this.heatMapOverlay);
                this.heatMapOverlay.setDataSet({data: points, max: 100});

                // // 显示隐藏热力图，
                // this.heatMapOverlay.show();

            },

            /* 轨迹回放按钮*/
            trackReplay(){
                // 开关开启
                this.trackPathOpenOrClose =true;
                this.trackBoxShow =true;
                //弹框隐藏
                this.shipTrackDialog = false;
                //清除覆盖物，若有网格重新加载网格
                if(this.existGrid === true){
                    this.deleteGrid();
                    map.clearOverlays();  //先关网格在清所有覆盖物 否则出错
                    this.shipMarkerOpenOrClose =false;// 另外两栏开关关闭
                    this.heatMapOpenOrClose = false;
                    this.initFisheryGrid()
                }else{
                    map.clearOverlays();
                    this.shipMarkerOpenOrClose =false;// 另外两栏开关关闭
                    this.heatMapOpenOrClose = false;
                }

                this.loadTrackPath();

                this.luShuRunningFlag =false;
                this.loadLuShu();
            },
            /* 轨迹折现显示 */
            loadTrackPath() {
                // 轨迹线设置
                var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                    scale: 0.5,//图标缩放大小
                    strokeColor: '#fff',//设置矢量图标的线填充颜色
                    strokeWeight: '2',//设置线宽
                });
                var icons = new BMap.IconSequence(sy, '10', '30');
                // this.trackIcons = new BMap.IconSequence(sy, '10', '30');

                // 创建polyline对象
                var pois = [];
                for (var i = 0; i < this.shipTrackArr.length; i++) {//遍历添加轨迹点
                    pois.push(new BMap.Point(this.shipTrackArr[i].longitude, this.shipTrackArr[i].latitude));
                }
                this.trackPolyline = new BMap.Polyline(pois, {
                    enableEditing: false,//是否启用线编辑，默认为false
                    enableClicking: true,//是否响应点击事件，默认为true
                    icons: [icons],
                    strokeWeight: '5',//折线的宽度，以像素为单位
                    strokeOpacity: 0.5,//折线的透明度，取值范围0 - 1
                    strokeColor: "#18a45b" //折线颜色
                });

                map.addOverlay(this.trackPolyline);          //增加折线

                //自动设置缩放级别和视图中心，将所有的point在视图范围内展示
                var view = map.getViewport(eval(pois));
                var mapZoom = view.zoom;
                var centerPoint = view.center;
                map.centerAndZoom(centerPoint,mapZoom);

                /*轨迹点标注*/
                var point = new Array();//定义数组标注经纬信息
                this.trackMarker = new Array();//定义数组点对象信息
                var info = new Array();//定义悬浮提示信息
                //设置icon信息
                var width = 32;
                var height = 32;
                var imgSrc = require("../../assets/shipTrack.png"); //引入icon图片 本地图片要用require
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(width, height));//配置icon
                for (var i = 0; i < this.shipTrackArr.length; i++) {//遍历
                    point[i] = new window.BMap.Point(this.shipTrackArr[i].longitude, this.shipTrackArr[i].latitude);
                    this.trackMarker[i] = new window.BMap.Marker(point[i], {icon: myIcon});//把icon和坐标添加到Marker中
                    map.addOverlay(this.trackMarker[i]);
                    var label = new window.BMap.Label(this.shipTrackArr[i].name);
                    label.setStyle({  //设置提示框的样式
                        color: "#000",
                        fontSize: "12px",
                        backgroundColor: "#d5fdff",
                        border: "1px solid #ccc",
                        borderRadius: "2px",
                        padding: "2px 6px"
                    });
                    // marker[i].setLabel(label);
                    info[i] = new window.BMap.InfoWindow(
                        "<div style='width:300px;'>"
                        + "<p>渔船编号：" + this.shipTrackArr[i].name + "</p>"
                        + "<p>渔船名：" + this.shipTrackArr[i].terminalid + "</p>"
                        + "<p>航行时速(m/s)：" + this.shipTrackArr[i].speed + "</p>"
                        + "<p>定位时间：" + this.shipTrackArr[i].locationdate + "</p>"
                        + "<p>地址经度：" + this.shipTrackArr[i].longitude + "</p>"
                        + "<p>地址纬度：" + this.shipTrackArr[i].latitude + "</p>"
                        + "<p>作业方式：" + this.shipTrackArr[i].workMode + "</p>"
                        + "</div>"
                    );//悬浮提示信息
                    this.addInfo(info[i], this.trackMarker[i])
                }
            },

            /* 路书回放显示*/
            loadLuShu(){
                var _this =this;
                var pois = [];
                for (var i = 0; i < this.shipTrackArr.length; i++) {//遍历添加轨迹点
                    pois.push(new BMap.Point(this.shipTrackArr[i].longitude, this.shipTrackArr[i].latitude));
                }
                //设置icon信息
                var width = 32;
                var height = 32;
                var imgSrc = require("../../assets/shipTrack.png"); //引入icon图片 本地图片要用require
                var myIcon = new BMap.Icon(imgSrc, new BMap.Size(width, height));//配置icon
                this.lushu = new BMapLib.LuShu(map,pois,{
                    defaultContent:"",
                    autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                    icon  : new BMap.Icon(require('../../assets/shipTrack.png'), new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
                    speed: 6000,
                    enableRotation:true,//是否设置marker随着道路的走向进行旋转
                    landmarkPois: [],
                });

                BMapLib.LuShu.prototype._move = function(initPos, targetPos, effect) {
                    // 轨迹线设置
                    var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                        scale: 0.5,//图标缩放大小
                        strokeColor: '#fff',//设置矢量图标的线填充颜色
                        strokeWeight: '2',//设置线宽
                    });
                    var icons = new BMap.IconSequence(sy, '10', '30');
                    var pointsArr = [initPos, targetPos]; //点数组
                    var me = this,
                        //当前的帧数
                        currentCount = 0,
                        //步长，米/秒
                        timer = 10,
                        step = this._opts.speed / (1000 / timer),
                        //初始坐标
                        init_pos = this._projection.lngLatToPoint(initPos),
                        //获取结束点的(x,y)坐标
                        target_pos = this._projection.lngLatToPoint(targetPos),
                        //总的步长
                        count = Math.round(me._getDistance(init_pos, target_pos) / step);
                    //显示折线 syj201607191107
                    //显示小车走过的痕迹，
                    // 旧方法：先清除之前走的痕迹，再画上，新方法：每段都画上，每次start会全清
                    /* this._map.removeOverlay(_this.trackPoly);
                     _this.trackPointArr.pop();//先将之前的终点抛出,再作为起点加入
                     _this.trackPointArr.push(initPos);
                     _this.trackPointArr.push(targetPos); */
                    _this.trackPoly = new BMap.Polyline(pointsArr, {
                        enableEditing: false,//是否启用线编辑，默认为false
                        enableClicking: true,//是否响应点击事件，默认为true
                        icons: [icons],
                        strokeWeight: '5',//折线的宽度，以像素为单位
                        strokeOpacity: 0.5,//折线的透明度，取值范围0 - 1
                        strokeColor: "#18a45b" //折线颜色
                    });
                    this._map.addOverlay(_this.trackPoly);
                    //画每个标注点,旧方法：先清之前画的点,再加上，新方法，先都画上，每次Start会全清
                    /*for(var i =0;i<_this.trackMark.length;i++){
                        this._map.removeOverlay(_this.trackMark[i]);
                    }
                    _this.trackMark.push( new window.BMap.Marker(initPos, {icon: myIcon}) );
                    for(var i =0;i<_this.trackMark.length;i++){
                        this._map.addOverlay(_this.trackMark[i]);
                    }*/
                    var everyMark =new window.BMap.Marker(initPos, {icon: myIcon});
                    _this.trackMark.push(everyMark);
                    this._map.addOverlay(everyMark);

                    //如果小于1直接移动到下一点
                    if (count < 1) {
                        me._moveNext(++me.i);
                        return;
                    }
                    me._intervalFlag = setInterval(function() {
                        //两点之间当前帧数大于总帧数的时候，则说明已经完成移动
                        if (currentCount >= count) {
                            clearInterval(me._intervalFlag);
                            //路书跑完最后一线端后,再次加载
                            if(_this.trackMark.length === _this.shipTrackArr.length-1) {
                                if (_this.existGrid === true) {
                                    _this.deleteGrid();
                                    map.clearOverlays();  //先关网格在清所有覆盖物 否则出错
                                    _this.initFisheryGrid()
                                    // _this.trackReplay();
                                } else {
                                    map.clearOverlays();
                                }
                            _this.trackReplay();
                            }
                            //移动的点已经超过总的长度
                            if (me.i > me._path.length) {

                                return;
                            }
                            //运行下一个点
                            me._moveNext(++me.i);
                        } else {
                            currentCount++;
                            var x = effect(init_pos.x, target_pos.x, currentCount, count),
                                y = effect(init_pos.y, target_pos.y, currentCount, count),
                                pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
                            //设置marker
                            if (currentCount == 1) {
                                var proPos = null;
                                if (me.i - 1 >= 0) {
                                    proPos = me._path[me.i - 1];
                                }
                                if (me._opts.enableRotation == true) {
                                    me.setRotation(proPos, initPos, targetPos);
                                }
                                if (me._opts.autoView) {
                                    if (!me._map.getBounds().containsPoint(pos)) {
                                        me._map.setCenter(pos);
                                    }
                                }
                            }
                            //正在移动
                            me._marker.setPosition(pos);
                            //设置自定义overlay的位置
                            me._setInfoWin(pos);
                        }
                    }, timer);

                };

            },

            /*渔船路书回放开始*/
            trackReplayStart(){
                //路书初次运行 先清空覆盖物
                if(this.luShuRunningFlag === false) {
                    if (this.existGrid === true) {
                        this.deleteGrid();
                        map.clearOverlays();  //先关网格在清所有覆盖物 否则出错
                        this.initFisheryGrid()
                        this.loadLuShu();
                    } else {
                        map.clearOverlays();
                    }

                    this.trackPointArr = [];// 路书画折线的数组需重新置空,否则每次画线出错
                    this.trackMark =[]; // 路书标注点同理
                }
                // 加完所有点,路书跑完 清空折线和标注点
                if(this.trackMark.length === this.shipTrackArr.length-1){

                    map.removeOverlay(this.trackPoly)
                    for(var i =0;i<this.trackMark.length;i++){
                        map.removeOverlay(this.trackMark[i]);
                    }
                    this.trackPointArr = [];
                    this.trackMark =[];
                }

                this.lushu.start();
                this.luShuRunningFlag =true;


            },
            /*渔船路书回放暂停*/
            trackReplayPause(){
                this.lushu.pause();
            },
            /*渔船路书回放停止*/
            trackReplayStop(){
                this.lushu.stop();
                this.luShuRunningFlag =false;
            },

            /* 点击渔船 悬浮渔船信息 */
            addInfo(info, marker) {
                marker.addEventListener("click", function (e) {
                    var p = e.target
                    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
                    map.centerAndZoom(point, 14);
                    this.openInfoWindow(info)
                })
            },

            /* 菜单点击显示渔场网格，并添加事件*/
            initFisheryGrid() {
                this.existGrid = true;
                this.initProperty();
                this.initGrid();
                var _this = this //外部变量 放到map里用


                //添加移动后的点击事件
                map.addEventListener("dragend", _this.showFisheryGrid);
                //添加放大或缩小时的事件
                map.addEventListener("zoomend", _this.showFisheryGrid);
                //设置点击事件
                map.addEventListener("click", function (e) {
                    var point = e.point;
                    //获取当前点是在哪个区块内,获取正方形的四个顶点
                    var points = _this.getGrid(_this, point);
                    //判断当前区域是否已经被选中过，如果被选中过则取消选中
                    var key = '' + points[0].lng + points[0].lat + points[2].lng + points[2].lat;//使用两个点的坐标作为key
                    if (_this.beSelectBounds[key]) {
                        map.removeOverlay(_this.beSelectBounds[key]);
                        delete _this.beSelectBounds[key];
                        return;
                    }
                    var polygon = new BMap.Polygon(points, {strokeColor: "red", strokeWeight: 4, strokeOpacity: 0.5}); //正方形区域样式
                    map.addOverlay(polygon);
                    _this.beSelectBounds[key] = polygon;
                    // 文字信息框
                    var lng_center = (points[0].lng + points[2].lng) / 2  //点击网格的中心经度
                    var lat_center = (points[0].lat + points[2].lat) / 2  //点击网格的中心维度
                    var point_center = new BMap.Point(lng_center, lat_center);
                    var opts = {
                        width: 400,     // 信息窗口宽度
                        height: 130,     // 信息窗口高度
                        title: "渔场信息", // 信息窗口标题
                    };
                    // 窗口显示内容
                    var text = "<div style='width:300px;'>"
                        + "<p>渔场名称：(" + '舟山渔场' + _this.level + "纬" + lat_center + ')' + "</p>"
                        + "<p>位置（经纬度）：(" + lng_center + ',' + lat_center + ')' + "</p>"

                        + "</div>"
                    var infoWindow = new BMap.InfoWindow(text, opts);  // 创建信息窗口对象
                    this.openInfoWindow(infoWindow, point_center);
                });


            },

            /* 渔场网格取消，移除事件*/
            closeFisheryGrid(){
                this.deleteGrid(); //先删除网格

                // 获取当前地图新坐标和大小
                var nowLng = map.getCenter().lng;
                var nowLat = map.getCenter().lat;
                var nowLevel = map.getZoom();

                //若原有渔船标注点 则重新显示
                if(this.shipMarkerOpenOrClose === true){
                    this.addShipMarker();
                }
                //若有热力图 重新显示
                if(this.heatMapOpenOrClose === true){
                    this.initHeatMap(this.heatMapOverlay.data.data);
                }
                //若原有渔船轨迹路径 则重新显示
                if(this.trackPathOpenOrClose === true){
                    this.trackReplay(); //todo 表单信息
                    //因loadTrackPath会改变位置,以下保持定位在原位置
                    let newPoint = new BMap.Point(nowLng, nowLat);
                    map.centerAndZoom(newPoint, nowLevel);
                }
            },
            /*只是删除网格, 因其他地方也有调用 单独写出*/
            deleteGrid(){
                this.existGrid = false;
                // 重新加载地图
                var newLng = map.getCenter().lng;
                var newLat = map.getCenter().lat;
                var newLevel = map.getZoom();
                var _this = this //外部变量 放到map里用
                //移除移动后的点击事件
                map.removeEventListener("dragend", _this.showFisheryGrid);
                //移除放大或缩小时的事件
                map.removeEventListener("zoomend", _this.showFisheryGrid);
                // 点击事件带参移除不了 ，直接重新加载
                this.mapReady(newLng, newLat, newLevel);
            },

            /*显示渔场网格*/
            showFisheryGrid() {
                this.initProperty();
                this.initGrid();
            },

            /*初始化当前地图的状态*/
            initProperty() {
                this.level = map.getZoom();
                this.bounds = {
                    x1: map.getBounds().getSouthWest().lng,
                    y1: map.getBounds().getSouthWest().lat,
                    x2: map.getBounds().getNorthEast().lng,
                    y2: map.getBounds().getNorthEast().lat
                };
                this.span = this.getSpan();//需要使用level属性
            },
            /*初始化网格*/
            initGrid() {
                //将原来的网格线先去掉
                for (var i in this.xgrids) {
                    map.removeOverlay(this.xgrids[i]);
                }
                this.xgrids = [];
                for (var i in this.ygrids) {
                    map.removeOverlay(this.ygrids[i]);
                }
                this.ygrids = [];

                //获取当前网格跨度
                var span = this.span;
                // 控制网格的长和宽
                span.x = span.x * 0.8;
                span.y = span.y * 0.8;
                //初始化地图上的网格
                for (var i = this.bounds.x1 + (this.centerPoint.lng - this.bounds.x1) % span.x - span.x; i < this.bounds.x2 + span.x; i += span.x) {

                    var polyline = new BMap.Polyline([
                        new BMap.Point(i.toFixed(6), this.bounds.y1),
                        new BMap.Point(i.toFixed(6), this.bounds.y2)
                    ], {strokeColor: "black", strokeWeight: 1, strokeOpacity: 0.5});

                    this.xgrids.push(polyline);
                    map.addOverlay(polyline);
                }
                for (var i = this.bounds.y1 + (this.centerPoint.lat - this.bounds.y1) % span.y - span.y; i < this.bounds.y2 + span.y; i += span.y) {
                    var polyline = new BMap.Polyline([
                        new BMap.Point(this.bounds.x1, i.toFixed(6)),
                        new BMap.Point(this.bounds.x2, i.toFixed(6))
                    ], {strokeColor: "black", strokeWeight: 1, strokeOpacity: 0.5});
                    this.ygrids.push(polyline);
                    map.addOverlay(polyline);
                }
            },

            /*获取网格的跨度*/
            getSpan() {
                var scale = 0.75;
                var x = 0.0005;
                /*网格大小随zoom变化*/
                // for (var i = this.level; i < 19; i++) {
                //     x *= 2;
                // }
                x *= 128 //固定死网格
                var y = parseFloat((scale * x).toFixed(5));
                return {x: x, y: y};
            },

            /*返回当前点在所在区块的四个顶点*/
            getGrid(_this, point) {
                //先找出两条纵线坐标
                var xpoints = this.xgrids.map(function (polyline) {
                    return polyline.getPath()[0].lng;
                }).filter(function (lng) {
                    return Math.abs(lng - point.lng) <= _this.span.x;
                }).sort(function (a, b) {
                    return a - b;
                }).slice(0, 2);

                //再找出两条横线的坐标
                var ypoints = this.ygrids.map(function (polyline) {
                    return polyline.getPath()[0].lat;
                }).filter(function (lat) {
                    return Math.abs(lat - point.lat) <= _this.span.y;
                }).sort(function (a, b) {
                    return a - b;
                }).slice(0, 2);

                return [
                    new BMap.Point(xpoints[0], ypoints[0]),
                    new BMap.Point(xpoints[0], ypoints[1]),
                    new BMap.Point(xpoints[1], ypoints[1]),
                    new BMap.Point(xpoints[1], ypoints[0])
                ];

            },


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
    position: absolute;
    left: 0%;
    width: 100%;
    height: 43px;
    font-family: FZDHTJW--GB1-0;
    font-size: 43px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 5px;
    color: #000000;
    float: left;
    opacity: 0.5; /*透明度 -*/
  }

  .centTitle a:hover {
    opacity: 0.8; /*透明度 -*/
  }


  .rightleftIcon {
    position: absolute;
    left: 90%;
    margin-top: 10px;
    float: left;
    opacity: 0.8; /*透明度 -*/
  }

  .mapContext {

    margin-top: 0px;
    position: absolute;
    height: 1080px;
    width: 100%;
    float: left;
    /*background-color: #e5e9f2;*/
  }

  .mutipleSelectBox {
    position: absolute;
    margin-top: 60px;
    /*margin-left: 50px;*/
    left: 12%;
    text-align: left;
    font-size: 24px;
    color: #ffffff;
    float: left;
    opacity: 0.7; /*透明度 -*/

  }

  .boat-id-class {
    font-size: 23px;
  }

  .input-date-class {
    float: left;
    width: 300px;
    font-size: 23px;
  }

  .select-input-data {
    text-align: left;
    float: left;
    width: 60%;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .select-footer-class {
    text-align: center;
    margin-top: 5px;
  }
  .track-replay-content{
    top: 40%;
    right: 4%;
    float: right;
  }

</style>
