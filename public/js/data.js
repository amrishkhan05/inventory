(function (exports) {

    'use strict';

    exports.inventoryData = {

        fetch: function (callback) {

            fetch('/boxes', {
                method: 'get'
            }).then(function (response) {
                return response.json();
            }).then(callback);

        },

        save: function (boxes, callback) {

            fetch('/boxes', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(boxes)
            }).then(function (response) {
                return response.json();
            }).then(callback);

        }

    };

})(window);
