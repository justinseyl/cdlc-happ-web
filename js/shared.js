var userid = sessionStorage.getItem('cdlc') || localStorage.getItem('cdlc');

$('#main,#logout-button').click(function(e) {
  if ($(window).width() <= 767) {
    if ($('.sidebar:visible').length && e.target.id != 'sidebar-toggle') {
      $("#mySidebar").css({
        'width' : '0px',
        'display' : 'none'
      });
      $("#main").css({
        'opacity': '1'
      });
    };
  };
});

$('#setrole').val(sessionStorage.getItem('cdlc-role'));

$('#setrole').on('change', function(role) {
  sessionStorage.setItem('cdlc-role', $(this).val());
  location.reload();
});

function closepopup() {
  $("#cover").css('display','none');
  $(".popup-panel").css('display','none');

  location.reload();
}

function pickRole(role) {
  sessionStorage.setItem('cdlc-role', role);

  $("#cover").css('display','none');
  $(".popup-panel").css('display','none');

  editSurvey();
}

function editSurvey() {
  var role = sessionStorage.getItem('cdlc-role');

  if (!role || role == 'both') {
    $("#cover").css('display','block');
    $("#roleselect-popup").css('display','block');
  } else {
    $.ajax({
        url: environmentConfig + '/getCurrentSurvey_admin',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(
          {
            roletype: sessionStorage.getItem('cdlc-role')
          }),
        success: function(response) {
          listSurveyQuestions(response.items,response.day,response.timeframe);
        },
        error: function(err){
          console.log(err);
        }
    });

    $("#cover").css('display','block');
    $("#addnew-popup").css('display','block');
  }

}

function editTest() {
  $.ajax({
        url: environmentConfig + '/getCurrentTest',
        type: 'GET',
        contentType: "application/json",
        success: function(response) {
          listSurveyQuestionsTest(response.items,response.day,response.timeframe);
        },
        error: function(err){
          console.log(err);
        }
    });

    $("#cover").css('display','block');
    $("#addnew-popup-test").css('display','block');
}

function popIssue() {
  $("#cover").css('display','block');
  $("#issue-popup").css('display','block');
}

function popComment() {
  $("#cover").css('display','block');
  $("#comment-popup").css('display','block');
}

function popLogOut() {
  $("#cover").css('display','block');
  $("#logout-popup").css('display','block');
}

function popEditPersonal() {
  $("#cover").css('display','block');
  $("#edit-personal-popup").css('display','block');
}

function popEditQuestions() {
  $("#cover").css('display','block');
  $("#edit-questions-popup").css('display','block');
}

function popSuggAdmin(userid,name,created,title,content) {

  $('#sugg-admin-popup').empty();

  var html =
  '<div class="popup-content">'+
  '		<div class="popup-header-admin">' + title + '</div><img class="close" src="../assets/icon-close.png" onclick="closepopup()">'+
  '		<div class="popup-label-admin">' + content + '</div>'+
  '		<div class="popup-split">'+
  '			<div class="split-item">'+
  '				<h1>User</h1>'+
  '				<p>' + name + '</p>'+
  '			</div>'+
  '			<div class="split-item">'+
  '				<h1>Date</h1>'+
  '				<p>' + created + '</p>'+
  '			</div>'+
  '		</div>'+
  '   <form action="mailto:' + userid + '"> '+
  '		   <button type="submit" class="message-button"><i class="far fa-envelope"></i>Message User</button>'+
  '   </form>'+
  '	</div>';

  $('#sugg-admin-popup').append(html);

  $("#cover").css('display','block');
  $("#sugg-admin-popup").css('display','block');
}

function popIssAdmin(id,userid,name,created,title,content,status) {

  $('#sugg-admin-popup').empty();
  var newid = "'" + id + "'";

  var html =
  '<div class="popup-content">'+
  '		<div class="popup-header-admin">' + title + '</div><img class="close" src="../assets/icon-close.png" onclick="closepopup()">'+
  '		<div class="popup-label-admin">' + content + '</div>'+
  '		<div class="popup-split">'+
  '			<div class="split-item split-item-three">'+
  '				<h1>User</h1>'+
  '				<p>' + name + '</p>'+
  '			</div>'+
  '			<div class="split-item split-item-three">'+
  '				<h1>Date</h1>'+
  '				<p>' + created + '</p>'+
  '			</div>'+
  '			<div class="split-item split-item-three">'+
  '				<h1>Status</h1>'+
  '				<p>' + status + '</p>'+
  '			</div>'+
  '		</div>'+
  '   <form style="display:inline;" action="mailto:' + userid + '"> '+
  '		   <button type="submit" class="message-issue"><i class="far fa-envelope"></i>Message User</button>'+
  '   </form>'+
  '		<button type="submit" class="resolve-issue" onclick="resolveIssue(' + newid + ')"><i class="fas fa-redo-alt"></i>Resolve Issue</button>'+
  '	</div>';

  $('#sugg-admin-popup').append(html);

  if (status == 'Closed') {
    $('.resolve-issue').hide();
    $('.message-issue').css({
      "width": "100%",
      "margin-right": "0px"
    });
  }

  $("#cover").css('display','block');
  $("#sugg-admin-popup").css('display','block');
}

