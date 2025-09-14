Ext.onReady(function() {
Ext.QuickTips.init();

var GinCompcode = localStorage.getItem('acccompcode');
var GinFinid = localStorage.getItem('accfinid');
var  ledcode=" ";
var  ledgercode=" ";

function Left(str, n){
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0,n);
    }

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

var LedgerDataStore = new Ext.data.Store({
      id: 'LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "ledet",comp:GinCompcode,grpcode:1}, // this parameter asks for listing
//            baseParams:{task: "grpledger",}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['led_code','led_name','led_grp_code'])
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
		Ext.getCmp('viewid').setVisible(false);
	 	LedgerDataStore.removeAll();
         	LedgerDataStore.load({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task: "ledet",
//				task : "grpledger",
				comp:GinCompcode,
				grpcode:cmbGroup.getValue(),
				dt:Ext.util.Format.date(AsOnDate.getValue(),"Y-m-d"),
				ds:txtdays.getRawValue()
                           },
			callback: function(){
		        var cnt=LedgerDataStore.getCount();
			ledcode = "";
                    	if(cnt>0){
			for(var i=0;i<cnt;i++)
			{
			    if(i==0){
			    ledcode=LedgerDataStore.getAt(i).get('led_code');
			    }else{		
		            ledcode=ledcode+','+LedgerDataStore.getAt(i).get('led_code');
			    }
		        }
			ledgercode="";
			ledgercode = Ext.util.Format.substr(ledcode,1);
				Ext.getCmp('viewid').setVisible(true);
                    }
                }
            });

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

var txtdays = new Ext.form.TextField({
        fieldLabel  : 'Above',
        id          : 'txtdays',
        width       : 270,
        name        : 'txtdays'
   });

var gstType="A";
var gstoption="AL";
var OutStandingDaysFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'OutStanding Above Given Days',
        width       : 650,
        height      : 400,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'OutStandingDaysFormPanel',
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
                    style  : 'text-align:center;',id:'viewid',
                    tooltip: 'View Details...', height: 40,
                  listeners:{
                        click:
                          function () {
               		var v1= GinCompcode;
			var v2= GinFinid;
			var v3= "%";
                     var fdate=Ext.getCmp('AsOnDate').value;		
		     var v4 =  fdate + " 00:00:00.000";
			
		     var v5 =Ext.getCmp('txtdays').getRawValue();
		     if (v5==="")
			v5 =0 ;
		     
		     var grp = Ext.getCmp('cmbGroup').getValue();
//			var lcode = 29692;
//			alert(grp+ledgercode);
                     var p1 = "&compcode="+encodeURIComponent(v1);
                     var p2 = "&finid="+encodeURIComponent(v2);
                     var p3 = "&ledcode="+encodeURIComponent(ledcode);
                     var p4 = "&asdate="+encodeURIComponent(v4);
                     var p5 = "&days="+encodeURIComponent(v5);
                     var p6 = "&grpcode="+encodeURIComponent(grp);

//                     var p5 = "&type="+encodeURIComponent(v5);
                     var parm = (p1+p6+p3+p5);
			var chkreptype =OutStandingDaysFormPanel.getForm().getValues()['OptOption'];
		     if (chkreptype==="1")
			{
                     var parm = (p1+p2+p3+p4+p5);
window.open('http://kgsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDays.rptdesign' + parm ,  '_blank' );  
//window.open('http://kgsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysChkJoin.rptdesign' + parm ,  '_blank' );  
			}
		     else if (chkreptype==="3")
			{
                     var parm = (p1+p2+p3+p4+p5);
window.open('http://kgsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysAgeing.rptdesign' + parm ,  '_blank' );  
			}
			else
{
                     var parm = (p1+p6+p4);
window.open('http://kgsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysVm.rptdesign' + parm ,  '_blank' );  
}
		   /*  else if (chkreptype==="2")       
window.open('http://kgsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysAbs.rptdesign' + parm ,  '_blank' );         
		     else 
window.open('http://kgsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysWithoutAdvance.rptdesign' + parm ,  '_blank' );   */      
                    }
                    }
                    },'-',

                {
                    text: 'Exit',icon: '/Pictures/exit.png',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            RepOutStandingDaysWindow.hide();
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
                height:100,
                width:400,
                layout      : 'absolute',
                x: 20,
                y: 0,
             items:[
                    {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 20,
                y       : 10,
                columns :  2,
                items: [
                    {boxLabel: 'All', name: 'OptType', id:'optAll',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     gstType="A";
			/*LedgerDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task: "ledet",
				comp:GinCompcode,
				grpcode:0,
				dt:Ext.util.Format.date(AsOnDate.getValue(),"Y-m-d"),
				ds:txtdays.getRawValue()
                           },
			callback: function(){
		           var cnt=LedgerDataStore.getCount();
			
                    	if(cnt>0){
			ledcode = "";
			ledgercode=LedgerDataStore.getAt(0).get('led_code');
			for(var i=0;i<cnt;i++)
			{
		            ledcode=ledcode+','+LedgerDataStore.getAt(i).get('led_code');
		        }
//Ext.Msg.alert(Ext.util.Format.substr(ledcode,1));
			ledgercode = Ext.util.Format.substr(ledcode,1);
                    }
                }
                           });*/
                     }
                     }
                     }
                    },
                    {boxLabel: 'Selective', name: 'OptType',id:'optSelective', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstType="S";
			/*LedgerDataStore.removeAll();
			LedgerDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task: "ledet",
				comp:GinCompcode,
				grpcode:cmbGroup.getValue(),
				dt:Ext.util.Format.date(AsOnDate.getValue(),"Y-m-d"),
				ds:txtdays.getRawValue()
                           },
			callback: function(){
		           var cnt=LedgerDataStore.getCount();
			ledcode = "";
			ledgercode=LedgerDataStore.getAt(0).get('led_code');
                    	if(cnt>0){
			for(var i=0;i<cnt;i++)
			{
		            ledcode=ledcode+','+LedgerDataStore.getAt(i).get('led_code');
		        }
//Ext.Msg.alert(Ext.util.Format.substr(ledcode,1));
			ledgercode = Ext.util.Format.substr(ledcode,1);
                    }
                }
                           });*/
                       }
                       }
                       }
                    }]
                }
                   ]
               }
               ]
               },
		{ xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 60,
                y           : 80,
                border      : false,
                labelWidth  : 65,
                items: [cmbGroup]
                },
               {xtype: 'fieldset',
                title: 'Days',
                layout : 'hbox',
                border:true,
                height:70,
                width:150,
                layout      : 'absolute',
                x: 40,
                y: 130,
             items:[
                
                 { xtype       : 'fieldset',
                title       : '',
                width       : 150,
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 35,
                items: [txtdays]
                }
                   ]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 190,
                y           : 130,
                border      : false,
                labelWidth  : 75,
                items: [AsOnDate]
                },
		{  xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:true,
                height:50,
                width:400,
                layout      : 'absolute',
                x: 40,
                y: 200,
             items:[
		{
                xtype   : 'checkboxgroup',
                border  :  false,
                x       : 0,
                y       : 0,
                columns :  3,
                items: [
                    {boxLabel: 'Old', name: 'OptOption', id:'optAdv',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     gstoption="AD";
                     }
                     }
                     }
                    },
                    {boxLabel: 'Abstract', name: 'OptOption',id:'optAbs', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="AB";
                       }
                       }
                       }
                    },
                    {boxLabel: 'Meeting', name: 'OptOption',id:'optmeet', inputValue: 3,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="MT";
                       }
                       }
                       }
                    }
		]}]}
               ]
    });



     var RepOutStandingDaysWindow = new Ext.Window({
        height      : 400,
        width       : 650,
        items       : OutStandingDaysFormPanel,
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
                             task:"recagegrp",
			     gincompcode:GinCompcode,
			
                           }
                     });

		/*LedgerDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task: "ledet",
				comp:GinCompcode,
				grpcode:0,
				dt:Ext.util.Format.date(AsOnDate.getValue(),"Y-m-d"),
				ds:txtdays.getRawValue()
                           },
			callback: function(){
		           var cnt=LedgerDataStore.getCount();
			ledcode = "";
			ledgercode=LedgerDataStore.getAt(0).get('led_code');
                    	if(cnt>0){
			for(var i=0;i<cnt;i++)
			{
		            ledcode=ledcode+','+LedgerDataStore.getAt(i).get('led_code');
		        }
//Ext.Msg.alert(Ext.util.Format.substr(ledcode,1));
			ledgercode = Ext.util.Format.substr(ledcode,1);
                    }
                }
                           });*/
                }
            }      

    });
       RepOutStandingDaysWindow.show();
});
