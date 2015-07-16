(function ($) {
    $.script_load = function (obj) {
        //create a local object
        var _obj = {
            //[PARAM]       : [NULL TEST]       ? [SUPPLIED VALUE]  : [DEFAULT VALUE]
            script_lib      : obj.script_lib    ? obj.script_lib    : [],
            timeout         : obj.timeout       ? obj.timeout * 10  : 50,
            alertify        : obj.alertify      ? obj.alertify      : false,
            debug           : obj.debug         ? obj.debug         : false,
            callback        : obj.callback      ? obj.callback      : function () { },
            script_loc      : obj.script_loc    ? obj.script_loc    : '',
            success_msg     : obj.success_msg   ? obj.success_msg   : "Scripts loaded.",
            fail_msg        : obj.fail_msg      ? obj.fail_msg      : "Scripts failed to load."
        };

        var error = false;
        var alertify_enabled = (alertify != undefined) && _obj.alertify;

        $.each(_obj.script_lib, function (i, d) {
            $.getScript(_obj.script_loc + d.path, function (data, textStatus, jqxhr) {
            }).success(function () {
                if (_obj.debug && alertify_enabled)
                    alertify.log("Loaded " + d.path + ".");
                d.loaded = true;
            }).fail(function () {
                if (_obj.debug && alertify_enabled)
                    alertify.error("Failed to load " + d.path + ".");
                error = true;
            });
        });

        var poll = function () {
            setTimeout(function () {
                _obj.timeout--;
                if (_obj.script_lib.map(function (d) { return d.loaded; }).indexOf(false) === -1 && !error) {
                    try {
                        _obj.callback();
                        if (alertify_enabled)
                            alertify.success(_obj.success_msg);
                    } catch (e) {
                        if (_obj.debug) {
                            if (alertify_enabled)
                                alertify.error('CRITICAL ERROR WHILE LOADING: ' + e);
                            throw e;
                        } else {
                            poll();
                        }
                    }

                } else if (_obj.timeout > 0) {
                    poll();
                } else {
                    if (alertify_enabled)
                        alertify.error(_obj.fail_msg);
                    else
                        alert("Scripts failed to load.");
                }
            }, 100);
        };
        poll();
    }
}(jQuery))
