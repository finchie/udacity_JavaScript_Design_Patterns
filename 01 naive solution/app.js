$(document).ready(function() {
    var count = 0;
    displayCount();

    function displayCount() {
        $('#counter')[0].innerHTML = count;
    }

    $('#cat-pic').click(function() {
        count++;
        displayCount();
    });
});