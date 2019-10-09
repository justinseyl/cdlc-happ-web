function send_suggestion() {
    console.log('hello')
  $.ajax({
      url: environmentConfig + '/sendSuggestion',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: userid,
          subject: $("#sugg-subject").val(),
          content: $("#sugg-content").val()
        }),
      contentType: "application/json",
      success: function(response) {
        console.log(response);
      },
      error: function(err){
        console.log(err);
      }
  });
}

function send_issue() {
  $.ajax({
      url: environmentConfig + '/sendIssue',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: userid,
          subject: $("#issue-subject").val(),
          content: $("#issue-content").val()
        }),
      contentType: "application/json",
      success: function(response) {
        console.log(response);
      },
      error: function(err){
        console.log(err);
      }
  });
}
