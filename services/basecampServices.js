const responses = require("../lib/constants/responses");
const commonFunction = require("../commonFunction");
const constants = require("../lib/constants/constants");

exports.getAccessToken = getAccessToken;
exports.authorizeBaseCamp = authorizeBaseCamp;
exports.getThreadsByProjectId = getThreadsByProjectId;
exports.getThreadDataById = getThreadDataById;
exports.getAllClients = getAllClients;
exports.broadcastMessages = broadcastMessages;



async function getAccessToken(req) {
  try {
    const refreshToken = process.env.REFRESHTOKEN || "BAhbB0kiAbB7ImNsaWVudF9pZCI6IjQ4ZDEwNWMzYzJiNjhjYTkyMDE1ODJlZTYwMGZhNzcyMmQyOTdmNTMiLCJleHBpcmVzX2F0IjoiMjAzMy0wOS0wOVQxNDoyMDo0NFoiLCJ1c2VyX2lkcyI6WzQ4NTI1NzgxXSwidmVyc2lvbiI6MSwiYXBpX2RlYWRib2x0IjoiZDZjYThkYTFlZGU4YzQxNTkwODQ0NTljMTVjNWE2Y2YifQY6BkVUSXU6CVRpbWUNLmEhwH6IzFIJOg1uYW5vX251bWkCMgE6DW5hbm9fZGVuaQY6DXN1Ym1pY3JvIgcwYDoJem9uZUkiCFVUQwY7AEY=--03f67ec8846b2476551b27bde3a5c02b1656b3b2";
    console.log(process.env.REFRESHTOKEN , refreshToken)
     const options = {
        method: constants.requestMethods.POST,
        url: `${constants.BASECAMP.AUTHORIZE_URL}/authorization/token`,
        params: {
          type: 'refresh',
          refresh_token: refreshToken,
          client_id: constants.BASECAMP.CLIENT_ID,
          client_secret: constants.BASECAMP.CLIENT_SECRET
        }
      };
      console.log('options====>', options);
      const accessToken = await commonFunction.sendHttpRequest({ options });
      console.log('accessToken=====>', accessToken);
    return accessToken;
  } catch (err) {
    console.log('Error in getAccessToken:', err);
    return err;
  }
}

