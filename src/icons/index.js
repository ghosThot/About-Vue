import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon';

// 自动引入
const req = require.context('./svg', false, /\.svg$/) 
// 通过keys获取所有文件名
req.keys().map(req)

// 全局注册
Vue.component('svg-icon', SvgIcon)