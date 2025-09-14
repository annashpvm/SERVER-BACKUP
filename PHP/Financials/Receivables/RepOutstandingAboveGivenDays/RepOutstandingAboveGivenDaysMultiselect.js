Ext.onReady(function() {
Ext.QuickTips.init();

var GinCompcode = localStorage.getItem('acccompcode');
var GinFinid = localStorage.getItem('accfinid');
var  ledcode=" ";
var  ledgercode=" ";
var grpval=" ";
var gstcomp="A";
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
            baseParams:{task: "cmbcommongroupnew"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'grp_code', type: 'int', mapping: 'grp_code'},
        {name: 'grp_name', type: 'string', mapping: 'grp_name'}
      ]),
      sortInfo:{field: 'grp_code', direction: "ASC"}
    });


var LedgerDataStore = new Ext.data.Store({
      id: 'LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "ledbook",grpcode:0,compcode:GinCompcode}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ])
    });

var cmbledname = new Ext.form.ComboBox({
        id         : 'cmbledname',
        width      : 280,
        store      : LedgerDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Ledger name',
	allowBlank:false,
        tabIndex:18,
	hidden : false  
    });

var dgrecord = Ext.data.Record.create([]);
   var cmbgroup= new Ext.form.ComboBox({
        id         : 'cmbgroup',hidden:true,
//        fieldLabel : 'Style',
        width      : 400,
	x: 30,
    	y: 20,
        store       : GroupDataStore,
        displayField:'grpname',
        valueField:'grpcode',
        hiddenName:'grpname',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
        listeners:{
            select:function(){
			LedgerDataStore.load({
	                      url: '/SHVPM/Financials/clsRepFinancials.php',
	                       params: {
	                           task: 'cmbsalregledname',
	                           grpcode:this.getValue(),
				   compcode : GinCompcode
	                       }
			});

                    //  lstStyle.getSelectionModel().selectAll();
                    var selrows = lstgroup.getSelectionModel().getCount();
                    var sel = lstgroup.getSelectionModel().getSelections();
                    var cnt = 0;
                    for (var i=0;i<selrows;i++){
                        if (sel[i].data.grpname == cmbgroup.getRawValue()){
                            cnt = cnt + 1;
                        }
                    }
                    if (cnt > 0){
                        Ext.MessageBox.alert("Packing","The Style Already Exits!");
                    } else {
                        lstgroup.getStore().insert(
                            lstgroup.getStore().getCount(),
                            new dgrecord({
                                grp_code:cmbgroup.getValue(),
                                grp_name:cmbgroup.getRawValue()
                            })
                            );
                    }
            }
        }
});

        var sidno='';
	var sm = new Ext.grid.CheckboxSelectionModel({
   listeners: {
       selectionchange: function(sm) {
       var selected_rows = lstgroup.getSelectionModel().getSelections();
             for(var i=0; i<selected_rows.length; i++){
             sidno=(selected_rows[i].data.id);
        }
        }
    }
});

var fm = Ext.form;
var lstgroup = new Ext.grid.EditorGridPanel({
    frame: false,
    id : lstgroup,
    hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 170,
    width: 400,
        store       : GroupDataStore,
    x: 30,
    y: 40,
    selModel: sm,
    columns: [sm,
        {header: "GroupCode", dataIndex: 'grp_code',sortable:true,width:200,align:'left',hidden : true},
        {header: "GroupName", dataIndex: 'grp_name',sortable:true,width:350,align:'left',
        editor: new fm.TextField({allowBlank: false})}
    ]
   //  store   : []
});


 /* var gstGroup;
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
    });*/

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
        width       : 700,
        height      : 600,
       bodyStyle:{"background-color":"lightpink"},
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
		     
		     var grp = Ext.getCmp('cmbgroup').getValue();
grpval='';
		    var sel = lstgroup.getSelectionModel().getSelections();
			for (var t=0; t<sel.length; t++)
			{
			if (grpval === "")
				grpval =  sel[t].data.grp_code;
			else
				grpval = grpval + ","  + sel[t].data.grp_code;
			}

			var ledcode = Ext.getCmp('cmbledname').getValue();
			if(ledcode=="" || ledcode==0)
			ledcode = "%";
