var userid = sessionStorage.getItem('cdlc') || localStorage.getItem('cdlc');

$.ajax({
    url: environmentConfig + '/completed_survey',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: userid
      }),
    contentType: "application/json",
    success: function(response) {
      if (response.survey && response.survey == 'completed') {
        surveycompleted();

        if (top.location.href.indexOf('master_survey.html') >= 0) {
          top.location.href="home.html";
        }
      } else {
        newsurvey();
      }
    },
    error: function(err){
      console.log(err);
    }
});

function surveycompleted() {
  $("#new-container-done").show();
  $("#new-container").hide();
  $(".new").hide();
}

function newsurvey() {
  $("#new-container-done").hide();
  $("#new-container").show();
  $(".new").show();
}
