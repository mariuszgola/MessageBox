(function($) {

    var options = {
        type: null,
        validationResult: null,
        message: null
    };

    var methods = {

        show: function(new_options) {
            $(this).show();
            $(this).removeClass("validation success error");

            var divMessageBox = '<li>${ErrorMessage}</li>'
            $.template("messageTemplate", divMessageBox);
            switch (options.type) {
            case 'validation':

                $(this).addClass('validation');
                $(this).find('ul').empty();
                //we check for message first
                if (options.message != null) $(this).html(options.message);

                //if message is null check of validation result
                else if (options.validationResult != null) {
                    if (options.validationResult.Errors.length > 0) {
                        $(this).html("<ul></ul>");
                        $.tmpl("messageTemplate", options.validationResult.Errors).appendTo($(this).find('ul'));

                    }
                    else $(this).html("Validation failed");
                }
                // give generic validation message
                else $(this).html("Validation failed");

                break;
            case 'success':
                $(this).addClass('success');
                $(this).html(options.message);
                break;
            case 'error':
                $(this).addClass('error');
                $(this).html(options.message);
                break;
            default:
            }

        },
        hide: function() {
            $(this).hide();
        }
    }
    $.fn.sp_MessageBox = function(method, new_options) {
        setOptions(new_options);

        //Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    }


    //Set options

    function setOptions(new_options) {
        $.extend(options, new_options);
    }
})(jQuery);