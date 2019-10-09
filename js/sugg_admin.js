$("#edit-personal-form").submit(function(e) {
    e.preventDefault();
});


$.ajax({
    url: environmentConfig + '/allsugg_admin',
    type: 'GET',
    contentType: "application/json",
    success: function(response) {
      buildSugg(response);
    },
    error: function(err){
      console.log(err);
    }
});

function buildSugg(data) {
  var index = 0;
  $.each(data, function(i, item) {

    var userid = "'" + item.userid + "'";
    var name = "'" + item.name + "'";
    var created = "'" + item.created + "'";
    var title = "'" + item.title + "'";
    var content = "'" + item.content + "'";

    var html =
    '<div id="' + item.id + '" class="section-content-admin" onclick="popSuggAdmin(' + userid + ',' + name + ',' + created + ',' + title + ',' + content + ')">'+
    '          <div class="section-left-admin">'+
    '            <div class="section-labels">'+
    '              <h1>User</h1>'+
    '              <p>' + item.name + '</p>'+
    '            </div>'+
    '            <div class="section-labels">'+
    '              <h1>Date</h1>'+
    '              <p>' + item.created + '</p>'+
    '            </div>'+
    '          </div>'+
    '          <div class="section-right-admin">'+
    '            <h1>' + item.title + '</h1>'+
    '            <p>' + item.content + '</p>'+
    '          </div>'+
    '        </div>';

    $('#suggestions').append(html);

    index ++;

  });
  $('#totalsuggestions').html('(' + index + ')');

}
