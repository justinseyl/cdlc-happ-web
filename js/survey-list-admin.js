const urlParams = new URLSearchParams(window.location.search);
const form = urlParams.get('form');
const start = urlParams.get('date');

$.ajax({
    url: environmentConfig + '/getallsurveysbyform',
    type: 'POST',
    data: JSON.stringify(
      {
        form: form,
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    contentType: "application/json",
    success: function(response) {
      build(response);

      $( "#survey-list li" ).click(function() {
        $('#survey-list li:not(#' + this.id + ')').hide();
        $('#main-header-label').hide();
        $('#main-header-label-paged').show();
        $('#survey-expanded').show();

        listExp(this.id, response);
      });
    },
    error: function(err){
      console.log(err);
    }
});

function build(response) {
  $("#startLabel").html(start);

  $.each(response, function(i, item) {

    var score = item.overall.split('/')[0];
    var tot = item.overall.split('/')[1];

    var calc = (score / tot).toFixed(2);

    var smiles = "ok-smile";

    if (calc <= 0.20) smiles = "terr-smile";
    if (calc > 0.20 && calc <= 0.40) smiles = "bad-smile";
    if (calc > 0.40 && calc <= 0.60) smiles = "ok-smile";
    if (calc > 0.60 && calc <= 0.80) smiles = "good-smile";
    if (calc > 0.80) smiles = "awe-smile";

    var li = '<li id="' + item.id + '">'+
    '          <div class="survey-headers">'+
    '            <div class="survey-item">Name</div>'+
    '            <div class="survey-item">Department</div>'+
    '            <div class="survey-item">Date</div>'+
    '            <div class="survey-item">Overall Score</div>'+
    '          </div>'+
    '          <div class="survey-content">'+
    '            <div class="survey-item">' + item.name + '</div>'+
    '            <div class="survey-item">' + item.department + '</div>'+
    '            <div class="survey-item">' + item.date + '</div>'+
    '            <div class="survey-item">' + item.overall + '<img src="../assets/' + smiles + '.png"></div>'+
    '          </div>'+
    '        </li>';


    $('#survey-list').append(li);
  });
}

function listExp(id, data) {
  $("#startLabel").parent().hide();
  $("#top-level-label").html(start);
  $("#main-header-label-paged").attr('onclick','location.reload()');

  var q = data.find(x => x.id === id).questions;

  $.each(q, function(i, item) {

    var smiles = "ok-smile";
    var str = item.score.split('/')[0];

    if (str == 1) smiles = "terr-smile";
    if (str == 2) smiles = "bad-smile";
    if (str == 3) smiles = "ok-smile";
    if (str == 4) smiles = "good-smile";
    if (str >= 5) smiles = "awe-smile";

    var li_exp = '<li>'+
    '          <div class="survey-exp-headers">'+
    '            <div class="survey-question"><span class="question-label">Q' + item.id + ':</span>' + item.question + '</div>'+
    '            <div class="survey-score">' + item.score + ' <img src="../assets/' + smiles + '.png"</img></div>'+
    '          </div>'+
    '          <div class="survey-content">'+
    '            <div class="survey-content-comments">Comments:</div>'+
    '            <div class="survey-content-detail">' + item.answer + '</div>'+
    '          </div>'+
    '        </li>';

    $('#survey-list-expanded').append(li_exp);
  });
}
