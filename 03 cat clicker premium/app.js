$(document).ready(function() {

   var cats = [
        new Cat('Bella', 'cat01.jpg'),
        new Cat('Tigger', 'cat02.jpg'),
        new Cat('Chloe', 'cat03.jpg'),
        new Cat('Shadow', 'cat04.jpg'),
        new Cat('Oliver', 'cat05.jpg'),
        new Cat('Lucy', 'cat06.jpg'),
        new Cat('Molly', 'cat07.jpg'),
        new Cat('Jasper', 'cat08.jpg'),
        new Cat('Kitty', 'cat09.jpg'),
        new Cat('Smokey', 'cat10.jpg')
    ];
    var thumbs = [];
    var thumbContainer = $('#thumbs')[0];
    var selectedIndex = 0;

    // generate & display thumbs
    cats.forEach(function(cat, index) {
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
                selectedIndex = idx;
                $('#name').text(cat.name);
                $('#cat-pic').attr('src', cat.url);
                $('#counter').text(cat.count);
            }
        })(cat, index));

        $(thumbContainer).append($div);
        thumbs.push($div);
    })

    // display count
    function displayCount(element, count) {
        element.innerHTML = count;
    }

    // add click event handler
    $('#cat-pic').click(function() {
        var cat = cats[selectedIndex];
        cat.count++;
        displayCount($('#counter')[0], cat.count);
    });
});