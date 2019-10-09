$("#signupform").submit(function(e) {
    e.preventDefault();
});

$( "#email" ).keyup(function() {
  $("#email").removeClass( "formerr" );
});
$( "#password" ).keyup(function() {
  $("#password").removeClass( "formerr" );
});
$( "#division" ).click(function() {
  $("#division").removeClass( "formerr" );
});

$(window).click(function() {
  $("#cover").css('display','none');
  $(".userexists").css('display','none');
});

$( "#submit_forgot" ).click(function() {
  $("#form_forgot_pass").hide();
  $("#confim-mess").show();

  $.ajax({
        url: environmentConfig + '/forgotPass',
        type: 'POST',
        data: JSON.stringify(
          {
            email: $("#email-forgot").val()
          }),
        contentType: "application/json",
        success: function(response) {
          console.log(response);
        },
        error: function(err){
          console.log(err);
        }
    });
});

function userSignUp() {

  var e = $("#email").val();
  var p = $("#password").val();
  var p2 = $("#password2").val();
  var d = $("#division").val();

  var isemail = validateEmail(e);
  var ispass = checkPassword();

  if (isemail && ispass && e && p && p2 && d && d != '') {
    $.ajax({
        url: environmentConfig + '/signup',
        type: 'POST',
        data: JSON.stringify(
          {
            email: e,
            pass: p,
            div: d
          }),
        contentType: "application/json",
        success: function(response) {
          if (response == 'exists') {
            $("#cover").css('display','block');
            $(".userexists").css('display','block');
          } else if (response == 'added') {
            sessionStorage.setItem('cdlc', e);
            sessionStorage.setItem('cdlc-role', 'both');
            top.location.href="home.html";
          }
        },
        error: function(err){
          console.log(err);
        }
    });
  } else {
    if (!isemail || !e) $( "#email" ).addClass( "formerr" );
    if (!p || !ispass) $( "#password" ).addClass( "formerr" );
    if (!p2 || !ispass) $( "#password2" ).addClass( "formerr" );
    if (!d || d == '') $( "#division" ).addClass( "formerr" );
  }

}

function setNewPass() {

  var e = $("#email").val();
  var t = $("#temppassword").val();
  var p = $("#password").val();
  var p2 = $("#password2").val();

  var ispass = checkPassword();

  if (ispass && e && p && p2 && t) {
    $.ajax({
        url: environmentConfig + '/setNewPassWord',
        type: 'POST',
        data: JSON.stringify(
          {
            email: e,
            pass: p,
            temp: t
          }),
        contentType: "application/json",
        success: function(response) {
          if (response == 'changed') {
            sessionStorage.setItem('cdlc', e);
            sessionStorage.setItem('cdlc-role', 'both');
            top.location.href="home.html";
          } else if (response == 'no') {
            $("#cover").css('display','block');
            $(".userexistsno").css('display','block');
          }
        },
        error: function(err){
          console.log(err);
        }
    });
  } else {
    if (!isemail || !e) $( "#email" ).addClass( "formerr" );
    if (!p || !ispass) $( "#password" ).addClass( "formerr" );
    if (!p2 || !ispass) $( "#password2" ).addClass( "formerr" );
    if (!d || d == '') $( "#division" ).addClass( "formerr" );
  }

}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function checkPassword() {
  var password1 = $("#password").val();
  var password2 = $("#password2").val();

  if (password1 != password2) {
    $( "#password2" ).addClass( "formerr" );
    return false;
  } else {
    $( "#password2" ).removeClass( "formerr" );
    return true;
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
