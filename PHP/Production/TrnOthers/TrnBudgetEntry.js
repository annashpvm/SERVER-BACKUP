Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstStatus = "N";
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
//var gstGroup;
//OUT SIDE

var dtproddate = new Ext.form.DateField({
    fieldLabel : 'P.DATE	',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,
});

var cmbshift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbshift',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbsupervisor',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Rajesh'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });
   
var cmboperator = new Ext.form.ComboBox({
        fieldLabel      : 'M/C Operator',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmboperator',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Rajesh'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });
var cmbmano = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbmano',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1','2','3'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });
var cmbvariety = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 250,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbvariety',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1','2','3'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });

var txtmaqty = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmaqty',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtmabalqty = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmabalqty',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtdeckle = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtdeckle',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtspeed = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtspeed',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtshiftmcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtshiftmcprod',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtmcrunhrs = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmcrunhrs',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtshiftdowntime = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtshiftdowntime',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txttotshifthrs = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txttotshifthrs',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtdaymcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtdaymcprod',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtrollno = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtrollno',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

}); 
var txtrollwt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtrollwt',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtrunhrs = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtrunhrs',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtcalcprodn = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtcalcprodn',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtbreaks = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtbreaks',
	name        : 'txtrss Nounhrs',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var cmbdowntimedept = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 250,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbdowntimedept',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Mechanical'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });
var cmbdownsection = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 250,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbdownsection',
        typeAhead       : true,
        mode            : 'local',
        store           : ['I-sd Dryer'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });
var cmbdownequip = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 250,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbdownequip',
        typeAhead       : true,
        mode            : 'local',
        store           : ['steam valve'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });
var txtstopreason = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtstopreason',
	name        : 'txtrss Nounhrs',
	width       :  300,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtsttime = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtsttime',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtendtime = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtendtime',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtdownhrs = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtdownhrs',
	name        : 'txtrss Nounhrs',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtmonthuptomcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtmonthuptomcprod',
	name        : 'txtrss Nounhrs',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtyearuptomcprod = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtyearuptomcprod',
	name        : 'txtrss Nounhrs',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtfeltper = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtfeltper',
	name        : 'txtrss Nounhrs',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var txtwireper = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtwireper',
	name        : 'txtrss Nounhrs',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});  
