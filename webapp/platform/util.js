define([
    'underscore', 'jquery'
], function (_, $) {
    'use strict';

    var exports = {};

    /**
     * Gets json from a server. `onError` param is optional.
     */
    exports.getJSON = function (url, onError) {
        console.assert(!!url);

        onError = (onError !== undefined) ? onError : function () {
            console.error('request failed: %s', url);
        };

        var promise = $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
            dataType: 'json',
            processData: false
        });

        promise.fail(onError);

        return promise;
    };


    /**
     * functional map over js objects:
     *
     *     var m={'a': 10, 'b': 20, 'c': 30};
     *     mapo(m, function(v,k){return [k, v+1];});
     *
     *       => {"a":11,"b":21,"c":31}
     */
    exports.mapo = _.compose(_.object, _.map);

    return exports;
});