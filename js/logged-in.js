$( document ).ready(function() {
    if (sessionStorage.getItem('cdlc') || localStorage.getItem('cdlc')) {
      if (localStorage.getItem('cdlc-admin') || sessionStorage.getItem('cdlc-admin')) {
        top.location.href="admin_home.html";
      } else {
        top.location.href="home.html";
      }
    }
});