function logout() {
  localStorage.removeItem("cdlc");
  sessionStorage.removeItem("cdlc");
  localStorage.removeItem("cdlc-admin");
  sessionStorage.removeItem("cdlc-admin");

  top.location.href="login.html";
}

function resolveIssue(id) {
  $.ajax({
      url: environmentConfig + '/reslveIssue_admin',
      type: 'POST',
      data: JSON.stringify(
        {
          id: id,
        }),
      contentType: "application/json",
      success: function(response) {
        location.reload();
      },
      error: function(err){
        console.log(err);
      }
  });
}

function openNav() {
  $("#mySidebar").css({
    'width' : '250px',
    'display' : 'block',
    'z-index' : '9999',
    'box-shadow' : '10px 0 24px 0 rgba(17, 24, 22, 0.49)'
  });
  $("#main").css({
    'opacity': '0.6'
  });
}

function listSurveyQuestionsTest(data,day,time) {

  var html =
  '<div class="input-group form-group sch-container">'+
  '          <div class="ques ques-third" style="margin-right:25px;">'+
  '            <h1>Release Day</h1>'+
  '            <select id="sch-day-test" class="form-control">'+
  '              <option value="0">Sunday</option>'+
  '              <option value="1">Monday</option>'+
  '              <option value="2">Tuesday</option>'+
  '              <option value="3">Wednesday</option>'+
  '              <option value="4">Thursday</option>'+
  '              <option value="5">Friday</option>'+
  '              <option value="6">Saturday</option>'+
  '            </select>'+
  '          </div>'+
  '          <div class="ques ques-third" style="position:absolute;right:0;">'+
  '            <h1>Release Schedule</h1>'+
  '            <select id="sch-time-test" class="form-control">'+
  '              <option value="month">Once Per Month</option>'+
  '              <option value="week">Once Per Week</option>'+
  '              <option value="bi-week">Every Other Week</option>'+
  '              <option value="ninty">Every 3 Months</option>'+
  '              <option value="bi-yearly">Every 6 Months</option>'+
  '            </select>'+
  '          </div>'+
  '				</div>';

  $('#addnew-form-test').append(html);

  $("#sch-day-test option[value='" + day + "']").prop('selected', true);
  $("#sch-time-test option[value='" + time + "']").prop('selected', true);

  $.each(data, function(i, item) {

    var html =
    '<div class="input-group form-group">'+
    '          <div class="ques">'+
    '            <h1>Question ' + item.id + ':</h1>'+
    '  					<input id="question-' + item.id + '" type="text" class="form-control" placeholder="Enter text here" value="' + item.question + '">'+
    '            <span class="fa fa-trash-alt errspan" onclick="deleteQuestion(this)"></span>'+
    '          </div>'+
    '				</div>';

    $('#addnew-form-test').append(html);
  });
}

function listSurveyQuestions(data,day,time) {
  var role = sessionStorage.getItem('cdlc-role');

  if (role == 'manager') {
    $('#role-label').html('Manager');
  }
  if (role == 'user') {
    $('#role-label').html('Employee');
  }

  var html =
  '<div class="input-group form-group sch-container">'+
  '          <div class="ques ques-third" style="margin-right:25px;">'+
  '            <h1>Release Day</h1>'+
  '            <select id="sch-day" class="form-control">'+
  '              <option value="0">Sunday</option>'+
  '              <option value="1">Monday</option>'+
  '              <option value="2">Tuesday</option>'+
  '              <option value="3">Wednesday</option>'+
  '              <option value="4">Thursday</option>'+
  '              <option value="5">Friday</option>'+
  '              <option value="6">Saturday</option>'+
  '            </select>'+
  '          </div>'+
  '          <div class="ques ques-third" style="position:absolute;right:0;">'+
  '            <h1>Release Schedule</h1>'+
  '            <select id="sch-time" class="form-control">'+
  '              <option value="month">Once Per Month</option>'+
  '              <option value="week">Once Per Week</option>'+
  '              <option value="bi-week">Every Other Week</option>'+
  '              <option value="ninty">Every 3 Months</option>'+
  '              <option value="bi-yearly">Every 6 Months</option>'+
  '            </select>'+
  '          </div>'+
  '				</div>';

  $('#addnew-form').append(html);

  $("#sch-day option[value='" + day + "']").prop('selected', true);
  $("#sch-time option[value='" + time + "']").prop('selected', true);

  $.each(data, function(i, item) {

    var html =
    '<div class="input-group form-group">'+
    '          <div class="ques">'+
    '            <h1>Question ' + item.id + ':</h1>'+
    '  					<input id="question-' + item.id + '" type="text" class="form-control" placeholder="Enter text here" value="' + item.question + '">'+
    '            <span class="fa fa-trash-alt errspan" onclick="deleteQuestion(this)"></span>'+
    '          </div>'+
    '				</div>';

    $('#addnew-form').append(html);
  });
}

