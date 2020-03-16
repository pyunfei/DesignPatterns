import Vue from 'vue';

let vm = new Vue({
  el: '#app',
  data() {
    return {
      message: "彭雲飛",
      hobby: [1, 2, 3],
      computer: {
        name1: 'mac',
        name2: 'win'
      }
    }
  },
  watch: {},
  computed: {}
});
console.log(vm)