import Vue from 'vue';
import Router from 'vue-router';
import Ssq from '../../renderer/components/LandingPage/shuangseqiu';
import Dlt from '../../renderer/components/LandingPage/daletou';
import RewardHistroy from '../../renderer/components/LandingPage/rewardHistory';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
    },
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/ssq',
      component: Ssq,
    },
    {
      path: '/dlt',
      component: Dlt,
    },
    {
      path: '/reward-histroy',
      component: RewardHistroy,
    },
  ],
});
