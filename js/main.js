var userid = sessionStorage.getItem('cdlc') || localStorage.getItem('cdlc');

$( ".review-stars:not(.checked)" ).click(function() {
  $( this ).prevAll().addClass( 'checked' );
  $( this ).addClass( 'checked' );

  $( ".review-stars.checked" ).click(function() {
    $( this ).nextAll().removeClass( 'checked' );
  });

});

function prevItem() {
  if ($('.carousel-item:visible').length != $('.carousel-item').length) {
    var first = $('.carousel-item:visible:first').attr('id');
    var last = $('.carousel-item:visible:last').attr('id');

    var oldid = "#book-" + (parseInt(first.split('-')[1]));
    var retainedid = "#book-" + (parseInt(last.split('-')[1]));
    var newid = "#book-" + (parseInt(last.split('-')[1]) + 1);

    if (last.split('-')[1] >= $('.carousel-item').length) {
      newid = "#book-1"
    }

    $(newid).show().insertAfter($(retainedid)).css({
      'width' : '50%',
      'padding-right' : '0px',
      'padding-left' : '9px',
      'right': '0',
      'left': 'auto',
    });
    $(retainedid).css({
      'width' : '50%',
      'padding-right' : '9px',
      'padding-left' : '0px',
      'left': '0',
      'right': 'auto'
    });
    $(oldid).hide();
  }
}

function nextItem() {
  if ($('.carousel-item:visible').length != $('.carousel-item').length) {
    var first = $('.carousel-item:visible:first').attr('id');
    var last = $('.carousel-item:visible:last').attr('id');

    var oldid = "#book-" + (parseInt(last.split('-')[1]));
    var retainedid = "#book-" + (parseInt(first.split('-')[1]));
    var newid = "#book-" + (parseInt(first.split('-')[1]) - 1);

    if (first.split('-')[1] == '1') {
      newid = "#book-" + $('.carousel-item').length;
    }

    $(newid).show().insertBefore($(retainedid)).css({
      'width' : '50%',
      'padding-right' : '9px',
      'padding-left' : '0px',
      'left': '0',
      'right': 'auto'
    });
    $(retainedid).css({
      'width' : '50%',
      'padding-right' : '0px',
      'padding-left' : '9px',
      'right': '0',
      'left': 'auto',
    });
    $(oldid).hide();
  }
}

function buildavgHapp(avg, tot) {

  var smiles = "ok-smile";

  if (avg == 1) smiles = "terr-smile";
  if (avg == 2) smiles = "bad-smile";
  if (avg == 3) smiles = "ok-smile";
  if (avg == 4) smiles = "good-smile";
  if (avg >= 5) smiles = "awe-smile";

  var html = '<img src="../assets/' + smiles + '.png"><br>'+
  '						<div class="happiness-number">' + tot + '</div>'+
  '						<div class="happiness-text">Survey\'s Taken</div>';


  $('#happlogoavg').append(html);
}

function buildunreadbooks(data) {

  $.each(data, function(i, item) {
      
    var newbookid = "'" + item.id + "'";

    var html = '<div id="book-' + (i+1) + '" class="carousel-item active">'+
    '			                <div class="img-fluid mx-auto d-bloc">'+
    '												<div class="book-inner">'+
    '													<div class="book-header">'+
    '														<div class="book-image"><img src="../books/' + item.image + '"></div>'+
    '														<div class="book-title">'+
    '															<div class="book-title-label">' + item.name + '</div>'+
    '															<div class="by">By:</div>'+
    '															<div class="book-title-author">' + item.author + '</div>'+
    '															<div class="book-title-reviews">' + item.reviews + ' Reviews</div>'+
    '															<div class="book-title-reviews-stars">' + item.rating + ' <i class="fa fa-star"></i></div>'+
    '														</div>'+
    '													</div>'+
    '													<div class="book-content">'+
    '														<div class="book-content-desc">Description:</div>'+
    '														<div class="book-content-main">' + item.description + '</div>'+
    '														<button id="' + item.id + '" class="book-read" onclick="writeReview(' + newbookid + ')">I HAVE NOT READ THIS</button>'+
    '													</div>'+
    '												</div>'+
    '											</div>'+
    '			            </div>';

    $('#homebooklist').append(html);
  });

  if ($(window).width() < 1300 && $(window).width() > 767) {
    $(".carousel-item").hide();
    $('#book-1').css({
      'width' : '50%',
      'padding-right' : '9px'
    }).show();
    $('#book-2').css({
      'width' : '50%',
      'padding-left' : '9px'
    }).show();
    $('#book-3').hide();
  } else if ($(window).width() <= 767) {
    $(".carousel-item").hide();
    $('#book-1').css({
      'width' : '100%'
    }).show();
  } else {
    $(".carousel-item").hide();
    $('#book-1').css({
      'width' : '33%',
      'padding-right' : '9px'
    }).show();
    $('#book-2').css({
      'width' : '33%',
      'padding-left' : '4.5px',
      'padding-right' : '4.5px'
    }).show();
    $('#book-3').css({
      'width' : '33%',
      'padding-left' : '9px'
    }).show();
  }
}

$.ajax({
    url: environmentConfig + '/getavghapp',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: userid
      }),
    contentType: "application/json",
    success: function(response) {
      buildavgHapp(response.avghapp, response.tot);
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/getIncompleteBooks',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: userid
      }),
    contentType: "application/json",
    success: function(unread) {
      buildunreadbooks(unread);
    },
    error: function(err){
      console.log(err);
    }
});

function unreadtoread(btn) {
  var id = $(btn).attr('id');

  $.ajax({
      url: environmentConfig + '/unreadtoread',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: userid,
          bookid: id
        }),
      contentType: "application/json",
      success: function(unread) {
        top.location.href="home.html";
      },
      error: function(err){
        console.log(err);
      }
  });
}

function writeReview(bookid) {
  $("#cover").css('display','block');
  $("#review-popup").css('display','block');
  $("#review-popup").attr('book',bookid)
}

function send_review() {
  var reviews = $( ".review-stars.checked" ).length;
  var subject = $( "#review-subject" ).val();
  var content = $( "#review-content" ).val();
  var bookid = $("#review-popup").attr('book');
  
  $.ajax({
      url: environmentConfig + '/submitreview',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: userid,
          bookid: bookid,
          reviews: reviews,
          subject: subject,
          content: content
        }),
      contentType: "application/json",
      success: function(res) {
        location.reload();
      },
      error: function(err){
        console.log(err);
      }
  });
}
