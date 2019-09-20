<template>
  <div class="background">


      <el-row>
         <el-col >
          <div  class="mapContext" id="allmap"></div>
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
                  <template slot="title">拖网</template>
                  <el-menu-item index="2-1-1">热力图</el-menu-item>
                  <el-menu-item index="2-1-2">分布图</el-menu-item>
                  <el-menu-item index="2-1-3">卫星图</el-menu-item>
                </el-submenu>
                <el-menu-item index="2-2">围网</el-menu-item>
                <el-menu-item index="2-3">张网</el-menu-item>
                <el-menu-item index="2-4">刺网</el-menu-item>
                <el-menu-item index="2-5">拉网</el-menu-item>
                <el-menu-item index="2-6">钓网</el-menu-item>
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

    <!--渔船位置信息选择弹出框-->
    <el-dialog title="渔船位置信息选择" :visible.sync="shipLocationDialog" @close="resetForm('shipLocationForm')">
      <el-form ref="shipLocationForm" :model="selectLocation" :label-width="formLabelWidth"  >
        <el-form-item label="渔船编号:" prop="boatId" >
          <el-input v-model="selectLocation.boatId" class="select-input-data"
                    autocomplete="off" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="渔场编号:" prop="fisheryId" >
          <el-input v-model="selectLocation.fisheryId" class="select-input-data"
                    autocomplete="off" placeholder="请输入编号"></el-input>
        </el-form-item>

        <el-form-item label="航行时间:" prop="sailingTime" >
          <el-date-picker class="select-input-data"
            v-model="selectLocation.sailingTime"
            type="datetime"
            placeholder="请输入时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>


        <el-form-item  label="渔船作业类型:" prop="workType" >
            <el-checkbox-group v-model="selectLocation.workType" class="select-input-data" >
              <el-checkbox label="围网" name="workType"></el-checkbox>
              <el-checkbox label="张网" name="workType"></el-checkbox>
              <el-checkbox label="刺网" name="workType"></el-checkbox>
              <el-checkbox label="拉网" name="workType"></el-checkbox>
              <el-checkbox label="拖网" name="workType"></el-checkbox>
              <el-checkbox label="钓网" name="workType"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item  label="渔船规模大小:" prop="boatSize" >
          <el-select v-model="selectLocation.boatSize" placeholder="请选择规模"
                     class="select-input-data" style="width: 30%">
            <el-option
              v-for="item in boatSizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="select-footer-class" >
        <el-button @click="shipLocationDialog = false">取 消</el-button>
        <el-button type="primary" @click="locationConfirm"
                   style="margin-left: 60px;margin-right: 60px">确定</el-button>
        <el-button  @click="resetForm('shipLocationForm')">重置</el-button>
      </div>
    </el-dialog>

    <!--轨迹回放选择弹出框-->
    <el-dialog title="渔船航行信息选择" :visible.sync="shipTrackDialog"   @close="resetForm('shipTrackForm')">
      <el-form ref="shipTrackForm" :model="select" :label-width="formLabelWidth">
        <el-form-item label="渔船编号:" prop="boatId" >
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
        <el-form-item class="select-input-data" label="算法库:" prop="algorithmMode" >
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
      <div slot="footer" style="text-align: center;margin-top: 40px" >
        <el-button @click="shipTrackDialog = false">取 消</el-button>
        <el-button type="primary" @click="loadTrackPath"
                   style="margin-left: 60px;margin-right: 60px">航行轨迹显示</el-button>
        <el-button  @click="resetForm('shipTrackForm')">重置</el-button>
      </div>
    </el-dialog>

    </div>


