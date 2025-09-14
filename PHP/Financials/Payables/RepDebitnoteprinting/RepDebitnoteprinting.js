Ext.onReady(function(){
   Ext.QuickTips.init();
    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfinuser = localStorage.getItem('accuserid');
    var gstfincompcode = localStorage.getItem('acccompcode');
   var rpType="OP1";
  
   var optTypes = new Ext.form.FieldSet({
        xtype   : 'fieldset',
        title   : '',
        layout  : 'hbox',
        width   : 400,
        x       : 5,
        y       : -15,
        border  : false,
        items   : [
            {xtype  : 'radiogroup',
            columns : 3,
            id      : 'optType',
            items   : [
                {boxLabel: 'Stores', name: 'optTypes', id:'optTypedate', inputValue: 1, checked:true,
                listeners:{
                'check':function(rb,checked){
                if(checked===true){
                    rpType="OP1";
                }
                }
                }
                },
                {boxLabel: 'Accounts', name: 'optTypes', id:'optTypestk', inputValue: 2,
                 listeners:{
                'check':function(rb,checked){
                 if(checked===true){
                    rpType="OP2";
                 }
                }
                }
                },
  {boxLabel: 'Accounts(GST)', name: 'optTypes', id:'optTypestkgst', inputValue: 3,
                 listeners:{
                'check':function(rb,checked){
                 if(checked===true){
                    rpType="OP3";
                 }
                }
                }
                }
            ]
        }
        ]
   });    
   
   var txtFrom = new Ext.form.TextField({
        fieldLabel  : 'From ',
        id          : 'txtFrom',
        width       : 200,
        name        : 'from',
        style       : {textTransform:"uppercase"},
        listeners:{
        'change':function(){
          
        }
        }
   });
   var txtTo = new Ext.form.TextField({
        fieldLabel  : 'To ',
        id          : 'txtTo',
        width       : 200,
        name        : 'to',
        style       : {textTransform:"uppercase"},
        listeners:{
        'change':function(){
          
        }
        }
   });
   
   var DNPrintDetailFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Debit Note Print Details',
        header      : false,bodyStyle:{"background-color":"#3399CC"},
        width       : 438,
        height      : 280,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'DNPrintDetailFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
		{
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png'                                  
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                            var form = DNPrintDetailFormPanel.getForm();
                            if(txtFrom.getRawValue()==0)
                            {
                                Ext.MessageBox.alert("Alert", "Enter From DN Number");
                            }
                            else if(txtTo.getRawValue()==0)
                            {
                                Ext.MessageBox.alert("Alert", "Enter To DN Number");
                            }
                            /* if (cmbCount.getValue()==0 & rpCount=="CS"){
                                Ext.MessageBox.alert("Alert","Select Count Name...");
                            }*/
                            else {
                            if (form.isValid())  {
                                var finid=ginfinid; 
                                var compcode=gstfincompcode;
                                
                                var d1 = txtFrom.getRawValue();
                                var d2 = txtTo.getRawValue();
                                var d3 = 'DN';
                                                                
                                var p1 = "&dbcrno1="+encodeURIComponent(d1);
                                var p2 = "&dbcrno2="+encodeURIComponent(d2);
                                var p3 = "&finyear="+encodeURIComponent(finid);
                                var p4 = "&compcode="+encodeURIComponent(compcode);
                                var p5 = "&dbcrtype="+encodeURIComponent(d3);
                                
                                var test = (p1+p2+p3+p4+p5);
                                
                                if (rpType=="OP1") {
                                    window.open('http://10.0.0.251:8080/birt/frameset?__report=accounts/RepAccDebitnoteWP.rptdesign' + test,  '_blank' );                                                                            
                                }
                                else if (rpType=="OP3") {
                                    window.open('http://10.0.0.251:8080/birt/frameset?__report=accounts/acc_rep_debitnoteprinting_detail.rptdesign' + test,  '_blank' );                                                                            
                                }
else {
                                    window.open('http://10.0.0.251:8080/birt/frameset?__report=accounts/acc_rep_debitnoteprinting_ac.rptdesign' + test,  '_blank' );                                                                            
                                }
                            }
                            }
                         }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            DNPrintDetailWindow.hide();
                        }
                    }
                }]
        },
        items: [
            
            {   xtype       : 'fieldset',
                title       : 'option',
                layout      : 'hbox',
                labelWidth  : 20,
                height      : 50,
                width       : 420,
                x           : 10,
                y           : 10,
                border      : true,
                layout      : 'absolute',
                items: [optTypes]
              },
              { 
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 120,
                width       : 350,
                x           : 10,
                y           : 70,
                defaultType : 'textfield',
                border      : false,
                items: [txtFrom]
               },
              { 
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 120,
                width       : 350,
                x           : 10,
                y           : 110,
                defaultType : 'textfield',
                border      : false,
                items: [txtTo]
               }                       
            
        ]
    });
    
        
    var DNPrintDetailWindow = new Ext.Window({
	height      : 300,
        width       : 450,
        y           : 180,
        title       : 'Debit Note Print Details',bodyStyle:{"background-color":"#3399CC"},
        items       : DNPrintDetailFormPanel,
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false
    });
    DNPrintDetailWindow.show();  
});
