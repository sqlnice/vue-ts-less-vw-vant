<template>
  <div class="home">
    <div class="container">{{title}}</div>
    <van-field v-model="title" label="文本" placeholder="请输入用户名" />
  </div>
</template>

<script lang="ts">
// 使用window
declare var window: any;
import { Component, Watch, Vue } from "vue-property-decorator";
import { Toast, Field } from "vant";

@Component({
  components: {
    [Field.name]: Field
  }
})
export default class Home extends Vue {
  private title: string = "title";
  @Watch("title")
  private changeType(val: any, oldVal: any) {
    Toast(`title改变:${this.title}`);
  }
  private mounted() {
    Toast({
      message: "1",
      duration: 0
    });
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 200px;
  height: 150px;
  background-color: aquamarine;
}
</style>
