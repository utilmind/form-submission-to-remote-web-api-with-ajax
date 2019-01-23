Here is the source codes of that demo. ZIP contains following files:

  1. index.php — very simple demo form.

  2. submit_form.js — 2 simple javascript functions:
         submit_form() — executes on form's submit, used to submit data to remote form and get response.
         show_form_msg() — displays a message width the server response at top of the form

  3. playground.css — just some decorations for the demo form.

  4. ajax_proxy.php — used as intermediary tunnel between JavaScript function submit_form() and remote form.
     We need this intermediary script because there is no reliable way to request data with AJAX from different domain,
     JavaScript's XMLHttpRequest does not contains cross-domain solutions and blocks cross-domain requests
     due to browser security reasons. (Yes, I know about JSONP hacks, which is wrapper over <img src="..."> tags,
     but it's unreliable solution with lack of a lot of good features.)

Every script made as much lightweight and simple as possible and the key features are commented.

Also there is "compressed-assets" folder with minimized and compressed CSS and JS files.


===================================================================
In general the scheme is following:

submit_form() geting the URL specified in form's action attribute;
... and sends that URL to "ajax_proxy.php" (backend part)
ajax_proxy.php reading the content from remote server, from the URL
... and passes the response back to JavaScript (frontend part)