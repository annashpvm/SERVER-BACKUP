Ext.onReady(function(){
    Ext.QuickTips.init();
  //  var tb = new Ext.Toolbar();
//    tb.render('toolbar');


var yearfin  = localStorage.getItem('gstyear'); 
var compcode = localStorage.getItem('gincompcode');
var compname = localStorage.getItem('gstcompany');
var fin      = localStorage.getItem('ginfinid');


    
   var usertype = localStorage.getItem('ginuser');

    var tbgeneral = new Ext.Toolbar();
    tbgeneral.render('toolbar');
    tbgeneral.add(



    new Ext.Toolbar.SplitButton({
        id:'btnmas',text: '<b> DAILY ENTRY </b>',
        width: 150,style: 'background-color: DEC5C0;',
        iconCls: 'bmenu',
        menu:{
            items:[   
    		{
                    text: '<b>INWARD DETAILS ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/InwardOutward/Inward/Inward.php');
                        
                    }
                },     
            	{
                    text: '<b>OUTWARD DETAILS ENTRY</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/InwardOutward/Outward/Outward.php');
                    }
                },                

             ]}

    }),





   new Ext.Toolbar.SplitButton({
        text: '<b>REPORTS</b>',
        width: 150,
        iconCls: 'bmenu',style: 'background-color: DEC5C0;',
        menu:{

            items:[
 
          	{
                    text: '<b>Inward Details</b>',
                    group: 'theme',
                    handler: function(){
                        window.location.href=('http://10.0.0.251/SHVPM/InwardOutward/InwardReports/FrmRepInward.php');
                    }
                },

             {

		        text: '<b>Outward Details</b>',
		        group: 'theme',
		        handler: function(){
			    
		            window.location.href=('http://10.0.0.251/SHVPM/InwardOutward/OutwardReports/FrmRepOutward.php'); 
		        }
  
                },
       ]}
   }),	


   new Ext.Toolbar.SplitButton({
        text: '<b>LOGOUT</b>',
        width: 150,
        style: 'background-color: DEC5C0;',
        handler: function () {
            window.location.href=('http://www.google.com');
        }

   }),

 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'finyear', style: 'background-color: #F1F5EA',
                width: 150
            }),
			
 new Ext.Toolbar.SplitButton({
                text: '<b></b>', id: 'comp', style: 'background-color: #F1F5EA',
                width: 150,
		
            }),



)
   
//    tb.doLayout();
    tbgeneral.doLayout();

	Ext.getCmp('comp').setText(compname);
	Ext.getCmp('finyear').setText(yearfin);


});
