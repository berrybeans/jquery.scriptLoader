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
  script_lib    : [],
  timeout       : 50,
  alertify      : false,
  debug         : false,
  callback      : function () { },
  script_loc    : '',
  success_msg   : "Scripts loaded.",
  fail_msg      : "Scripts failed to load."
})
```

Contact Me
----------
If you encounter any bugs or have a suggestion on improving this plugin, please e-mail me at daa0006@auburn.edu
