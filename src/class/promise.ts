// utils/promise.ts
export class MyPromise {
  /**
   * 等待所有 Promise 完成，如果有一个失败则立即 reject
   */
  static all<T>(promises: Iterable<T | Promise<T>>): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const results: T[] = [];
      let completed = 0;
      let index = 0;

      for (const p of promises) {
        const currentIndex = index++;
        Promise.resolve(p).then(
          (value) => {
            results[currentIndex] = value;
            completed++;
            if (completed === index) {
              resolve(results);
            }
          },
          (err) => reject(err)
        );
      }

      if (index === 0) {
        resolve([]);
      }
    });
  }

  /**
   * 只要有一个 Promise 完成或失败，就返回它的结果
   */
  static race<T>(promises: Iterable<T | Promise<T>>): Promise<T> {
    return new Promise((resolve, reject) => {
      for (const p of promises) {
        Promise.resolve(p).then(resolve, reject);
      }
    });
  }

  /**
   * 等待所有 Promise 完成，不管成功还是失败，返回每个结果的状态
   */
  static allSettled<T>(
    promises: Iterable<T | Promise<T>>
  ): Promise<PromiseSettledResult<T>[]> {
    return new Promise((resolve) => {
      const results: PromiseSettledResult<T>[] = [];
      let completed = 0;
      let index = 0;

      for (const p of promises) {
        const currentIndex = index++;
        Promise.resolve(p).then(
          (value) => {
            results[currentIndex] = { status: "fulfilled", value };
            completed++;
            if (completed === index) {
              resolve(results);
            }
          },
          (reason) => {
            results[currentIndex] = { status: "rejected", reason };
            completed++;
            if (completed === index) {
              resolve(results);
            }
          }
        );
      }

      if (index === 0) {
        resolve([]);
      }
    });
  }

  /**
   * 返回第一个成功的 Promise，如果全部失败，则返回 AggregateError
   */
  static any<T>(promises: Iterable<T | Promise<T>>): Promise<T> {
    return new Promise((resolve, reject) => {
      const errors: any[] = [];
      let rejectedCount = 0;
      let index = 0;

      for (const p of promises) {
        const currentIndex = index++;
        Promise.resolve(p).then(
          resolve,
          (err) => {
            errors[currentIndex] = err;
            rejectedCount++;
            if (rejectedCount === index) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          }
        );
      }

      if (index === 0) {
        reject(new AggregateError([], "All promises were rejected"));
      }
    });
  }
}
