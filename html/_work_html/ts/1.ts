function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));


interface myFn {
  (arg1: string, arg2: number, arg3?: boolean): Array<string | number | boolean>
}
const myFn: myFn = function (arg1: 'test', arg2: 1, arg3?: true) {
  return [arg1, arg2, arg3]
}

const myFn1: (arg1: string, arg2: number, arg3: boolean)
  => Array<string | number | boolean>
  = function (arg1: string, arg2: number, arg3: boolean) {
    return [arg1, arg2, arg3]
  }


function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}


interface Cat {
  name: string,
  run(): void;
}
interface Fish {
  name: string,
  swim(): void;
}
interface There extends Cat {
  
}
type Common = (animal: Cat | Fish) => boolean;
const isFish: Common = (animal: Cat | Fish) => {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}

interface Data {
  results: Array<Object>;
}
