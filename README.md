# jQuery Script Loader

A simple jQuery plugin for loading scripts on the client-side.

Basic Usage
-----------

```js
$.script_load({
  script_lib  : [
    { path: "path/to/script.js" }
  ]
});
```

Advanced Usage
--------------

All values shown are default values.

```js
$.script_load({
  //[PARAM]     : [DEFAULT VALUE]
  script_lib    : [],                         //defaults to an empty list
  timeout       : 5,                          //timeout in seconds
  alertify      : false,                      //show progress using alertify
  debug         : false,                      //display debugging messages. REQUIRES ALERTIFY
  callback      : function () { },            //what to do after your scripts are loaded
  script_loc    : '',                         //directory to prefix all path with
  success_msg   : "Scripts loaded.",          //alertify message to display on successful completion. REQUIRES ALERTIFY
  fail_msg      : "Scripts failed to load."   //alert to display on fail. 
})
```

Contact Me
----------
If you encounter any bugs or have a suggestion on improving this plugin, please e-mail me at daa0006@auburn.edu