//			alert(grp+ledgercode);
                     var p1 = "&compcode="+encodeURIComponent(v1);
                     var p2 = "&finid="+encodeURIComponent(v2);
                     var p3 = "&ledcode="+encodeURIComponent(ledcode);
                     var p4 = "&asdate="+encodeURIComponent(v4);
                     var p5 = "&days="+encodeURIComponent(v5);
                     var p6 = "&grpcode="+encodeURIComponent(grp);
                     var p7 = "&grp="+encodeURIComponent(grpval);
                     var p8 = "&compflag="+encodeURIComponent(gstcomp);

//                     var p5 = "&type="+encodeURIComponent(v5);
                     var parm = (p1+p6+p3+p5);
			var chkreptype =OutStandingDaysFormPanel.getForm().getValues()['OptOption'];
		     if (chkreptype=="1")
			{
                     var parm = (p1+p2+p3+p4+p5+p7+p8);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDays.rptdesign' + parm ,  '_blank' );  
//window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysChkJoin.rptdesign' + parm ,  '_blank' );  
			}
		     else if (chkreptype==="2")
			{
                     //var parm = (p1+p2+p7+p4+p5);
 var parm = (p1+p2+p3+p4+p5+p7+p8);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysAgeingAbs.rptdesign' + parm ,  '_blank' );  
			}
		     else if (chkreptype==="3")
			{
                     var parm = (p1+p2+p7+p4+p5);
                  
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysAgeing.rptdesign' + parm ,  '_blank' );  
			}
		     else if (chkreptype=="4")
			{
                     var parm = (p1+p2+p3+p4+p5+p7+p8);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysMeeting.rptdesign' + parm ,  '_blank' );   
			}
  else if (chkreptype=="5")
			{
                     var parm = (p1+p2+p3+p4+p5+p7+p8);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysAgeingbankabs.rptdesign' + parm ,  '_blank' );   
			}
 else if (chkreptype=="6")
			{
                     var parm = (p1+p2+p3+p4+p5+p7+p8);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysAgeingAbs1.rptdesign' + parm ,  '_blank' );   
			}
 else if (chkreptype=="10")
			{
                     var parm = (p1+p2+p3+p4+p5+p7+p8);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDays_grey.rptdesign' + parm ,  '_blank' );   
			}

			else
{
                     var parm = (p1+p6+p4);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysVm.rptdesign' + parm ,  '_blank' );  
}
		   /*  else if (chkreptype==="2")       
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysAbs.rptdesign' + parm ,  '_blank' );         
		     else 
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptOutstandingAboveDaysWithoutAdvance.rptdesign' + parm ,  '_blank' );   */      
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
                height:550,
                width:600,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
                {  xtype: 'fieldset',
                title: 'Ledger',
                layout : 'vbox',
                border:true,
                height:80,
                width:550,
                layout      : 'absolute',
                x: 20,
                y: 270,
             items:[
                    {
                xtype   : 'radiogroup',
                border  :  false,
                x       : 20,
                y       : 10,
                columns :  5,
                items: [
                    {boxLabel: 'All', name: 'OptType', id:'optAll',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     gstType="A";			
                     }
                     }
                     }
                    },
                    {boxLabel: 'Selective', name: 'OptType',id:'optSelective', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstType="S";
		                       }
                       }
                       }
                    }]
                }
                   ]
               }
               ]
               },cmbgroup, 
        {  xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:false,
                height:40,
                width:300,
                layout      : 'absolute',
                x: 40,
                y: 5,
             items:[
		{
                xtype   : 'radiogroup',
                border  :  false,
                x       : 0,
                y       : 0,
                columns :  2,
                items: [
                    {boxLabel: 'All', name: 'Optas', id:'optall',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     lstgroup.getSelectionModel().selectAll();
                     }
                     }
                     }
                    },
                    {boxLabel: 'Selective', name: 'Optas',id:'optsel', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
			GroupDataStore.removeAll();
			grpval='';
			GroupDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task:"cmbcommongroupnew",
			     gincompcode:GinCompcode			
                           }
        });
                                            
                       }
                       }
                       }
                    }
		]}]},       
        
        lstgroup,
		{ xtype       : 'fieldset',
                title       : '',
                width       : 400,
                x           : 200,
                y           : 320,
                border      : false,
                labelWidth  : 65,
                items: [cmbledname]
                },
		
               {xtype: 'fieldset',
                title: 'Days',
                layout : 'hbox',
                border:true,
                height:70,
                width:150,
                layout      : 'absolute',
                x: 450,
                y: 20,
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
              /*  { xtype       : 'fieldset',
                title       : '',
                width       : 100,
                x           : 30,
                y           : 130,
                border      : false,
                labelWidth  : 75,
                items: [AsOnDate]
                },*/
		{  xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:true,
                height:70,
                width:380,
                layout      : 'absolute',
                x: 260,
                y: 210,
             items:[
		{
                xtype   : 'checkboxgroup',
                border  :  false,
                x       : 0,
                y       : 0,
                columns :  4,
                items: [
                    {boxLabel: 'Detail', name: 'OptOption', id:'optAdv',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     gstoption="AD";
                     }
                     }
                     }
                    },

   {boxLabel: 'Abstract1', name: 'OptOption',id:'optAbs1', inputValue: 6,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="AB1";
                       }
                       }
                       }
                    },
                    {boxLabel: 'Abstract2', name: 'OptOption',id:'optAbs', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="AB";
                       }
                       }
                       }
                    },


                    {boxLabel: 'Bank(Detail)', name: 'OptOption',id:'optbank', inputValue: 3,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="BK";
                       }
                       }
                       }
                    },
                  
