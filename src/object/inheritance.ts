export default function inheritPrototype<
  ChildType extends Function,
  ParentType extends Function
>(
  child: ChildType,
  parent: ParentType
): void {
  // 使用 Object.create 建立原型链，不调用父类构造函数
  child.prototype = Object.create(parent.prototype);
  // 修正 constructor 指向
  child.prototype.constructor = child;
}

// 这种「寄生组合」式，可以避免重复调用父类的构造函数，提高性能
// 使用方法：

function Parent(this: any, name: string) {
  this.name = name;
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};
function Child(this: any, name: string, age: number) {
  Parent.call(this, name);
  this.age = age;
}
inheritPrototype(Child, Parent);
const child = new (Child("Tom", 20) as any);
child.sayName(); // Tom
