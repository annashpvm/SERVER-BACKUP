Ext.onReady(function(){
   Ext.QuickTips.init();


   var Ginfinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');;
 var editrow = 0;
 
 var loadavailableindentdetails = new Ext.data.Store({
      id: 'loadavailableindentdetails',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndentAuth.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindentdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
    'Company','dept_name','Indent','ItemDescription','Quantity','Value','DueDate','ind_comp_code','ind_fin_code','ind_item_code','ApproveYN'
      ])
    });
 
   var loaddeptdatastore = new Ext.data.Store({
      id: 'loaddeptdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIndentAuth.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'dept_code', type: 'int',mapping:'dept_code'},
	{name:'dept_name', type: 'string',mapping:'dept_name'}
      ]),
    });
   


   var txtItemSearch = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItemSearch',
        name        : 'txtItemSearch',
        width       :  250,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    	enableKeyEvents: true,
	listeners : {
            keyup: function () {
                   flxIndent.getStore().filter('ItemDescription', txtItemSearch.getRawValue());    
            }
        }
    });



   var txtIndNoSearch = new Ext.form.TextField({
        fieldLabel  : 'Indent No.',
        id          : 'txtIndNoSearch',
        name        : 'txtIndNoSearch',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    	enableKeyEvents: true,
	listeners : {
            keyup: function () {
                   flxIndent.getStore().filter('Indent', txtIndNoSearch.getRawValue());    
            }
        }
    });



     var cmbdept = new Ext.form.ComboBox({
        fieldLabel      : 'Department',
        width           : 250,
        displayField    : 'dept_name',
        valueField      : 'dept_code',
        hiddenName      : 'dept_name',
        id              : 'cmbdept',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loaddeptdatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){

		loadavailableindentdetails.load({
			url: 'ClsIndentAuth.php',
			params:
			{
		    	task:"loadindentdet",
			compcode : Gincompcode,
			fincode  : Ginfinid,
                        dept     : cmbdept.getValue(),
			}
    		});
			

	}
} 
   });
   
 
 

   
   var btnSelectAll = new Ext.Button({
         
        text : 'Select All',
        width   : 100,
        x       : 20,
        y       : 450,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
        listeners:{
        click: function(){
            var Row= flxIndent.getStore().getCount();
            flxIndent.getSelectionModel().selectAll();
            var sel=flxIndent.getSelectionModel().getSelections();
           for(var i=0;i<Row;i++)
           {
              sel[i].set('ApproveYN', 'Y');
           }
	}
        }  
   });
   

   var btnDeSelectAll = new Ext.Button({
         
        text : 'DE-Select All',
        width   : 100,
        x       : 120,
        y       : 450,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
        listeners:{
        click: function(){
            var Row= flxIndent.getStore().getCount();
            flxIndent.getSelectionModel().selectAll();
            var sel=flxIndent.getSelectionModel().getSelections();
           for(var i=0;i<Row;i++)
           {
              sel[i].set('ApproveYN', 'N');
           }
	}
        }  
   });
   

 /* var sm = new Ext.selection.CheckboxModel({
            checkOnly:true
        });*/

 var indno1='';
 
var indentlist = new Ext.grid.CheckboxSelectionModel({

listeners: {
selectionchange: function(indentlist) {
var i;
var selected_rows = flxIndent.getSelectionModel().getSelections();
    for(i=0; i<selected_rows.length; i++){
     indno1=(selected_rows[i].data.Indent);
     
                    
}


}
}
});




var flxIndent = new Ext.grid.EditorGridPanel({
    
    	id : flxIndent,
        editable : true,
        frame: false,
        //sm: new Ext.grid.RowSelectionModel(),
        //autoShow: true,
        stripeRows : true,
        hideHeaders : false,
        scrollable  : true,
	store       : loadavailableindentdetails,
        height: 300,
        width: 1100,
        x: 0,
        y: 90,
        
	selModel: indentlist,
        columns: [  //indentlist,        
            {header: "Approve Y/N", dataIndex: 'ApproveYN',sortable:true,width:120,align:'center'},
            {header: "Company", dataIndex: 'Company',sortable:true,width:120,align:'left' , hidden : 'true'},
            {header: "Dept Name", dataIndex: 'dept_name',sortable:true,width:100,align:'right' },
            {header: "Indent", dataIndex: 'Indent',sortable:true,width:100,align:'center'},
            {header: "Item Name", dataIndex: 'ItemDescription',sortable:true,width:300,align:'left'},
            {header: "Quantity", dataIndex: 'Quantity',sortable:true,width:100,align:'left'},
            {header: "Value", dataIndex: 'Value',sortable:true,width:100,align:'left'},
            {header: "Due Date", dataIndex: 'DueDate',sortable:true,width:100,align:'left'},
            {header: "Company Code", dataIndex: 'ind_comp_code',sortable:true,width:100,align:'left' , hidden : 'true'},
            {header: "Fin Code", dataIndex: 'ind_fin_code',sortable:true,width:100,align:'left', hidden : 'true' },
            {header: "Item Code", dataIndex: 'ind_item_code',sortable:true,width:100,align:'left'},
           // { xtype: 'checkcolumn', text: 'Active', dataIndex: 'active', align: 'center', defaultType: 'boolean' },
        ],
listeners:{	
        'cellclick' : function(flxIndent, rowIndex, cellIndex, e){
			var selected_rows = flxIndent.getSelectionModel().getSelections();
			for (var i = 0; i < selected_rows.length; i++)
                	{	
                    	var flag = selected_rows[i].data.ApproveYN;
                    	
                    	if (flag == 'N')
                    	{
                        selected_rows[i].set('ApproveYN', 'Y');
                    	} else if (flag == 'Y')
                    	{
                        selected_rows[i].set('ApproveYN', 'N');
                    	}	

                	}
		   
				}
				}
   });


   
   var dtpduedate = new Ext.form.DateField({
        fieldLabel : 'Due Date',
        id         : 'dtpFromdate',
        name       : 'fromdate',
        format     : 'd-m-Y',
        value      : new Date(),
        width:90
   });
   
 
