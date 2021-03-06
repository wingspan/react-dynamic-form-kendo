define([
    'underscore', 'jquery', 'backbone', 'react', 'platform/util',
    'platform/properties/PropertiesFormView'
], function (_, $, Backbone, React, util, PropertiesFormView) {
    'use strict';


    function entrypoint() {

        var asyncBeanTypeInfo = util.getJSON('/api/types/DummyBean');
        asyncBeanTypeInfo.fail(function() { alert('fail'); });


        var DummyBean = Backbone.Model.extend({
            urlRoot: '/api/beans/DummyBean',
            parse: function(modelResponse) {
                return modelResponse.data;
            }
        });

        var model = new DummyBean({id: '8439112E-806C-11E2-B0ED-B4BDF046605F'});

        $.when(asyncBeanTypeInfo).done(function (typeMetadata) {

            function renderForm(sel) {
                React.renderComponent(PropertiesFormView({
                    typeMetadata: typeMetadata.data,
                    fieldMetadata: typeMetadata.data.fields,
                    fields: ['tmfItemId', 'tmfItemType', 'description', 'isCoreForLevel', 'modifiedDate'],
                    model: model
                }), $(sel)[0]);
            }

            _.each(['[data-id="form1"]', '[data-id="form2"]', '[data-id="form3"]'], renderForm);

        });

        model.fetch();


        // Save reference to model for console debugging, e.g.
        //   window.model.add({'title': 'asfdasdf'})
        //   JSON.stringify(window.model.toJSON())
        //
        window.model = model;
    };

    return {
        entrypoint: entrypoint
    };
});