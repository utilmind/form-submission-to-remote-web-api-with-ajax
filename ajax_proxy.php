<?php
if (isset($_POST['submit_action_url']) && isset($_POST['rnd']) &&
    ($url = $_POST['submit_action_url'])) {

   // Composing GET-request from POST...
   $data = '';
   foreach ($_POST as $key => $val)
     if ($key && ($key != 'submit_action_url') && $val)
       $data.= "&$key=".urlencode($val); // we could also URLEncode $key, but it's anyway impossible for key to have spaces.

   $url.= '?'.ltrim($data, '&'); // $url is prepared.

  // we can also proxy UserAgent, AcceptTypes etc, if it will be required one day...

  $data = @file_get_contents($url);

  // pass http codes we got from remote server, as is...
  if ($http_response_header)
    foreach ($http_response_header as $a)
      if ($a) {
        header($a);
        /* This is how to generate HTTP status code only...
        $a = explode(':', $a, 2);
        if (!isset($a[1]) && preg_match('/HTTP\/[0-9\.]+\s+([0-9]+)/', $a[0], $a))
          http_response_code((int)$a[1]); // pass HTTP code we got to 
         */
      }

  print $data;
}