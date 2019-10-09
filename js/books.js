var userid = sessionStorage.getItem('cdlc') || localStorage.getItem('cdlc');

$( ".review-stars:not(.checked)" ).click(function() {
  $( this ).prevAll().addClass( 'checked' );
  $( this ).addClass( 'checked' );

  $( ".review-stars.checked" ).click(function() {
    $( this ).nextAll().removeClass( 'checked' );
  });

});

$.ajax({
    url: environmentConfig + '/getusercompletedbooks',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: userid
      }),
    contentType: "application/json",
    success: function(response) {
      buildHtml(response);

      var inner = $( "#completed-books .section-row" ).length;
      $( "#completed-header" ).html('(' + inner + ')');

      $( ".view" ).click(function() {
        var thisid = $(this).parents('.section-row').attr('id');

        $('#completed-books-container').hide();
        $('#non-completed-books-container').hide();
        $('#completed-books-drill').show();
        $('#main-header-label').hide();
        $('#main-header-label-paged').show();

        bookExpanded(thisid, userid);
      });
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
    success: function(response) {
      buildIncompleteBooks(response);
    },
    error: function(err){
      console.log(err);
    }
});

function buildHtml(response) {
  $.each(response, function(i, item) {

    var li =
      '<li id="' + item.id + '" class="section-row">'+
      '            <div class="row-image">'+
      '              <div class="book-image"><img src="../books/' + item.image + '"></div>'+
      '            </div>'+
      '						<div class="row-content" style="width:40%;">'+
      '							<div class="row-content-inner" style="width:85%;">'+
      '								<h3>Title</h3>'+
      '								<p>' + item.name + '</p>'+
      '							</div>'+
      '						</div>'+
      '						<div class="row-content" style="width:18%;">'+
      '							<div class="row-content-inner">'+
      '								<h3>Author</h3>'+
      '								<p>' + item.author + '</p>'+
      '							</div>'+
      '						</div>'+
      '						<div class="row-content" style="width:17%;">'+
      '							<div class="row-content-inner">'+
      '								<h3>Date Completed</h3>'+
      '								<p>' + item.created + '</p>'+
      '							</div>'+
      '						</div>'+
      '						<div class="row-content" style="width:15%;">'+
      '							<div class="row-content-inner">'+
      '								<h3>My Rating</h3>'+
      '								<p class="ratings">' + item.rating + ' <i class="fa fa-star"></i></p>'+
      '							</div>'+
      '						</div>'+
      '						<div class="row-content" style="width:5%;margin-left: 0px;">'+
      '							<div class="row-content-inner">'+
      '								<h3 class="view">View</h3>'+
      '							</div>'+
      '						</div>'+
      '          </li>';

      if ($(window).width() < 767.98) {
        var li =
          '<li id="' + item.id + '" class="section-row">'+
          '						<div class="row-content" style="width:90%;">'+
          '							<div class="row-content-inner" style="width:85%;">'+
          '								<h3>Title</h3>'+
          '								<p>' + item.name + '</p>'+
          '							</div>'+
          '						</div>'+
          '						<div class="row-content" style="width:5%;margin-left: 0px;">'+
          '							<div class="row-content-inner">'+
          '								<h3 class="view">View</h3>'+
          '							</div>'+
          '						</div>'+
          '          </li>';
      };


    $('#completed-books').append(li);
  });
}

function bookExpanded(id, usr) {
  $.ajax({
      url: environmentConfig + '/getUnreadBooksById',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: usr,
          id: id
        }),
      contentType: "application/json",
      success: function(response) {
        buildExpandBook(response, id);
      },
      error: function(err){
        console.log(err);
      }
  });
}

