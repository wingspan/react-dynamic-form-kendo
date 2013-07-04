define([
    'underscore', 'jquery', 'react', 'platform/jsxutil',
    'react-backbone'
], function (_, $, React, jsxutil) {
    'use strict';

    return React.createBackboneClass({

        render: function () {
            var scope = {
                value: this.props.value
            };
            var dom = jsxutil.exec('<input type="text" class="k-textbox" value={value} />', scope);
            return dom;
        }



    });

});