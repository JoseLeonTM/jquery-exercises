var a = $('a');
a.on('click', request);
function request(ev) {
    ev.preventDefault();
    var link = $(ev.target)[0].attributes[0].nodeValue;
    // var link = $(ev.target);
    $.ajax({
        url: link
    }).then(function (res) {
        console.log(res);
    }, function (er) {
        console.log('Error: ', er);
        window.location.replace('error.html');
    });
}
