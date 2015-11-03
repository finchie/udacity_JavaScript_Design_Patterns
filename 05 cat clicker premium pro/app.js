$(document).ready(function() {

    var model = {

        Cat: function (name, url) {
            this.name = name;
            this.url = url;
            this.count = 0;
        },

        cats: [],

        selectedCat: null,

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
            this.listContainer = $('#list')[0];
            this.render();
        },

        render: function() {
            // clear list
            this.listContainer.innerHTML = '';

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

                $div.click((function(cat){
                    return function() {
                        octopus.setSelectedCat(cat);
                        catView.render();
                        adminView.hide();
                    };
                })(cat));

                $(listView.listContainer).append($div);
            });
        }
    };

    var catView = {
        updateCount: function () {
            this.$counter.text(octopus.getSelectedCat().count);
        },

        render: function() {
            var cat = octopus.getSelectedCat();
            if(cat) {
                this.$name.text(cat.name);
                this.$image.attr('src', cat.url);
                this.$counter.text(cat.count);
                this.$adminButton.show();
            } else {
                this.$name.text('Please select a cat.');
            }
        },

        init: function() {
            // store elements for efficiency
            this.$name = $('#name');
            this.$image = $('#cat-pic');
            this.$counter = $('#counter');
            this.$adminButton = $('#admin-button');

            // add image click event handler
            this.$image.click(function() {
                octopus.incrementCount();
            });

            // add button click event handler
            this.$adminButton.click(function() {
                adminView.render();
            });

            this.render();
        }
    };

    var adminView = {
        init: function () {
            this.$formDiv = $('#admin-form');
            this.$adminName = $('#admin-name');
            this.$adminURL = $('#admin-URL');
            this.$adminCount = $('#admin-count');
            // handle cancel click
            $('#cancel-button').click(function(e) {
                adminView.hide();
                e.preventDefault();
            });
            // handle save click
            $('#save-button').click(function(e) {
                octopus.updateCat(
                    adminView.$adminName.val(),
                    adminView.$adminURL.val(),
                    adminView.$adminCount.val()
                );
                e.preventDefault();
            });
        },
        render: function() {
            var cat = octopus.getSelectedCat();
            if (cat) {
                this.$adminName.val(cat.name);
                this.$adminURL.val(cat.url);
                this.$adminCount.val(cat.count);
                this.$formDiv.show();
            }
        },
        hide: function() {
            this.$formDiv.hide();
        },
        updateCount: function() {
            var cat = octopus.getSelectedCat();
            if (cat) {
                this.$adminCount.val(cat.count);
            }
        }
    };

    var octopus = {

        getCats: function() {
            return model.cats;
        },

        getSelectedCat: function() {
            return model.selectedCat;
        },

        setSelectedCat: function(cat) {
            model.selectedCat = cat;
        },

        incrementCount: function() {
            model.selectedCat.count++;
            catView.updateCount();
            adminView.updateCount();
        },

        updateCat: function (name, url, count) {
            // update model
            var cat = model.selectedCat;
            cat.name = name;
            cat.url = url;
            try {
                cat.count = parseInt(count);
            } catch (e) {
                console.error(count + ' is not a valid number');
            }
            // update views
            adminView.hide();
            listView.render();
            catView.render();
        },

        init: function() {
            model.init();
            listView.init();
            catView.init();
            adminView.init();
        }
    };

    octopus.init();

});