</template>
<script>
//seine（围网）fishing vessel statistic and analysis
export default {
  data() {
      return{
          user: {},
          shipLocationDialog: false,//渔船位置信息弹窗
          shipTrackDialog:false,//航行轨迹弹窗
          formLabelWidth: '200px',//弹窗宽度
          boatSizeOptions: [{
              value: '大型',
              label: '大型'
          }, {
              value: '中型',
              label: '中型'
          }, {
              value: '小型',
              label: '小型'
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
          }, ],

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
          selectLocation:{
              boatId:'',
              fisheryId:'',
              sailingTime:'',
              workType:[],
              boatSize:'',

          },
          select:{
              boatId:'',
              beginDate:'',
              endDate:'',
              algorithmMode:'',
          },

          //渔船信息
          shipArr : [
              {name :"船1",terminalid: "草帽",speed : 100,locationdate:"2019-09-12 14:44:20",longitude : 122.22341,latitude :29.8231},
              {name :"船2",terminalid: "红发",speed : 98,locationdate:"2019-09-12 14:44:20",longitude : 122.07957123,latitude :30.178611},
              {name :"船3",terminalid: "百兽",speed : 94,locationdate:"2019-09-12 14:44:20",longitude : 122.41231,latitude :30.03451},
              {name :"船4",terminalid: "黑胡子",speed : 97,locationdate:"2019-09-12 14:44:20",longitude : 122.5731,latitude :30.03411},
              {name :"船5",terminalid: "大麻",speed : 92,locationdate:"2019-09-12 14:44:20",longitude : 122.00091,latitude :30.034521},
              {name :"船6",terminalid: "海军",speed : 95,locationdate:"2019-09-12 14:44:20",longitude : 122.3345631,latitude :30.0523511},
              {name :"船7",terminalid: "和之国",speed : 88,locationdate:"2019-09-12 14:44:20",longitude : 122.1687131,latitude :29.880411},
              {name :"船8",terminalid: "名1",speed : 82,locationdate:"2019-09-12 14:44:20",longitude : 122.0678131,latitude :29.89611},
              {name :"船9",terminalid: "名2",speed : 81,locationdate:"2019-09-12 14:44:20",longitude : 122.008331,latitude :29.972551},
              {name :"船10",terminalid: "名3",speed : 83,locationdate:"2019-09-12 14:44:20",longitude : 122.36131,latitude :29.972521},
              {name :"船11",terminalid: "和2",speed : 84,locationdate:"2019-09-12 14:44:20",longitude : 122.364131,latitude :29.95611},
              {name :"船12",terminalid: "国5",speed : 58,locationdate:"2019-09-12 14:44:20",longitude : 122.01116,latitude :29.983481},
              {name :"船13",terminalid: "国6",speed : 28,locationdate:"2019-09-12 14:44:20",longitude : 122.286731,latitude :29.8937411}],

          // 单只渔船特定时间段航行轨迹点
          shipTrackArr : [
              {name :"船1",terminalid: "草帽",workMode:"",speed : 100,locationdate:"2019-09-12 14:44:20",longitude : 122.012123,latitude :30.0111},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 98,locationdate:"2019-09-12 14:48:20",longitude : 122.011331,latitude :29.97451},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 94,locationdate:"2019-09-12 14:54:20",longitude : 122.081131,latitude :29.91721},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 97,locationdate:"2019-09-12 15:14:20",longitude : 122.095131,latitude :29.90411},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 92,locationdate:"2019-09-12 15:34:20",longitude : 122.180131,latitude :29.94411},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 95,locationdate:"2019-09-12 15:44:20",longitude : 122.181131,latitude :29.90411},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 88,locationdate:"2019-09-12 15:54:20",longitude : 122.21,latitude :29.8991},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 82,locationdate:"2019-09-12 16:04:20",longitude : 122.282116,latitude :29.88481},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 81,locationdate:"2019-09-12 17:14:20",longitude : 122.42631,latitude :30.02311},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 83,locationdate:"2019-09-12 17:24:20",longitude : 122.43531,latitude :30.04511},
              {name :"船1",terminalid: "草帽",workMode:"拖网",speed : 84,locationdate:"2019-09-12 17:34:20",longitude : 122.39631,latitude :30.08911},
              {name :"船1",terminalid: "草帽",workMode:"",speed : 58,locationdate:"2019-09-12 17:44:20",longitude : 122.3139631,latitude :30.07611}],


          level:'',
          bounds:'',
          span:'',
          xgrids: [],//经线
          ygrids : [],//纬线
          centerPoint:'',
          beSelectBounds : [],

  }

  },
  mounted() {
    this.mapReady();
  },
  methods: {
      reback() {
          this.$router.go(-1); //reback the last step
      },
      /* 菜单选择 */
      handleSelect(key, keyPath) {
          console.log(key, keyPath);

          if (key === "1-2") {
              this.shipLocationDialog = true;// 渔船位置弹窗
          } else if (key === "3-1") {
              this.shipTrackDialog = true;// 轨迹选择弹窗
          } else if (key === "4-1") {
              this.initFisheryGrid();// 渔场显示
          }
      },

      /* 重置表单 */
      resetForm(formName) {
          //表单重置
          this.$refs[formName].resetFields();
          // //地图重置
          // let map = window.map;
          // map.clearOverlays();//删除覆盖物
          // var point = new BMap.Point(122.20, 30.00);
          // map.centerAndZoom(point, 12);
          //
          // //重新添加标注
          // this.addShipMarker();
      },


      /* 大地图显示 */
      mapReady() {
          //创建实例
          var map = new BMap.Map("allmap");
          //创建坐标点
          this.centerPoint = new BMap.Point(122.20, 30.00);
          //初始化实例，传入坐标点并设置地图级别
          map.centerAndZoom(this.centerPoint, 12);
          map.enableScrollWheelZoom(true);
          window.map = map;
          //渔船标注位置
          this.addShipMarker();


      },

      /* 初始加载所有渔船标注位置 */
      addShipMarker() {
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

          map.clearOverlays();//删除覆盖物
          var point = new BMap.Point(122.20, 30.00);
          //初始化实例，传入坐标点并设置地图级别
          map.centerAndZoom(point, 12);
          map.enableScrollWheelZoom(true);
          window.map = map;
          //渔船标注位置
          this.addShipMarker();
      },

      /* 轨迹回放 */
      loadTrackPath() {
          //弹框隐藏
          this.shipTrackDialog = false;
          //清除覆盖物
          map.clearOverlays();
          // 轨迹线设置
          var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
              scale: 0.5,//图标缩放大小
              strokeColor: '#fff',//设置矢量图标的线填充颜色
              strokeWeight: '2',//设置线宽
          });
          var icons = new BMap.IconSequence(sy, '10', '30');

          // 创建polyline对象
          var pois = [];
          for (var i = 0; i < this.shipTrackArr.length; i++) {//遍历添加轨迹点
              pois.push(new BMap.Point(this.shipTrackArr[i].longitude, this.shipTrackArr[i].latitude));
          }
          var polyline = new BMap.Polyline(pois, {
              enableEditing: false,//是否启用线编辑，默认为false
              enableClicking: true,//是否响应点击事件，默认为true
              icons: [icons],
              strokeWeight: '5',//折线的宽度，以像素为单位
              strokeOpacity: 0.5,//折线的透明度，取值范围0 - 1
              strokeColor: "#18a45b" //折线颜色
          });

          map.addOverlay(polyline);          //增加折线

          var point = new BMap.Point(pois[0].lng, pois[0].lat)
          map.centerAndZoom(point, 13);

          /*轨迹点标注*/
          var point = new Array();//定义数组标注经纬信息
          var marker = new Array();//定义数组点对象信息
          var info = new Array();//定义悬浮提示信息
          //设置icon信息
          var width = 32;
          var height = 32;
          var imgSrc = require("../../assets/shipTrack.png"); //引入icon图片 本地图片要用require
          var myIcon = new BMap.Icon(imgSrc, new BMap.Size(width, height));//配置icon
          for (var i = 0; i < this.shipTrackArr.length; i++) {//遍历
              point[i] = new window.BMap.Point(this.shipTrackArr[i].longitude, this.shipTrackArr[i].latitude);
              marker[i] = new window.BMap.Marker(point[i], {icon: myIcon});//把icon和坐标添加到Marker中
              map.addOverlay(marker[i]);
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
              this.addInfo(info[i], marker[i])
          }
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

      /* 渔场网格*/
      initFisheryGrid() {
          this.initProperty();
          this.initGrid();
          var _this =this //外部变量 放到map里用

          //添加移动后的点击事件
          map.addEventListener("dragend", function () {
              _this.initProperty();
              _this.initGrid();
          });
          //添加放大或缩小时的事件
          map.addEventListener("zoomend", function () {
              _this.initProperty();
              _this.initGrid();
          });
          //设置点击事件
          map.addEventListener("click", function (e) {
              var point = e.point;
              //获取当前点是在哪个区块内,获取正方形的四个顶点
              var points = _this.getGrid(_this,point);
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
              var lng_center = (points[0].lng + points[2].lng)/2  //点击网格的中心经度
              var lat_center = (points[0].lat + points[2].lat)/2  //点击网格的中心维度
              var point_center = new BMap.Point(lng_center, lat_center);
              var opts = {
                  width : 200,     // 信息窗口宽度
                  height: 100,     // 信息窗口高度
                  title : "大家好，我是渔场区域," , // 信息窗口标题
                  enableMessage:true,//设置允许信息窗发送短息
                  message:"亲耐滴，晚上一起捕个鱼吧？再戳下会有惊喜喔~"
              };
              var text = '位置（经纬度）：(' + lng_center + ',' + lat_center + ')'    // 窗口显示内容
              var infoWindow = new BMap.InfoWindow(text, opts);  // 创建信息窗口对象
              this.openInfoWindow(infoWindow,point_center);
          });
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
          span.x = span.x*0.8;
          span.y = span.y*0.8;
          //初始化地图上的网格
          for (var i = this.bounds.x1 + (this.centerPoint.lng - this.bounds.x1) % span.x - span.x; i < this.bounds.x2 + span.x; i += span.x) {
              if (i < 121.2 & this.bounds.y1 > 28.38) {
                  var polyline = new BMap.Polyline([
                      new BMap.Point(i.toFixed(6), this.bounds.y1),
                      new BMap.Point(i.toFixed(6), this.bounds.y2)
                  ], {strokeColor: "black", strokeWeight: 1, strokeOpacity: 0.01});
              }else{
                  var polyline = new BMap.Polyline([
                      new BMap.Point(i.toFixed(6), this.bounds.y1),
                      new BMap.Point(i.toFixed(6), this.bounds.y2)
                  ], {strokeColor: "black", strokeWeight: 1, strokeOpacity: 0.5});
              }
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
      /*初始化当前地图的状态*/
      initProperty () {
          this.level = map.getZoom();
          this.bounds = {
              x1: map.getBounds().getSouthWest().lng,
              y1: map.getBounds().getSouthWest().lat,
              x2: map.getBounds().getNorthEast().lng,
              y2: map.getBounds().getNorthEast().lat
          };
          this.span = this.getSpan();//需要使用level属性
      },
      /*获取网格的跨度*/
      getSpan() {
          var scale = 0.75;
          var x = 0.0005;
          for (var i = this.level; i < 19; i++) {
              x *= 2;
          }
          var y = parseFloat((scale * x).toFixed(5));
          return {x: x, y: y};
      },

      /*返回当前点在所在区块的四个顶点*/
      getGrid(_this,point) {
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
  opacity: 0.5;/*透明度 -*/
}
.centTitle a:hover {
  opacity: 0.8;/*透明度 -*/
}


.rightleftIcon {
  position: absolute;
  left: 90%;
  margin-top: 10px;
  float: left;
  opacity: 0.8;/*透明度 -*/
}
.mapContext {

  margin-top: 0px;
  position: absolute;
  height:1080px;
  width: 100%;
  float: left;
  /*background-color: #e5e9f2;*/
}
.mutipleSelectBox{
  position: absolute;
  margin-top: 60px;
  /*margin-left: 50px;*/
  left:12%;
  text-align: left;
  font-size: 24px;
  color: #ffffff;
  float: left;
  opacity: 0.7;/*透明度 -*/

}
.boat-id-class{
  font-size: 23px;
}
.input-date-class{
  float: left;
  width: 300px;
  font-size: 23px;
}
.select-input-data{
  text-align: left;
  float: left;
  width: 60%;
  font-size: 23px;
  margin-bottom: 10px;
}
.select-footer-class{
  text-align: center;
  margin-top: 5px;
}

</style>
