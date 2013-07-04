define([
    'underscore', 'jquery', 'react', 'kendo', 'platform/jsxutil',
    'react-backbone'
], function (_, $, React, kendo, jsxutil) {
    'use strict';

    return React.createBackboneClass({

        render: function () {
            return jsxutil.exec('<span />', {});
        },

        componentDidMount: function (rootNode) {
            $(rootNode).html('<input>').kendoDropDownList({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [ { text: 'Yes', value: 'true' }, { text: 'No', value: 'false' } ],
                index: 0
            });
            $(rootNode).data('kendoDropDownList').value(this.props.value);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoDropDownList').value(this.props.value);
        }

    });

});