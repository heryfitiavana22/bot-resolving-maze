export abstract class Subscriber<T> {
  private subscribers: ((data: T) => Promise<void> | void)[] = [];

  public subscribe(callback: (data: T) => Promise<void> | void) {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: (data: T) => void) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }

  protected async notify(data: T) {
    for (const subscriber of this.subscribers) {
      await subscriber(data);
    }
  }
}
