class Single {
  constructor(name) {
    this.name = name;
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Single();
    }
    return this.instance;
  }
}

const s1 = Single.getInstance();
const s2 = Single.getInstance();
console.log(s1===s2)