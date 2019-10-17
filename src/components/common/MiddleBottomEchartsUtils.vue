<template>
  <div class="middleBEcharts">
    <!--<div v-bind:id="echartId" :data="OptionData" class="middleBottomLREcharts"></div>-->
    <div v-bind:id="echartId" :data="OptionData" class="middleBottomLREcharts"></div>
  </div>
</template>

<script>
// the middlebottom left and  right echarts  as the same
export default {
  data() {
    return {
      // LinerEcharts: null
    };
  },
  props: ["echartId", "OptionData"],
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.drawGraph(this.echartId, newValue);
      },
      deep: true
    }
  },
  mounted: function() {
    this.drawGraph(this.echartId, this.OptionData);
  },
  methods: {
    drawGraph(id, data) {
      /*var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption(data);*/
      var LinerEcharts = this.$echarts.init(document.getElementById(id));
      LinerEcharts.setOption(data);
      window.addEventListener("resize", function() {
        LinerEcharts.resize();
      });
    }
  },
  // beforeDestroy() {
  //   if (this.LinerEcharts) {
  //     this.LinerEcharts.clear();
  //   }
  // }
};
</script>

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
.middleBottomLREcharts{
  width: 22vw;
  height: 23vh;
  opacity: 1;
  left:0%;
  top: 1%;
  position: absolute;
}
</style>