async function getThreadsByProjectId(req) {
  try {
    const accountId = constants.BASECAMP.ACCOUNT_ID;
    const projectId = constants.BASECAMP.PROJECT_ID;
    const messageBoardId = constants.BASECAMP.MESSAGE_BOARD_ID;
    const accessToken = req.body.accessToken;
    const mainValues = [accessToken];
    const checkBlank = commonFunction.checkBlank(mainValues);
    if(checkBlank){
      return responses.responseMessages.TOKEN_MISSING;
    }
   
    console.log("executing getThreadsByProjectId");
    const options = {
      method: constants.requestMethods.GET,
      url: `${constants.BASECAMP.URL}/${accountId}/buckets/${projectId}/message_boards/${messageBoardId}/messages.json`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    let threadList = await commonFunction.sendHttpRequest({ options });
    if(threadList.length){
      threadList = threadList.map(thread => {return {content: thread.content, subject: thread.subject, title: thread.title, status: thread.status, visible_to_clients: thread.visible_to_clients, id: thread.id, status: thread.status }})
    }
    return threadList
  } catch (err) {
    console.log('Error in getThreadsByProjectId:', err);
    return err;
  }
}

async function getThreadDataById(req) {
  try {
    const accountId = constants.BASECAMP.ACCOUNT_ID;
    const projectId = constants.BASECAMP.PROJECT_ID;
    const {messageBoardId, accessToken } = req.body;
    const mainValues = [messageBoardId, accessToken];
    const checkBlank = commonFunction.checkBlank(mainValues);
    if(checkBlank){
      return { data : responses.responseMessages.PARAMETER_MISSING , status: 404};
    }
   
    console.log("executing getThreadDataById");
    const options = {
      method: constants.requestMethods.GET,
      url: `${constants.BASECAMP.URL}/${accountId}/buckets/${projectId}/messages/${messageBoardId}.json`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    let threadDetail = await commonFunction.sendHttpRequest({ options });
    return threadDetail
  } catch (err) {
    console.log('Error in getThreadsByProjectId:', err);
    return err;
  }
}

async function getAllClients(req) {
  try {
    const accountId = constants.BASECAMP.ACCOUNT_ID;
    const accessToken = req.body.accessToken;
    const mainValues = [accessToken];
    const checkBlank = commonFunction.checkBlank(mainValues);
    if(checkBlank){
      return responses.responseMessages.TOKEN_MISSING;
    }
   
    console.log("executing getAllClients");
    const options = {
      method: constants.requestMethods.GET,
      url: `${constants.BASECAMP.URL}/${accountId}/projects.json`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    let clientList = await commonFunction.sendHttpRequest({ options });
    // console.log('clientList=====>', clientList);
    if(clientList.length){
      clientList = clientList.map(client => {
        let payload = { 
          id: client.id,
          name : client.name,
          status: client.status,
          description: client.description,
          created_at: client.created_at
         }
        let hasValue = client.dock.filter(obj =>  Object.values(obj).includes("message_board"))
        if(hasValue.length){
          payload.url = hasValue[0].app_url
        }
        return payload
      })
    }
    return clientList
  } catch (err) {
    console.log('Error in getThreadsByProjectId:', err);
  }
}

async function broadcastMessages(req) {
  try {
    const accountId = constants.BASECAMP.ACCOUNT_ID;
    const projectId = constants.BASECAMP.PROJECT_ID;
    const {accessToken, clientURL, messageBoardId} = req.body;
    const mainValues = [accessToken, messageBoardId];
    const checkBlank = commonFunction.checkBlank(mainValues);
    if(clientURL && typeof(clientURL) == 'string'){
      return { data : responses.responseMessages.PARAMETER_MISSING , status: 404};
    }

    if(checkBlank){
      return { data : responses.responseMessages.PARAMETER_MISSING , status: 404};
    }
   
    console.log("executing broadcastMessages");

    const options = {
      method: constants.requestMethods.GET,
      url: `${constants.BASECAMP.URL}/${accountId}/buckets/${projectId}/messages/${messageBoardId}.json`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    let threadDetail = await commonFunction.sendHttpRequest({ options });
    const clientResponses = [clientURL.length];
    if (threadDetail && threadDetail?.status !== 404) {
        for (let index = 0; index < clientURL.length; index++) {
            const url =  /^(ftp|http|https):\/\/[^ "]+$/.test(clientURL[index]);
            if(url){
              const urlObj = new URL(clientURL[index]);
              const parts = urlObj.pathname.split('/');
              // Extracting the IDs
              const bucketId = parts[3];
              const clientMessageBoardId = parts[5];
              if(bucketId && clientMessageBoardId){
                let payload = JSON.stringify({
                  subject: threadDetail.subject,
                  status: threadDetail.status,
                  content : threadDetail.content,
                  notify: "everyone"
                })
                const response = await createAthreads(accessToken, clientMessageBoardId, bucketId, accountId, payload)
                if(response && response.id){
                  clientResponses.push(response.bucket);
                }
              }

            }
 
        }
        clientResponses.push(clientResponses.length - 1)
        return {status:200,clientResponses};
    }

    return threadDetail;
  } catch (err) {
    console.log('Error in getThreadsByProjectId:', err);
    return err;
  }
}

async function authorizeBaseCamp(req){
    try{
    const code = req.query.code;
    const options = {
      method: constants.requestMethods.POST,
      url: `${constants.BASECAMP.AUTHORIZE_URL}/authorization/token`,
      params: {
        type: 'web_server',
        code: code,
        redirect_uri: constants.BASECAMP.REDIRECT_URI,
        client_id: constants.BASECAMP.CLIENT_ID,
        client_secret: constants.BASECAMP.CLIENT_SECRET
      }
    };
    const response = await commonFunction.sendHttpRequest({ options });
     return response;
  } catch (err) {
    console.log('Error in getAccessToken:', err);
    return err;
  }
}

async function createAthreads(accessToken, messageBoardId, projectId, accountId, data){
  const options = {
    method: constants.requestMethods.POST,
    url: `${constants.BASECAMP.URL}/${accountId}/buckets/${projectId}/message_boards/${messageBoardId}/messages.json`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', 
    },

    data : data
  };
  let threadRes = await commonFunction.sendHttpRequest({ options });
  return threadRes
}




