$(document).ready(function() {
    var count1 = 0, count2 = 0;
    var names = ['Twinkle', 'Mopsy'];
    names.forEach(function(name, index) {
        $('#name-' + (index + 1))[0].innerHTML = name;
    })

    function displayCount(element, count) {
        element.innerHTML = count;
    }

    $('#cat-pic-1').click(function() {
        count1++;
        displayCount($('#counter-1')[0], count1);
    });

    $('#cat-pic-2').click(function() {
        count2++;
        displayCount($('#counter-2')[0], count2);
    });
});