$.ajax({
    url: environmentConfig + '/getallsurveysgrouped_admin',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(
      {
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    success: function(response) {
      build(response);

      $("#survey-list-admin li .section-content").click(function() {

          var form = $(this).attr('id');
          var start = $(this).attr('custom');
          if (form && start) {
              window.location.href = 'admin_survey_list.html?form=' + form + '&date=' + start;
          }
      });
    },
    error: function(err){
      console.log(err);
    }
});

function build(data) {
  $.each(data, function(i, item) {

    var score = item.overall;
    var tot = item.tot;

    if (item.overall == null) {
      score = 0;
    }

    if (item.tot == null) {
      tot = 0;
    }

    var calc = (score / tot).toFixed(2);

    var smiles = "ok-smile";

    if (calc <= 0.20) smiles = "terr-smile";
    if (calc > 0.20 && calc <= 0.40) smiles = "bad-smile";
    if (calc > 0.40 && calc <= 0.60) smiles = "ok-smile";
    if (calc > 0.60 && calc <= 0.80) smiles = "good-smile";
    if (calc > 0.80) smiles = "awe-smile";

    var getformid = "'" + item.formid + "'";

    var html =
    '<li custom="' + item.start + '" class="survey-list-box-admin">'+
    '			      <div class="edit-delete-survey">'+
    '			        <img src="../assets/icon-remove.svg" onclick="deleteSurveyGroup(' + getformid + ')">'+
    '			        <img class="deletecheck" style="margin-left:15px;" src="../assets/icon-check-uncheck.svg" customid=' + getformid + ' onclick="clickDeleteAll(this,' + getformid + ')">'+
    '			      </div>'+
    '					<div class="section-details">'+
    '			      <div class="section-header">'+
    '			        <h2>' + item.start + '</h2>'+
    '			        <hr style="margin-left:0px !important;">'+
    '			      </div>'+
    '			      <div id="' + item.formid + '" custom="' + item.start + '" class="section-content">'+
    '			        <img src="../assets/' + smiles + '.png">'+
    '							<div class="survey-content-details">'+
    '								<div class="grouping">'+
    '									<h1>' + score + '/' + tot + '</h1>'+
    '									<p>Avg. Score</p>'+
    '								</div>'+
    '								<div class="grouping">'+
    '									<h1>' + item.totusr + '</h1>'+
    '									<p>Total Users</p>'+
    '								</div>'+
    '								<div class="grouping">'+
    '									<h1>' + item.terr + '</h1>'+
    '									<p>Terrible/Bad</p>'+
    '								</div>'+
    '							</div>'+
    '			      </div>'+
    '			    </div>'+
    '				</li>';

    $('#survey-list-admin').append(html);

  });
}

function deleteSurveyGroup(form) {

  var newform = "'" + form + "'";

  $("#cover").css('display','block');
  $("#confirm-delete-popup").css('display','block');

  $("#delete-survey-btn").attr("onclick","deleteFinal(" + newform + ")");
}

function deleteFinal(formid) {
  $.ajax({
      url: environmentConfig + '/deletesurveygroup',
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify(
        {
          formid: formid
        }),
      success: function(response) {
        location.reload();
      },
      error: function(err){
        console.log(err);
      }
  });
}

function clickDeleteAll(img,form) {

  if ($(img).hasClass('ischeck')) {
    $(img).attr('src','../assets/icon-check-uncheck.svg');
    $(img).removeClass('ischeck');
  } else {
    $(img).attr('src','../assets/icon-check.svg');
    $(img).addClass('ischeck');
  }

  var totCheck = $('.ischeck').length;

  if (totCheck && totCheck > 0) {
    $('#tot-delete').html(totCheck);
    $('#delete-footer').show();
  } else {
    $('#delete-footer').hide();
  }

}

function deleteSurveyGroupPre() {
  $("#cover").css('display','block');
  $("#confirm-delete-popup").css('display','block');

  $("#delete-survey-btn").attr("onclick","deleteFinalArr()");
}

function deleteFinalArr() {
  var arr = [];

  $('.edit-delete-survey .ischeck').each(function() {
    arr.push($(this).attr('customid'));
  });

  $.ajax({
      url: environmentConfig + '/deletesurveygroupmulti',
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify(
        {
          formid: arr
        }),
      success: function(response) {
        location.reload();
      },
      error: function(err){
        console.log(err);
      }
  });
}

function selectAllDelete() {
  $('.edit-delete-survey').find('.deletecheck').addClass('ischeck');
  $('.edit-delete-survey').find('.deletecheck').attr('src','../assets/icon-check.svg');

  var totCheck = $('.ischeck').length;
  $('#tot-delete').html(totCheck);
}

function UNselectAllDelete() {
  $('.edit-delete-survey').find('.deletecheck').removeClass('ischeck');
  $('.edit-delete-survey').find('.deletecheck').attr('src','../assets/icon-check-uncheck.svg');

  var totCheck = $('.ischeck').length;
  $('#tot-delete').html(totCheck);
  $('#delete-footer').hide();
}
