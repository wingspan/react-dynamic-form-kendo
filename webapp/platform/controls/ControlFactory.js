define([
    'underscore', 'jquery', 'react', 'platform/jsxutil', 'platform/util',
    'platform/controls/KendoText',
    'platform/controls/KendoBoolean',
    'platform/controls/KendoNumber',
    'platform/controls/KendoDatetime',
    'react-backbone'
], function (_, $, React, jsxutil, util,
             KendoText, KendoBoolean, KendoNumber, KendoDatetime) {
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

    return ControlFactory;
});