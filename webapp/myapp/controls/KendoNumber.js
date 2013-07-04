define([
    'underscore', 'jquery', 'react', 'kendo', 'platform/jsxutil',
    'react-backbone'
], function (_, $, React, kendo, jsxutil) {
    'use strict';

    return React.createBackboneClass({

        render: function () {
            console.assert(!!this.props.metadata);

            return jsxutil.exec('<span />', {});
        },

        componentDidMount: function (rootNode) {
            var self = this;
            $(rootNode).kendoNumericTextBox({
                format: 'n' + this.props.metadata.decimals,
                min: this.props.metadata.minValue,
                max: this.props.metadata.maxValue,
                step: this.props.metadata.stepValue
//                change: function () {
//                    self.props.model.set(self.props.fieldName, this.value());
//                }
            });
            $(rootNode).data('kendoNumericTextBox').value(this.props.model.get(this.props.fieldName));
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoNumericTextBox').value(this.props.model.get(this.props.fieldName));
        }



    });

});