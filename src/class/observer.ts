// observer.ts

// 观察者接口
interface Observer<T = any> {
  update(data: T): void;
}

// 被观察者接口
interface Subject<T = any> {
  attach(observer: Observer<T>): void;
  detach(observer: Observer<T>): void;
  notify(data: T): void;
}

// 具体被观察者
class ConcreteSubject<T = any> implements Subject<T> {
  private observers: Set<Observer<T>> = new Set();

  attach(observer: Observer<T>): void {
    this.observers.add(observer);
  }

  detach(observer: Observer<T>): void {
    this.observers.delete(observer);
  }

  notify(data: T): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

// 具体观察者
class ConcreteObserver<T = any> implements Observer<T> {
  constructor(private name: string) {}

  update(data: T): void {
    console.log(`${this.name} received update:`, data);
  }
}

// 使用示例
const subject = new ConcreteSubject<number>();

const observer1 = new ConcreteObserver<number>('Observer 1');
const observer2 = new ConcreteObserver<number>('Observer 2');

subject.attach(observer1);
subject.attach(observer2);

subject.notify(42); 
// Observer 1 received update: 42
// Observer 2 received update: 42

subject.detach(observer1);
subject.notify(100);
// Observer 2 received update: 100
