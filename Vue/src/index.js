import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  data() {
    return {
      message: "彭雲飛",
      hobby: ['a', 'b', { 'c': 'c' }],
      computer: {
        name1: 'mac',
        name2: 'win'
      }
    }
  },
  watch: {},
  computed: {}
});

setTimeout(function(){
  vm.message = '好水啊1';
  vm.message = '好水啊2';
  vm.message = '好水啊3';
},2000)