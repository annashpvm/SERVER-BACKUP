Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";



   var printtype='PDF';


var txtTotMIns = new Ext.form.NumberField({
	fieldLabel  : 'Total Down Mins',
	id          : 'txtTotMIns',
	name        : 'txtTotMIns',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        readOnly  :  true,
    	enableKeyEvents: true,
     	labelStyle : "font-size:14px;font-weight:bold;",
    	style      : "font-size:14px;font-weight:bold;color:#ff00ff;border-radius:5px;",
	tabindex : 12,
        decimalPrecision: 0,
        enableKeyEvents: true,
        listeners:{

        }   

});



var Rpttype="Date-wise Down Time";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:200,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optRpttype',
        items: [
		{boxLabel: 'Date-wise Down Time', name: 'optRpttype', id:'optDate', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Date-wise Down Time";

					}
				}
			}
		},
		{boxLabel: 'Department wise Down Time', name: 'optRpttype', id:'optDept', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Department wise Down Time";

					}
				}
			}
		},
		{boxLabel: 'Quality wise Down Time', name: 'optRpttype', id:'optQly', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Quality wise Down Time";

					}
				}
			}
		},
		{boxLabel: 'Root Cause wise Down Time', name: 'optRpttype', id:'optRoot', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Root Cause wise Down Time";

					}
				}
			}
		},
		{boxLabel: 'Section wise Down Time', name: 'optRpttype', id:'optSection', inputValue: 5,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Section wise Down Time";

					}
				}
			}
		},

           
        ],
    }



    ]
});

var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    width:300,
    height:70,

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

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date()   
    });






function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    
    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 



    // mdays = Ext.util.Format.date(new Date(),"d");


//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;



//    alert(monthstartdate);  
//    alert(monthenddate);  
          
	loadDownTimeListDataStore.removeAll();
	loadDownTimeListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDownTime',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   grid_tot();
		}
	    });
     
}






     var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'MONTH',
        editable:false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [[1,'JANUARY'],[2,'FEBRUARY'],[3,'MARCH'],[4,'APRIL'],['5','MAY'],['6','JUNE'],
['7','JULY'],['8','AUGUEST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
                  lblDetail1.setText('');
                  lblDetail2.setText('');

                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });
    



 var loadDownTimeListDataStore = new Ext.data.Store({
      id: 'loadDownTimeListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDownTime"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['prdh_date', 'prdh_shift',  'var_desc', 'department_name' ,'section_name','prds_starttime', 'prds_endtime', 'prds_mins','prds_nature_of_breakdown','prds_rootcause', 'prds_actiontaken', 'prds_correctiveaction'
   ]),
    });




var lblDetail1 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



var lblDetail2 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail2',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});


var lblDetail3 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail3',
    width       : 300,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    style      : "border-radius:5px;",      
});




   
var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
	loadDownTimeListDataStore.removeAll();
	loadDownTimeListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDownTime',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   grid_tot();
		}
	    });
     
       	 }
        }   
});



function grid_tot(){

        var totMins = 0;

         txtTotMIns.setValue('');


        var Row= flxDownTime.getStore().getCount();
        flxDownTime.getSelectionModel().selectAll();
        var sel=flxDownTime.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.prds_mins) > 0)
              {
		  totMins =totMins+Number(sel[i].data.prds_mins);

              }
         }
         txtTotMIns.setValue(Ext.util.Format.number(totMins,'0'));


}




var dgrecord = Ext.data.Record.create([]);

