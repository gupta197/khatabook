function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: true
    });
}
exports.DEVICE_TYPE = {
    WEB: 0,
    ANDROID: 1,
    IOS: 2
};

exports.OTP_REQUEST_TYPE = {};
define(exports.OTP_REQUEST_TYPE, 'LOGIN_OTP', 1);
define(exports.OTP_REQUEST_TYPE, 'SIGNUP_OTP', 2);
define(exports.OTP_REQUEST_TYPE, 'VERIFICATION_OTP', 3);
define(exports.OTP_REQUEST_TYPE, 'PASSWORD_RESET_OTP', 5);
define(exports.OTP_REQUEST_TYPE, 'ACCOUNT_DEACTIVATE', 9);
define(exports.OTP_REQUEST_TYPE, 'ACCOUNT_ACTIVATE', 10);



exports.responseMessages = {};
define(exports.responseMessages, 'PARAMETER_MISSING', 'Insufficient information was supplied. Please check and try again.');
define(exports.responseMessages, "SOMETHING_WENT_WRONG", "Something went wrong. Please try again later");
define(exports.responseMessages, 'ACTION_COMPLETE', 'Successful');




//FOR FLAGS
exports.responseFlags = {};
define(exports.responseFlags, 'PARAMETER_MISSING', 400);
define(exports.responseFlags, 'SHOW_ERROR_MESSAGE', 404);
define(exports.responseFlags, 'ACTION_COMPLETE', 200);

exports.redisKeyExpire = 86400; //3600*24

exports.userRedisKey = "USER-";
exports.webappRedisKey = "WEB_APP-";

exports.requestMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

exports.MAIL_TYPE = {
    TEXT: 'text',
    HTML: "html"
};


