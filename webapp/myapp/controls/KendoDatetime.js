define([
    'underscore', 'jquery', 'react', 'kendo', 'platform/jsxutil',
    'react-backbone'
], function (_, $, React, kendo, jsxutil) {
    'use strict';

    return React.createBackboneClass({

        render: function () {
            return jsxutil.exec('<input />', {});
        },

        componentDidMount: function (rootNode) {
            $(rootNode).kendoDateTimePicker();
            $(rootNode).data('kendoDateTimePicker').value(new Date(this.props.value));
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoDateTimePicker').value(new Date(this.props.value));
        }




    });

});