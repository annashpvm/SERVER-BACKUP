Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
	var pono = '';
var invprttype = "1";
 var loadpreprint = new Ext.data.Store({
      id: 'loadpreprint',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Fuel/ClsFuRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadrepno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'seqno','repno'

      ]),
    });


var optinvprttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
//    width:250,
//    height:50,
    x:500,
    y:20,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optinvprttype',
        items: [
            {boxLabel: 'Original' , name: 'optinvprttype', id:'optinvtype1', inputValue: 1,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "ORIGINAL FOR BUYER";
                         invprttype = "1";

                     }
                 }
               }
            },
            {boxLabel: 'Duplicate' , name: 'optinvprttype', id:'optinvtype2', inputValue: 2,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "DUPLICATE FOR TRANSPORTER";

                         invprttype = "2";

                     }
                 }
               }
            },
            {boxLabel: 'Extra Copy' , name: 'optinvprttype', id:'optinvtype3', inputValue: 3,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "EXTRA COPY";
                         invprttype = "3";

                     }
                 }
               }
            },
            {boxLabel: 'Triplicate' , name: 'optinvprttype', id:'optinvtype4', inputValue: 4,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "EXTRA COPY";
                         invprttype = "4";

                     }
                 }
               }
            },            
       ]
      }   

    ]



});


 var cmbReport = new Ext.form.ComboBox({
        fieldLabel      : 'Report Name',
        width           : 200,
        displayField    : 'field2',
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbReport',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select Report Type--',
        mode            : 'local',
        store           : [['1','GRN - Fuel'],['2','PURCHASE ORDER'],['3','ISSUE SLIP'],['4','PURCHASE ORDER - Annexure']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false, 
        editable        : false,
        allowblank      : false,
	listeners:{
               select : function(){
			if (cmbReport.getValue() == "1") {
				cmbstrepno.label.update('GRN No');
				//cmbstrepno.setFieldLabel('GRN1 No');
				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Fuel/ClsFuRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "GRN"

					}

				});

			}
			else if (cmbReport.getValue() == "2") {
				cmbstrepno.label.update('PO No');
				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Fuel/ClsFuRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "PO"

					}

				});

			}
			else if (cmbReport.getValue() == "3") {
				cmbstrepno.label.update('Issue No');
				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Fuel/ClsFuRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname  : "ISS"

					}

				});

			}
			else if (cmbReport.getValue() == "5") {
				cmbstrepno.label.update('Sale Note');
				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Fuel/ClsFuRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname  : "SN"

					}

				});

			}
			
		}
	}
   });

 var cmbstrepno = new Ext.form.ComboBox({
        fieldLabel      : 'No.',
        width           : 100,
        displayField    : 'repno',
        valueField      : 'seqno',
        hiddenName      : '',
        id              : 'cmbstrepno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadpreprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
   });

 var cmbedrepno = new Ext.form.ComboBox({
        fieldLabel      : 'To.',
        width           : 100,
        displayField    : 'repno',
        valueField      : 'seqno',
        hiddenName      : '',
        id              : 'cmbedrepno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadpreprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
   });
 
   
   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #F1F5EA;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

				if (cmbReport.getValue()==0)
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}
				else if ((cmbstrepno.getValue()==="" && cmbstrepno.getValue()==0) ) {

					Ext.MessageBox.alert("Alert", "Select " + Ext.getCmp('cmbstrepno').fieldLabel );
				}
				else
				{
					var pono= Ext.getCmp('cmbstrepno').getRawValue();
					
					var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
					var p2 = "&finid=" + encodeURIComponent(GinFinid);
					if(cmbReport.getValue() == "1"){
				

						var d2='M';

						//var p3 = "&ordfrom=" + encodeURIComponent(d2);
						var p4 = "&grnno=" + encodeURIComponent(pono);
						
						var param = (p1+p2+p4) ;                         
						
window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
					}
					else if(cmbReport.getValue() == "2"){
			                 	var pono= Ext.getCmp('cmbstrepno').getRawValue();
						var d2='M';
						var p3 = "&ordno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelPurchaseOrder.rptdesign&__format=pdf&' + param); 
					}
					else if(cmbReport.getValue() == "5"){
			                 	var pono= Ext.getCmp('cmbstrepno').getRawValue();
                                                var p3 = "&prntdisp=" + encodeURIComponent(invprttype);
						var p4 = "&invno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3+p4) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelSaleNote.rptdesign&__format=pdf&' + param); 
					}
		                   
		                }
			}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
ReppreprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 200,
                width   : 780,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 30,

                items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 450,
				x           : 50,
				y           : 10,
				border      : false,
				items: [cmbReport]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 200,
				x           : 50,
				y           : 80,
				border      : false,
				items: [cmbstrepno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 200,
				x           : 280,
				y           : 80,
				border      : false,
				items: [cmbedrepno]
			},
optinvprttype,
					
                ]

            },
            
        ],
    });
    
   
    var ReppreprintWindow = new Ext.Window({
	height      : 350,
        width       : 1300,
	//x	    : 10,
        y           : 35,
        title       : 'Fuel PrePrinted Reports',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
			/* loadpreprint.load({
				 url: '/SHVPM/Fuel/ClsFuRep.php', 
		        	 params:
		       		 {
		         	 task:"loadgrnno",
				 finid:GinFinid,
				 compcode: GinCompcode

		        	 }
			 });	*/	
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
