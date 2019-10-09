$( document ).ready(function() {

  $.ajax({
      url: environmentConfig + '/getalerts_admin',
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

    if (!time || time == 0) {
      time = 'Today'
    } else {
      time = time + ' days ago';
    }

    if (item.title == 'New Suggestion Added') icon = 'fa-comment-alt';
    if (item.title == 'New Survey Completed') icon = 'fa-file-alt';
    if (item.title == 'New User Sign Up') icon = 'fa-user';
    if (item.title == 'New Issue Added') icon = 'fa-exclamation-triangle';
    if (item.title == 'Book Read') icon = 'fa-book';
    if (item.title == 'Book Un-Read') icon = 'fa-book';
    if (item.title == 'New Book Review') icon = 'fa-book';

    var html =
    '<li>'+
    '        <div class="dot">&#183</div>'+
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