var flxDownTime = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:30,
    height: 400,
    hidden:false,
    width: 950,
    id: 'my-grid',
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "DATE",    dataIndex: 'prdh_date',sortable:false,width:110,align:'left'},
        {header: "SHIFT",    dataIndex: 'prdh_shift',sortable:false,width:50,align:'left'},
        {header: "QUALITY",    dataIndex: 'var_desc',sortable:false,width:150,align:'left'},
        {header: "Department", dataIndex: 'department_name',sortable:true,width:150,align:'left'},//1
        {header: "Section",    dataIndex: 'section_name',sortable:true,width:150,align:'left'},//3
        {header: "From",       dataIndex: 'prds_starttime',sortable:true,width:170,align:'left'},//14
        {header: "To",         dataIndex: 'prds_endtime',sortable:true,width:170,align:'left'},//16,hidden:true
        {header: "Down Mins",  dataIndex: 'prds_mins',sortable:true,width:80,align:'center'},//16,hidden:true
        {header: "Nature of Break Down",     dataIndex: 'prds_nature_of_breakdown',sortable:true,width:140,align:'left'},//14
        {header: "Root Cause",     dataIndex: 'prds_rootcause',sortable:true,width:140,align:'left'},//14
        {header: "Action Taken",     dataIndex: 'prds_actiontaken',sortable:true,width:140,align:'left'},//14
        {header: "Corrective Action",dataIndex: 'prds_correctiveaction',sortable:true,width:120,align:'left'},//14

    ],
	store : loadDownTimeListDataStore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ISSUES GRN',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxDownTime.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit_downtime = "true";
				editrow_downtime = selrow;

				        cmbQuality.setRawValue(selrow.get('quality'));
				        cmbQuality.setValue(selrow.get('qlycode'));
				        cmbDepartment.setRawValue(selrow.get('department'));
				        cmbDepartment.setValue(selrow.get('deptcode'));
				        cmbSection.setRawValue(selrow.get('section'));
				        cmbSection.setValue(selrow.get('seccode'));



		                        txtBreakDownReason.setRawValue(selrow.get('reason'));

//					txtStartTime.setValue(selrow.get('fromtime'));
					//txtEndTime.setValue(selrow.get('totime'));
			txtStartTime.setValue(Ext.util.Format.date(selrow.get('fromtime'),"d-m-Y H.i"));
			txtEndTime.setValue(Ext.util.Format.date(selrow.get('totime'),"d-m-Y H.i"));
	

					txtDownMins.setRawValue(selrow.get('downmins'));		

				        cmbRootCause.setRawValue(selrow.get('rootcause'));
				        cmbActionTaken.setRawValue(selrow.get('actiontaken'));
				        cmbCorrectiveAction.setRawValue(selrow.get('correctiveaction'));



                                        flxDownTime.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxDownTime.getSelectionModel();
			var selrow = sm.getSelected();
			flxDownTime.getStore().remove(selrow);
			flxDownTime.getSelectionModel().selectAll();
                        grid_tot_downtime();
		}
		}

     	});         
    	}
}
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
//view
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                       click: function () {

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                var param = (p1+p2+p3+p4) ;

               if (Rpttype == "Date-wise Down Time") 
               {

                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_datewise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_datewise.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_datewise.rptdesign' + param, '_blank');
               }
               if (Rpttype == "Department wise Down Time") 
               {

                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_deptwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_deptwise.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_deptwise.rptdesign' + param, '_blank');
               }

               if (Rpttype == "Quality wise Down Time") 
               {

                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_Qualitywise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_Qualitywise.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_Qualitywise.rptdesign' + param, '_blank');
               }    
               if (Rpttype == "Root Cause wise Down Time") 
               {

                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_RootCausewise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_RootCausewise.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_RootCausewise.rptdesign' + param, '_blank');
               }    
               if (Rpttype == "Section wise Down Time") 
               {

                if (printtype == "PDF")
          	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_Sectionwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_Sectionwise.rptdesign&__format=XLS' + param, '_blank');
                else
        	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Production/rpt_downtime_Sectionwise.rptdesign' + param, '_blank');
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
                height  : 515,
                width   : 1320,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 5,
                y       : 5,

                items:[



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : -10,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : -10,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : -10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : -12,
                             items: [btnProcess]
                        },




				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 350,
				            labelWidth  : 1,
				            x           : 360,
				            y           : 30,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblDetail1]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 300,
				            labelWidth  : 1,
				            x           : 910,
				            y           : 30,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblDetail2]
				        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
                             width   : 1200,
		             x       : -10,
			     y       : 60,
                             items: [flxDownTime]
                        },

 
			   { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 150,
				width       : 400,
				x           : 650,
				y           : 462,
			    	border      : false,
				items: [txtTotMIns]
			    },


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 300,
			layout  : 'absolute',
			x       : 980,
			y       : 10,
			items:[optprinttype],
		},

 
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 300,
			width   : 300,
			layout  : 'absolute',
			x       : 980,
			y       : 130,
			items:[optRpttype],
		},
	

                ]

            },


            
        ],
    });
    
    function Refreshdata()
    {

        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(parseInt(m1));
        find_dates(m1);



    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'Down Time Details',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){

                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
