const data = [1, 2, 3, 4, 5];
const data1 = { name: 'jack', age: 10 }
for (const key in data) {
  console.log(key);
}
for (const key of data) {
  console.log(key);
}
for (const key in data1) {
  console.log(key);
}
for (const key of data1) {
  console.log(key);
}

const a = [0]
switch (a) {
  case [0]:
    console.log(0);
    break;
  case [1]:
    console.log(1);
    break;
  case [2]:
    console.log(2);
    break;
  default:
    console.log('default');
    break;
}


const statusStr = new Map([
  ['1', ['状态1']],
  ['2', ['状态2']],
  ['3', ['状态3']],
  ['4', ['状态4']],
  ['5', ['状态5']],
]);

console.log(statusStr.get("1"));


const data = {
  name: 'jack'
}

const { name: N } = data;
console.log(N);


const data = [
  {
    show: '',
    title: ['同意', '拒绝']
  },
  {
    show: '',
    title: '已拒绝'
  },
  {
    show: '',
    title: '已同意'
  },
  {
    show: '',
    title: '改名片不存在'
  },
]

const _fetch = options => {
  fetch(options.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {}
  })
    .then(res => res.json())
    .then(res => res.data)
    .then(res => {
      const { } = res;
    })
}


const data = { "name": "jack" };
console.log(typeof JSON.stringify(data));
console.log(JSON.parse(data));


const version = ['1.45.0','1.5','3.3.3.3.3.3','6']

const parserVersion = options => {
  const _options = options;
  const target = _options.reduce((p, n) => {
    
  })
}