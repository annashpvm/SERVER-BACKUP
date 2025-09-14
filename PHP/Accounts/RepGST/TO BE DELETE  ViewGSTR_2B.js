	Ext.onReady(function() {
Ext.QuickTips.init();
    var ginfinid =localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var compcode =localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



   var printtype='PDF';

   var gstr_type = 'C';

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


    var RepGSTR1Window = new Ext.Window({
        height      : 500,
        width       : 500,
        items       : RepGSTR1FormPanel,
        bodyStyle:{"background-color":"#ffe6e6"},
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        y      : 120,



onEsc:function(){
},
        listeners:
            {
                show:function(){

                }
            }

    });
       RepGSTR1Window.show();
});
