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
            var self = this;
            $(rootNode).kendoDateTimePicker({
//                change: function () {
//                    self.props.model.set(self.props.fieldName, this.value());
//                }
            });
            $(rootNode).data('kendoDateTimePicker').value(new Date(this.props.model.get(this.props.fieldName)));

        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoDateTimePicker').value(new Date(this.props.model.get(this.props.fieldName)));
        }




    });

});