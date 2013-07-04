define([
    'underscore', 'jquery', 'react', 'platform/jsxutil', 'platform/util',
    'platform/controls/ControlFactory',
    'text!platform/properties/CrudPage.html',
    'text!platform/properties/formitem.html',
    'react-backbone'
], function (_, $, React, jsxutil, util, ControlFactory,
             formHtml, formItemHtml) {
    'use strict';

    return React.createBackboneClass({

        render: function () {
            var self = this;
            console.assert(!!this.props.typeMetadata);
            console.assert(!!this.props.fieldMetadata);
            console.assert(!!this.props.fields);
            console.assert(!!this.props.model);

            var formItems = this.props.fields.map(function (fieldName) {

                var metadata = self.props.fieldMetadata[fieldName];
                var control = ControlFactory(fieldName, metadata, self.props.model);

                var scope = {
                    label: metadata.label,
                    control: control,
                    helpText: metadata.helpText
                };
                return jsxutil.exec(formItemHtml, scope);
            });


            var scope = {
                formItems: formItems,
                onSubmit: function (e) {
                    e.nativeEvent.preventDefault();

                    var formState = util.mapo(self.refs, function (ref, key) {
                        return [key, ref.getDOMNode().value];
                    });

                    self.props.model.set(formState);
                }
            };
            var dom = jsxutil.exec(formHtml, scope);
            return dom;
        }



    });

});