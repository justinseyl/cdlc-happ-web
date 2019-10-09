$.ajax({
    url: environmentConfig + '/getEmployees_admin',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(
      {
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    success: function(response) {
      build(response);

      $("#survey-list li").click(function() {
          var user = $(this).attr('id');
          if (user) {
              window.location.href = 'admin_employee_profile.html?username=' + user;
          }
      });
    },
    error: function(err){
      console.log(err);
    }
});

$('#division').on('change', function() {
  var txt = $('#division').find(":selected").text();
  $('.survey-content .survey-item:nth-child(2)').each(function(){
    if ($(this).text().toUpperCase() != txt.toUpperCase() && txt.toUpperCase() != 'FILTER DEPARTMENT') {
      $(this).parent().parent().hide();
    } else if (txt.toUpperCase() == 'FILTER DEPARTMENT') {
      $(this).parent().parent().show();
    } else {
      $(this).parent().parent().show();
    }
  });
});

function build(response) {
  var index = 0;
  $.each(response, function(i, item) {

    var score = item.comp;
    var tot = item.tot;
    var getname = item.name;
    var survey = item.lastsurvey;

    if (item.lastsurvey == null) {
      survey = 'NEVER';
    }

    if (item.comp == null) {
      score = 0;
    }

    if (item.tot == null) {
      tot = 0;
    }

    if (item.name == null || item.name == '') {
      getname = item.email;
    }

    var calc = (score / tot).toFixed(2);

    var smiles = "ok-smile";

    if (calc <= 0.20) smiles = "terr-smile";
    if (calc > 0.20 && calc <= 0.40) smiles = "bad-smile";
    if (calc > 0.40 && calc <= 0.60) smiles = "ok-smile";
    if (calc > 0.60 && calc <= 0.80) smiles = "good-smile";
    if (calc > 0.80) smiles = "awe-smile";

    var li = '<li id="' + item.email + '">'+
    '          <div class="survey-headers">'+
    '            <div class="survey-item">Employee Name</div>'+
    '            <div class="survey-item">Department</div>'+
    '            <div class="survey-item">Last Survey Taken</div>'+
    '            <div class="survey-item">Average Happiness</div>'+
    '          </div>'+
    '          <div class="survey-content">'+
    '            <div class="survey-item">' + getname + '</div>'+
    '            <div class="survey-item">' + item.division + '</div>'+
    '            <div class="survey-item">' + survey + '</div>'+
    '            <div class="survey-item">' + score + '/' + tot + '<img src="../assets/' + smiles + '.png"></div>'+
    '          </div>'+
    '        </li>';


    $('#survey-list').append(li);

    index ++;
  });

  $("#totalmploye").html('(' + index + ')');
}