function deleteQuestion(span) {
  $(span).parents('.input-group').remove();

  var new_ques = $("#addnew-form").find( ".input-group:not(.sch-container)" );

  $.each(new_ques, function(i, item) {
    var ind = i + 1;
    $(item).find( "h1" ).html("Question " + ind + ":");
    $(item).find( "input" ).attr('id','question-' + ind);
  });
}

function addQuestion() {
  if ($("#addnew-form").find( ".input-group:not(.sch-container)" ).length) {
    var new_ques = $("#addnew-form").find( ".input-group:not(.sch-container)" ).last().find( "input" ).attr('id');
    var s = new_ques.split('-').pop();

    s = parseInt(s) + 1;

    var html =
    '<div class="input-group form-group">'+
    '          <div class="ques">'+
    '            <h1>Question ' + s + ':</h1>'+
    '  					<input id="question-' + s + '" type="text" class="form-control" placeholder="Enter text here">'+
    '            <span class="fa fa-trash-alt errspan" onclick="deleteQuestion(this)"></span>'+
    '          </div>'+
    '				</div>';

    $('#addnew-form').append(html);
  } else {
    var html =
    '<div class="input-group form-group">'+
    '          <div class="ques">'+
    '            <h1>Question 1:</h1>'+
    '  					<input id="question-1" type="text" class="form-control" placeholder="Enter text here">'+
    '            <span class="fa fa-trash-alt errspan" onclick="deleteQuestion(this)"></span>'+
    '          </div>'+
    '				</div>';

    $('#addnew-form').append(html);
  }
}

function addQuestionTest() {
  if ($("#addnew-form-test").find( ".input-group:not(.sch-container)" ).length) {
    var new_ques = $("#addnew-form-test").find( ".input-group:not(.sch-container)" ).last().find( "input" ).attr('id');
    var s = new_ques.split('-').pop();

    s = parseInt(s) + 1;

    var html =
    '<div class="input-group form-group">'+
    '          <div class="ques">'+
    '            <h1>Question ' + s + ':</h1>'+
    '  					<input id="question-' + s + '" type="text" class="form-control" placeholder="Enter text here">'+
    '            <span class="fa fa-trash-alt errspan" onclick="deleteQuestion(this)"></span>'+
    '          </div>'+
    '				</div>';

    $('#addnew-form-test').append(html);
  } else {
    var html =
    '<div class="input-group form-group">'+
    '          <div class="ques">'+
    '            <h1>Question 1:</h1>'+
    '  					<input id="question-1" type="text" class="form-control" placeholder="Enter text here">'+
    '            <span class="fa fa-trash-alt errspan" onclick="deleteQuestion(this)"></span>'+
    '          </div>'+
    '				</div>';

    $('#addnew-form-test').append(html);
  }
}

  function submitNew() {

  var all = $("#addnew-form").find( ".input-group:not(.sch-container)" );
  var arr = [];

  $.each(all, function(i, item) {

    var newid = parseInt($(item).find( "input" ).attr('id').split('-').pop());
    var newquestion = $(item).find( "input" ).val();

    arr.push({
      newid:newid,
      newquestion:newquestion
    })

  });

  $.ajax({
      url: environmentConfig + '/sendNewSurvey',
      type: 'POST',
      data: JSON.stringify(
        {
          arr:arr,
          roletype: sessionStorage.getItem('cdlc-role')
        }),

      contentType: "application/json",
      success: function(response) {
        var day = $("#sch-day").val();
        var time = $("#sch-time").val();

        $.ajax({
            url: environmentConfig + '/sendNewSchedule',
            type: 'POST',
            data: JSON.stringify(
              {
                day:day,
                time:time,
                roletype: sessionStorage.getItem('cdlc-role')
              }),

            contentType: "application/json",
            success: function() {
              location.reload();
            },
            error: function(err){
              console.log(err);
            }
        });
      },
      error: function(err){
        console.log(err);
      }
  });

}

function submitNewTest() {

var all = $("#addnew-form-test").find( ".input-group:not(.sch-container)" );
var arr = [];

$.each(all, function(i, item) {

  var newid = parseInt($(item).find( "input" ).attr('id').split('-').pop());
  var newquestion = $(item).find( "input" ).val();

  arr.push({
    newid:newid,
    newquestion:newquestion
  })

});

$.ajax({
    url: environmentConfig + '/sendNewSurvey',
    type: 'POST',
    data: JSON.stringify(
      {
        arr:arr,
        roletype: 'test'
      }),

    contentType: "application/json",
    success: function(response) {
      var day = $("#sch-day-test").val();
      var time = $("#sch-time-test").val();

      $.ajax({
          url: environmentConfig + '/sendNewSchedule',
          type: 'POST',
          data: JSON.stringify(
            {
              day:day,
              time:time,
              roletype: 'test'
            }),

          contentType: "application/json",
          success: function() {
            location.reload();
          },
          error: function(err){
            console.log(err);
          }
      });
    },
    error: function(err){
      console.log(err);
    }
});

}
