$("#loginform").submit(function(e) {
    e.preventDefault();
});

$(window).click(function(e) {
  if($('#cover:visible').length > 0) {
    $("#cover").css('display','none');
    $(".userexists").css('display','none');
  }
});

function userLogIn() {

  var e = $("#email").val();
  var p = $("#pass").val();

  if ($("#sessionId").prop("checked") == true) {
    var s = true;
  } else {
    s = false;
  }

  console.log(s);

  if (e && p) {
    $.ajax({
        url: environmentConfig + '/login',
        type: 'post',
        data: JSON.stringify(
          {
            email: e,
            pass: p
          }),
        contentType: "application/json",
        success: function(response) {
          if (response.new) {
            $("#cover").css('display','block');
            $(".userexists").css('display','block');
          } else if (response.login) {
            if (s == true) {
              if (response.admin && response.admin == 1) {
                localStorage.setItem('cdlc-admin', 1);
                sessionStorage.setItem('cdlc-role', 'both');
              }
              localStorage.setItem('cdlc', response.login);
              sessionStorage.setItem('cdlc-role', 'both');
            } else {
              if (response.admin && response.admin == 1) {
                sessionStorage.setItem('cdlc-admin', 1);
                sessionStorage.setItem('cdlc-role', 'both');
              }
              sessionStorage.setItem('cdlc', response.login);
              sessionStorage.setItem('cdlc-role', 'both');
            }
            if (response.admin && response.admin == 1) {
              top.location.href="admin_home.html";
            } else {
              top.location.href="home.html";
            }
          }
        },
        error: function(err){
          console.log('err');
        }
    });
  } else {
    if (!e) $( "#email" ).addClass( "formerr" );
    if (!p) $( "#pass" ).addClass( "formerr" );
  }

}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
