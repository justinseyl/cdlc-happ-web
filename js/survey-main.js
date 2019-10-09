$(".container").submit(function(e) {
    e.preventDefault();
});

var userid = sessionStorage.getItem('cdlc') || localStorage.getItem('cdlc');

function submit_survey() {
  var verification = $(".result-li.selected").val();

  if (verification) {
    buildanswer();

    $(".error-text").hide();
    $("#cover").css('display','block');
    $("#confirm-popup").css('display','block');
  } else {
    $(".error-text").show();
  }

}

function exitPopup() {
  $("#cover").css('display','none');
  $("#confirm-popup").css('display','none');
}

var data = [];
var datanum = 0;
var a = [];

$( document ).ready(function() {

  $.ajax({
      url: environmentConfig + '/getsurveys',
      type: 'post',
      contentType: "application/json",
      data: JSON.stringify(
        {
          userid: userid
        }),
      success: function(response) {
        if (response.length > 0) {
          data.push(response);
          buildhtml(response, datanum);
        } else {
          alert('Opps, there are no survey questions available at this time!')
        }
      },
      error: function(err){
        if (err) throw err;
        console.log(err);
      }
  });
});

$(".result-li").click(function() {
  $(this).addClass('selected').siblings().removeClass('selected');
});

$("input[name='comments']").click(function() {
  var iscomments = $("input[name='comments']:checked").val();

  if (iscomments == 'yes') {
    $("#input_comments").show();
  } else {
    $("#input_comments").hide();
  }
});

function buildhtml(dtl, datanum) {

  var html =  '<div class="header-left-survey">'+
                '					<h3 id="questionlabel">' + data[0][datanum].question + '</h3>'+
                '				</div>'+
                '				<div class="header-right">'+
                '					<span id="questionum" class="header-number-first">' + data[0][datanum].id + '</span><span class="header-number">/</span><span class="header-number">' + dtl.length + '</span>'+
                '				</div>';

    $('#survey-questions').append(html);
    $("#hiddenformid").val(data[0][0].formid);

    let exists = a.find(o => parseInt(o.questionnum) === parseInt(data[0][datanum].id));
    let objIndex = a.findIndex((obj => parseInt(obj.questionnum) == parseInt(data[0][datanum].id)));

    if (!exists) {
      resetDefaults();
    } else {
      setDefaults(objIndex);
    }

    if (datanum == 0) {
      $("#prev-survey").hide();
      $("#next-survey").css({
        width: '100%',
        "margin-left": '0px'
      });
    } else {
      $("#prev-survey").show();
      $("#next-survey").css({
        width: '45%',
        "margin-left": '5px'
      });
    }

    if ( (datanum + 1) == data[0].length) {
      $("#next-survey").hide();
      $("#complete-survey").show();
    } else {
      $("#next-survey").show();
      $("#complete-survey").hide();
    }

};

$("#next-survey").click(function() {
  var verification = $(".result-li.selected").val();

  if (verification) {
    buildanswer();

    $(".error-text").hide();
    datanum += 1;
    $("#survey-questions").empty();

    buildhtml(data, datanum);
  } else {
    $(".error-text").show();
  }

});

$("#prev-survey").click(function() {
  buildanswer();

  datanum -= 1;
  $("#survey-questions").empty();

  buildhtml(data, datanum);
});

function buildanswer() {

  var form_id = $("#hiddenformid").val();
  var question = $("#questionlabel").html();
  var questionnum = $("#questionum").html();
  var answer = $(".result-li.selected").val();
  var comments = $("#input_comments").val();

  let exists = a.find(o => o.questionnum === questionnum);

  if (exists) {
    let objIndex = a.findIndex((obj => obj.questionnum == questionnum));
    a[objIndex].answer = answer;
    a[objIndex].comments = comments;
  } else {
    a.push(
      {
        formid: form_id,
        questionnum: questionnum,
        question: question,
        answer: answer,
        comments: comments,
        user: userid
      });
  }

  return a;

}

function setDefaults(objIndex) {
  resetDefaults()

  var get_answer = a[objIndex].answer;
  var get_comm = a[objIndex].comments;

  var n = '.result-li[value="' + get_answer + '"]';
  $(n).addClass( "selected" );

  $("#input_comments").val(get_comm);
}

function resetDefaults() {
  $(".result-li.selected").removeClass( "selected" );
  $('[name="comments"]').prop('checked', false);
  $('[name="comments"][value="yes"]').prop('checked', 'checked');
  $("#input_comments").val("");
}

function finalPopup() {
  $.ajax({
      url: environmentConfig + '/insertSurvey',
      type: 'post',
      data: JSON.stringify(a),
      contentType: "application/json",
      success: function(response) {
        top.location.href="home.html";
      },
      error: function(err){
        console.log('err');
      }
  });
}
