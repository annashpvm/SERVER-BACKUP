Ext.onReady(function() {
Ext.QuickTips.init();
var GinCompcode = localStorage.getItem('acccompcode');
var GinFinid = localStorage.getItem('accfinid');

var GroupDataStore = new Ext.data.Store({
      id: 'GroupDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbcommongroup"}, // this parameter asks for listing
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

var CustomerDataStore = new Ext.data.Store({
      id: 'CustomerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbSelGroupCust"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ]),
      sortInfo:{field: 'led_code', direction: "ASC"}
    });
  var gstGroup;

  var cmbGroup = new Ext.form.ComboBox({
        id         : 'cmbGroup',
        fieldLabel : 'Group',
        width      : 250,
        store      : GroupDataStore,
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
         select:function(){
         CustomerDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task:"cmbSelGroupCust",
                             Groupcode:this.getValue()
                           }
                           });

       }
}

    });
var gstCustomer;
var cmbCustomer = new Ext.form.ComboBox({
        id         : 'cmbCustomer',
        fieldLabel : 'Customer',
        width      : 250,
        store      : CustomerDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Group',
        listeners:{
         select :function(){
          gstCustomer: this.getValue()
          

       }
}

    });

   var AsOnDate = new Ext.form.DateField({
        name: 'AsOnDate',
        id: 'AsOnDate',
        fieldLabel: 'As On Date',
        format     : 'Y-m-d',
        value      : new Date()

    });
var gstType="G";
var OutstandingFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'OutStanding Register',
        width       : 650,
        height      : 400,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'OutstandingFormPanel',
        method      : 'post',
        layout      : 'absolute',
         
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',icon: '/Pictures/refresh.png',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'View',icon: '/Pictures/view.png',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40,
                  listeners:{
                        click:
                          function () {
                    var form = OutstandingFormPanel.getForm();
                    if (form.isValid()) {
                  
                     var fdate=Ext.getCmp('AsOnDate').value;		
		     var v1 =  fdate + " 00:00:00.000";
		     var v2 = Ext.getCmp('cmbGroup').getRawValue();
		     var v3 = Ext.getCmp('cmbCustomer').getValue();
		     var v4= 22;
		     var v5 ="D";
                     var p1 = "&group="+encodeURIComponent(v2);
                     var p2 = "&ledcode="+encodeURIComponent(v3);
                     var p3 = "&finid="+encodeURIComponent(v4);
                     var p4 = "&voudate="+encodeURIComponent(v1);
                     var p5 = "&type="+encodeURIComponent(v5);
                   

                     var parm = (p1+p2+p3+p4+p5);
                     window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepSalesOutstandingsales.rptdesign' + parm ,  '_blank' );         }
                    }
                    }
                    },'-',

                {
                    text: 'Exit',icon: '/Pictures/exit.png',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            RepOutStandingWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {  xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                border:true,
                height:280,
                width:600,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                {  xtype: 'fieldset',
                title: 'Options',
                layout : 'vbox',
                border:true,
                height:150,
                width:200,
                layout      : 'absolute',
                x: 20,
                y: 0,
             items:[
                    {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 20,
                y       : 10,
                columns :  1,
                items: [
                    {boxLabel: 'GroupWise', name: 'OptType', id:'optGroupWise',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     gstType="G";
                     }
                     }
                     }
                    },
                    {boxLabel: 'PartyWise', name: 'OptType',id:'optPartyWise', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstType="P";
                       }
                       }
                       }
                    }]
                }
                   ]
               }
               ]
               },
               {xtype: 'fieldset',
                title: 'Account',
                layout : 'hbox',
                border:true,
                height:150,
                width:350,
                layout      : 'absolute',
                x: 250,
                y: 30,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 65,
                items: [cmbGroup]
                },
                 { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 0,
                y           : 30,
                border      : false,
                labelWidth  : 65,
                items: [cmbCustomer]
                }
                   ]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 190,
                y           : 200,
                border      : false,
                labelWidth  : 75,
                items: [AsOnDate]
                }
               ]
    });



     var RepOutStandingWindow = new Ext.Window({
        height      : 400,
        width       : 650,
        items       : OutstandingFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 90,
	listeners:
            {
                show:function(){
		GroupDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task:"cmbcommongroup",
			     gincompcode:1,
			     group:'67,68,73,156,177,178,180,70,72,74,75,76,77,78,79,80,81,82,83,143,179,184,187,193,213,214,215,216,217'
                           }
                     });
                }
            }      

    });
       RepOutStandingWindow.show();
});
