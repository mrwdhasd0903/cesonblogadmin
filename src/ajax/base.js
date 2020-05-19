$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  options.xhrFields = {
      withCredentials: true
    },
    options.crossDomain = true,
    options.beforeSend = XMLHttpRequest => {
      XMLHttpRequest.setRequestHeader("token", "MyToken");
    }
  if (originalOptions.url.substring(0, 4) != 'http') {
    options.url = "http://localhost:8088/admin/" + originalOptions.url
  }
});