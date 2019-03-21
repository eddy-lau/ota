var app = new Vue({
  el: '#app',
  data: {
    appName: '',
    releases: []
  }
});

$.ajax({
  dataType: "json",
  url: "releases.json",
  mimeType: "application/json",
  success: function(data) {
    app.releases = data;
  }
});
