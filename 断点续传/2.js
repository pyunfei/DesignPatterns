const http = require('http');
const fs = require('fs');
const path = require('path');

let start = 0;
let limit = 5;
let ws = fs.createWriteStream(path.resolve(__dirname, 'down.txt'));

//断点续传 通过控制台输入 p 来控制
let pause = false; 
process.stdin.on('data', (data => {
  if (data.includes('p')) {
    pause = true;
  } else {
    pause = false;
    download();
  }
}))

function download() {
  const options = {
    hostname: 'localhost',
    port: 1998,
    methods: 'get',
    headers: {
      Range: `bytes=${start}-${limit + start - 1}`
    }
  }
  http.get(options, (res => {
    let total = res.headers['content-range'].split('/')[1];
    res.pipe(ws, { end: false });
    start += limit;
    if (start < total && pause === false) {
      setTimeout(() => download(), 1000)
    } else {
      // ws.end()
    }
  }))
}
download();