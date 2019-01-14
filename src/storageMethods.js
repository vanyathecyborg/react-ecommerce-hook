"use strict";
exports.__esModule = true;
exports.createStorageMethods = function (key) {
    if (!localStorage) {
        throw Error('localStorage is not available');
    }
    return {
        set: function (value) {
            var stringified = JSON.stringify(value);
            localStorage.setItem(key, stringified);
        },
        get: function () {
            var value = localStorage.getItem(key);
            return JSON.parse(value);
        }
    };
};
