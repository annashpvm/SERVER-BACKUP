


Ext.onReady(function() {
Ext.QuickTips.init();
var gincompcode = localStorage.getItem('gincompcode');

var ParentGroupDataStore = new Ext.data.Store({
      id: 'ParentGroupDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbpgroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'grpcode', type: 'int', mapping: 'grp_code'},
        {name: 'grpname', type: 'string', mapping: 'grp_name'}
      ]),
      sortInfo:{field: 'grpname', direction: "ASC"}
    });

var GroupDataStore = new Ext.data.Store({
      id: 'GroupDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbSelGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'grpcode', type: 'int', mapping: 'grp_code'},
        {name: 'grpname', type: 'string', mapping: 'grp_name'}
      ]),
      sortInfo:{field: 'grpcode', direction: "ASC"}
    });

var Groupcodedatastore = new Ext.data.Store({
        id: 'Groupcodedatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "getgroupcode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });
    
  var gstPGroup;

  var cmbPGroup = new Ext.form.ComboBox({
        id         : 'cmbpgroup',
        fieldLabel : 'Parent Group',
        width      : 250,
        store      : ParentGroupDataStore,
        displayField:'grpname',
        valueField:'grpcode',
        hiddenName:'grpname',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Group',
        listeners:{
         select :function(){
           
             gstPGroup: this.getValue()
                     

       }
}

    });


 var txtGroupcode = new Ext.form.TextField({
        fieldLabel  : 'Groupcode',
        id          : 'txtGroupcode',
        name        : 'con_value',
        width       :  80,
        style       :  {textTransform: "uppercase"}
    });
 var gstGroup;
 var txtGroupName = new Ext.form.TextField({
        fieldLabel  : 'GroupName',
        id          : 'txtGroupName',
        name        : 'GroupName',
        width       :  250,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
        enableKeyEvents: true,
        listeners:{
         keyup: function(){
             //Ext.MessageBox.alert("Alert",this.getRawValue());
          GroupDataStore.load
                (
                  {
                    url: '/SHVPM/Accounts/clsAccounts.php',
                    params:
                    {
                        task:"cmbSelGroup",
                        compcode: gincompcode,
                        gstGroup:this.getRawValue()+"%"
                     }
           }
   );
    }
       
}
    });

    var gstStatus = "N";
    var chkStatus = new Ext.form.Checkbox({
        id         : 'chkStatus',
        xtype      : 'checkbox',
        fieldLabel : '',
        boxLabel   : 'Yes / No',
        inputValue : '',
        listeners:{
            'check': function(rb,checked){
                if(checked === true){
                    gstStatus = "Y";
                } else {
                    gstStatus = "N";
                }
            }
        }
    });

/*{ xtype     : 'multiselect',
                title       : '',
                width       : 320,
                height      : 220,
                x: 430,
                y: 20,
                border      : false,
                displayField:'grpname',
                valueField:'grpcode',
                hiddenName:'grpname',
                store:GroupDataStore,
                typeAhead: true,
                mode: 'remote',
                forceSelection: true,
                triggerAction: 'all',
                selectOnFocus:false,
                editable: false
                }
                */
/*
var lstGroupname = new Ext.ux.form.MultiSelect({

        fieldLabel: '',
        width: 320,
        height: 220,
        x: 430,
        y: 20,
        id:'cmbgrpname',
        name:'cmbgrpname',
        mode: 'local',
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        displayField:'grpname',
        valueField:'grpcode',
        hiddenName:'grpname',
        selectOnFocus:true,
        store: GroupDataStore
   });
  */ 
var GroupFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Group Master',
        width       : 800,
        height      : 350,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'GroupFormPanel',
        method      : 'post',
        layout      : 'absolute',
         reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['con_value']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40,
                    icon: '/Pictures/edit.png'
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){

                   if (txtGroupName.getValue()==""){
                        Ext.MessageBox.alert("Account Group", "Enter Group Name..");
                     }
                   
                     //Ext.MessageBox.alert("Account Group", gincompcode+","+txtGroupName.getRawValue()+","+cmbPGroup.getValue()+","+gstStatus);

                  GroupFormPanel.getForm().submit({

                     url: 'FrmMasGroupSave.php',
                       params:
                        {
                            CompCode:gincompcode,
                            GroupName:txtGroupName.getRawValue(),
                            ParentGroup:cmbPGroup.getValue(),
                            Status:gstStatus
                        },


                        success:function()
                             {
                              Ext.MessageBox.alert("Alert","Ledger Group Created");
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
                    tooltip: 'Refresh Details...', height: 40,
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
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            GroupWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {  xtype: 'fieldset',
                title: 'Group Master',
                layout : 'hbox',
                border:true,
                height:220,
                width:400,
                layout      : 'absolute',
                x: 20,
                y: 20,
             items:[
               { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 90,
                items: [txtGroupName]
                },
               { xtype       : 'fieldset',
                title       : '',
                width       : 200,
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 90,
                items: [txtGroupcode]
                },
               { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 0,
                y           : 60,
                border      : false,
                labelWidth  : 90,
                items: [cmbPGroup]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 20,
                y           : 90,
                border      : false,
                labelWidth  : 70,
                items: [chkStatus]
                }
               ]},//lstGroupname

                
               ]
    });

    function RefreshData(){
        GroupFormPanel.getForm().reset();
        ParentGroupDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task:"cmbpgroup",
                compcode: gincompcode
            }
        });
        
        Groupcodedatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task:"getgroupcode",
                compcode: gincompcode
            },
            callback: function(){
                txtGroupcode.setRawValue("G"+Groupcodedatastore.getAt(0).get('con_value'));
            }
        });
        GroupDataStore.removeAll();
    }

     var GroupWindow = new Ext.Window({
        height      : 350,
        width       : 800,
        y           : 90,
        items       : GroupFormPanel,
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
                    ParentGroupDataStore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task:"cmbpgroup",
                            compcode: gincompcode
                        }
                    });
                    
                    Groupcodedatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task:"getgroupcode",
                            compcode: gincompcode
                        },
                        callback: function(){
                            txtGroupcode.setRawValue("G"+Groupcodedatastore.getAt(0).get('con_value'));
                        }
                    });
                }
            }

    });
       GroupWindow.show();
});
