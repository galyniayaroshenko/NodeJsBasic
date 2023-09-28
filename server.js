const http = require('http');
const url = require('url');
const userRoutes = require('./user');
const hobbyRoutes = require('./hobby');

const server = http.createServer((req, res) => {
  const { method, url: requestUrl } = req;
  const { pathname } = url.parse(requestUrl);

  if (method === 'POST' && pathname === '/users') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newUser = JSON.parse(body);
        const user = userRoutes.createUser(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else if (method === 'DELETE' && pathname.startsWith('/users/')) {
    const userId = parseInt(pathname.split('/').pop());
    try {
      userRoutes.deleteUser(userId);
      res.writeHead(204);
      res.end();
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  } else if (method === 'PATCH' && pathname.startsWith('/users/')) {
    const userId = parseInt(pathname.split('/').pop());
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const updatedProperties = JSON.parse(body);
        const user = userRoutes.updateUser(userId, updatedProperties);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else if (method === 'GET' && pathname.startsWith('/users/')) {
    const userId = parseInt(pathname.split('/').pop());
    try {
      const user = userRoutes.getUserById(userId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  } else if (method === 'GET' && pathname === '/users') {
    const users = userRoutes.getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (method === 'GET' && pathname === '/users-without-hobbies') {
    const users = userRoutes.getUsersWithoutHobbies();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (method === 'POST' && pathname.match(/^\/users\/\d+\/hobbies$/)) {
    // Extract user ID from the URL
    const userId = parseInt(pathname.split('/')[2], 10);

    // Parse the incoming JSON data containing the hobby
    let body = '';
    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      try {
        const { hobby } = JSON.parse(body);

        if (hobbyRoutes.addHobbyForUser(userId, hobby)) {
          res.writeHead(201, { 'Content-Type': 'text/plain' });
          res.end('Hobby added successfully');
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Bad request: Hobby already exists or user not found');
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad request: Invalid JSON data');
      }
    });
  } else if (method === 'DELETE' && pathname.match(/^\/users\/\d+\/hobbies\/[^/]+$/)) {
    // Extract user ID and hobby from the URL
    const [userId, hobby] = pathname.split('/').slice(2);

    if (hobbyRoutes.deleteHobbyForUser(parseInt(userId, 10), hobby)) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: User or hobby not found');
    }
  } else if (method === 'GET' && pathname.match(/^\/users\/\d+\/hobbies$/)) {
    // Extract user ID from the URL
    const userId = parseInt(pathname.split('/')[2], 10);

    const userHobbies = hobbyRoutes.getUserHobbies(userId);

    // Add caching headers
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600', // Cache for 1 hour (adjust as needed)
    });

    // Add HATEOAS link to retrieve a list of hobbies for the user
    const userLink = `<${requestUrl}>; rel="user-hobbies"; type="application/json"`;
    res.setHeader('Link', userLink);
    
    res.end(JSON.stringify(userHobbies));
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