var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 50,
    height  : 40,
    x       : 825,
    y       : 190,
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();
	    var gstadd="true";
	
	if(cmbitem.getValue()==0 || cmbitem.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Issue", "Select Item");  	
	}            
	else if(cmblotno.getValue()==0 || cmblotno.getRawValue()=="")
	{
                Ext.MessageBox.alert("Issue", "Select Lotno");  
                 gstadd="false";
        }
	else if(txtissqty.getValue() == '' || txtissqty.getValue() == 0)
	{
                Ext.MessageBox.alert("Issue", "Enter IssQty");
                 gstadd="false";
        }
	else if((txtcostrate.getValue() == '') || (txtcostrate.getValue() == 0))
	    {
                Ext.MessageBox.alert("Issue", "Enter Cost Rate");
                 gstadd="false";
            }
	/*else if(txtnoofbags.getRawValue() == '')
	    {
                Ext.MessageBox.alert("Issue", "Enter No of Bags");
                 gstadd="false";
            }*/
	else if((txtissval.getValue()==0) || (txtissval.getValue()==0))
	{
                Ext.MessageBox.alert("Issue", "Enter Value");
                gstadd="false";
        }  
	else if(txtissqty.getValue() > txtstock.getValue())
	{
                Ext.MessageBox.alert("Issue", "Iss Qty should not be greater than Stock");
                gstadd="false";
        }  
	else if(cmbmachine.getRawValue()=="" || cmbmachine.getValue()==0)
	{
		
		Ext.MessageBox.alert("Issue", "Select Machine");
                gstadd="false";
		
	}
	else if(cmbbatch.getRawValue()=="" || cmbbatch.getValue()==0)
	{
		Ext.MessageBox.alert("Issue", "Select Batch");
                gstadd="false";
		
	}
	else if(cmbvariety.getRawValue()=="" || cmbvariety.getValue()==0)
	{
		Ext.MessageBox.alert("Issue", "Select Variety");
                gstadd="false";
		
	}
	else if(Number(tbistk) < Number(txtnoofbags.getValue()))
	{
		Ext.MessageBox.alert("Issue", "Available number of bag(s) is less");
                gstadd="false";
	
	}
	else
            {

                var ginitemseq = cmbitem.getValue();
                var ginlotseq = cmblotno.getValue();
                flxdetail.getSelectionModel().selectAll();
                var selrows = flxdetail.getSelectionModel().getCount();
                var sel = flxdetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemseq == cmbitem.getValue() && sel[i].data.lotseq == cmblotno.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

		if(gridedit === "true")
		{
			gridedit = "false";
			//var sm = flxDetail.getSelectionModel();
			//var selrow = sm.getSelected();

			var idx = flxdetail.getStore().indexOf(editrow);

			sel[idx].set('lotno', cmblotno.getRawValue());
			sel[idx].set('itemname', cmbitem.getRawValue());
			sel[idx].set('batch', cmbbatch.getRawValue());
			sel[idx].set('variety', cmbvariety.getRawValue());
			sel[idx].set('issqty', parseFloat(txtissqty.getValue()));
			sel[idx].set('issval', txtissval.getValue());
			sel[idx].set('lotseq', cmblotno.getValue());
			sel[idx].set('itemseq', cmbitem.getValue());
			sel[idx].set('batseq', cmbbatch.getValue());
			sel[idx].set('varseq', cmbvariety.getValue());
			sel[idx].set('variety', cmbvariety.getRawValue());

			sel[idx].set('stock', parseFloat(txtstock.getValue()));
			sel[idx].set('avgrate', txtcostrate.getValue());
			sel[idx].set('issbags', txtnoofbags.getValue());
			sel[idx].set('tbistk', tbistk);
			sel[idx].set('actstk' ,actstk);
			sel[idx].set('actiss', actqty);

			sel[idx].set('prvqty', txtstock.getValue());
			sel[idx].set('prvval', actstk);
			sel[idx].set('machine',cmbmachine.getRawValue());
			sel[idx].set('mcseq', cmbmachine.getValue());


		            grid_tot();
		            CalculatePOVal();

			flxdetail.getSelectionModel().clearSelections();

			

		}//if(gridedit === "true")
		else
		{
               
			if (cnt > 0)
			{
		            Ext.MessageBox.alert("Grid","Same Item already Entered.");
		        } else
		        {

		            var RowCnt = flxdetail.getStore().getCount() + 1;
		            flxdetail.getStore().insert(
		                flxdetail.getStore().getCount(),
		                new dgrecord({
		                    slno:RowCnt,
		                    lotno : cmblotno.getRawValue(),
		                    itemname : cmbitem.getRawValue(),
				    batch : cmbbatch.getRawValue(),
				    variety : cmbvariety.getRawValue(),
				    issqty : txtissqty.getValue(),
				    issval : txtissval.getValue(),
		                    lotseq : cmblotno.getValue(),
		                    itemseq : cmbitem.getValue(),
				    batseq : cmbbatch.getValue(),
				    varseq : cmbvariety.getValue(),
				    stock :  parseFloat(txtstock.getValue()),
				    avgrate : txtcostrate.getValue(),
				    issbags : txtnoofbags.getValue(),
				    tbistk : tbistk,
				    actstk : actstk,
				    actiss : actqty,
				    prvqty : txtstock.getValue(),
				    prvval : actstk,
				    machine : cmbmachine.getRawValue(),
				    mcseq : cmbmachine.getValue()
				    
		                }) 
		                );

		                    grid_tot();
		                  //  CalculatePOVal();
		                    cmblotno.reset();
		                    cmbitem.setRawValue("");

		                    txtissqty.setRawValue("");
		                    txtstock.setRawValue("");
		                    txtcostrate.setRawValue("");
		                    txtnoofbags.setRawValue("");
		                    txtissval.setRawValue("");
                	}//else (cnt > 0)
		}// else //if(gridedit === "true")
		
            }//condition else


        }//click
    }//listener
});
var dgrecord = Ext.data.Record.create([]);
var flxdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:250,
    height: 130,
    hidden:false,
    width: 865,
    columns:
    [
        {header: "QUALITY", dataIndex: 'quality',sortable:true,width:150,align:'left'},
        {header: "ROLL No", dataIndex: 'rollno',sortable:true,width:60,align:'left'},//0
        {header: "ROLL WT(MT)", dataIndex: 'rollwt',sortable:true,width:90,align:'left'},//1
        {header: "RUN HRS", dataIndex: 'runhrs',sortable:true,width:70,align:'left'},//2
        {header: "BREAKS", dataIndex: 'breaks',sortable:true,width:60,align:'left'},//3
        {header: "D.TIME DEPT_CODE", dataIndex: 'd.timedeptcode',sortable:true,width:120,align:'left'},//4
        {header: "DEPARTMENT", dataIndex: 'department',sortable:true,width:90,align:'left'},//5
	{header: "SEC CODE", dataIndex: 'SECCODE',sortable:true,width:70,align:'left',hidden:false},//6,hidden:true
        {header: "SECTION", dataIndex: 'SECTION',sortable:true,width:70,align:'left',hidden:false},//7,hidden:true
        {header: "STOPPAGE REASON", dataIndex: 'stoppagereason',sortable:true,width:200,align:'left',hidden:false},//8,hidden:true
        {header: "START TIME", dataIndex: 'starttime',sortable:true,width:80,align:'left',hidden:false},//9,hidden:true
        {header: "END TIME", dataIndex: 'endtime',sortable:true,width:80,align:'left'},//10
        {header: "DOWN HRS", dataIndex: 'downhrs',sortable:true,width:80,align:'left'},//11
        {header: "DECKLE", dataIndex: 'deckle',sortable:true,width:70,align:'left'},//12
	{header: "MA No", dataIndex: 'mano',sortable:true,width:60,align:'left',hidden:false},//13,hidden:true
        {header: "FIN WT(MT)", dataIndex: 'finwt',sortable:true,width:90,align:'left'},//14,hidden:true
//        {header: "Actual Issue", dataIndex: 'actiss',sortable:true,width:50,align:'left'},//15,hidden:true
//        {header: "Prev Stk Qty", dataIndex: 'prvqty',sortable:true,width:50,align:'left'},//16
//        {header: "Prev Stk Val", dataIndex: 'prvval',sortable:true,width:50,align:'left'},//17
//        {header: "Machine", dataIndex: 'machine',sortable:true,width:50,align:'left'},//18
//	{header: "Machine code", dataIndex: 'mcseq',sortable:true,width:50,align:'left',hidden:true},//19,hidden:true

    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ISSUES GRN',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;

				if (selrow.get('mcseq') == "1")
				{
					macname = 'DIP';
				}
				else if (selrow.get('mcseq') == "2")
				{
					macname = 'PM1';
				}
				else if (selrow.get('mcseq') == "3")
				{
					macname = 'PM2';
				}
				else if (selrow.get('mcseq') == "4")
				{
					macname = 'PM3';
				}
				else if (selrow.get('mcseq') == "5")
				{
					macname = 'VJPM';
				}
				cmbmachine.setValue(selrow.get('mcseq'));
				cmbmachine.setRawValue(macname);

				cmbitem.setValue(selrow.get('itemseq'));
				
				cmblotno.setValue(selrow.get('lotseq'));
				cmblotno.setRawValue(selrow.get('lotno'));
				cmbbatch.setValue(selrow.get('batseq'));
				cmbvariety.setValue(selrow.get('varseq'));
				//cmbmachine.setValue(selrow.get('mcseq'));
				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));
				txtnoofbags.setValue(selrow.get('issbags'));
           LotItemDataStore.removeAll();
            LotItemDataStore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadlotitem",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(LotItemDataStore.getAt(0).get('itmt_avgrate'));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stk_billqty'));
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

		}
            });
				
				
flxdetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxdetail.getStore().remove(selrow);
			flxdetail.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});

       
var TrnIssueFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PRODN ENTRY',
        header      : false,
        width       : 1270,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 623,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnIssueFormpanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
		{
		    text: ' Add',
		    style  : 'text-align:center;',
		    tooltip: 'Add Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		    align : 'right',
		    icon: '/Pictures/Add.png',
		    listeners:{
		        click: function () {
				AEDFlag = "Add";
				TrnIssueFormpanel.getForm().reset();
				RefreshData();
			
		        }
		    }
		},'-',
		{
		    text: 'Edit',
		    style  : 'text-align:center;',
		    tooltip: 'Modify Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
	//disabled : true,
		    icon: '/Pictures/edit.png',
		    listeners:{
		        click: function () {
				AEDFlag = "Edit";

				RefreshData();

		        }
		    }
		},'-',                
		{
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
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
				TrnProdnEntry.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [
		           { 
		               xtype   : 'fieldset',
				title   : 'FELT AND WIRE PERFORMANCE',
				layout  : 'hbox',
				border  : true,
				height  : 300,
				width   : 250,
				style:{ border:'1px solid red',color:' #581845 '},
				layout  : 'absolute',
				x       : 980,
				y       : 10,
	 			items:[
			 			  { 
				                	xtype       : 'label',
				                	text        : 'FELT',
				                	labelWidth  : 50,
				                	width       : 150,
				                	x           : 0,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : 65,
				                	y           : 10,
				                    	border      : false,
				                	items: [txtfeltper]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'wire',
				                	labelWidth  : 50,
				                	width       : 150,
				                	x           : 0,
				                	y           : 50,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : 65,
				                	y           : 45,
				                    	border      : false,
				                	items: [txtwireper]
				                   }, 	
					],
				},
		           { 
		               xtype   : 'fieldset',
				title   : 'PRODUCTION PERFORMANCE',
				layout  : 'hbox',
				border  : true,
				height  : 150,
				width   : 250,
				style:{ border:'1px solid red',color:' #581845 '},
				layout  : 'absolute',
				x       : 980,
				y       : 330,
	 			items:[
			 			  { 
				                	xtype       : 'label',
				                	text        : 'Month Upto Date M/c Production',
				                	labelWidth  : 50,
				                	width       : 150,
				                	x           : 0,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : 65,
				                	y           : 10,
				                    	border      : false,
				                	items: [txtmonthuptomcprod]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Year Upto Date M/c Production',
				                	labelWidth  : 50,
				                	width       : 150,
				                	x           : 0,
				                	y           : 50,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : 65,
				                	y           : 45,
				                    	border      : false,
				                	items: [txtyearuptomcprod]
				                   }, 	
					],
				},
		    { xtype   : 'fieldset',
		        title   : 'PRODUCTION ENTRY',
		        layout  : 'hbox',
		        border  : true,
		        height  : 570,
		        width   : 950,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
//INSIDE
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 30,
                                	y           : -10,
                                    	border      : false,
                                	items: [dtproddate]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 700,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbshift]
                                 },
                                { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 300,
                                	x           : 200,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbsupervisor]
                                  },
                                 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 300,
                                	x           : 450,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmboperator]
                                  },  
		                 {
		                       xtype   : 'fieldset',
		                       title   : 'ENTRY DETAILS',
		                       layout  : 'hbox',
		                       border  : true,
		                       height  : 500,
		                       width   : 900,
			               style:{ border:'1px solid red',color:' #581845 '},
		                       layout  : 'absolute',
		                       x       : 10,
		                       y       : 30,
		                       items:[
				                  { 
				                	xtype       : 'label',
				                	text        : 'MA No',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : 10,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : -55,
				                	y           : 15,
				                    	border      : false,
				                	items: [cmbmano]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Variety',
				                	labelWidth  : 50,
				                	width       : 180,
				                	x           : 100,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 45,
				                	y           : 15,
				                    	border      : false,
				                	items: [cmbvariety]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'MA Qty',
				                	labelWidth  : 50,
				                	width       : 400,
				                	x           : 370,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 300,
				                	y           : 15,
				                    	border      : false,
				                	items: [txtmaqty]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'MA.Bal Qty',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 500,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 430,
				                	y           : 15,
				                    	border      : false,
				                	items: [txtmabalqty]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Deckle',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 620,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 300,
				                	x           : 550,
				                	y           : 15,
				                    	border      : false,
				                	items: [txtdeckle]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Speed',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 735,
				                	y           : 0,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 670,
				                	y           : 15,
				                    	border      : false,
				                	items: [txtspeed]
				                   },btnadd,flxdetail,
				                  { 
				                	xtype       : 'label',
				                	text        : 'Shift Machine Production (M.T)',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 10,
				                	y           : 400,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : -15,
				                	y           : 430,
				                    	border      : false,
				                	items: [txtshiftmcprod]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Machine Run Hours',
				                	labelWidth  : 50,
				                	width       : 100,
				                	x           : 200,
				                	y           : 400,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 125,
				                	y           : 430,
				                    	border      : false,
				                	items: [txtmcrunhrs]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Shift Down time',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 320,
				                	y           : 400,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 285,
				                	y           : 430,
				                    	border      : false,
				                	items: [txtshiftdowntime]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Total Shift Hours',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 480,
				                	y           : 400,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 455,
				                	y           : 430,
				                    	border      : false,
				                	items: [txttotshifthrs]
				                   },
				                  { 
				                	xtype       : 'label',
				                	text        : 'Day Machine Production (M.T)',
				                	labelWidth  : 50,
				                	width       : 200,
				                	x           : 700,
				                	y           : 400,
				                    	border      : false,
				                   },
				                  { 
				                	xtype       : 'fieldset',
				                	title       : '',
				                	labelWidth  : 50,
				                	width       : 500,
				                	x           : 675,
				                	y           : 430,
				                    	border      : false,
				                	items: [txtdaymcprod]
				                   },  
						   { 
						       xtype   : 'fieldset',
						       title   : 'Rollwise Machine Production Entry',
						       layout  : 'hbox',
						       border  : true,
						       height  : 180,
						       width   : 270,
						       style:{ border:'1px solid red',color:' #581845 '},
						       layout  : 'absolute',
						       x       : 10,
						       y       : 55,
						       items:[
						   
								    { 
									xtype       : 'label',
									text        : 'Roll No',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 0,
								    	border      : false,
								    },
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 400,
									x           : 60,
									y           : -10,
								    	border      : false,
									items: [txtrollno]
								    },
								   { 
									xtype       : 'label',
									text        : 'Roll WT (Tons)',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 30,
								    	border      : false,
								    },
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 400,
									x           : 60,
									y           : 20,
								    	border      : false,
									items: [txtrollwt]
								    }, 
								   { 
									xtype       : 'label',
									text        : 'Run Hrs',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 60,
								    	border      : false,
								    },
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 400,
									x           : 60,
									y           : 50,
								    	border      : false,
									items: [txtrunhrs]
								    },
								   { 
									xtype       : 'label',
									text        : 'Calc.Prodn',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 90,
								    	border      : false,
								    },
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 400,
									x           : 60,
									y           : 80,
								    	border      : false,
									items: [txtcalcprodn]
								    },
								   { 
									xtype       : 'label',
									text        : 'Bearks(Nos)',
									labelWidth  : 50,
									width       : 500,
									x           : 0,
									y           : 120,
								    	border      : false,
								    },
								   { 
									xtype       : 'fieldset',
									title       : '',
									labelWidth  : 50,
									width       : 400,
									x           : 60,
									y           : 110,
								    	border      : false,
									items: [txtbreaks]
								    },
							    ]
						     },
								    { 
								       xtype   : 'fieldset',
								       title   : 'Rollwise Downtime Entry',
								       layout  : 'hbox',
								       border  : true,
								       height  : 180,
								       width   : 540,
								       style:{ border:'1px solid red',color:' #581845 '},
								       layout  : 'absolute',
								       x       : 280,
								       y       : 55,
								       items:[
								       
										   { 
											xtype       : 'label',
											text        : 'Department',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 0,
										    	border      : false,
										    }, 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 50,
											width       : 400,
											x           : 100,
											y           : -10,
										    	border      : false,
											items: [cmbdowntimedept]
										    },
										   { 
											xtype       : 'label',
											text        : 'Section',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 30,
										    	border      : false,
										    }, 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 50,
											width       : 400,
											x           : 100,
											y           : 20,
										    	border      : false,
											items: [cmbdownsection]
										    },
										   { 
											xtype       : 'label',
											text        : 'Equipment',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 60,
										    	border      : false,
										    }, 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 50,
											width       : 400,
											x           : 100,
											y           : 50,
										    	border      : false,
											items: [cmbdownequip]
										    },
										   { 
											xtype       : 'label',
											text        : 'Stoppage Reason',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 90,
										    	border      : false,
										    }, 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 50,
											width       : 600,
											x           : 100,
											y           : 80,
										    	border      : false,
											items: [txtstopreason]
										    },
										   { 
											xtype       : 'label',
											text        : 'Start Time',
											labelWidth  : 50,
											width       : 500,
											x           : 0,
											y           : 120,
										    	border      : false,
										    }, 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 50,
											width       : 150,
											x           : 100,
											y           : 110,
										    	border      : false,
											items: [txtsttime]
										    },
										   { 
											xtype       : 'label',
											text        : 'End Time',
											labelWidth  : 50,
											width       : 100,
											x           : 230,
											y           : 120,
										    	border      : false,
										    }, 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 50,
											width       : 150,
											x           : 250,
											y           : 110,
										    	border      : false,
											items: [txtendtime]
										    },
										   { 
											xtype       : 'label',
											text        : 'Down Hrs',
											labelWidth  : 50,
											width       : 100,
											x           : 370,
											y           : 120,
										    	border      : false,
										    }, 
										   { 
											xtype       : 'fieldset',
											title       : '',
											labelWidth  : 50,
											width       : 150,
											x           : 400,
											y           : 110,
										    	border      : false,
											items: [txtdownhrs]
										    },     
								       ],
								},
				           ],
                                     },
                      ], 
                     },		 
                       
                 ],
        
    });

   
    var TrnProdnEntry = new Ext.Window({
	height      : 570,
        width       : 960,
        y           : 35,
        title       : 'PRODUCTION ENTRY',
        items       : TrnProdnFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

	   	
	   	}

		}
    });
    TrnProdnEntry.show();  
});
