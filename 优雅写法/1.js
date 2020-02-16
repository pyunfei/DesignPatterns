const fn1 = () => {
  console.log('彭雲飛');
};

const actions = new Map([
  [0, fn1],
  [1, fn1],
  [2, fn1],
  [3, fn1],
])

const map = (val) => {
  return actions.get(val);
}

const getMap = map(1);
console.log(getMap());