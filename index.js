class EventEmitter {
	constructor() {
	  this.listeners = {};
	}
  
	addListener(eventName, fn) {
	  if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
	  }
	  this.listeners[eventName].push(fn);
	}
  
	on(eventName, fn) {
	  this.addListener(eventName, fn);
	}
  
	removeListener(eventName, fn) {
	  if (this.listeners[eventName]) {
			this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
	  }
	}
  
	off(eventName, fn) {
	  this.removeListener(eventName, fn);
	}
  
	once(eventName, fn) {
	  const onceWrapper = (...args) => {
			fn(...args);
			this.off(eventName, onceWrapper);
	  };
	  this.on(eventName, onceWrapper);
	}
  
	emit(eventName, ...args) {
	  if (this.listeners[eventName]) {
			for (const listener of this.listeners[eventName]) {
				listener(...args);
			}
	  }
	}
  
	listenerCount(eventName) {
	  return this.listeners[eventName] ? this.listeners[eventName].length : 0;
	}
  
	rawListeners(eventName) {
	  return this.listeners[eventName] || [];
	}
}

// Test for EventEmitter class
const myEmitter = new EventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1);
myEmitter.on('eventOne', c2);

myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));

myEmitter.emit('eventOne');
myEmitter.emit('eventOnce');
myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init');
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

console.log(myEmitter.listenerCount('eventOne'));
console.log(myEmitter.rawListeners('eventOne'));

myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));
