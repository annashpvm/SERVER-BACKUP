Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('gincompcode');
    var gstfinyear = localStorage.getItem('gstyear');
    var ginfinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

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
    

   var printtype='PDF';

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
               {boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});
    
    
    
      var LoadpartyDatastore = new Ext.data.Store({
      id: 'LoadpartyDatastore',
      autoLoad : false,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpayableparty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'partyid','partyname'
      ]),
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

 var Flxparty = new Ext.grid.EditorGridPanel({
    frame: false,
    id : Flxparty,
    hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 315,
    width: 630,
    x: 10,
    y: 165,
    selModel: pm1,
    columns: [pm1,
        {header: "partyid", dataIndex: 'partyid',sortable:true,width:70,align:'left',hidden:true},
        {header: "Party Name", dataIndex: 'partyname',sortable:true,width:420,align:'left'}
    ],
    store   : LoadpartyDatastore
}); 


 var Rpttype="AP - Register";
 var optionptytype = 'A';
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:48,
    x:10,
    y:60,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optRpttype',
        items: [
		{boxLabel: 'AP - Register', name: 'optRpttype', id:'optAPregister', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="AP - Register";

					}
				}
			}
		},
		{boxLabel: 'AP - Agewise Analysis', name: 'optRpttype', id:'optAPageanalysis', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="AP - Agewise Analysis";

					}
				}
			}
		}
            
        ],
    }



    ]
});
 

    var fp = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: '', bodyStyle: {"background-color": "WHITE"},
        width: 660,
        height: 550,
        x: 25,
        y: 10,
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
                        
                        
                        
                            var fdate = fmdate.getRawValue();
                            var tdate = todate.getRawValue();
                            
                                var p1 = "&compcode="+encodeURIComponent(GinCompcode);
                                var p2 = "&fromdate="+encodeURIComponent(fdate);
                                var p3 = "&reptype="+encodeURIComponent(optionptytype);
                                var p4 = "&partycode="+encodeURIComponent(party_code);

                                var param = (p1+p2+p3+p4);

if (Rpttype == "AP - Register")
{     
             if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayables.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayables.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayables.rptdesign' + param, '_blank');
                             
       /*  if (printtype == "PDF")      
                                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayables.rptdesign&__format=pdf&' + param,  '_blank' );     
         else
                                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayables.rptdesign' + param,  '_blank' ); */    

}
else
{
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayablesAgewise.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayablesAgewise.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayablesAgewise.rptdesign' + param, '_blank');
          
      /*   if (printtype == "PDF")    
                                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayablesAgewise.rptdesign&__format=pdf&' + param,  '_blank' );
         else
                                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccPayablesAgewise.rptdesign' + param,  '_blank' );*/
 
}                       

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
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 220,
			layout  : 'absolute',
			x       : 170,
			y       : 5,
			items:[optprinttype],
		},

optRpttype,
            {xtype: 'fieldset',
                title: '',
                width: 270,
                x: 370,
                y: 60,
                border: true,
                labelWidth: 70,
                items: [fmdate]
            },
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
                layout: 'hbox',
                height: 50,
                width: 630,
                x: 10, border: true,
                y: 110,
                items: [
		            {
				xtype: 'radiogroup',
				columns: 3,
				rows :1 ,
				id: 'optionpartytype',
				items: [
					{
						boxLabel: 'All', name: 'optptytype', id:'optall', inputValue: 1,checked:true,
						listeners:{
						check:function(rb,checked){
							if(checked==true){
								Flxparty.disable();
								optionptytype="A";
								LoadpartyDatastore.load({
								       url: '/SHVPM/Accounts/clsAccounts.php',
								       params:
									  {
									    task:"loadpayableparty",
									    partytype:optionptytype
									   }
								     }); 
							}}}
					},
					{
						boxLabel: 'Partywise', name: 'optptytype', id:'optparty', inputValue: 1,checked:false,
						listeners:{
						check:function(rb,checked){
							if(checked==true){
								Flxparty.enable();
								optionptytype="P";
								LoadpartyDatastore.load({
								       url: '/SHVPM/Accounts/clsAccounts.php',
								       params:
									  {
									    task:"loadpayableparty",
									    partytype:optionptytype
									   }
								     }); 
							}}}
					},
					{
						boxLabel: 'Groupwise', name: 'optptytype', id:'optgroup', inputValue: 1,checked:false,
						listeners:{
						check:function(rb,checked){
							if(checked==true){
								Flxparty.enable();
								optionptytype="G";
								LoadpartyDatastore.load({
								       url: '/SHVPM/Accounts/clsAccounts.php',
								       params:
									  {
									    task:"loadpayableparty",
									    partytype:optionptytype
									   }
								     }); 
							}}}
					},
					
					],
	    		    }
                ]
            },Flxparty
        ]
    });

    var frmwindow = new Ext.Window({
        height: 550,
        width: 660,
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
        items: fp,


onEsc:function(){
},
        listeners:
                {
                    show: function () {
                       Flxparty.disable();
                        if (gstfinyear.substring(5, 9) === '2018') {
                            fmdate.setRawValue(gstfinyear.substring(5, 9) - 1 + '-07' + '-01');
                            todate.setRawValue(gstfinyear.substring(5, 9) + '-03' + '-31');
                        }
                       LoadpartyDatastore.load({
                       url: '/SHVPM/Accounts/clsAccounts.php',
                       params:
                          {
                            task:"loadpayableparty",
                            partytype:optionptytype
                           }
                     }); 
                        
                    }
                }
    }).show();
});

