<template>
  <div id="app-wrapper">
    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>双色球</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-wrapper">
      <el-row class="ball-row" type="flex" justify="center"  v-for="(row, index) in balls">
        <!-- <el-col :span="3" class="ball">{{index + 1}}</el-col> -->
        <el-tag>第{{index + 1}}组</el-tag>
        <el-col  :span="3" v-for="item in row">
          <div :class="item.type === 1 ? 'red': 'blue'" class="ball">
            <div class="number">
              {{item.number}}
            </div>
          </div>
        </el-col>
        <el-button class="ml-30" type="info" icon="el-icon-delete" circle @click="rowDelete(index)"></el-button>
      </el-row>
      <el-row v-if="balls.length === 0" class="none-number">
        点击按钮生成数字
      </el-row>
      <el-row class="btn-group" type="flex" justify="center">
        <el-input-number v-model="num" :min="1" :max="10" label="生成数量" class="mr-10"></el-input-number>
        <el-button @click="foreachRandom()" type="primary ">生成号码</el-button>
        <el-button @click="copy()" type="success ">一键复制</el-button>
        <el-button @click="balls = []" type="warning ">重置</el-button>
        <el-button @click="back()">返回</el-button>
      </el-row>
      <el-row type="flex" justify="center">
        <system-information></system-information>
      </el-row>
    </div>
  </div>
</template>

<script>
  import SystemInformation from './SystemInformation';
  import { ipcRenderer as ipc } from 'electron'; // eslint-disable-line
  import '../../css/shuangseqiu.less';

  export default {
    components: { SystemInformation },
    data() {
      return {
        balls: [],
        num: 1,
      };
    },
    mounted() {
  
    },
    methods: {
      ballArr() {
        const redArr = [];
        const blueArr = [];
        for (let i = 0; i < 33; i += 1) {
          let index = i + 1;
          if (index < 10) {
            index = `0${index}`;
          }
          redArr.push(index);
        }
        for (let i = 0; i < 16; i += 1) {
          let index = i + 1;
          if (index < 10) {
            index = `0${index}`;
          }
          blueArr.push(index);
        }
        return {
          redArr,
          blueArr,
        };
      },
      copy() {
        if (this.balls.length === 0) {
          this.$message.error('请先选号');
          return;
        }
        let str = '';
        this.balls.forEach((ele) => {
          ele.forEach((item, index) => {
            if (index === 6) {
              str = `${str}+${item.number}`;
            } else {
              str = `${str} ${item.number}`;
            }
          });
          str = `${str}\n`;
        });
        ipc.send('copy', str);
        this.$message({
          message: '复制成功，可粘贴使用',
          type: 'success',
        });
      },
      rowDelete(index) {
        this.balls.splice(index, 1);
      },
      foreachRandom() {
        const time = +this.num;
        for (let i = 0; i < time; i += 1) {
          this.runNumber();
        }
      },
      runNumber() {
        const data = {
          redArr: this.ballArr().redArr,
          blueArr: this.ballArr().blueArr,
        };
        const compare = pro => (x, y) => (x[pro] * 1) - (y[pro] * 1);
        const temp = [];
        for (let i = 0; i < 6; i += 1) {
          const index = Math.floor(Math.random() * data.redArr.length);
          const value = data.redArr[index];
          data.redArr.splice(index, 1);
          temp[i] = {
            number: value,
            type: 1,
          };
        }
        temp.sort(compare('number'));
        temp[6] = {
          number: data.blueArr[Math.floor(Math.random() * data.blueArr.length)],
          type: 2,
        };
        this.balls.push(temp);
      },
      back() {
        this.$router.push('/');
      },
    },
  };
</script>

<style >
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
