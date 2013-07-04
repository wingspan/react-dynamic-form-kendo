define([
    'underscore', 'jquery', 'react', 'platform/jsxutil', 'platform/util',
    'myapp/controls/KendoText',
    'myapp/controls/KendoBoolean',
    'myapp/controls/KendoNumber',
    'myapp/controls/KendoDatetime',
    'text!mocks/TmfStudyItemModel.json',
    'text!myapp/properties/CrudPage.html',
    'text!myapp/properties/formitem.html',
    'react-backbone'
], function (_, $, React, jsxutil, util,
             KendoText, KendoBoolean, KendoNumber, KendoDatetime,
             typeMetadata, formHtml, formItemHtml) {
    'use strict';


    function ControlFactory(fieldName, metadata, model) {
        var scope = {
            KendoText: KendoText,
            KendoBoolean: KendoBoolean,
            KendoNumber: KendoNumber,
            KendoDatetime: KendoDatetime,
            fieldName: fieldName,
            metadata: metadata,
            model: model
        };

        var dispatch = {
            text: jsxutil.exec('<KendoText model={model} fieldName={fieldName} ref={fieldName} />', scope),
            number: jsxutil.exec('<KendoNumber model={model} fieldName={fieldName} ref={fieldName} />', scope),
            datetime: jsxutil.exec('<KendoDatetime model={model} fieldName={fieldName} ref={fieldName} />', scope),
            boolean: jsxutil.exec('<KendoBoolean model={model} fieldName={fieldName} ref={fieldName} />', scope),
            rawtext: jsxutil.exec('<input type="text" model={model} fieldName={fieldName} ref={fieldName} />', scope)
        };

        return dispatch[metadata.dataType];
    }


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