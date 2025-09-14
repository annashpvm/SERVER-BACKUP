Ext.onReady(function(){
 
var itemPanel = new Ext.form.FormPanel({
            fileUpload : true,
            renderTo:'example-form',
            items:[new Ext.form.TextField({
                id:"iconUpload",
                fieldLabel: 'Image',
                inputType: 'file',
                name: 'appIcon',
                width:500

            })],
            listeners : {
                render : function(form){
                }
            },
            buttonAlign: 'center',
            buttons: [{
                text     : 'Submit',
                formBind : true,
                handler  : function(){
                   itemPanel.getForm().submit({
                        waitMsg: "Progress ...",
                        success: function(form, action){

                        },
                        failure: function(form, action){

                        }
                    });

                }
            }]

        });

});
        
