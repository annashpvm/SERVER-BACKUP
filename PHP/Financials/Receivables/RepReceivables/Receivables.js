Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('gincompcode');
    var gstfinyear = localStorage.getItem('gstyear');
    var ginfinid = localStorage.getItem('ginfinid');
    var ptytype ='A';
    
    
    var LoadCompanyDatastore = new Ext.data.Store({
      id: 'LoadCGSTLedgerDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials2A.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcompany"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'company_code','company_id'
      ]),
    });
    
        
    var LoadpartyDatastore = new Ext.data.Store({
      id: 'LoadpartyDatastore',
      autoLoad : false,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials2A.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadparty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'partyid','partyname'
      ]),
    });

    var fmdate = new Ext.form.DateField({
        name: 'fmdate',
        id: 'fmdate',
        fieldLabel: 'As On Date',
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
var selected_rows = FlxCompany.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     sidno1=(selected_rows[i].data.id);
}
}
}
});

var pidno1='';
var pm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(pm1) {
var selected_rows = Flxparty.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     pidno1=(selected_rows[i].data.partyid);
}
}
}
});

var fm1 = Ext.form;
var FlxCompany = new Ext.grid.EditorGridPanel({
    frame: false,
    id : FlxCompany,
    hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 110,
    width: 100,
    x: 327,
    y: 0,
    selModel: sm1,
    columns: [sm1,
        {header: "Company", dataIndex: 'company_id',sortable:true,width:70,align:'left'},
        {header: "Companycode", dataIndex: 'company_code',sortable:true,width:70,align:'left',hidden:true}
    ],
    store   : LoadCompanyDatastore
});  

