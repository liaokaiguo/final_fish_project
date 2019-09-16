<template>
  <div class="background">


      <el-row>
         <el-col >
          <div  class="mapContext" id="allmap"></div>
        </el-col>
        <el-col>
          <div class="centTitle"><a src="#"><span>渔船作业方式智能识别系统</span></a></div>
          <div class="rightleftIcon">
            <span v-on:click="$router.back(-1)">
              <img src="../../assets/rebackLastIcon.png" style="cursor:pointer" alt="返回">
            </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/welcome">
              <img src="../../assets/rebackMainIcon.png">
            </router-link>
          </div>
        </el-col>

        <el-col   >
          <div class="mutipleSelectBox">

            <el-form ref="selectForm" :model="select" :inline="true">
              <el-form-item prop="boatId" class="boat-id-class" >
                <el-input v-model="select.boatId" placeholder="渔船编号"></el-input>
              </el-form-item>

              <el-form-item  prop="beginDate"  >
                <el-date-picker class="input-date-class"
                  v-model="select.beginDate"
                  type="datetime"
                  placeholder="航行开始时间"
                  align="right"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>

              <el-form-item  prop="endDate" >
                <el-date-picker  class="input-date-class"
                  v-model="select.endDate"
                  type="datetime"
                  placeholder="航行结束时间"
                  align="right"
                  :picker-options="pickerOptions" >
                </el-date-picker>
              </el-form-item>

              <el-form-item  prop="algorithmMode" >
                <el-select v-model="select.algorithmMode" placeholder="请选择算法库">
                  <el-option
                    v-for="item in algorithmOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item align="center">
                <el-button type="primary" @click="loadTrackPath">航行轨迹回放</el-button>
                <el-button  @click="resetForm('selectForm')">重置</el-button>
              </el-form-item>

            </el-form>

          </div>

        </el-col>
      </el-row>

    </div>


</template>
<script>
//seine（围网）fishing vessel statistic and analysis
export default {
  data() {
      return{
          user: {},
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
          select:{
              boatId:'',
              beginDate:'',
              endDate:'',
              algorithmMode:'',
          },
          Points :[
              {lng: 114.014, lat: 22.687},
              {lng: 114.0143, lat: 22.742},
              {lng: 114.09746, lat: 22.745}
          ]

      }

  },
  mounted() {
    this.mapReady();
  },
  methods: {
      reback() {
          this.$router.go(-1); //reback the last step
      },
      mapReady() {
          //创建实例
          var map = new BMap.Map("allmap");
          //创建坐标点
          var point = new BMap.Point(122.20, 30.00);
          //初始化实例，传入坐标点并设置地图级别
          map.centerAndZoom(point, 13);
          map.enableScrollWheelZoom(true);
          window.map = map;

      },
      /*重置表单*/
      resetForm(formName) {
          //表单重置
          this.$refs[formName].resetFields();
          //地图重置
          let map = window.map;
          map.clearOverlays();//删除覆盖物
          var point = new BMap.Point(122.20, 30.00);
          map.centerAndZoom(point, 13);
      },

      /*轨迹回放*/
      loadTrackPath() {
          // 渔船轨迹点
          var shipTrackArr = [
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
              {name :"船1",terminalid: "草帽",workMode:"",speed : 58,locationdate:"2019-09-12 17:44:20",longitude : 122.3139631,latitude :30.07611}];

          // 轨迹线设置
          var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
              scale: 0.5,//图标缩放大小
              strokeColor: '#fff',//设置矢量图标的线填充颜色
              strokeWeight: '2',//设置线宽
          });
          var icons = new BMap.IconSequence(sy, '10', '30');

         // 创建polyline对象
          var pois=[];
          for(var i = 0; i < shipTrackArr.length; i++) {//遍历添加轨迹点
              pois.push(new BMap.Point(shipTrackArr[i].longitude, shipTrackArr[i].latitude));
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
          map.centerAndZoom(point, 14);

          /*同首页相同 轨迹点标注*/
          var point = new Array();//定义数组标注经纬信息
          var marker = new Array();//定义数组点对象信息
          var info = new Array();//定义悬浮提示信息
          //设置icon信息
          var width = 32;
          var height = 32;
          var imgSrc = require("../../assets/shipTrack.png"); //引入icon图片 本地图片要用require
          var myIcon = new BMap.Icon(imgSrc, new BMap.Size(width,height));//配置icon
          for(var i = 0; i < shipTrackArr.length; i++){//遍历
              point[i] = new window.BMap.Point(shipTrackArr[i].longitude,shipTrackArr[i].latitude);
              marker[i] = new window.BMap.Marker(point[i],{icon:myIcon});//把icon和坐标添加到Marker中
              map.addOverlay(marker[i]);
              var label = new window.BMap.Label(shipTrackArr[i].name);
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
                  +"<p>渔船编号："+shipTrackArr[i].name+"</p>"
                  +"<p>渔船名："+shipTrackArr[i].terminalid+"</p>"
                  +"<p>航行时速(m/s)："+shipTrackArr[i].speed+"</p>"
                  +"<p>定位时间："+shipTrackArr[i].locationdate+"</p>"
                  +"<p>地址经度："+shipTrackArr[i].longitude+"</p>"
                  +"<p>地址纬度："+shipTrackArr[i].latitude+"</p>"
                  +"<p>作业方式："+shipTrackArr[i].workMode+"</p>"
                  +"</div>"
              );//悬浮提示信息
              this.addInfo(info[i],marker[i])
          }
      },
      /*点击渔船 悬浮渔船信息*/
      addInfo(info,marker){
          marker.addEventListener("click", function(e){
              var p = e.target
              var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
              map.centerAndZoom(point, 14);
              this.openInfoWindow(info)
          })
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
  left: 35%;
  width: 586px;
  height: 43px;
  font-family: FZDHTJW--GB1-0;
  font-size: 43px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 5px;
  color: #58a0ee;
  float: left;
}
.centTitle a:hover span{
  opacity: 0.3;/*透明度 -*/
}


.rightleftIcon {
  position: absolute;
  left: 90%;
  margin-top: 20px;
  float: left;
  opacity: 0.6;/*透明度 -*/
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
  width: 300px;
  font-size: 23px;
}


</style>
