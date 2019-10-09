$.ajax({
    url: environmentConfig + '/getBooks_admin',
    type: 'GET',
    contentType: "application/json",
    success: function(response) {
      buildIncompleteBooks(response);
    },
    error: function(err){
      console.log(err);
    }
});

function buildIncompleteBooks(data) {

  var ind = 0;

  $.each(data, function(i, item) {

    var id = "'" + item.id + "'";
    var img = "'" + item.image + "'";
    var name = "'" + item.name.replace(/'/g, " ") + "'";
    var author = "'" + item.author.replace(/'/g, " ") + "'";
    var description = "'" + item.description.replace(/'/g, " ") + "'";

    ind ++;

    var li = '<li class="books-listed-admin">'+
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
    '									<button id="' + item.id + '" class="book-read-admin" onclick="editBook(' + id + ',' + img  + ',' + name + ',' + author + ',' + description + ')">EDIT BOOK</button>'+
    '								</div>'+
    '							</div>'+
    '						</div>'+
    '					</li>';

    $('#non-completed-books').append(li);
    $('#non-completed-header').html('(' + ind + ')');
  });
}

function editBook(id,img,name,author,description) {
    
  var newid = "'" + id + "'";

  $("#edit-book-form").empty();

  var html =
  '<div class="edit-book-img">'+
  '        <div class="edit-book-inner">'+
  '          <div class="edit-oval" onclick="fileUp()"><img src="../assets/icon-edit-white.svg"></img></div>'+
  '          <img id="book-img" src="../books/' + img + '">'+
  '          <img id="book-img-new" style="display:none;">'+
  '        </div>'+
  '      </div>'+
  '			<div class="input-group form-group">'+
  '				<input id="book-title" type="text" class="form-control" placeholder="Title" value="' + name + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="book-author" type="text" class="form-control" placeholder="Author" value="' + author + '">'+
  '			</div>'+
  '     <textarea id="book-desc" rows="4" cols="50" placeholder="Description"></textarea>'+
  '     <div id="submit-issue">'+
  '				<input type="button" value="SAVE BOOK" class="popup-submit" onclick="editBookSave(' + newid + ')">'+
  '			</div>'+
  '     <p class="delete-book" onclick="deleteBook(' + newid + ')">Delete Book</p>';

  $("#edit-book-form").append(html);
  $("#book-desc").html(description);
  $("#cover").css('display','block');
  $("#edit-book-popup").css('display','block');
}

function editBookSave(bookid) {
  $("input[id='submitAddPice']").click();
  
  if($('#book-img-new:visible').length >= 0) {
    var img = $('#book-img-new').attr('filename');
  } else {
    var img = $("#book-img").attr('src').split("/").pop();
  }
    
  var title = $("#book-title").val();
  var auth = $("#book-author").val();
  var desc = $("#book-desc").val();

  $.ajax({
      url: environmentConfig + '/editBookSave',
      type: 'POST',
      data: JSON.stringify(
        {
          id: bookid,
          img:img,
          title:title,
          auth:auth,
          desc:desc
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

function addNewBook(bookid) {
  $("input[id='submitAddPic']").click();

  var img = $("#tempImg").attr('filename');
  var title = $("#add-book-title").val();
  var auth = $("#add-book-author").val();
  var desc = $("#add-book-desc").val();

  $.ajax({
      url: environmentConfig + '/addNewBook',
      type: 'POST',
      data: JSON.stringify(
        {
          img:img,
          title:title,
          auth:auth,
          desc:desc
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

function deleteBook(bookid) {
  $.ajax({
      url: environmentConfig + '/deleteBook',
      type: 'POST',
      data: JSON.stringify(
        {
          id: bookid
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

function addBookPop() {
  $("#cover").css('display','block');
  $("#add-book-popup").css('display','block');
}

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.fileName = input.files[0].name;
            
            reader.onload = function (e) {
                $('#tempImg')
                    .attr('src', e.target.result)
                    .attr('filename', e.target.fileName)
                    .show();
                $('#tempImgCon')
                    .show();
                $('.add-book-img').hide();
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    
function readURLE(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.fileName = input.files[0].name;
            
            reader.onload = function (e) {
                $('#book-img-new')
                    .attr('src', e.target.result)
                    .attr('filename', e.target.fileName)
                    .show();
                $('#book-img').hide();
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    
function fileUp() {
    $("#fileToUploade").click();
}