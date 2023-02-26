const query = require('querystring');

const temporaryData = {
  server: {
    bubbles: {
      friends: {
        userHandles: ["wob", "sharkies"]
      },
      classmates: {
        userHandles: ["wob"]
      },
      family: {
        userHandles: ["wob", "sharkies", "fiddlersGreen"]
      }
    },
    users: {
      willo: {
        handle: "wob",
        name: "willow",
        statuses: {
          "they/them": [
            ["friends", true],
            ["family", false],
            ["classmates", true]
          ]
        },
        userBubbles: ["friends", "family", "classmates"],
        encryptedPassword: ""
      },
      erin: {
        handle: "sharkies",
        name: "erin",
        statuses: {
          "she/her": [
            ["friends", true],
            ["family", true]
          ]
        },
        userBubbles: ["friends", "family"],
        encryptedPassword: ""
      },
      moss: {
        handle: "fiddlersGreen",
        name: "moss",
        statuses: {
          "he/him": [
            ["family", true]
          ],
        },
        userBubbles: ["family"],
        encryptedPassword: ""
      }
    },
  },
  client: {

  }
};

// respond with json object
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

// respond with json metadata
const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

// parse body
const parseBody = (request, response, handlerFunction) => {
  // re-assemble data
  // acquire it
  const body = [];

  // event handler
  request.on('error', (err) => {
    console.dir(err); // works better when logging an obj
    response.statusCode = 400;
    response.end();
  });
  // data event gets fired in order, even if data doesnt arrive in order
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    // application/x-www-form-urlencoded <-- data type
    //name=value&name2=value2 <-- data format
    const bodyString = Buffer.concat(body).toString();  // takes contents of a buffer, slamo together

    let bodyObject;
    if (request.headers['content-type'] === 'application/json') {
      bodyObject = JSON.parse(bodyString);
    }
    
    handlerFunction(request, response, bodyObject);
  });
}

// create user status
const createUserStatus = (request, response) => {

}

// 404
const notFound = (request, response, types) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    }
    return respondJSON(request, response, 404, responseJSON);
}

//function to add a user from a POST body
const addUser = (request, response, types, data) => {
    //default json message
    const responseJSON = {
      message: 'Name and age are both required.',
    };
  
    // HERE IS WHERE YOU DO THINGS WITH THE DATA
    request.on('data', (chunk) => {
        console.log(JSON.parse(chunk.toString()));
    });
    //check to make sure we have both fields
    //We might want more validation than just checking if they exist
    //This could easily be abused with invalid types (such as booleans, numbers, etc)
    //If either are missing, send back an error message as a 400 badRequest
    if (!data.name || !data.age) {
      responseJSON.id = 'missingParams';
      return respondJSON(request, response, 400, responseJSON);
    }
  
    //default status code to 204 updated
    let responseCode = 204;
  
    //If the user doesn't exist yet
    if(!temporaryData[data.name]) {
      
      //Set the status code to 201 (created) and create an empty user
      responseCode = 201;
      temporaryData[data.name] = {};
    }
  
    //add or update fields for this user name
    temporaryData[data.name].name = data.name;
    temporaryData[data.name].age = data.age;
  
    //if response is created, then set our created message
    //and sent response with a message
    if (responseCode === 201) {
      responseJSON.message = 'Created Successfully';
      //responseJSON.userInfo = temporaryData[data.name];
      console.log(responseJSON);
      return respondJSON(request, response, responseCode, responseJSON);
    }
    // 204 has an empty payload, just a success
    // It cannot have a body, so we just send a 204 without a message
    // 204 will not alter the browser in any way!!!
    return respondJSONMeta(request, response, responseCode);
};

const getUsers = (request, response) => {
    const responseJSON = {
        message: 'Here are the users!',
        id: 'getUsers',
        users: temporaryData
    };

    respondJSON(request, response, 200, responseJSON);
};

module.exports = {
    notFound,
    addUser,
    getUsers
}