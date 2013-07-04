define([
    'underscore', 'jquery', 'react', 'platform/jsxutil',
    'myapp/controls/KendoText',
    'myapp/controls/KendoBoolean',
    'myapp/controls/KendoNumber',
    'myapp/controls/KendoDatetime',
    'text!mocks/TmfStudyItemModel.json',
    'text!myapp/properties/CrudPage.html',
    'text!myapp/properties/formitem.html',
    'react-backbone'
], function (_, $, React, jsxutil,
             KendoText, KendoBoolean, KendoNumber, KendoDatetime,
             typeMetadata, formHtml, formItemHtml) {
    'use strict';


    function ControlFactory(metadata, value) {
        var scope = {
            KendoText: KendoText,
            KendoBoolean: KendoBoolean,
            KendoNumber: KendoNumber,
            KendoDatetime: KendoDatetime,
            metadata: metadata,
            value: value
        };

        var dispatch = {
            text: jsxutil.exec('<KendoText value={value} />', scope),
            number: jsxutil.exec('<KendoNumber value={value} />', scope),
            datetime: jsxutil.exec('<KendoDatetime value={value} />', scope),
            boolean: jsxutil.exec('<KendoBoolean value={value} />', scope),
            rawtext: jsxutil.exec('<input type="text" value={value} />', scope)
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

            var formItems = this.props.fields.map(function (field) {


                var metadata = self.props.fieldMetadata[field];
                var value = model.get(field);

                var control = ControlFactory(metadata, value);

                var scope = {
                    label: metadata.label,
                    control: control,
                    helpText: metadata.helpText
                };
                return jsxutil.exec(formItemHtml, scope);
            });


            var scope = { formItems: formItems };
            var dom = jsxutil.exec(formHtml, scope);
            return dom;
        }



    });

});