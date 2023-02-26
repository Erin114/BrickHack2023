// Moss Limpert
// IGME 430
// 02/12/23
// Http api assignment 1

const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
//const port = 80;  // for emi hosting, use this port

// endpoints
const urlStruct = {
  'GET': {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    index: htmlHandler.getIndex,
  },
  'HEAD': {
  },
  'POST': {
    '/addUser': jsonHandler.addUser
  },
  notFound: jsonHandler.notFound
}

// on request made to the server
const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');
    const params = query.parse(parsedUrl.query);

    // if request using method we dont handle
    if (!urlStruct[request.method]) {
      urlStruct.notFound(request, response);
    }


    const methodHandlers = urlStruct[request.method];
    if (methodHandlers[parsedUrl.pathname]) {
      methodHandlers[parsedUrl.pathname](request, response);
    } else {
      urlStruct.notFound(request, response, params);
    }
};

//
// begin server!
//
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
  });