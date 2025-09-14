Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;
var BankDataStore = new Ext.data.Store({
      id: 'BankDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/AccModule.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "BANKNAME"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'bank_seqno', type: 'int', mapping: 'bank_seqno'},
        {name: 'bank_name', type: 'string', mapping: 'bank_name'}
      ]),
      sortInfo:{field: 'bank_name', direction: "ASC"}
    });

var CountryDataStore = new Ext.data.Store({
      id: 'CountryDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/AccModule.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "COUNTRY"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'country_code', type: 'int', mapping: 'country_code'},
        {name: 'country_name', type: 'string', mapping: 'country_name'}
      ]),
      sortInfo:{field: 'country_name', direction: "ASC"}
    });

var ginbank;
var cmbbank = new Ext.form.ComboBox({
        id         : 'cmbbank',
        fieldLabel : 'Bank Name',
        width      : 300,
        store      : BankDataStore,
        displayField:'bank_name',
        valueField:'bank_seqno',
        hiddenName:'bank_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Bank',
        listeners:{
         select :function(){
          BankFormPanel.load
                (
                  {
                 url: '/SHVPM/Financials/AccModule.php',
                   params:
                   {
                       task:"BankDetails",
                       ginbank: this.getValue()
                      // Ext.MessageBox.alert("Company",gstcompany);

                    }
                  }

                );
          }
       }

    });

var gstcountry;
var cmbcountry = new Ext.form.ComboBox({
        id         : 'cmbcountry',
	name	   : 'bank_country_code',
        fieldLabel : 'Country',
        width      : 100,
        store      : CountryDataStore,
        displayField:'country_name',
        valueField:'country_code',
        hiddenName:'country_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Country',
        listeners:{
            select :function(){
           gstcountry=this.getValue()

          }
       }

    });

var txtbank = new Ext.form.TextField({
        fieldLabel  : 'Bank',
        id          : 'txtbank',
        name        : 'bank_name',
        width       :  300,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
    });

var txtshortname=new Ext.form.TextField({
    fieldLabel  :'Short Name',
    id          :'txtshort',
    name        :'bank_shortname',
    width       : 100,        
        allowBlank  :  false,
        style       :  {textTransform: "uppercase"}
});

var txtadd=new Ext.form.TextField({
    fieldLabel  :'Address',
    id          :'txtadd',
    name        :'bank_add1',
    width       : 300,
        allowBlank  :  false,
        style       :  {textTransform: "uppercase"}
});

var txtadd1=new Ext.form.TextField({
    fieldLabel  :'',
    id          :'txtadd1',
    name        :'bank_add2',
    width       : 300,
        allowBlank  :  false,
        style       :  {textTransform: "uppercase"}
});

var txtadd2=new Ext.form.TextField({
    fieldLabel  :'',
    id          :'txtadd2',
    name        :'bank_add3',
    width       : 300,
        style       :  {textTransform: "uppercase"}
});

var txtcity=new Ext.form.TextField({
    fieldLabel  :'City',
    id          :'txtcity',
    name        :'bank_city',
    width       : 100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
});

var txtstate=new Ext.form.TextField({
    fieldLabel  :'State',
    id          :'txtstate',
    name        :'bank_state',
    width       : 100,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false
});

var txtcontact=new Ext.form.TextField({
    fieldLabel  :'Contact Person',
    id          :'txtcontact',
    name        :'bank_contact_person',
    width       : 300,
        style       :  {textTransform: "uppercase"}
});

var txtdesignation = new Ext.form.TextField({
    fieldLabel  :'Designation',
    id          :'txtdesignation',
    name        :'bank_contact_persondesg',
    width       : 300,
        style       :  {textTransform: "uppercase"}
});

var txtphno=new Ext.form.NumberField({
    fieldLabel  :'Phone No',
    id          :'txtphno',
    name        :'bank_phone',
    width       : 100,
    maxLength   : 10,
        style       :  {textTransform: "uppercase"}
});

var txtemail=new Ext.form.TextField({
    fieldLabel  :'E-Mail',
    id          :'txtemail',
    name        :'bank_email',
    width       : 300,
        style       :  {textTransform: "uppercase"}
});

var txtwebsite=new Ext.form.TextField({
    fieldLabel  :'Website',
    id          :'txtwebsite',
    name        :'bank_website',
    width       : 300,
        style       :  {textTransform: "uppercase"}
});


var BankFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Bank Master',
        width       : 630,
        height      : 460,
        bodyStyle   : {"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'BankFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'results',
                    totalProperty: 'total',
                    id:'id'
                    },['bank_shortname',
		'bank_name',
                'bank_add1',
                'bank_add2',
                'bank_add3',
                'bank_city',
                'bank_state',
                'bank_country_code',
                'bank_phone',
                'bank_email',
                'bank_website',
		'bank_contact_person',
		'bank_contact_persondesg']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
                        }
                    }
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                   
                   if (txtbank.getRawValue()==""){
                        Ext.MessageBox.alert("Bank", "Enter Bank Name..");
                     }
                   else if (txtadd.getRawValue()==""){
                        Ext.MessageBox.alert("Address", "Enter Address..");
                     }
                    else if (cmbcountry.getValue()==0){
                        Ext.MessageBox.alert("Country", "Select Country..");
                     }
                     
               
                  BankFormPanel.getForm().submit({
                     url: 'FrmMasBankSave.php',
                       params:
                        {
                    BankName:txtbank.getRawValue(),
		    ShortName:txtshortname.getRawValue(),
                    Address1:txtadd.getRawValue(),
                    Address2:txtadd1.getRawValue(),
                    Address3:txtadd2.getRawValue(),
                    City:txtcity.getRawValue(),
                    State:txtstate.getRawValue(),
                    Country:gstcountry,
                    Phone:txtphno.getValue(),
                    Email:txtemail.getRawValue(),
                    Website:txtwebsite.getRawValue(),
		    ContactPerson:txtcontact.getRawValue(),
		    Designation:txtdesignation.getRawValue()
                          },
                        success:function()
                             {
                                Ext.MessageBox.alert("Alert","Saved");
                                RefreshData();
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
                    tooltip: 'Refresh Details...', 
                    height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', 
                    height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            MasBankWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                
		{xtype: 'fieldset',
                title: 'Bank Name & Address',
                layout : 'hbox',
                border:true,
                height:190,
                width:620,
                layout      : 'absolute',
                x: 5,
                y: 10,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 90,
                items: [cmbbank]
                },
		{ xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 90,
                items: [txtbank]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 350,
                x           : 410,
                y           : 30,
                border      : false,
                labelWidth  : 70,
                items: [txtshortname]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 60,
                border      : false,
                labelWidth  : 90,
                items: [txtadd]
                },
                 { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 90,
                border      : false,
                labelWidth  : 90,
                items: [txtadd1]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 120,
                border      : false,
                labelWidth  : 90,
                items: [txtadd2]
                },
                 { xtype       : 'fieldset',
                title       : '',
                width       : 350,
                x           : 410,
                y           : 60,
                border      : false,
                labelWidth  : 70,
                items: [txtcity]
                },
                 { xtype       : 'fieldset',
                title       : '',
                width       : 350,
                x           : 410,
                y           : 90,
                border      : false,
                labelWidth  : 70,
                items: [txtstate]
                },
		{ xtype       : 'fieldset',
                title       : '',
                width       : 350,
                x           : 410,
                y           : 120,
                border      : false,
                labelWidth  : 70,
                items: [cmbcountry]
                }
                ]
},

		{xtype: 'fieldset',
                title: 'Communication Details',
                layout : 'hbox',
                border:true,
                height:160,
                width:620,
                layout      : 'absolute',
                x: 5,
                y: 220,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 90,
                items: [txtcontact]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 350,
                x           : 410,
                y           : 0,
                border      : false,
                labelWidth  : 70,
                items: [txtphno]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 90,
                items: [txtdesignation]
                },
                 { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 60,
                border      : false,
                labelWidth  : 90,
                items: [txtemail]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 450,
                x           : 0,
                y           : 90,
                border      : false,
                labelWidth  : 90,
                items: [txtwebsite]
                }
                ]
}
              ]
               });

    function RefreshData(){
        gstFlag = "Add";
        CountryDataStore.load({
            url: '/SHVPM/Financials/AccModule.php',
            params:
            {
                task:"COUNTRY"
            }
        });

        BankDataStore.load({
            url: '/SHVPM/Financials/AccModule.php',
            params:
            {
                task:"BANKNAME"
            }
        });
        BankFormPanel.getForm().reset();
    }

     var MasBankWindow = new Ext.Window({
        height      : 500,
        width       : 650,
        y           : 90,
        layout      : 'fit',
        items       : BankFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
        listeners:
            {
                show:function(){
                    //Ext.MessageBox.alert("Finid",ginfinid);
                    gstFlag = "Add";
                    CountryDataStore.load({
                        url: '/SHVPM/Financials/AccModule.php',
                        params:
                        {
                            task:"COUNTRY"
                        }
                    });
                    
                    BankDataStore.load({
                        url: '/SHVPM/Financials/AccModule.php',
                        params:
                        {
                            task:"BANKNAME"
                        }
                    });
                }
            }
    });
       MasBankWindow.show();
});
