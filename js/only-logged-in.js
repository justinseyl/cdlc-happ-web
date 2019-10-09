$( document ).ready(function() {
    if (!sessionStorage.getItem('cdlc') && !localStorage.getItem('cdlc')) {
      top.location.href="login.html";
    }
});