var Flxparty = new Ext.grid.EditorGridPanel({
    frame: false,
    id : Flxparty,
    hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 230,
    width: 450,
    x: 10,
    y: 263,
    selModel: pm1,
    columns: [pm1,
        {header: "partyid", dataIndex: 'partyid',sortable:true,width:70,align:'left',hidden:true},
        {header: "Party Name", dataIndex: 'partyname',sortable:true,width:420,align:'left'}
    ],
    store   : LoadpartyDatastore
}); 

    var ReceivablesFormPannel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Receivables', bodyStyle: {"background-color": "WHITE"},
        width: 660,
        height: 580,
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
                            var fdate = fmdate.getRawValue();
                            var tdate = todate.getRawValue();
                            
                            
                           var compcode = "";
			    var sel = FlxCompany.getSelectionModel().getSelections();
			    for (var t=0; t<sel.length; t++)
			    {
				if (compcode === "")
				      compcode =  sel[t].data.company_code;
				else
				      compcode = compcode + ","  + sel[t].data.company_code;
			    }
			    if (compcode=="")
			    compcode=GinCompcode;
                          
                           
                           var party_code = "";
			    var selp = Flxparty.getSelectionModel().getSelections();
			    for (var p=0; p<selp.length; p++)
			    {
				if (party_code === "")
				      party_code =  selp[p].data.partyid;
				else
				      party_code = party_code + ","  + selp[p].data.partyid;
			    }
			    if (party_code=="")
			    party_code='%';
                            
                            
                            
                                var p1 = "&compcode="+encodeURIComponent(compcode);
                                var p2 = "&finid="+encodeURIComponent(ginfinid);
                                var p3 = "&asondate="+encodeURIComponent(fdate);
                                var p4 = "&ptytype="+encodeURIComponent(ptytype);
				 var p5 = "&ptycode="+encodeURIComponent(party_code);
				

                                var param = (p1+p2+p3+p4+p5);
                                
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
            
            {xtype: 'fieldset',
                title: '',
                width: 300,
                x: 320,
                y: 10,
                border: false,
                labelWidth: 65,
               // items: [todate]
            },
             {
                xtype: 'fieldset',
                title: '',
                layout      : 'absolute',
                height: 135,
                width: 450,
                x: 10, border: true,
                y: 10,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 0,
                        y: 0,
                        columns: 3,
                        items: [
                            {boxLabel: 'Single', name: 'compselect', inputValue: '1',  id: 'single',checked:true,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               FlxCompany.disable(); 
		         	}
               		}}},
                            {boxLabel: 'Group', name: 'compselect', inputValue: '2', id: 'group',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
		               FlxCompany.enable(); 
		         	}
               		}}},
                            
                        ]
                    },FlxCompany
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 50,
                width: 450,
                x: 10, border: true,
                y: 150,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 3,
                        items: [
                            {boxLabel: 'Agent-Party-Billwise', name: 'options', inputValue: '1',  id: 'agentparty',checked:true},
                            //{boxLabel: 'Yarn', name: 'options', inputValue: '2', id: 'yarnpur'},
                            
                        ]
                    }
                ]
            },
             {
                xtype: 'fieldset',
                title: 'Report Type',
                layout  : 'absolute',
                height: 60,
                width: 450,
                x: 10, border: true,
                y: 200,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 0,
                        y: 0,
                        columns: 6,
                        items: [
                            {boxLabel: 'All', name: 'reptype', inputValue: '1',  id: 'reptypeall',checked:true,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
                		ptytype = 'A';
		               Flxparty.disable(); 
		                   LoadpartyDatastore.load({
                       url: '/SHVPM/Financials/clsFinancials2A.php',
                       params:
                          {
                            task:"loadparty",
                            partytype:ptytype
                           }
                     });
		         	}
               		}}},
                            {boxLabel: 'Agent', name: 'reptype', inputValue: '1',  id: 'repagentwise',checked:false,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
                		ptytype = 'G';
		               Flxparty.enable(); 
		                   LoadpartyDatastore.load({
                       	   url: '/SHVPM/Financials/clsFinancials2A.php',
                                 params:
                                 {
                                 task:"loadparty",
                                 partytype:ptytype
                                 }
                     });
		         	}
               		}}},
                   	     {boxLabel: 'Party', name: 'reptype', inputValue: '1',  id: 'reppartywise',checked:false,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
                		ptytype = 'P';
		               Flxparty.enable(); 
		                   LoadpartyDatastore.load({
                                  url: '/SHVPM/Financials/clsFinancials2A.php',
                                  params:
                                 {
                                 task:"loadparty",
                                 partytype:ptytype
                                }
                     });
		         	}
               		}}},
                            
                        ]
                    },
                    {	
                    xtype: 'fieldset',
                    title: '',
                    width: 230,
                    x: 230,
                    y: -10,
                    border: false,
                    labelWidth: 70,
                    items: [fmdate]
            	   },
                ]
            },Flxparty
        ]
    });

    var frmwindow = new Ext.Window({
        height: 580,
        width: 480,
        bodyStyle: 'padding: 10px',
        bodyStyle:{"background-color": ""},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        y: 70,
        items: ReceivablesFormPannel,
        listeners:
                {
                    show: function () {
                    FlxCompany.disable();
                    Flxparty.disable();
                    
                        if (gstfinyear.substring(5, 9) === '2018') {
                            fmdate.setRawValue(gstfinyear.substring(5, 9) - 1 + '-07' + '-01');
                            todate.setRawValue(gstfinyear.substring(5, 9) + '-03' + '-31');
                        }
                           // Ext.getCmp('comstore').setVisible(true);
                           
                       LoadCompanyDatastore.load({
                       url: '/SHVPM/Financials/clsFinancials2A.php',
                       params:
                          {
                            task:"loadcompany"
                           }
                     });
                   
                       LoadpartyDatastore.load({
                       url: '/SHVPM/Financials/clsFinancials2A.php',
                       params:
                          {
                            task:"loadparty",
                            partytype:ptytype
                           }
                     });
                           
                        
                    }
                }
    });
    frmwindow.show();
});

