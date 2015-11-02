$(document).ready(function() {

    var model = {

        Cat: function (name, url) {
            this.name = name;
            this.url = url;
            this.count = 0;
        },

        cats: [],

        selectedIndex: 0,

        init: function() {
            this.cats = [
                new model.Cat('Bella', 'cat01.jpg'),
                new model.Cat('Tigger', 'cat02.jpg'),
                new model.Cat('Chloe', 'cat03.jpg'),
                new model.Cat('Shadow', 'cat04.jpg'),
                new model.Cat('Oliver', 'cat05.jpg'),
                new model.Cat('Lucy', 'cat06.jpg'),
                new model.Cat('Molly', 'cat07.jpg'),
                new model.Cat('Jasper', 'cat08.jpg'),
                new model.Cat('Kitty', 'cat09.jpg'),
                new model.Cat('Smokey', 'cat10.jpg')
            ];
        }
    };

    var listView = {
        init: function() {
            var listContainer = $('#list')[0];

            // generate & display list
            octopus.getCats().forEach(function(cat, index) {
                var $div = $('<div>');
                var $img = $('<img>');
                $img.attr('id', 'thumb' + index);
                $img.attr('src', cat.url);
                $div.append($img);
                var $name = $('<div>');
                $name.text(cat.name);
                $div.append($name);

                $div.click((function(cat, idx){
                    return function() {
                        octopus.setSelectedIndex(idx);
                        $('#name').text(cat.name);
                        $('#cat-pic').attr('src', cat.url);
                        $('#counter').text(cat.count);
                    };
                })(cat, index));

                $(listContainer).append($div);
            });
        }
    };

    var catView = {
        displayCount: function (element, count) {
            element.innerHTML = count;
        },

        init: function() {
            // add click event handler
            $('#cat-pic').click(function() {
                var cat = octopus.getSelectedCat();
                cat.count++;
                catView.displayCount($('#counter')[0], cat.count);
            });
        }
    };

    var octopus = {

        getCats: function() {
            return model.cats;
        },

        getSelectedCat: function() {
            return this.getCats()[model.selectedIndex];
        },

        setSelectedIndex: function(index) {
            model.selectedIndex = index;
        },

        init: function() {
            model.init();
            listView.init();
            catView.init();
        }
    };

    octopus.init();

});