function buildExpandBook(data, book_id) {
    
  var newbookid = "'" + book_id + "'";

  var ind = 0;
  var rating = 0;

  $.each(data, function(i, item) {

    ind ++;

    rating += (parseFloat(item.review_rating) * 1.00);

  });

  var avg_rating = rating / ind;
  if (!avg_rating || avg_rating == null) {
    avg_rating = 0;
    ind = 0;
  }

  var html =
  '<div class="img-fluid mx-auto d-bloc">'+
  '														<div class="book-inner">'+
  '															<div class="book-header">'+
  '																<div class="book-image"><img src="../books/' + data[0].image + '"></div>'+
  '																<div class="book-title">'+
  '																	<div class="book-title-label">' + data[0].name + '</div>'+
  '																	<div class="by">By:</div>'+
  '																	<div class="book-title-author">'+
  '																		<div class="author-label">' + data[0].author + '</div>'+
  '																		<div class="book-title-reviews-stars">' + avg_rating + '<i class="fa fa-star"></i></div>'+
  '																		<div class="book-title-reviews" onclick="writeReview(' + newbookid + ')">' + ind + ' Reviews</div>'+
  '																	</div>'+
  '																	<div class="book-content-desc">Description:</div>'+
  '																	<div class="book-content-main">' + data[0].description + '</div>'+
  '																</div>'+
  '															</div>'+
  '															<div class="book-read-button">'+
  '																<button id="' + book_id + '" class="book-read" onclick="readtounread(this)">I HAVE READ THIS</button>'+
  '															</div>'+
  '														</div>'+
  '													</div>';

  if ($(window).width() < 767.98) {
    var html = '<div class="books-listed">'+
    '						<div class="img-fluid mx-auto d-bloc">'+
    '							<div class="book-inner-non">'+
    '								<div class="book-header-non">'+
    '									<div class="book-image-non"><img src="../books/' + data[0].image + '"></div>'+
    '									<div class="book-title-non">'+
    '										<div class="book-title-label-non">' + data[0].name + '</div>'+
    '										<div class="by-non">By:</div>'+
    '										<div class="book-title-author">' + data[0].author + '</div>'+
    '										<div class="book-title-reviews-non" onclick="writeReview(' + book_id + ')">' + ind + ' Reviews</div>'+
    '										<div class="book-title-reviews-stars-non">' + avg_rating + ' <i class="fa fa-star"></i></div>'+
    '									</div>'+
    '								</div>'+
    '								<div class="book-content-non">'+
    '									<div class="book-content-desc-non">Description:</div>'+
    '									<div class="book-content-main">' + data[0].description + '</div>'+
    '									<button id="' + book_id + '" class="book-read-non" onclick="readtounread(this)">I HAVE READ THIS</button>'+
    '								</div>'+
    '							</div>'+
    '						</div>'+
    '					</div>';
  }

  $('#completed-books-drill').append(html);


  var html_review =
  '<div id="all-reviews-section" class="section-header">'+
  '          <h2>REVIEWS<span class="after-header">(' + ind + ')</span></h2>'+
  '          <hr style="margin-left:0px !important;">'+
  '        </div>';

  $('#completed-books-drill').append(html_review);

  $.each(data, function(i, item) {

    var html_all_review =
      '<div class="review-all-elements">'+
      '			<div class="review-all-left">'+
      '				<div class="all-item-header">User</div>'+
      '				<div class="all-item-content">' + item.user_name + '</div>'+
      '				<div class="all-item-header">Date</div>'+
      '				<div class="all-item-content">' + item.review_date + '</div>'+
      '				<div class="all-item-header">Rating</div>'+
      '				<div class="all-item-content last">' + item.review_rating + ' <i class="fa fa-star"></i></div>'+
      '			</div>'+
      '			<div class="review-all-right">'+
      '				<div class="all-item-title">' + item.review_title + '</div>'+
      '				<div class="all-item-desc">' + item.review_content + '</div>'+
      '			</div>'+
      '		</div>';

      if ($(window).width() < 767.98) {
        var html_all_review =
          '<div class="review-all-elements">'+
          '			<div class="review-all-left">'+
          '				<div class="all-item-header">'+
          '         <div class="header-items" style="width:45%;">User</div>'+
          '         <div class="header-items" style="width:35%;">Date</div>'+
          '         <div class="header-items" style="width:20%;">Rating</div>'+
          '       </div>'+
          '				<div class="all-item-content">'+
          '         <div class="content-items" style="width:45%;">' + item.user_name + '</div>'+
          '         <div class="content-items" style="width:35%;">' + item.review_date + '</div>'+
          '         <div class="content-items" style="width:20%;">' + item.review_rating + ' <i class="fa fa-star"></i></div>'+
          '       </div>'+
          '			</div>'+
          '			<div class="review-all-right">'+
          '				<div class="all-item-title">' + item.review_title + '</div>'+
          '				<div class="all-item-desc">' + item.review_content + '</div>'+
          '			</div>'+
          '		</div>';
      }

      if (item.user_name) {
        $('#completed-books-drill').append(html_all_review);
      }
  });
}

function buildIncompleteBooks(data) {

  var ind = 0;

  $.each(data, function(i, item) {
      
    var newbookid = "'" + item.id + "'";

    ind ++;

    var li = '<li class="books-listed">'+
    '						<div class="img-fluid mx-auto d-bloc">'+
    '							<div class="book-inner-non">'+
    '								<div class="book-header-non">'+
    '									<div class="book-image-non"><img src="../books/' + item.image + '"></div>'+
    '									<div class="book-title-non">'+
    '										<div class="book-title-label-non">' + item.name + '</div>'+
    '										<div class="by-non">By:</div>'+
    '										<div class="book-title-author">' + item.author + '</div>'+
    '										<div class="book-title-reviews-non">' + item.reviews + ' Reviews</div>'+
    '										<div class="book-title-reviews-stars-non">' + item.rating + ' <i class="fa fa-star"></i></div>'+
    '									</div>'+
    '								</div>'+
    '								<div class="book-content-non">'+
    '									<div class="book-content-desc-non">Description:</div>'+
    '									<div class="book-content-main">' + item.description + '</div>'+
    '									<button id="' + item.id + '" class="book-read-non" onclick="writeReview(' + newbookid + ')">I HAVE READ THIS</button>'+
    '								</div>'+
    '							</div>'+
    '						</div>'+
    '					</li>';

    $('#non-completed-books').append(li);
    $('#non-completed-header').html('(' + ind + ')');
  });
}

function unreadtoread(bookid) {
  var id = "'" + bookid + "'";

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
        top.location.href="books.html";
      },
      error: function(err){
        console.log(err);
      }
  });
}

function readtounread(btn) {
  var id = $(btn).attr('id');

  $.ajax({
      url: environmentConfig + '/readtounread',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: userid,
          bookid: id
        }),
      contentType: "application/json",
      success: function(unread) {
        top.location.href="books.html";
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
