Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('accfinid');
  var GinCompcode = localStorage.getItem('acccompcode');

   var dtpFromdate = new Ext.form.DateField({
        fieldLabel : '',
        id         : 'dtpFromdate',
        name       : 'pack_date',
        format     : 'Y-m-d',
        value      : new Date()
   });

   var dtpTodate = new Ext.form.DateField({
        fieldLabel : '',
        id         : 'dtpTodate',
        name       : 'bl_date',
        format     : 'Y-m-d',
        value      : new Date()
   });

       
    var rptReptype="RT1";
  
    var optRepTypes = new Ext.form.FieldSet({
        xtype   : 'fieldset',
        title   : '',
        layout  : 'hbox',
        height  : 40,
        width   : 400,
        x       : 10,
        y       : 185,
        border  : true,
        layout  : 'absolute',        
        items   : [
            {xtype  : 'radiogroup',
            columns : 2,
            id      : 'optRepType',
            items   : [
                {boxLabel: 'Invoiced', name: 'optRepTypes', id:'optDetails', inputValue: 1, checked:true,
                listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                        rptReptype="RT1";
                    }
                }
                }
                },
                {boxLabel: 'Not Invoiced', name: 'optRepTypes', id:'optAbstract', inputValue: 2,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptReptype="RT2";
                   }
                }
                }
                }
            ]
        }
        ]
   });    

    var rptRepSel="PS";
  
    var optRepSel = new Ext.form.FieldSet({
        xtype   : 'fieldset',
        title   : '',
        layout  : 'hbox',
        height  : 95,
        width   : 400,
        x       : 10,
        y       : 85,
        border  : true,
        layout  : 'absolute',        
        items   : [
            {xtype  : 'radiogroup',
            columns : 3,
            id      : 'optRepSelect',
            items   : [
                {boxLabel: 'Comm.Stores', name: 'optRepSel', id:'optComm', inputValue: 1, checked:true,
                listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                        rptRepSel="PS";
                    }
                }
                }
                },
                {boxLabel: 'Yarn', name: 'optRepSel', id:'optYarn', inputValue: 2,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepSel="PY";
                   }
                }
                }
                },
                {boxLabel: 'Hometex Yarn', name: 'optRepSel', id:'optYarnhome', inputValue: 7,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepSel="HY";
                   }
                }
                }
                },
                {boxLabel: 'Cotton', name: 'optRepSel', id:'optCotton', inputValue: 3,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepSel="PC";
                   }
                }
                }
                },
                {boxLabel: 'IFD Stores', name: 'optRepSel', id:'optIfdstores', inputValue: 4,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepSel="PM";
                   }
                }
                }
                },                        
                {boxLabel: 'Fabric', name: 'optRepSel', id:'optBondedwh', inputValue: 5,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepSel="PF";
                   }
                }
                }
                },{boxLabel: 'PP', name: 'optRepSel', id:'optBpp', inputValue: 6,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepSel="PP";
                   }
                }
                }
                },{boxLabel: 'Chemical', name: 'optRepSel', id:'optChemical', inputValue: 6,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepSel="PE";
                   }
                }
                }
                },

            ]
        }
        ]
   });    
    var rptRepCat="C1";
  
    var optRepCat = new Ext.form.FieldSet({
        xtype   : 'fieldset',
        title   : '',
        layout  : 'hbox',
        height  : 40,
        width   : 400,
        x       : 10,
        y       : 230,
        border  : true,
        layout  : 'absolute',        
        items   : [
            {xtype  : 'radiogroup',
            columns : 4,
            id      : 'optRepCats',
            items   : [
                {boxLabel: 'Date wise', name: 'optRepCat', id:'optCatdate', inputValue: 1, checked:true,
                listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                        rptRepCat="C1";
                    }
                }
                }
                },
                {boxLabel: 'No wise', name: 'optRepCat', id:'optNowise', inputValue: 2,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepCat="C2";
                   }
                }
                }
                },
                {boxLabel: 'Mill wise', name: 'optRepCat', id:'optMillwise', inputValue: 3,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepCat="C3";
                   }
                }
                }
                },
                {boxLabel: 'Party wise', name: 'optRepCat', id:'optPartywise', inputValue: 4,
                 listeners:{
                'check':function(rb,checked){
                    if(checked===true){
                       rptRepCat="C4";
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
        width       : 100,
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
        width       : 100,
        name        : 'to',
        style       : {textTransform:"uppercase"},
        listeners:{
        'change':function(){
          
        }
        }
   });
   
   var PurchaseregisternowiseFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Purchase Register No wise',
        header      : false,
        width       : 827,
        height      : 510,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'PurchaseregisternowiseFormPanel',
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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                            var form = PurchaseregisternowiseFormPanel.getForm();
//                            if(txtFrom.getRawValue()==0 | txtTo.getRawValue()==0){
//                                Ext.MessageBox.alert("Alert", "Enter From and To Number");
//                            }else 
			if (form.isValid())  {
                                var fdate=Ext.getCmp('dtpFromdate').value;
                                var tdate=Ext.getCmp('dtpTodate').value;
                                var d1 =  fdate + " 00:00:00.000";
                                var d2 =  tdate + " 00:00:00.000";
                                var d3 = txtFrom.getRawValue();
                                var d4 = txtTo.getRawValue();
                                
                                if(rptRepSel=="PS" || rptRepSel=="PF" || rptRepSel=="PM" || rptRepSel=="PP" || rptRepSel=="PE"){
                                    //CommStores / Fabric / IFD Stores
                                    if(rptRepCat!=="C1" && rptRepCat!=="C2" && rptRepCat!=="C4"){
                                        Ext.MessageBox.alert("Alert", "Select Date wise/ No wise/ Partywise...");
                                    }else{
                                        //Date wise | Party wise | No wise
                                        if (rptRepCat=="C1" || rptRepCat=="C4"){
                                            var d5 = 1;
        	                        var d3 = 1;
	                                var d4 = 10000;
                                        }else if(rptRepCat=="C2"){
                                            var d5 = 2;
                                        }
                                        var p1 = "&from_date="+encodeURIComponent(d1);
                                        var p2 = "&to_date="+encodeURIComponent(d2);
                                        var p3 = "&vou_type="+encodeURIComponent(rptRepSel);
                                        var p4 = "&from_no="+encodeURIComponent(d3);
                                        var p5 = "&to_no="+encodeURIComponent(d4);
                                        var p6 = "&comp_code="+encodeURIComponent(GinCompcode);
                                        var p7 = "&flag="+encodeURIComponent(d5);
                                        var p8 = "&fin_id="+encodeURIComponent(GinFinid);
                                        var test = (p1+p2+p3+p4+p5+p6+p7+p8);
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_rep_purchaseregister_new.rptdesign' + test,  '_blank' );
                                    }
                                }else if(rptRepSel=="PC"){
                                    //Cotton
                         
                                    if(txtFrom.getRawValue()==0 || txtTo.getRawValue()==0){
                                        Ext.MessageBox.alert("Alert", "Enter From and To Number");
                                    }else if(rptReptype="RT1"){
                                        //Invoiced
                                        if(rptRepCat=="C1" || rptRepCat=="C2"){
                                            //Date wise | No wise
                                            if (rptRepCat=="C1"){
                                                var d5 = 1;
                                            }else if(rptRepCat=="C2"){
                                                var d5 = 2;
                                            }                                            
                                            var p1 = "&from_date="+encodeURIComponent(d1);
                                            var p2 = "&to_date="+encodeURIComponent(d2);
                                            var p3 = "&vou_type="+encodeURIComponent(rptRepSel);
                                            var p4 = "&from_no="+encodeURIComponent(d3);
                                            var p5 = "&to_no="+encodeURIComponent(d4);
                                            var p6 = "&comp_code="+encodeURIComponent(GinCompcode);
                                            var p7 = "&flag="+encodeURIComponent(d5);
                                            var p8 = "&fin_id="+encodeURIComponent(GinFinid);
                                            var test = (p1+p2+p3+p4+p5+p6+p7+p8);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_rep_purchaseregister_new.rptdesign' + test,  '_blank' );
                                        }else if(rptRepCat=="C3"){
                                            //Mill wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_rep_cottoninvoicedetails.rptdesign' + test,  '_blank' );
                                        }else if(rptRepCat=="C4"){
                                            //Party wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_rep_cottoninvoicedetails_partywise.rptdesign' + test,  '_blank' );                                            
                                        }
                                    }else if(rptReptype=="RT2"){
                                        if(rptRepCat=="C3"){
                                            //Mill wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_sp_rep_cottonnotinvoice.rptdesign' + test,  '_blank' );
                                        }else if(rptRepCat=="C4"){
                                            //Party wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_sp_rep_cottonnotinvoice_partywise.rptdesign' + test,  '_blank' );                                            
                                        }                                        
                                    }
                                    
                                }else if(rptRepSel=="PY" || rptRepSel == "HY"){
                                    //Yarn
                                    if(txtFrom.getRawValue()==0 || txtTo.getRawValue()==0){
                                        Ext.MessageBox.alert("Alert", "Enter From and To Number");
                                    }else if(rptReptype=="RT1"){
                                        //Invoiced
                                        if(rptRepCat=="C1" || rptRepCat=="C2"){
                                            //Date wise | No wise
                                            if (rptRepCat=="C1"){
                                                var d5 = 1;
                                            }else if(rptRepCat=="C2"){
                                                var d5 = 2;
                                            }                                            
                                            var p1 = "&from_date="+encodeURIComponent(d1);
                                            var p2 = "&to_date="+encodeURIComponent(d2);
                                            var p3 = "&vou_type="+encodeURIComponent(rptRepSel);
                                            var p4 = "&from_no="+encodeURIComponent(d3);
                                            var p5 = "&to_no="+encodeURIComponent(d4);
                                            var p6 = "&comp_code="+encodeURIComponent(GinCompcode);
                                            var p7 = "&flag="+encodeURIComponent(d5);
                                            var p8 = "&fin_id="+encodeURIComponent(GinFinid);
                                            var test = (p1+p2+p3+p4+p5+p6+p7+p8);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_rep_purchaseregister_new.rptdesign' + test,  '_blank' );
                                        }else if(rptRepCat=="C3"){
                                            //Mill wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_rep_cottoninvoicedetails.rptdesign' + test,  '_blank' );
                                        }else if(rptRepCat=="C4"){
                                            //Party wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_rep_cottoninvoicedetails_partywise.rptdesign' + test,  '_blank' );                                            
                                        }
                                    }else if(rptReptype=="RT2"){
                                        if(rptRepCat=="C3"){
                                            //Mill wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_sp_rep_cottonnotinvoice.rptdesign' + test,  '_blank' );
                                        }else if(rptRepCat=="C4"){
                                            //Party wise
                                            var p1 = "&fromdate="+encodeURIComponent(d1);
                                            var p2 = "&todate="+encodeURIComponent(d2);
                                            var test = (p1+p2);
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/acc_sp_rep_cottonnotinvoice_partywise.rptdesign' + test,  '_blank' );                                            
                                        }                                        
                                    }
                                }
                            }
                        }
                    }
                },'-',       
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
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
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            PurchaseregisternowiseWindow.hide();
                        }
                    }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : false,
                height  : 80,
                width   : 350,
                layout  : 'absolute',
                x       : 10,
                y       : 1,

                items:[
                { xtype     : 'fieldset',
                  title     : 'From',
                  x         : 0,
                  y         : 0,
                  border    : false,
                  labelWidth: 25,
                  items     : [dtpFromdate]
                },
                { xtype     : 'fieldset',
                  title     : 'To',
                  x         : 150,
                  y         : 0,
                  border    : false,
                  labelWidth: 25,
                  items     : [dtpTodate]
                }
                ]
            },
            optRepTypes,
            optRepSel,
            optRepCat,
              { 
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 50,
                width       : 200,
                x           : 10,
                y           : 280,
                defaultType : 'textfield',
                border      : false,
                items: [txtFrom]
               },
              { 
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 50,
                width       : 200,
                x           : 180,
                y           : 280,
                defaultType : 'textfield',
                border      : false,
                items: [txtTo]
               }  
            
        ]
    });
    
    
    var PurchaseregisternowiseWindow = new Ext.Window({
	height      : 400,
        width       : 440,
        y           : 90,
        title       : 'Purchase Register No wise',
        items       : PurchaseregisternowiseFormPanel,
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false
    });
    PurchaseregisternowiseWindow.show();  
});
