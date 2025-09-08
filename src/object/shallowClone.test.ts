/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import shallowClone from "./shallowClone";
import { expect, it, describe } from "bun:test";

describe("shallowClone", () => {
  it("should return the same primitive value", () => {
    expect(shallowClone(42 as any)).toBe(42);
    expect(shallowClone("hello" as any)).toBe("hello");
    expect(shallowClone(null as any)).toBe(null);
    expect(shallowClone(undefined as any)).toBe(undefined);
  });

  it("should clone a plain object shallowly", () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = shallowClone(obj);

    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).toBe(obj.b); // 浅拷贝，引用相同
  });

  it("should clone an array shallowly", () => {
    const arr = [1, { x: 10 }, 3];
    const cloned = shallowClone(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).toBe(arr[1] as any); // 浅拷贝，引用相同
  });

  it("should not copy inherited properties", () => {
    class Parent {
      [x: string]: string;
    }
    Parent.prototype.inherited = "inherited";
    const obj = new (class extends Parent {
      own = "own";
    })();

    const cloned = shallowClone(obj);

    expect(cloned).toHaveProperty("own");
    expect(cloned).not.toHaveProperty("inherited");
  });
});
