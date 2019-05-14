<template>
  <div id="app-wrapper">
     <el-row  type="flex" justify="center">
       <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
          <el-table-column
            prop="expect"
            label="期数"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="opencode"
            label="中奖号码"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="opentime"
            label="中奖日期"
            align="center">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="btn-group" type="flex" justify="center">
        <el-button @click="back()">返回</el-button>
      </el-row>
      <el-row type="flex" justify="center">
        <system-information></system-information>
      </el-row>
  </div>
</template>

<script>
  import SystemInformation from './SystemInformation';
  import '../../css/rewardHistory.less';

  export default {
    components: { SystemInformation },
    data() {
      return {
        tableData: [],
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        // this.$http.get('//f.apiplus.net/ssq.json').then((res) => {
        //   this.tableData = res.data.data;
        // });
        this.$jsonp('//kaijiang.aicai.com/open/sinaGameResult.do?callback=jsonp1547628320139&game=101', {
          param: 'jsonpCallback',
        }, (res) => {
          console.log(res);
        });
      },
      back() {
        this.$router.push('/');
      },
    },
  };
</script>
