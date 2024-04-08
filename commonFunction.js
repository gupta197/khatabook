const axios = require('axios');

exports.checkBlank = function (arr) {
    if (!Array.isArray(arr)) {
        return 1;
    }
    var arrlength = arr.length;
    for (var i = 0; i < arrlength; i++) {
        if (arr[i] === undefined || arr[i] == null) {
            arr[i] = "";
        } else {
            arr[i] = arr[i];
        }
        arr[i] = arr[i].toString().trim();
        if (arr[i] === '' || arr[i] === "" || arr[i] === undefined) {
            return 1;
        }
    }
    return 0;
};

exports.generateRandomStringAndNumbers = function (len) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

exports.generateOtp = function (len) {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

exports.addDays = function (days) {
    var newDate = new Date();
    newDate.setTime(newDate.getTime() + (86400000 * days)); // add a date
    newDate.setHours(23, 59, 59, 999);
    return new Date(newDate)
};

exports.handleValidation =function(err) {
    const messages = []
    for (let field in err.errors) { return err.errors[field].message; }
    return messages;
};


exports.sendHttpRequest = function (opts) {
    var options = opts.options;
    return new Promise(async (resolve, reject) => {
        try {
            console.log('HTTP_REQUEST:', options);
            const response = await axios(options);
            // console.log('Response from external server', response.data);
            resolve(response.data);
        } catch (error) {
            // console.log('Error from external server', error.response);
            resolve(error.response);
        }
    });
};

exports.convertSecondsToHHMM = function (seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
