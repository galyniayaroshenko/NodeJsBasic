const EventEmitter = require('./event-emitter.js');
const https = require('https');

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    try {
      this.emit('begin');
      console.log('About to execute');

      const start = process.hrtime();
      const result = await asyncFunc(...args);
      const end = process.hrtime();

      const executionTime = ((end[0] - start[0]) * 1e9 + (end[1] - start[1])) / 1e6; // in milliseconds

      console.log(`Execution time: ${executionTime}ms`);
      this.emit('end');
      console.log('Done with execute');

      this.emit('data', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async fetchDataFromURL(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data) => console.log('Received data:', data));

console.log(withTime.rawListeners('end'));

withTime.execute(withTime.fetchDataFromURL, 'https://jsonplaceholder.typicode.com/posts/1');
