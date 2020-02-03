const http = require('http');
const fs = require('fs')
const path = require('path')

const pathResolve = path.resolve(__dirname, 'test.txt');
const stateObj = fs.statSync(pathResolve);
// console.log(stateObj)

http.createServer((req, res) => {
  // 有无分段请求
  const range = req.headers['range'];
  if (range) {
    let [, start, end] = range.match(/(\d*)-(\d*)/);
    start = start ? Number(start) : 0;
    end = end ? Number(end) : stateObj.size;
    res.statusCode = 206;
    res.setHeader('Content-Range', `bytes ${start}-${end}/${stateObj.size}`)
    res.setHeader('Content-Length', end - start + 1)
    fs.createReadStream(pathResolve, { start, end }).pipe(res)
  } else {
    fs.createReadStream(pathResolve).pipe(res)
  }
}).listen(1998, () => { console.log('http://localhost:1998') });

/**
 * curl -v http://localhost:1998 :                              全部请求
 * 206 :                                                        分段请求状态码
 * curl -v --header "Range: bytes 0-3"  http://localhost:1998： 分段请求
 *
 */