var optDepartment = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Option',
    fieldLabel: '',
    layout : 'hbox',
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optDepartment',
        items: [
		{boxLabel: 'Selective Depart',name: 'optDepartment', id:'opt_dept_selctivie', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
		loadavailableindentdetails.load({
			url: 'ClsIndentAuth.php',
			params:
			{
		    	task:"loadindentdet",
			compcode : Gincompcode,
			fincode  : Ginfinid,
                        dept     : cmbdept.getValue(),
			}
    		});

					}
				}
			}
		},
		{boxLabel: 'All Department', name: 'optDepartment', id:'opt_dept_all', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){

		loadavailableindentdetails.load({
			url: 'ClsIndentAuth.php',
			params:
			{
		    	task:"loadindentdet",
			compcode : Gincompcode,
			fincode  : Ginfinid,
                        dept     : 0,
			}
    		});
					}
				}
			}
		},
            
        ],
    }



    ]
});


   
var indyear = Ginfinid;
var optIndentYear = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Indent Year',
    fieldLabel: '',
    layout : 'hbox',
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optIndentType',
        items: [
		{boxLabel: 'Current Year', name: 'optIndentYear', id:'opt_ind_curyear', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    indyear = Ginfinid;

					}
				}
			}
		},
		{boxLabel: 'Previous Year', name: 'optIndentYear', id:'opt_ind_preyear', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						indyear = Ginfinid-1;


					}
				}
			}
		},
            
        ],
    }



    ]
});

   
   var IndentauthFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 1180,
        height      : 550,
        bodyStyle:'background: url(/WorkOrder/icons/img1.jpg)',
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'IndentauthFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: ' Authorize',
                    style  : 'text-align:center;',
                    tooltip: 'Indent Authorization ...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/auth.jpg' ,
	                   listeners:{
                        click: function () {
			var gstSave;
	                    gstSave="true";
        	            if (flxIndent.rows==0)
        	            {
        	                Ext.Msg.alert('Indent Authorize','Grid should not be empty..');
        	                gstSave="false";
	                    } 
        	            else
				{
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Authorise...',
                            fn: function(btn)
				{
                            if (btn === 'yes')
				{
                            if (gstSave === "true")
	                        {  

                           
                            var indData = flxIndent.getStore().getRange();                                        
                            var indupdData = new Array();
                            Ext.each(indData, function (record) {
                                indupdData.push(record.data);
                            });
//alert(indData.length);
                            Ext.Ajax.request({
                            url: 'TrnIndentAuthSave.php',
                            params :
                             {
                             	griddet	 : Ext.util.JSON.encode(indupdData),
// Added on 06/03/2021 - Start
                                cnt: indData.length,  
                                ind_comp_code :Gincompcode,
                              //  ind_fin_code  :Ginfinid,
                                //Indent        :Indent,
                               // ind_item_code :ind_item_code
// Added on 06/03/2021 - End

				},
                              callback: function(options, success, response)
                              {
//alert(cnt);
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
//                                    Ext.MessageBox.alert("Indent Authorised -" + obj['Indent']);
                                    Ext.MessageBox.alert("Indent Authorised ");

                                    IndentauthFormPanel.getForm().reset();
                                    flxIndent.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Indent Not Authorised! Pls Check!- " + obj['Indent']);                                                  
                                    }
                                }
                           });         
   
                          	}
     				}
                            }
                        });
                    }
                        }
                    }
                },'-',         
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png'
                    
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png',
                    handler: function(){	
                            IndentWindow.hide();
                        }                    
                }]
        },
        items: [
            {   
                xtype       : 'fieldset',
                title       : '',
                
                width       : 1160,
                height      : 520,
                x           : 8,
                y           : 4,
                border      : true,
                layout      : 'absolute',
                items: [

                     {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 300,
                        x           :  0,
                        y           :-10,
                        labelWidth  : 90,
                        border      : false,
                        items : [optDepartment]
                    },
                     {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 400,
                        x           : 0,
                        y           : 50,
                        labelWidth  : 95,
                        border      : false,
                        items : [cmbdept]
                    },
                     {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 300,
                        x           : 400,
                        y           : 10,
                        labelWidth  : 90,
                        border      : false,
                        items : [optIndentYear]
                    },

                    flxIndent 
                ]
            }, btnSelectAll , btnDeSelectAll,



		{ 
                     xtype       : 'fieldset',
                     title       : '',
                     labelWidth  : 100,
                     width       : 500,
                     x           : 750,
                     y           : 10,
                     border      : false,
                     items: [txtItemSearch]
                },

		{ 
                     xtype       : 'fieldset',
                     title       : '',
                     labelWidth  : 100,
                     width       : 500,
                     x           : 750,
                     y           : 60,
                     border      : false,
                     items: [txtIndNoSearch]
                },
        ]
    });

function  RefreshData()
{

}

    
    var IndentWindow = new Ext.Window({
	height      : 580,
        width       : 1200,
        y           : 35,
        title       : ' INDENT AUTHORIZATION',
        items       : IndentauthFormPanel,
        layout      : 'absolute',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        
        border      : false,
        draggable   : false,



	listeners:

           {
               show:function()
				{
//alert(Gincompcode);
//alert(Ginfinid);

	   		}
	}
    });
    IndentWindow.show();  
});

