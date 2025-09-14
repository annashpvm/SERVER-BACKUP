
var btnEmail = new Ext.Button({
    id      : 'btnEmail',
    style   : 'text-align:center;',
    text    : "SEND E-Mail",
    tooltip : 'Sent E-Mail to Customer...',
    width   : 100,
    height  : 50,
    x       : 770,
    y       : 435,    
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){

        var mailheader = '';
        var mailtrailer = '';
        var mailmessage = '';

	loadBillsDetailsDatastore.removeAll();
	loadBillsDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Bills_Details',
                compcode  : Gincompcode,
                finid     : GinFinid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledcode   : ledcode,
                alldueopt : 0, 

		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadBillsDetailsDatastore.getCount();
//alert(cnt);
                   if(cnt>0)
                   {

                     for(var j=0; j<cnt; j++)
                     {   

                       invdate = Ext.util.Format.date(loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_date'),"d-m-Y");

		       invno   = loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_no');

                       invamt = loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value');
                       invamt  =  Ext.util.Format.number(invamt,"0.00");

                       balamt = loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value')-loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value');
                       balamt  =  Ext.util.Format.number(balamt,"0.00");

                       payterms = loadBillsDetailsDatastore.getAt(j).get('acctrail_crdays');
		       oddays  = loadBillsDetailsDatastore.getAt(j).get('oddays');

                       mailtrailer = mailtrailer + '<tr>' + '<td align="center">' + invdate + '</td>' +
			 '<td align="center">' + invno+ '</td>' +  
			 '<td align="right">' + invamt + '</td>' +  
			 '<td align="right">' + balamt + '</td>' + '</tr>';   

                      }   

                    mailheader = Ext.util.Format.trim('<table border = "1"><tr>' +                                  '<th bgcolor= "yellow">' + 'Inv Date' + '</th>' +                                   '<th bgcolor= "yellow">' + 'Inv No.' + '</th>' +                                   '<th bgcolor= "yellow">' + 'Inv Amount' + '</th>' +                                   '<th bgcolor= "yellow">' + 'Balance Amount' + '</th>' + '\n' + mailtrailer) +'</table>' +  '\n' +'<br>';


                      mailmessage =  mailheader

		      Ext.Ajax.request({
		      url: 'TrnOverdueEmail.php',
		      params :
		      {
                                mailmessage: mailmessage,
		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("EMAIL Send to Customer - "); 
          //               Ext.getCmp('btnSMS').setDisabled(true);  

		      }
                      }); 



                    }   
                   } 

    }) 
   }  
   }
});  

