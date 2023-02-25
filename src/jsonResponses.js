const query = require('querystring');

const users = {};

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

// // respond with xml object
// const respondXML = (request, response, status, message, id) => {
//     const xmlResponse = `<response><message>${message}</message><id>${id}</id></response>`;

//     response.writeHead(status, {'Content-Type': 'text/xml'});
//     response.write(xmlResponse);
//     response.end();
// }

// // respond with xml metadata
// const respondXMLMeta = (request, response, status) => {
//     response.writeHead(status, {'Content-Type': 'text/xml'});
//     response.end();
// }

// /success with 200 status code --- DONE
// /badRequest with 400 status if missing ?valid=true --- DONE
// /badRequest with 200 status code if ?valid=true --- DONE
// /unauthorized with 401 if missing ?loggedIn=yes --- DONE
// /unauthorized with 200 if ?loggedIn=yes --- DONE
// /forbidden with 403 status code --- done
// /internal with 500 status code --- done
// /notImplemented with 501 status code --- done

// const notFound = (request, response, types) => {
//     const responseJSON = {
//         message: 'The page you are looking for was not found.',
//         id: 'notFound',
//     }

//     if (types === 'text/xml') {
//         return respondXML(requst, response, 404, responseJSON.message, responseJSON.id);
//     }
//     return respondJSON(request, response, 404, responseJSON);
// }

// // SUCCESS
// const success = (request, response, types) => {
//     const responseJSON = {
//         message: 'Successful response',
//     }

//     if (types === 'text/xml') {
//         return respondXML(request, response, 200, "This is a successful response.");
//     }

//     return respondJSON(request, response, 200, responseJSON);
// }
// const successMeta = (request, response, types) => {
//     if (types === 'text/xml') {
//         return respondXMLMeta(request, response, 200);
//     }
// }
// // BAD REQUEST
// const badRequest = (request, response, types, params) => {
//     const responseJSON = {
//         message: 'This request has the required parameters',
//     };

//     if (!params.valid || params.valid !== 'true') {
//         responseJSON.message = 'Missing valid query parameter set to true';
//         responseJSON.id = 'badRequest';
        
//         if (types === 'text/xml') {
//             return respondXML(request, response, 400, responseJSON.message, responseJSON.id);
//         }
//         return respondJSON(request, response, 400, responseJSON);
//     }
//     return respondJSON(request, response, 200, responseJSON);
// }
// const badRequestMeta = (request, response, types, params) => {
//     const responseJSON = {
//         message: 'This request has the required parameters',
//     };

//     if (!params.valid || params.valid !== 'true') {
//         responseJSON.message = 'Missing valid query parameter set to true';
//         responseJSON.id = 'badRequest';
        
//         if (types === 'text/xml') {
//             return respondXMLMeta(request, response, 400, responseJSON.message, responseJSON.id);
//         }
//         return respondJSONMeta(request, response, 400, responseJSON);
//     }
//     return respondJSONMeta(request, response, 200, responseJSON);
// }
// // UNAUTHORIZED
// const unauthorized = (request, response, types, params) => {
//     const responseJSON = {
//         message: 'You are authorized to view this page',
//     };

//     if (!params.loggedIn || params.loggedIn !== 'true') {
//         responseJSON.message = 'Missing valid loggedIn parameter set to true.';
//         responseJSON.id = 'unauthorized';
        
//         if (types === 'text/xml') {
//             return respondXML(request, response, 401, responseJSON.message, responseJSON.id);
//         }
//         return respondJSON(request, response, 401, responseJSON);
//     }
//     return respondJSON(request, response, 200, responseJSON);
// }
// const unauthorizedMeta = (request, response, types, params) => {
//     const responseJSON = {
//         message: 'You are authorized to view this page',
//     };

//     if (!params.loggedIn || params.loggedIn !== 'true') {
//         responseJSON.message = 'Missing valid loggedIn parameter set to true.';
//         responseJSON.id = 'unauthorized';
        
