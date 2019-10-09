$( document ).ready(function() {

  $.ajax({
      url: environmentConfig + '/getalerts',
      type: 'GET',
      contentType: "application/json",
      success: function(response) {
        build(response);
      },
      error: function(err){
        console.log(err);
      }
  });
});

function build(response) {
  $.each(response, function(i, item) {

    var time = item.diff;
    var icon = 'fa-comment-alt';

    if (!time || time <= 0) {
      time = 'Today'
    } else {
      time = time + ' days ago';
    }

    if (item.title == 'New Book Added') icon = 'fa-book';
    if (item.title == 'New Survey') icon = 'fa-file-alt';

    var html =
    '<li>'+
    '        <div class="dot"><i class="fas fa-circle"></i></div>'+
    '        <div class="icon">'+
    '          <div class="icon-oval"><i class="fa ' + icon + '"></i></div>'+
    '        </div>'+
    '        <div class="content">'+
    '          <h1>' + item.title + '</h1>'+
    '          <p>' + item.content + '</p>'+
    '        </div>'+
    '        <div class="timeline">' + time + '</div>'+
    '      </li>';

    $("#listNotification").append(html);
  });
}
