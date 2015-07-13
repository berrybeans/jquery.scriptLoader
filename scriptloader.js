$.script_load = function (obj) {
    /*obj fields:
     *  script_loc:     string,
     *  script_lib:     [{path: string}, ...],
     *  timeout:        int,
     *  debug:          bool,
     *  alertify:       bool,
     *  callback:      function
     */

    obj.timeout     =   (obj.timeout === undefined)         ? 50            : obj.timeout;
    obj.alertify    =   (obj.alertify === undefined)        ? true          : obj.alertify;
    obj.debug       =   (obj.debug === undefined)           ? false         : obj.debug;
    obj.callback    =   (obj.callback === undefined)        ? function () {}: obj.callback;
    obj.script_loc  =   (obj.script_loc === undefined)      ? ''            : obj.script_loc;

    var error = false;
    var alertify_enabled = (alertify != undefined) && obj.alertify;

    $.each(obj.script_lib, function (i, d) {
        $.getScript(obj.script_loc + d.path, function (data, textStatus, jqxhr) {
        }).success(function () {
            d.loaded = true;
        }).fail(function () {
            if (obj.debug && alertify_enabled) {
                alertify.error("Failed to load " + d.path + ".");
            }
            error = true;
        });
    });

    var poll = function () {
        setTimeout(function () {
            obj.timeout--;
            if (obj.script_lib.map(function (d) { return d.loaded; }).indexOf(false) === -1 && !error) {
                if (alertify_enabled)
                    alertify.success("Scripts loaded.");
                try {
                    obj.callback();
                } catch (e) {
                    if (obj.debug) {
                        if (alertify_enabled)
                            alertify.error('CRITICAL ERROR WHILE LOADING: ' + e);
                        throw e;
                    } else {
                        location.assign(location.pathname);
                    }
                }

            } else if (obj.timeout > 0) {
                poll();
            } else {
                if (alertify_enabled)
                    alertify.error("Scripts failed to load.");
            }
        }, 100);
    };
    poll();
}