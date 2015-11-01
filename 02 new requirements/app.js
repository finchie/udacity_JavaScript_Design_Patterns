$(document).ready(function() {

    var count = [0, 0];
    var names = ['Twinkle', 'Mopsy'];

    // display names
    names.forEach(function(name, index) {
        $('#name-' + (index + 1))[0].innerHTML = name;
    });

    // display count
    function displayCount(element, count) {
        element.innerHTML = count;
    }

    // add event handlers
    $('.cat-pic').each(function(index, element) {
        $(element).click(function() {
            count[index]++;
            displayCount($('.counter')[index], count[index]);
        });
    });
});