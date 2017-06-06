
var links = $('a');
var first = $('#first');
var second = $('#second');
first.addClass('hide');
second.addClass('hide');

links.on('click',function(ev){
    links.removeClass('selected')
    $(ev.target).addClass('selected');
    var arts = $('article');
    var art = $(ev.target.attributes.href.nodeValue);
    arts.addClass('hide');
    art.removeClass('hide');
});
