
// 不同进程 可以监听同一个端口号
const {} = require('child_process');
const cpus = require('os').cpus();
console.log(cpus.length)