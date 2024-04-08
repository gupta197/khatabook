let basecampServices = require('../services/basecampServices');
const responseMethod = require('../lib/constants/responses');
const commonFunction = require('../commonFunction');
const { constants } = require('fs/promises');

exports.getAccessToken = getAccessToken;
exports.authorizeBaseCamp = authorizeBaseCamp;
exports.getThreadsByProjectId = getThreadsByProjectId;
exports.getThreadDataById = getThreadDataById;
exports.getAllClients = getAllClients;
exports.broadcastMessages = broadcastMessages;


async function getAccessToken(req, res) {
  try {
    const getAccessToken = await basecampServices.getAccessToken(req);
    return responseMethod.sendSuccess(res, null, null, getAccessToken);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
}

async function getThreadsByProjectId(req, res) {
  try {
    const threadsData = await basecampServices.getThreadsByProjectId(req);
    if (!Array.isArray(threadsData)) {
      return responseMethod.sendFailure(res, responseMethod.responseMessages.FAILED, responseMethod.responseFlags.NO_DATA_FOUND, threadsData);
    }
    return responseMethod.sendSuccess(res, null, null, threadsData);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
}

async function getThreadDataById(req, res) {
  try {
    const threadsDetail = await basecampServices.getThreadDataById(req);
    if (threadsDetail && threadsDetail?.status !== 404) {
      return responseMethod.sendSuccess(res, null, null, threadsDetail);
    }
    return responseMethod.sendFailure(res, responseMethod.responseMessages.FAILED, responseMethod.responseFlags.NO_DATA_FOUND, threadsDetail);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
}

async function getAllClients(req, res) {
  try {
    const clientData = await basecampServices.getAllClients(req);
    if (!Array.isArray(clientData)) {
      return responseMethod.sendFailure(res, responseMethod.responseMessages.FAILED, responseMethod.responseFlags.NO_DATA_FOUND, clientData);
    }
    return responseMethod.sendSuccess(res, null, null, clientData);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
}

async function broadcastMessages(req, res) {
  try {
    const broadcastData = await basecampServices.broadcastMessages(req);
    if (broadcastData && broadcastData?.status !== 404) {
      return responseMethod.sendSuccess(res, null, null, broadcastData);
    }
    return responseMethod.sendFailure(res, responseMethod.responseMessages.FAILED, responseMethod.responseFlags.NO_DATA_FOUND, broadcastData);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
}

async function authorizeBaseCamp(req, res) {
  try {
    const authorizeBaseCamp = await basecampServices.authorizeBaseCamp(req);
    if(authorizeBaseCamp &&  authorizeBaseCamp.access_token){
      return responseMethod.sendSuccess(res, null, null, { accessToken: authorizeBaseCamp.access_token, refreshToken:  authorizeBaseCamp.refresh_token});
    }
    return responseMethod.sendFailure(res, responseMethod.responseMessages.FAILED, responseMethod.responseFlags.NO_DATA_FOUND, authorizeBaseCamp);
  } catch (error) {
    return responseMethod.sendFailure(res, error);
  }
}