{boxLabel: 'Bank(Abs)', name: 'OptOption',id:'optbankabs', inputValue: 5,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="BA";
                       }
                       }
                       }
                    }, 
		 {boxLabel: 'Meeting', name: 'OptOption',id:'optmeet', inputValue: 4,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="MT"; 
                       }
                       }
                       }
                    },
 {boxLabel: 'Grey', name: 'OptOption',id:'optgrey', inputValue: 10,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstoption="G";gstcomp="G";
                       }
                       }
                       }
                    }

		]}]},
                { xtype       : 'fieldset',
                title       : '',
                width       : 230,
                x           : 30,
                y           : 230,
                border      : false,
                labelWidth  : 75,
                items: [AsOnDate]
                },
		{  xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:true,
                height:40,
                width:300,
                layout      : 'absolute',
                x: 40,
                y: 380,
             items:[
		{
                xtype   : 'radiogroup',
                border  :  false,
                x       : 0,
                y       : 0,
                columns :  4,
                items: [
                    {boxLabel: 'Apparel Fabric', name: 'Optcomp', id:'optapp',inputValue: 1, checked: true,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                     gstcomp="A";
                     }
                     }
                     }
                    },
                    {boxLabel: 'Denim Fabric', name: 'Optcomp',id:'optden', inputValue: 2,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstcomp="D";
                       }
                       }
                       }
                    },

 {boxLabel: 'All', name: 'Optcomp',id:'optdenall', inputValue: 3,
                    listeners:{
                    'check':function(rb,checked){
                     if(checked==true){
                       gstcomp="B";
                       }
                       }
                       }
                    }
		]}]}
               ]
    });



     var RepOutStandingDaysWindow = new Ext.Window({
        height      : 600,
        width       : 650,
        items       : OutStandingDaysFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"lightblue"},
        y      : 90,
	listeners:
            {
                show:function(){

LedgerDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task:"ledbook",		     
			     gincompcode:GinCompcode
                           }

                     });



		GroupDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task:"cmbcommongroupnew",
			     gincompcode:GinCompcode
			
                           },
callback:function()
 	{
		lstgroup.getSelectionModel().selectAll();
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
