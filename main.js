var app = new Vue({
  el: '#app',
  data: {
    appName: '每日讀經釋義',
    githubRepo: 'eddy-lau/ota',
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
