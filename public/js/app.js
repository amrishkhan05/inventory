(function (exports) {

    'use strict';

    exports.app = new Vue({

        // The root element that will be compiled
        el: '#inventory-app',

        // App state data
        data: {
            boxes: []
        },

        // Ensure data persistence
        ready: function () {

            var _this = this;

            inventoryData.fetch(function (responseJson) {

                _this.boxes = responseJson.boxes;

                _this.$watch('boxes', function (boxes) {
                    inventoryData.save(boxes);
                }, true);

            });

        },

        // Methods that implement data logic.
        methods: {

            createBox: function () {
                this.boxes.push({
                    name: '',
                    contents: []
                });
            },

            deleteBox: function (box) {
                this.boxes.$remove(box);
            },

            createBoxItem: function (box) {
                box.contents.push({
                    name: ''
                });
            },

            deleteBoxItem: function (box, boxItem) {
                box.contents.$remove(boxItem);
            },

            save: function () {
                inventoryData.save(this.boxes, function (responseJson) {
                    alert('Boxes saved');
                });
            }

        }

    });

})(window);
