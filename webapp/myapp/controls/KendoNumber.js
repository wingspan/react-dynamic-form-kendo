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
            $(rootNode).kendoNumericTextBox({
                format: 'n' + this.props.metadata.decimals,
                min: this.props.metadata.minValue,
                max: this.props.metadata.maxValue,
                step: this.props.metadata.stepValue
            });
            $(rootNode).data('kendoNumericTextBox').value(this.props.value);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            $(rootNode).data('kendoNumericTextBox').value(this.props.value);
        }



    });

});