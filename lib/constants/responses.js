exports.responseMessages = {
    TOKEN_MISSING: "Auth token is not supplied",
    FAILED: "Failed",
    SUCCESS: "Record found successfully",
    NOT_FOUND: "Record not found",
    RECORD_CREATED: "Record created successfully",
    PARAMETER_MISSING: "Parameter missing",
    PENDING_RES: "Please Check the logs to view the status of messages.",
    SERVER_ERROR: "Something went wrong!"
};

exports.responseFlags = {
    SUCCESS: 200,
    RECORD_CREATED: 201,

    EMAIL_NOT_VERIFIED: 301,
    PARAMETER_MISSING: 400,

    UNAUTHORIZED_CREDENTIALS: 401,
    NO_DATA_FOUND: 404,
    
    SERVER_ERROR: 503
};

exports.sendCustomResponse = function (res, message, status, data) {
    message = message ? message : module.exports.responseMessages.SUCCESS;
    status = status ? status : module.exports.responseFlags.SUCCESS;
    data = data ? data : {};
    res.send({
        message,
        status,
        data
    });
}

exports.sendSuccess = function (res, message, status, data) {
    message = message ? message : module.exports.responseMessages.SUCCESS;
    status = status ? status : module.exports.responseFlags.SUCCESS;
    data = data ? data : {};
    res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
}

exports.sendFailure = function (res, message, status, data) {
    message = message;
    status = status ? status : module.exports.responseFlags.PARAMETER_MISSING;
    data = data ? data : {};
    res.status(status).send({
        status: status,
        message: message,
        data: data,
      });
}