//         if (types === 'text/xml') {
//             return respondXMLMeta(request, response, 401, responseJSON.message, responseJSON.id);
//         }
//         return respondJSONMeta(request, response, 401, responseJSON);
//     }
//     return respondJSONMeta(request, response, 200, responseJSON);
// }
// // FORBIDDEN
// const forbidden = (request, response, types) => {
//     const responseJSON = {
//         message: 'This page is forbidden',
//         id: 'forbidden'
//     };

//     if (types === 'text/xml') {
//         return respondXML(request, response, 403, responseJSON.message, responseJSON.id);
//     }
//     return respondJSON(request, response, 403, responseJSON);
// }
// const forbiddenMeta = (request, response, types) => {
//     const responseJSON = {
//         message: 'This page is forbidden',
//     };

//     if (types === 'text/xml') {
//         return respondXMLMeta(request, response, 403, responseJSON.message, responseJSON.id);
//     }
//     return respondJSONMeta(request, response, 403, responseJSON);
// }
// // INTERNAL
// const internal = (request, response, types) => {
//     const responseJSON = {
//         message: 'Internal server error',
//         id: 'internal'
//     };

  
//     if (types === 'text/xml') {
//         return respondXML(request, response, 500, responseJSON.message, responseJSON.id);
//     }
//     return respondJSON(request, response, 500, responseJSON);
// }
// const internalMeta = (request, response, types) => {
//     const responseJSON = {
//         message: 'Internal server error',
//         id: 'internal'
//     };

  
//     if (types === 'text/xml') {
//         return respondXMLMeta(request, response, 500, responseJSON.message, responseJSON.id);
//     }
//     return respondJSONMeta(request, response, 500, responseJSON);
// }
// // NOT IMPLEMENTED
// const notImplemented = (request, response, types) => {
//     const responseJSON = {
//         message: 'Endpoint not implemented',
//         id: 'notImplemented'
//     };

  
//     if (types === 'text/xml') {
//         return respondXML(request, response, 501, responseJSON.message, responseJSON.id);
//     }
//     return respondJSON(request, response, 501, responseJSON);
// }
// const notImplementedMeta = (request, response, types) => {
//     const responseJSON = {
//         message: 'Internal server error',
//         id: 'internal'
//     };

  
//     if (types === 'text/xml') {
//         return respondXMLMeta(request, response, 500, responseJSON.message, responseJSON.id);
//     }
//     return respondJSONMeta(request, response, 500, responseJSON);
// }
// // NOT REAL
// const notReal = (request, response, types) => {
//     const responseJSON = {
//         message: '',
//         id: 'notReal'
//     };

//     return respondJSON(requset, response, 404, responseJSON);
// }
// const notRealMeta = (request, response, types) => {
//     const responseJSON = {
//         message: '',
//         id: 'notReal'
//     };

//     return respondJSONMeta(request, response, 404, responseJSON);
// }
//function to add a user from a POST body
const addUser = (request, response, types, data) => {
    //default json message
    const responseJSON = {
      message: 'Name and age are both required.',
    };
  
    // I CAN RETRIEVE JSON YAY
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
    if(!users[data.name]) {
      
      //Set the status code to 201 (created) and create an empty user
      responseCode = 201;
      users[data.name] = {};
    }
  
    //add or update fields for this user name
    users[data.name].name = data.name;
    users[data.name].age = data.age;
  
    //if response is created, then set our created message
    //and sent response with a message
    if (responseCode === 201) {
      responseJSON.message = 'Created Successfully';
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
        users
    };

    respondJSON(request, response, 200, responseJSON);
};

module.exports = {
    notFound,
    success,
    successMeta,
    badRequest,
    badRequestMeta,
    unauthorized,
    unauthorizedMeta,
    forbidden,
    forbiddenMeta,
    internal,
    internalMeta,
    notImplemented,
    notImplementedMeta,
    notReal,
    notRealMeta,
    addUser,
    getUsers
}