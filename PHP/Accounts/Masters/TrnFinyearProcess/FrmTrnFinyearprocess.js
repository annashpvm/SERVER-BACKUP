Ext.onReady(function(){
    Ext.QuickTips.init();
    var ginfinid =localStorage.getItem('accfinid');
   var gstfinyear = localStorage.getItem('accfinyear');
   var gstfinuser = localStorage.getItem('accuserid');
   var fincompcode =localStorage.getItem('acccompcode');
    
    var FinyearprocessDataStore = new Ext.data.Store({
      id: 'FinyearprocessDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/General/TnFinyearProcess/Finclass.php',        // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "finprocess"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        
      ])
    });

 var FDate = new Ext.form.DateField({
        name: 'FDate',
        id: 'FDate',
        disabled:  'true',
//readOnly:true,
        fieldLabel: 'From',
        format     : 'Y-m-d',
        value      : new Date(),

    });

var TDate = new Ext.form.DateField({
        name: 'TDate',
        id: 'TDate',
        fieldLabel: 'To',
        disabled:  'true',
        format     : 'Y-m-d',
        value      : new Date(),
	listeners:{
select:function(){
if(FDate.getRawValue()>TDate.getRawValue()){
Ext.Msg.alert("Alert","Date Select Properly");
}
}
}

    });

var RepFinyearprocessFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Finyear Process',
        width       : 530,
        height      : 320,
     bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'RepFinyearprocessFormPanel',
        method      : 'post',
        layout      : 'absolute',

        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',icon: '/Pictures/refresh.png',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'Process',
                    style  : 'text-align:center;',icon: '/Pictures/view.png',
                    tooltip: 'Process Details...', height: 40,
                     listeners:{
                        click: function () {
                        var fin_d1;
                        var fin_d2;
			if (ginfinid=="23")
			{
			   fin_d1 = "2016-04-01";
			   fin_d2 = "2017-03-31";
			}
			else if (ginfinid=="24")
			{
			   fin_d1 = "2017-04-01";
			   fin_d2 = "2018-03-31";
			}

			if (ginfinid=="24")
			{
		                RepFinyearprocessFormPanel.getForm().submit({
		                url: '/SHVPM/Financials/General/TnFinyearProcess/FinYearProcessSave.php',
		                method:'POST',
		                params:
		                {
		                  finid:ginfinid,
		                  compcode:fincompcode,
		                  d1:Ext.util.Format.date(fin_d1, 'Y-m-d'),
		                  d2:Ext.util.Format.date(fin_d2, 'Y-m-d')
		                 },
		                success:function(){
		                    Ext.MessageBox.alert("Alert","Fin Year Process Completed Successfully");
		                    RepFinyearprocessFormPanel.getForm().reset();

		                 },
		                failure:function(){
		                    Ext.MessageBox.alert("Alert","Fin Year Process Not Completed");
		                    RepFinyearprocessFormPanel.getForm().reset();
		                }
		              });  
			}     
   
		        
                    }
                   
                   }

                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            RepFinyearprocessWindow.hide();
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
                height:75,
                width:450,
                layout      : 'absolute',
                x: 30,
                y: 10,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                width       : 250,
                x           : 40,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [FDate]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 250,
                x           :230,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [TDate]
                }
                ]
              }
]
               });



     var RepFinyearprocessWindow = new Ext.Window({
        height      : 250,
        width       : 530,
        items       : RepFinyearprocessFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#3399CC"},

       
        y      : 80,
listeners:{
show:function(){
var datenew=new Date();
FDate.setValue('2016-04-01');
}
}


    });
      RepFinyearprocessWindow.show();
});    
    
