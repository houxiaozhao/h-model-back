<template>
  <div>
    <div v-show="myVisible" class="wrapper" @click.self="myVisible=false">
      <div class="dialog">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VDialog',
  props: {
    visible: Boolean
  },
  data() {
    return {
      myVisible: this.visible
    };
  },
  watch: {
    myVisible: function(val) {
      this.$emit('update:visible', val);
    },
    visible: function(val) {
      this.myVisible = val;
    }
  }
};
</script>
<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.46);
}
.dialog {
  position: relative;
  margin: 0 auto 50px;
  top: 30%;
  width: 50%;
  z-index: 11;
}
</style>
