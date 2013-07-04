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
            var self = this;
            $(rootNode).html('<input>').kendoDropDownList({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: [ { text: 'Yes', value: 'true' }, { text: 'No', value: 'false' } ],
                index: 0
//                change: function () {
//                    self.props.model.set(self.props.fieldName, this.value());
//                }
            });
            $(rootNode).data('kendoDropDownList').value(this.props.model.get(this.props.fieldName));
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoDropDownList').value(this.props.model.get(this.props.fieldName));
        }

    });

});