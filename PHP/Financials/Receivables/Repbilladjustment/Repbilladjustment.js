Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('gincompcode');
    var gstfinyear = localStorage.getItem('gstyear');
    var ginfinid = localStorage.getItem('ginfinid');
    
    
    
    var LoadledgernameDatastore = new Ext.data.Store({
      id: 'LoadledgernameDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials2A.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledgername"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_code','led_name' 
      ]),
    });

    var fmdate = new Ext.form.DateField({
        name: 'fmdate',
        id: 'fmdate',
        fieldLabel: 'From Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var todate = new Ext.form.DateField({
        name: 'todate',
        id: 'todate',
        fieldLabel: 'To Date',
        format: 'Y-m-d',
        value: new Date()

    });
    
    
var sidno1='';
var sm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(sm1) {
var selected_rows = FlxLedgerdetails.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.id);
}
}
}
});

var fm1 = Ext.form;
var FlxLedgerdetails = new Ext.grid.EditorGridPanel({
    frame: false,
    id : FlxLedgerdetails,
    hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 110,
    width: 450,
    x: 10,
    y: 225,
    selModel: sm1,
    columns: [sm1,
        {header: "Party", dataIndex: 'led_name',sortable:true,width:420,align:'left'},
        {header: "Partycode", dataIndex: 'led_code',sortable:true,width:70,align:'left',hidden:true}
    ],
    store   : LoadledgernameDatastore
});  

    var BillAdjustmentFormpannel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Bill Adjustment', bodyStyle: {"background-color": "WHITE"},
        width: 660,
        height: 500,
        x: 25,
        y: 25,
        frame: false,
        id: 'fp',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            items: [
                {
                    text: 'View',
                    style: 'text-align:center;', id: 'viewid1',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                        	alert("sarathi");
                            var fdate = fmdate.getRawValue();
                            var tdate = todate.getRawValue();
                            
                            
                            var ledcode = "";
			    var sel = FlxLedgerdetails.getSelectionModel().getSelections();
		          // Ext.Msg.alert(sel);
			    for (var t=0; t<sel.length; t++)
			    {
				if (ledcode === "")
				      ledcode =  sel[t].data.led_code;
				else
				      ledcode = ledcode + ","  + sel[t].data.led_code;
			    }
			    if (ledcode=="")
			    ledcode='%';
                           
                            
                                var p3 = "&compcode="+encodeURIComponent(ledcode);
                                var p4 = "&finid="+encodeURIComponent(ginfinid);
                                var p5 = "&asondate="+encodeURIComponent(fdate);

                                var param = (p3+p4+p5);
                                
                               // window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccReceivables.rptdesign' + param,  '_blank' );                            
                                 window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepARAgewise.rptdesign' + param,  '_blank' );                

                        }
                    }
                }, '-',
                {
                 //   text: 'Note:Debit Note/Credit Note/Bank Payment/Bank Receipt/All Voucher wise Report Combine Input Result',
                    style: 'text-align:center;',
                     height: 40,
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                },
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                }
            ]
        },
        items: [
           
           
            {
                xtype: 'fieldset',
                title: 'Date Selection',
                layout      : 'absolute',
                height: 60,
                width: 450,
                x: 10, border: true,
                y: 10,
                items: [
                   {	
                   	xtype: 'fieldset',
		        title: '',
		        width: 230,
		        x: 0,
		        y: -10,
		        border: false,
		        labelWidth: 60,
		        items: [fmdate]
            	   },
            	   {	
                   	xtype: 'fieldset',
		        title: '',
		        width: 230,
		        x: 230,
		        y: -10,
		        border: false,
		        labelWidth: 70,
		        items: [todate]
            	   },
                ]
            },
             {
                xtype: 'fieldset',
                title: 'Bill Type',
                layout      : 'absolute',
                height: 50,
                width: 450,
                x: 10, border: true,
                y: 70,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 50,
                        y: -4,
                        columns: 3,
                        items: [
                            {boxLabel: 'Sales Bill', name: 'billtype', inputValue: '1',  id: 'optsalesbill',checked:true,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               
		         	}
               		}}},
                            {boxLabel: 'Purchase Bill', name: 'billtype', inputValue: '2', id: 'optpurbill',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               
		         	}
               		}}},
               		{boxLabel: 'Others', name: 'billtype', inputValue: '2', id: 'optothers',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               
		         	}
               		}}}
                            
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Adjust Type',
                layout: 'absolute',
                height: 50,
                width: 450,
                x: 10, border: true,
                y: 120,
                items: [
                         {
                        xtype: 'radiogroup',
                        border: false,
                        x: 50,
                        y: -4,
                        columns: 3,
                        items: [
                            {boxLabel: 'All', name: 'adjtype', inputValue: '1',  id: 'optall',checked:true,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               
		         	}
               		}}},
                            {boxLabel: 'Through Bill Adjustment', name: 'adjtype', inputValue: '2', id: 'optthrbilladj',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		            
		         	}
               		}}}
                            
                        ]
                    }
                ]
            },
              {
                xtype: 'fieldset',
                title: 'Options',
                layout: 'absolute',
                height: 50,
                width: 450,
                x: 10, border: true,
                y: 170,
                items: [
                         {
                        xtype: 'radiogroup',
                        border: false,
                        x: 50,
                        y: -4,
                        columns: 3,
                        items: [
                            {boxLabel: 'All', name: 'repoption', inputValue: '1',  id: 'optionall',checked:true,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               FlxLedgerdetails.disable(); 
		         	}
               		}}},
                            {boxLabel: 'Select', name: 'repoption', inputValue: '2', id: 'optionselect',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               FlxLedgerdetails.enable(); 
		         	}
               		}}}
                            
                        ]
                    }
                ]
            },FlxLedgerdetails
        ]
    });

    var frmwindow = new Ext.Window({
        height: 425,
        width: 480,
        bodyStyle: 'padding: 10px',
        bodyStyle:{"background-color": "#3399CC"},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        y: 70,
        items: BillAdjustmentFormpannel,
        listeners:
                {
                    show: function () {
                    FlxLedgerdetails.disable();
                        if (gstfinyear.substring(5, 9) === '2018') {
                            fmdate.setRawValue(gstfinyear.substring(5, 9) - 1 + '-07' + '-01');
                            todate.setRawValue(gstfinyear.substring(5, 9) + '-03' + '-31');
                        }
                           // Ext.getCmp('comstore').setVisible(true);
                           
                       LoadledgernameDatastore.load({
                       url: '/SHVPM/Financials/clsFinancials2A.php',
                       params:
                          {
                            task:"loadledgername"
                           }
                     });
                           
                        
                    }
                }
    });frmwindow.show();
});

