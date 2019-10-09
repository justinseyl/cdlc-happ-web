$.ajax({
    url: environmentConfig + '/getavghapp_admin',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(
      {
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    success: function(response) {
      buildavgHapp(response.avghapp, response.tot);
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/getallsurveys_admin',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(
      {
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    success: function(response) {
      build(response);
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/gettotals_admin',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(
      {
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    success: function(response) {
      $("#totsugg").html(response.sugg);
      $("#totsissue").html(response.issues);
      $("#totsurvey").html(response.totsurvey);
      $("#needattn").html(response.totneg);
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/get_schedule',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(
      {
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    success: function(response) {
      $("#next_survey").html(response.nextrun)
    },
    error: function(err){
      console.log(err);
    }
});

function buildavgHapp(avg, tot) {

  var smiles = "ok-smile";

  if (avg == 1) smiles = "terr-smile";
  if (avg == 2) smiles = "bad-smile";
  if (avg == 3) smiles = "ok-smile";
  if (avg == 4) smiles = "good-smile";
  if (avg >= 5) smiles = "awe-smile";

  var html = '<img src="../assets/' + smiles + '.png"><br>'+
  '						<div class="happiness-number">' + tot + '</div>'+
  '						<div class="happiness-text">Employee\'s</div>';


  $('#happlogoavg').append(html);
}

function build(response) {
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
