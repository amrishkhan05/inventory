document.addEventListener('DOMContentLoaded', function () {

    // Add Box Item
    var addBoxItem = function (item, boxElement) {

        var boxItemElement = document.createElement('div');
        boxItemElement.classList.add('item');
        boxItemElement.innerHTML = '<input name="box-item" value="' + item.name + '"><button class="delete-item" type="button">Delete Item</button>';
        boxItemElement.querySelector('button.delete-item').addEventListener('click', function (event) {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        });
        boxElement.appendChild(boxItemElement);

    };

    // Add Box
    var addBox = function (box) {

        var boxElement = document.createElement('div');
        boxElement.classList.add('box');
        boxElement.innerHTML = '<input name="box-name" value="' + box.name + '"><button class="delete-box" type="button">Delete Box</button><button class="new-item" type="button">New Item</button><div class="contents"></div>';
        boxElement.querySelector('button.delete-box').addEventListener('click', function (event) {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        });
        boxElement.querySelector('button.new-item').addEventListener('click', function (event) {
            addBoxItem({
                name: ''
            }, event.target.parentNode);
        });
        for (var j in box.contents) {
            addBoxItem(box.contents[j], boxElement.querySelector('div.contents'));
        }
        document.querySelector('div.boxes').appendChild(boxElement);

    };

    // Load boxes
    var loadBoxes = function () {

        document.querySelector('div.boxes').innerHTML = '';

        fetch('/boxes', {
            method: 'get'
        }).then(function (response) {
            return response.json();
        }).then(function (responseJson) {

            console.log('Loaded boxes', responseJson.status);

            for (var i in responseJson.boxes) {
                addBox(responseJson.boxes[i]);
            }

        });

    };

    // Save boxes
    var saveBoxes = function () {

        var boxes = [];

        [].forEach.call(document.querySelectorAll('div.boxes div.box'), function (boxElement) {

            var box = {
                name: '',
                contents: []
            };

            box.name = boxElement.querySelector('input[name=box-name]').value;

            [].forEach.call(boxElement.querySelectorAll('div.contents input[name=box-item]'), function (boxItemElement) {
                box.contents.push({
                    name: boxItemElement.value
                });
            });

            boxes.push(box);

        });

        fetch('/boxes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boxes)
        }).then(function (response) {
            return response.json();
        }).then(function (responseJson) {

            console.log('Saved boxes', responseJson.status);

        });

    };

    // Reload boxes
    document.querySelector('button.reload').addEventListener('click', loadBoxes);

    // Save boxes
    document.querySelector('button.save').addEventListener('click', saveBoxes);

    // Add new box
    document.querySelector('button.new-box').addEventListener('click', function () {
        addBox({
            name: '',
            contents: []
        });
    });

    // On initial load, load the boxes
    loadBoxes();

});
