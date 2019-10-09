const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('username');

$("#form-message").attr('action',"mailto:" + user)

$("#edit-personal-form").submit(function(e) {
    e.preventDefault();
});

$('#deleteAcct').click(function(e) {
  $("#cover").css('display','block');
  $("#delete-popup").css('display','block');
});

$.ajax({
    url: environmentConfig + '/getuser',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: user
      }),
    contentType: "application/json",
    success: function(response) {
      buildHtml(response);
      
      if (response.admin && response.admin == 1) {
          $("#admin-button").css('display', 'none');
      }
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/totalsugg',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: user
      }),
    contentType: "application/json",
    success: function(response) {
      posttotalsugg(response.tot);
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/allsugg',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: user
      }),
    contentType: "application/json",
    success: function(response) {
      buildSugg(response);
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/totalissues',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: user
      }),
    contentType: "application/json",
    success: function(response) {
      posttotalissues(response.tot);
    },
    error: function(err){
      console.log(err);
    }
});

$.ajax({
    url: environmentConfig + '/allissues',
    type: 'POST',
    data: JSON.stringify(
      {
        userid: user
      }),
    contentType: "application/json",
    success: function(response) {
      buildIssue(response);
    },
    error: function(err){
      console.log(err);
    }
});

function buildHtml(data) {

  var html = '<div class="top-level">'+
              '  <div class="details-icon">'+
              '    <i class="fa fa-user-circle"></i>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>First Name</h3>'+
              '    <h4>' + data.firstname + '</h4>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>Last Name</h3>'+
              '    <h4>' + data.lastname + '</h4>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>Prefered Name</h3>'+
              '    <h4>' + data.name + ' </h4>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>Department</h3>'+
              '    <h4>' + data.division + '</h4>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>Phone Number</h3>'+
              '    <h4>' + data.phone + '</h4>'+
              '  </div>'+
              '</div>'+
              '<div class="btm-level">'+
              '  <div class="details-icon">'+
              '    <i class="fa fa-user-circle"></i>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>Personal Email</h3>'+
              '    <h4>' + data.work + '</h4>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>Work Email</h3>'+
              '    <h4>' + data.email + '</h4>'+
              '  </div>'+
              '  <div class="detail-item">'+
              '    <h3>Date Of Birth</h3>'+
              '    <h4>' + data.dob + '</h4>'+
              '  </div>'+
              '</div>';

  $('#personalID').append(html);

  var html_per_form =
    '<div class="input-group form-group">'+
    '  <input id="firstname" type="text" class="form-control" placeholder="First Name" value="' + data.firstname + '">'+
    '</div>'+
    '<div class="input-group form-group">'+
    '  <input id="lastname" type="text" class="form-control" placeholder="Last Name" value="' + data.lastname + '">'+
    '</div>'+
    '<div class="input-group form-group">'+
    '  <input id="name" type="text" class="form-control" placeholder="Preferred Name" value="' + data.name + '">'+
    '</div>'+
    '<div class="input-group form-group">'+
    '  <input id="department" type="text" class="form-control" placeholder="Department" value="' + data.division + '">'+
    '</div>'+
    '<div class="input-group form-group">'+
    '  <input id="phone" type="text" class="form-control" placeholder="Phone Number" value="' + data.phone + '">'+
    '</div>'+
    '<div class="input-group form-group">'+
    '  <input id="work" type="text" class="form-control" placeholder="Personal Email" value="' + data.work + '">'+
    '</div>'+
    '<div class="input-group form-group">'+
    '  <input id="dob" type="text" class="form-control" placeholder="Date Of Birth" value="' + data.dob + '">'+
    '</div>'+
    '<div>'+
    '  <input onclick="edit_personal_submit()" type="submit" value="SAVE CHANGES" class="popup-submit">'+
    '</div>';

  $('#edit-personal-form').append(html_per_form);

  var html_ques_form =
  '<div class="top-level questions">'+
  '            <div class="detail-item">'+
  '              <h3>Home Address</h3>'+
  '              <h4>' + data.home + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Spouse Name</h3>'+
  '              <h4>' + data.spouse + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Anniversary Date</h3>'+
  '              <h4>' + data.anniv + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>First Child</h3>'+
  '              <h4>' + data.firstchild + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Second Child</h3>'+
  '              <h4>' + data.secondchild + '</h4>'+
  '            </div>'+
  '          </div>'+
  '          <div class="btm-level questions">'+
  '            <div class="detail-item">'+
  '              <h3>Favorite Soft Drink</h3>'+
  '              <h4>' + data.drink + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Favorite Food</h3>'+
  '              <h4>' + data.food + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Favorite Restaurant</h3>'+
  '              <h4>' + data.rest + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Favorite Store</h3>'+
  '              <h4>' + data.store + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Favorite Sports Team</h3>'+
  '              <h4>' + data.team + '</h4>'+
  '            </div>'+
  '          </div>'+
  '          <div class="btm-level questions">'+
  '            <div class="detail-item">'+
  '              <h3>Favorite Candy</h3>'+
  '              <h4>' + data.candy + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Favorite Starbucks Drink</h3>'+
  '              <h4>' + data.starbucks + '</h4>'+
  '            </div>'+
  '            <div class="detail-item">'+
  '              <h3>Favorite College</h3>'+
  '              <h4>' + data.college + '</h4>'+
  '            </div>'+
  '          </div>';



  $('#quesID').append(html_ques_form);

  var html_ques_editForm =
  '<div class="input-group form-group">'+
  '				<input id="home" type="text" class="form-control" placeholder="Home Address" value="' + data.home + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="spouse" type="text" class="form-control" placeholder="Spouse Name" value="' + data.spouse + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="anniv" type="text" class="form-control" placeholder="Anniversary Date" value="' + data.anniv + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="firstchild" type="text" class="form-control" placeholder="First Child" value="' + data.firstchild + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="secondchild" type="text" class="form-control" placeholder="Second Child" value="' + data.secondchild + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="drink" type="text" class="form-control" placeholder="Favorite Soft Drink" value="' + data.drink + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="food" type="text" class="form-control" placeholder="Favorite Food" value="' + data.food + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="rest" type="text" class="form-control" placeholder="Favorite Restaurant" value="' + data.rest + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="store" type="text" class="form-control" placeholder="Favorite Store" value="' + data.store + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="team" type="text" class="form-control" placeholder="Favorite Sports Team" value="' + data.team + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="candy" type="text" class="form-control" placeholder="Favorite Candy" value="' + data.candy + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="starbucks" type="text" class="form-control" placeholder="Favorite Starbucks Drink" value="' + data.starbucks + '">'+
  '			</div>'+
  '      <div class="input-group form-group">'+
  '				<input id="college" type="text" class="form-control" placeholder="Favorite College" value="' + data.college + '">'+
  '			</div>'+
  '			<div id="submit-issue">'+
  '				<input onclick="edit_ques_submit()" type="submit" value="SAVE CHANGES" class="popup-submit">'+
  '			</div>';

  $('#edit-questions-form').append(html_ques_editForm);
}

