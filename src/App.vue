<template>
  <div id="app">
    <button @click="show=true">打开模态框</button>
    状态{{show}}
    <v-dialog :visible.sync='show' v-mymodel:show='show'>
      <div style="height:100px;width:100%;background-color: white;">模态框
        <button style="position: absolute;bottom: 0px;right: 0px;" @click="show=false">关闭</button>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import VDialog from './dialog';
import HModelBack from './index.js';
export default {
  name: 'app',
  components: { VDialog },
  directives: {
    mymodel: HModelBack
  },
  data() {
    return {
      show: false
    };
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
