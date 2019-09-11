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
            <router-link to="/">
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

              <el-form-item  prop="workType" >
                <el-input
                  type="textarea"
                  :rows="1"
                  placeholder="作业方式识别结果"
                  v-model="select.workType">
                </el-input>
              </el-form-item>

              <el-form-item align="center">
                <el-button type="primary" @click="loadTrackPath">航行轨迹回放</el-button>
                <el-button  @click="resetForm('selectForm')">重置</el-button>
              </el-form-item>

            </el-form>

<!--            <span >作业方式识别结果:</span>-->

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
              workType:'',
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
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom(true);
          window.map = map;

      },
      ///重置表单
      resetForm(formName) {
          //表单重置
          this.$refs[formName].resetFields();
          //地图重置
          let map = window.map;
          var point = new BMap.Point(122.20, 30.00);
          map.centerAndZoom(point, 15);
      },

      loadTrackPath(){
          let map = window.map;
          var point = new BMap.Point(122.20, 30.00);
          //初始化实例，传入坐标点并设置地图级别
          map.centerAndZoom(point, 15);

          var myP1 = new BMap.Point(122.220967,30.913285);    //起点
          var myP2 = new BMap.Point(122.254374,30.914668);    //终点
          var myIcon = new BMap.Icon("../../assets/logo.png", new BMap.Size(70, 70), {    //小车图片
              //offset: new BMap.Size(0, -5),    //相当于CSS精灵
              imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
          });
          var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
          driving2.search(myP1, myP2);

          window.run = function (){
              var driving = new BMap.DrivingRoute(map);    //驾车实例
              driving.search(myP1, myP2);
              driving.setSearchCompleteCallback(function(){
                  var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
                  var paths = pts.length;    //获得有几个点

                  var carMk = new BMap.Marker(pts[0],{icon:myIcon});
                  map.addOverlay(carMk);
                  var i=0;
                  function resetMkPoint(i){
                      carMk.setPosition(pts[i]);
                      if(i < paths){
                          setTimeout(function(){
                              i++;
                              resetMkPoint(i);
                          },100);
                      }
                  }
                  setTimeout(function(){
                      resetMkPoint(5);
                  },100)

              });
          }

          setTimeout(function(){
              run();
          },1500);

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
  height:1200px;
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
