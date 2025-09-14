


Ext.onReady(function(){

Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';

var UserDataStore = new Ext.data.Store({
      id: 'UserDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/Modules/UserLogin.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "USERAcc"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'IpUserId', type: 'int', mapping: 'IpUserId'},
        {name: 'user_name', type: 'string', mapping: 'user_name'}
      ]),
      sortInfo:{field: 'IpUserId', direction: "ASC"}
    });

var FinYearDataStore = new Ext.data.Store({
      id: 'FinYearDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/Modules/UserLogin.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "YEARFIN"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'fin_id', type: 'int', mapping: 'fin_id'},
        {name: 'fin_year', type: 'string', mapping: 'fin_year'}
      ]),
           sortInfo:{field: 'fin_id', direction: "DESC"}
    });
    
    var CompDataStore = new Ext.data.Store({
      id: 'CompDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/Modules/UserLogin.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "acccompany"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'comp_code', type: 'int', mapping: 'comp_code'},
        {name: 'comp_name', type: 'string', mapping: 'comp_name'}
      ]),
      sortInfo:{field: 'comp_code', direction: "ASC"}
    });
    
function CheckValid()
{
	var form = myform.getForm();
            if (form.isValid()) {
               var userget=Ext.getCmp('txtUsername').value;
               var passget=Ext.getCmp('txtPassword').getValue();

Ext.Ajax.request({
    url: '/Modules/usrloginchk.php',
    params: {
        username: userget,
        password: passget
    },
    success: function(response){
        var text = response.responseText;
        if(text == "success")
        {
            var ginFinid=Ext.getCmp('cmbfinyear').getValue();
            var gstFinyear=Ext.getCmp('cmbfinyear').getRawValue();
            var gstcompcode=Ext.getCmp('cmbcompany').getValue();
	    var power=Ext.getCmp('txtPasswordpower').getRawValue();
	    var passnew=Ext.getCmp('txtPassword').getRawValue();
            localStorage.setItem("accfinid",ginFinid);
            localStorage.setItem("accfinyear",gstFinyear);
            localStorage.setItem("accuserid",userget);   
            localStorage.setItem("acccompcode",gstcompcode);  
            localStorage.setItem("powerid",power); 
		if(passnew==="accsoft"||passnew==="techsoft"||passnew==="gmfinance123" || passnew==="audit"){     
		window.location.href=('/Financials/GeneralMenuPage.php');
		}
        }
        else
        Ext.Msg.alert('Message', text);
    }
});
}
}

var myform= new Ext.form.FormPanel({
        width:290,
        height:200,
        id: 'myFormPanel',
        renderTo:document.body,
         bodyStyle:{"background-color":"#3399CC"},
        bodyStyle   : 'padding: 20px',
        title:'FINANCIAL SYSTEM',
        method        : 'POST',
        monitorValid:true,
        frame:true,
items:[
{
        xtype:'combo',
        fieldLabel:'UserName',
        width:150,
        id:'txtUsername',
        name:'txtUsername',
        mode: 'local',
        store: UserDataStore,
        displayField:'user_name',
        valueField: 'IpUserId',
        typeAhead: true,
        forceSelection: false,
	allowBlank:false,
        triggerAction: 'all',
        selectOnFocus:false,
        hiddenName:'IpUserId',
	editable:false
},
{
        xtype:'textfield',
        fieldLabel:'Password',
        width:150,
        id:'txtPassword',
        inputType:'password',
        allowBlank:false,
        minLength:3,
        maxLength:30
},
{
        xtype:'textfield',
        fieldLabel:'Power Pass',
        width:150,
        id:'txtPasswordpower',
        inputType:'password',
	value:'capital',
        allowBlank:true,
        minLength:3,
        maxLength:30
},
{
        xtype:'combo',
        fieldLabel:'FinYear',editable: false,
        width:150,
        id:'cmbfinyear',
        name:'cmbfinyear',
	allowBlank:false,
        mode: 'local',
        store: FinYearDataStore,
        displayField:'fin_year',
        valueField: 'fin_id',
        typeAhead: true,
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus:false,
        hiddenName:'fin_id',
	editable:false
},
{
        xtype:'combo',
        fieldLabel:'Company',
        width:150,
        id:'cmbcompany',
        name:'cmbcompany',
        mode: 'remote',
	allowBlank:false,
        store: CompDataStore,
        displayField:'comp_name',
        valueField: 'comp_code',
        typeAhead: true,
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus:false,
        hiddenName:'comp_code',
	editable:false
}
],
buttonAlign:'center',
buttons:[{text:'Login',handler:CheckValid},{text:'Reset',handler: function () {
                window.open("/Modules/UserLogin.php", "_self");
            }}],
});

new Ext.Window({
            height      : 250,
            width       : 325,
            bodyStyle   : 'padding: 20px',
            layout      : 'fit', bodyStyle:{"background-color":"#3399CC"},
            labelWidth  : 70,
            defaultType : 'field',
            region: 'left',
            closable : false,
            draggable : false,
            resizable:false,
            title : '',
            y:220,
		x:450,
            items : [myform,]
    }).show();
UserDataStore.load(); 
FinYearDataStore.load();
});

