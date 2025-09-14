Ext.onReady(function() {
Ext.QuickTips.init();

var CompanyDataStore = new Ext.data.Store({
      id: 'CompanyDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbCompany"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'companycode', type: 'int', mapping: 'comp_code'},
        {name: 'companyname', type: 'string', mapping: 'comp_name'}
      ]),
      sortInfo:{field: 'companycode', direction: "ASC"}
    });

var CountryDataStore = new Ext.data.Store({
      id: 'CountryDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbCountry"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'countrycode', type: 'int', mapping: 'country_code'},
        {name: 'countryname', type: 'string', mapping: 'country_name'}
      ]),
      sortInfo:{field: 'countrycode', direction: "ASC"}
    });

  var gstcompany;
  var cmbCompany = new Ext.form.ComboBox({
        id         : 'cmbCompany',
        fieldLabel : '',
        width      : 250,
        store      : CompanyDataStore,
        displayField:'companyname',
        valueField:'companycode',
        hiddenName:'companyname',
        typeAhead: true,
        mode: 'remote',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        emptyText:'Select Company',
        listeners:{
         select :function(){
          CompanyFormPanel.load
                (
                  {
                 url: '/SHVPM/Financials/clsFinancials.php',
                   params:
                   {
                       task:"CompanyDetails",
                       gstcompany: this.getValue()
                      // Ext.MessageBox.alert("Company",gstcompany);

                    }
                  }

                );
          }
       }

    });

  var gstcountry;
  var cmbCountry = new Ext.form.ComboBox({
        id         : 'cmbCountry',
        fieldLabel : 'Country',
        name       :'comp_country_code',
        width      : 250,
        store      : CountryDataStore,
        displayField:'countryname',
        valueField:'countrycode',
        hiddenName:'countryname',
        typeAhead: true,
        mode: 'remote',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        emptyText:'Select Country',
        listeners:{
            select :function(){
           gstcountry=this.getValue()

          }
       }

    });

 var txtCompany = new Ext.form.TextField({
        fieldLabel  : 'Company',
        id          : 'txtCompany',
        name        : 'comp_name',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtAddress1 = new Ext.form.TextField({
        fieldLabel  : 'Address',
        id          : 'txtAddress1',
        name        : 'comp_addr1',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtAddress2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAddress2',
        name        : 'comp_addr2',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtAddress3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtAddress3',
        name        : 'comp_addr3',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtCity = new Ext.form.TextField({
        fieldLabel  : 'City',
        id          : 'txtCity',
        name        : 'comp_city',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtState = new Ext.form.TextField({
        fieldLabel  : 'State',
        id          : 'txtState',
        name        : 'comp_state',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtPincode = new Ext.form.TextField({
        fieldLabel  : 'Pincode',
        id          : 'txtPincode',
        name        : 'comp_pincode',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtPhone = new Ext.form.TextField({
        fieldLabel  : 'Phone',
        id          : 'txtPhone',
        name        : 'comp_phone',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtFax = new Ext.form.TextField({
        fieldLabel  : 'Fax',
        id          : 'txtFax',
        name        : 'comp_fax',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtEmail = new Ext.form.TextField({
        fieldLabel  : 'Email',
        id          : 'txtEmail',
        name        : 'comp_email',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

 var txtWebsite = new Ext.form.TextField({
        fieldLabel  : 'Website',
        id          : 'txtWebsite',
        name        : 'comp_website',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

var CompanyFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Company Master',
        width       : 500,
        height      : 650,
     bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'CompanyFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['comp_name',
                'comp_addr1',
                'comp_addr2',
                'comp_addr3',
                'comp_city',
                'comp_state',
                'comp_pincode',
                'comp_country_code',
                'comp_phone',
                'comp_fax',
                'comp_email',
                'comp_website']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Add',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:40
                },'-',
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    listeners:{
                    click:function(){
                   
                   if (txtCompany.getValue()==""){
                        Ext.MessageBox.alert("Company", "Enter Company Name..");
                     }
                   else if (txtAddress1.getValue()==0){
                        Ext.MessageBox.alert("Address", "Enter Address..");
                     }
                    else if (cmbCountry.getValue()==0){
                        Ext.MessageBox.alert("Country", "Select Country..");
                     }
                     
               
                  CompanyFormPanel.getForm().submit({

                     url: 'FrmMasCompanySave.php',
                       params:
                        {

                    CompanyName:txtCompany.getRawValue(),
                    Address1:txtAddress1.getRawValue(),
                    Address2:txtAddress2.getRawValue(),
                    Address3:txtAddress3.getRawValue(),
                    City:txtCity.getRawValue(),
                    Pincode:txtPincode.getRawValue(),
                    State:txtState.getRawValue(),
                    Phone:txtPhone.getRawValue(),
                    Fax:txtFax.getRawValue(),
                    Email:txtEmail.getRawValue(),
                    Website:txtWebsite.getRawValue(),
                    Country:gstcountry
                          },


                        success:function()
                             {
                              Ext.MessageBox.alert("Alert","Saved");
                              CompanyFormPanel.getForm().reset();
                             },
                          failure:function()
                             {
                              Ext.MessageBox.alert("Alert","Not Saved");
                             }

                    });
                   


                  }

                }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40


                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            CompanyWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {  xtype: 'fieldset',
                title: 'Company Name & Address',
                layout : 'hbox',
                border:true,
                height:290,
                width:400,
                layout      : 'absolute',
                x: 20,
                y: 20,
             items:[
               { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 25,
                border      : false,
                labelWidth  : 65,
                items: [txtCompany]
                },
               { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 0,
                border      : false,
                labelWidth  : 65,
                items: [cmbCompany]
                },
               { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 50,
                border      : false,
                labelWidth  : 65,
                items: [txtAddress1]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 75,
                border      : false,
                labelWidth  : 65,
                items: [txtAddress2]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 100,
                border      : false,
                labelWidth  : 65,
                items: [txtAddress3]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 125,
                border      : false,
                labelWidth  : 65,
                items: [txtCity]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 150,
                border      : false,
                labelWidth  : 65,
                items: [txtState]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 175,
                border      : false,
                labelWidth  : 65,
                items: [cmbCountry]
                },
               { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 200,
                border      : false,
                labelWidth  : 65,
                items: [txtPincode]
                }
               ]},
                {xtype: 'fieldset',
                title: 'Communication Details',
                layout : 'hbox',
                border:true,
                height:180,
                width:400,
                layout      : 'absolute',
                x: 20,
                y: 320,
                items:[
               { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 0,
                border      : false,
                labelWidth  : 65,
                items: [txtPhone]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 30,
                border      : false,
                labelWidth  : 65,
                items: [txtFax]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 60,
                border      : false,
                labelWidth  : 65,
                items: [txtEmail]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 90,
                border      : false,
                labelWidth  : 65,
                items: [txtWebsite]
                }

                ]}

               ]
    });



     var CompanyWindow = new Ext.Window({
        height      : 650,
        width       : 500,
        items       : CompanyFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
  bodyStyle:{"background-color":"#3399CC"},
        
        x      : 45,
        y      : 120
    });
       CompanyWindow.show();
});
