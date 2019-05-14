<template>
  <div id="wrapper">
    <main>
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <router-link class="main-block b-1" to="/ssq">双色球选号</router-link>
        </el-col>
        <el-col :span="4">
          <router-link class="main-block b-2" to="/dlt">大乐透选号</router-link>
        </el-col>
        <el-col :span="4">
          <router-link class="main-block b-3" to="/">历史中奖 <br> 暂未开放</router-link>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';
  import '../css/LandingPage.less';
  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>
