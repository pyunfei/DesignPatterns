function test<T, K extends keyof T>(obj: T, key: K): unknown {
  return obj[key];
}