function edit_personal_submit(){
  $.ajax({
      url: environmentConfig + '/updateuser',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: user,
          first: $("#edit-personal-form #firstname").val(),
          last: $("#edit-personal-form #lastname").val(),
          name: $("#edit-personal-form #name").val(),
          department: $("#edit-personal-form #department").val(),
          phone: $("#edit-personal-form #phone").val(),
          work: $("#edit-personal-form #work").val(),
          dob: $("#edit-personal-form #dob").val()
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

function edit_ques_submit() {
  $.ajax({
      url: environmentConfig + '/updateuserques',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: user,
          home: $("#edit-questions-form #home").val(),
          spouse: $("#edit-questions-form #spouse").val(),
          anniv: $("#edit-questions-form #anniv").val(),
          firstchild: $("#edit-questions-form #firstchild").val(),
          secondchild: $("#edit-questions-form #secondchild").val(),
          drink: $("#edit-questions-form #drink").val(),
          food: $("#edit-questions-form #food").val(),
          rest: $("#edit-questions-form #rest").val(),
          store: $("#edit-questions-form #store").val(),
          team: $("#edit-questions-form #team").val(),
          candy: $("#edit-questions-form #candy").val(),
          starbucks: $("#edit-questions-form #starbucks").val(),
          college: $("#edit-questions-form #college").val()
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

function posttotalsugg(total) {
  $("#totalsuggestions").html('(' + total + ')');
}

function posttotalissues(total) {
  $("#totalissues").html('(' + total + ')');
}

function buildSugg(data) {
  var index = 1;
  $.each(data, function(i, item) {
    var html = '<div class="section-content-block-' + index + '">'+
    '        <div class="section-center">'+
    '          <h1>' + item.title + '</h1>'+
    '          <h2>Submission Date:</h2>'+
    '          <h3>' + item.created + '</h3>'+
    '          <h4>Description:</h4>'+
    '          <p>' + item.content + '</p>'+
    '        </div>'+
    '      </div>';

    $('#suggestions').append(html);

    index ++;

  });
}

function buildIssue(data) {
  var index = 1;
  $.each(data, function(i, item) {
    var html = '<div class="section-content-block-' + index + '">'+
    '        <div class="section-center">'+
    '          <h1>' + item.title + '</h1>'+
    '          <div class="middle-content">'+
    '            <div class="middle-content-more">'+
    '              <h2>Submission Date:</h2>'+
    '              <h3>' + item.created + '</h3>'+
    '            </div>'+
    '            <div class="middle-content-less">'+
    '              <h2>Status:</h2>'+
    '              <h3 class="content-closed">' + item.status + '</h3>'+
    '            </div>'+
    '          </div>'+
    '          <h4>Description:</h4>'+
    '          <p>' + item.content + '</p>'+
    '        </div>'+
    '      </div>';



    $('#issues').append(html);

    index ++;

  });
}

function deleteAct() {
  $.ajax({
      url: environmentConfig + '/deleteUser',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: user
        }),
      contentType: "application/json",
      success: function(response) {
        window.location.href='admin_employee.html';
      },
      error: function(err){
        console.log(err);
      }
  });
}

$('#admin-button').click(function(e) {
  $.ajax({
      url: environmentConfig + '/makeadmin',
      type: 'POST',
      data: JSON.stringify(
        {
          userid: user
        }),
      contentType: "application/json",
      success: function(response) {
        location.reload();
      },
      error: function(err){
        console.log(err);
      }
  });
});