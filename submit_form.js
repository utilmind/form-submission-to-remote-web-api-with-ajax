function show_form_msg(msg, is_http_success) {
  var status_class = 'fail'

  if (is_http_success) {
    var json = msg

    // checking, it's JSON response? (non-JSON means failure)
    if (typeof json != 'object') // not json object yet? try to convert text to json object.
      try {
        json = jQuery.parseJSON(msg)
      }catch(e){}

    if (typeof json != 'object') { // still not object?? Non-JSON response is definitely failure
      msg = 'Failure: non-json response from server.'

    }else if (typeof json.status != 'string' || !json.status) { // got JSON, but there is no "status" token?
      msg = 'Failure: no "status" provided in server response.'

    }else { // GOOD.
      msg = 'Status: ' + json.status // displaying the full status line as is

      // Now determinte the kind of message to color it. What server said? Getting the first word of status line.
      var first_word = json.status.substr(0, json.status.indexOf(' '))
      if (!first_word) first_word = json.status
      status_class = (first_word.toLowerCase() == 'success') ? 'success' : 'warn' // 'success'ful response, otherwise warn user about problem.
    }
  }

  $('#pgm_server_response').html(msg)
      .removeClass().addClass(status_class)
}

function submit_form(e) {
  $('#pgm_submit_btn').prop('disabled', 1)

  // BTW, you may also add validation of form fields before sending request...
  // =========================================================================

  // Preparing AJAX-request...
  $.ajax({
       url : './ajax_proxy.php',
       type: 'POST',
       data: 'submit_action_url=' + $(e).prop('action') + // URL to request
                '&'+$(e).serialize() + // form data
                '&rnd='+Math.random(), // add some entropy to avoid caching
       cache: false,

       success: function(data, status) {
         show_form_msg(data, 1)
       },
       error: function(jqXHR, textStatus, errorThrown) {
         show_form_msg('HTTP error #'+jqXHR.status, 0)
       }
  }).always(function(jqXHR, exception) {
       $('#pgm_submit_btn').prop('disabled', 0) // enable button again
  })

  return false
}