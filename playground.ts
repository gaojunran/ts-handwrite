const parent = { a: 1 };
const obj = Object.create(parent);
obj.b = 2;

for (let key in Object.keys(obj)) {
  console.log(key); // 输出 "0"
  // 实际属性名要用 Object.keys(obj)[key]
}
