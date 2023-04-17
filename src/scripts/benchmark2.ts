// signal.ts
class Signal {
    private readonly listeners: (() => void)[] = [];
  
    public add(listener: () => void): void {
      this.listeners.push(listener);
    }
  
    public dispatch(): void {
      for (const listener of this.listeners) {
        listener();
      }
    }
  }
  
  // event.ts
  class Event {
    private listeners: { [key: string]: (() => void)[] } = {};
  
    public on(eventName: string, listener: () => void): void {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(listener);
    }
  
    public emit(eventName: string): void {
      if (this.listeners[eventName]) {
        for (const listener of this.listeners[eventName]) {
          listener();
        }
      }
    }
  }
  
  // benchmarkSignalsEvents.ts

  
  const numTrials = 10000;
  const numListeners = 100;
  
  function createListeners() {
    const listeners: (() => void)[] = [];

    for (let i = 0; i < numListeners; i++) {
      listeners.push(() => {});
    }

    return listeners;
  }
  
  function runBenchmark() {
    const signal = new Signal();
    const event = new Event();
    const eventName = 'test';
    const listeners = createListeners();
  
    for (const listener of listeners) {
      signal.add(listener);
      event.on(eventName, listener);
    }
  
    let signalTime = 0;
    let eventTime = 0;
  
    for (let i = 0; i < numTrials; i++) {
      const startTime1 = performance.now();

      signal.dispatch();
      const endTime1 = performance.now();

      signalTime += endTime1 - startTime1;
  
      const startTime2 = performance.now();

      event.emit(eventName);
      const endTime2 = performance.now();

      eventTime += endTime2 - startTime2;
    }
  
    console.log(`Signal Dispatch Average Time: ${signalTime / numTrials} ms`);
    console.log(`Event Dispatch Average Time: ${eventTime / numTrials} ms`);
  }
  
  runBenchmark();