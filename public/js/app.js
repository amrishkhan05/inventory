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
                Vue.nextTick(function () {
                    document.querySelector('div.box:last-of-type input.box-name').focus();
                });
            },

            deleteBox: function (box) {
                this.boxes.$remove(box);
            },

            firstBoxItem: function (box, event) {
                if (box.contents.length == 0) {
                    box.contents.push({
                        name: ''
                    });
                }
                Vue.nextTick(function () {
                    var boxElement = event.target.parentNode;
                    boxElement.querySelector('div.box-item:last-of-type input').focus();
                });
            },

            createBoxItem: function (box, event) {
                box.contents.push({
                    name: ''
                });
                Vue.nextTick(function () {
                    var boxElement = event.target.parentNode.parentNode;
                    boxElement.querySelector('div.box-item:last-of-type input').focus();
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
