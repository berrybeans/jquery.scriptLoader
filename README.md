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

Excluding script_lib, all values shown are default values.

```js
$.script_load({
  script_lib  : [
    { path: "path/to/script1.js" },
    { path: "path/to/script2.js" }
  ],
script_loc  : "",                             //directory containing scripts
  alertify    : true,                         //show alertify notifications
  callback    : function() {},                //function to call when scripts are loaded
  debug       : false,                        //show debug output 
  timeout     : 50                            //10x timeout in seconds
});
```
