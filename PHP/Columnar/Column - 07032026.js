Ext.onReady(function () {

var pageSize = 1000;
var grid = null;
var store = null;
var allData = [];

/* ===============================
   FILTER CONTROLS
   =============================== */

var fromDate = new Ext.form.DateField({
    width:110,
    format:'d-m-Y',
    emptyText:'From Date'
});

var toDate = new Ext.form.DateField({
    width:110,
    format:'d-m-Y',
    emptyText:'To Date'
});

var txtSearch = new Ext.form.NumberField({
    width:120,
    allowDecimals:false,
    allowNegative:false,
    emptyText:'Enter number'
});

var btnLoad = new Ext.Button({
    text:'Load Data',
    handler:function(){

        if(!txtSearch.getValue()){
            Ext.Msg.alert('Validation','Please enter a number');
            return;
        }

        loadData();
    }
});

new Ext.Panel({
    renderTo:Ext.getBody(),
    border:false,
    padding:10,
    tbar:[
        'Number :',txtSearch,
        'From :',fromDate,
        'To :',toDate,
        btnLoad
    ]
});

/* ===============================
   LOAD DATA
   =============================== */

function loadData(){

Ext.Ajax.request({

    url:'Data.php',
    method:'POST',

    params:{
        search:txtSearch.getValue(),
        fromdate:Ext.util.Format.date(fromDate.getValue(),"Y-m-d"),
        todate:Ext.util.Format.date(toDate.getValue(),"Y-m-d")
    },

    success:function(resp){

        var obj = Ext.decode(resp.responseText);

        allData = obj.data || [];

        if(allData.length==0){
            Ext.Msg.alert('Info','No data found');
            return;
        }

        var fields=[{name:'__isTotal'}];
        var columns=[];

        Ext.iterate(allData[0],function(key,value){

            fields.push({name:key});

            var keyUpper = key.toUpperCase();

            var nonAmount =
            keyUpper.indexOf('UOM')!=-1 ||
            keyUpper.indexOf('NO')!=-1 ||
            keyUpper.indexOf('DATE')!=-1 ||
            keyUpper.indexOf('GSTIN')!=-1;

            var numericValue =
            value!==null &&
            value!=='' &&
            !isNaN(value);

            var isAmount = numericValue && !nonAmount;

            columns.push({

                header:keyUpper,
                dataIndex:key,
                width:120,
                align:isAmount?'right':'left',
                hidden:(keyUpper=='ACCREF_SEQNO'),
                isAmount:isAmount,

                renderer:(function(isAmt){
                    return function(v,meta,rec){

   
                        if(isAmt){
                            if(!v || parseFloat(v)==0){
                                return '';
                            }
                        }

                        return (v===null||v==='')?'&nbsp;':v;
                    };
                })(isAmount)

            });

        });

/* ===============================
   GRID CREATION
   =============================== */

if(!store){

store = new Ext.data.JsonStore({
    fields:fields,
    data:[]
});




grid = new Ext.grid.GridPanel({

renderTo:Ext.getBody(),
store:store,
columns:columns,
width:1200,
height:600,
title:'COLUMNAR REPORT',

autoScroll:true,
stripeRows:true,
enableKeyEvents:true,
viewConfig: {
    getRowClass: function(record){

        if(record.get('__isTotal') === true){
            return 'grid-grand-total';
        }

        return '';
    }
}
,


listeners:{

    
    rowdblclick:function(grid,rowIndex,e){

        var rec = grid.getStore().getAt(rowIndex);


    
        if(rec.get('__isTotal')===true){
            return;
        }
    

        var data = rec.data;

  //      console.log(data);   // this WILL show data in console
    
        var voucherno = data.Voucher_No || data.Voucher_No;
    
        Ext.Msg.alert('Voucher No', voucherno);
    
        
    },

    afterrender:function(grid){

        var view   = grid.getView();
        var paging = grid.getBottomToolbar();

        /* make grid focusable */
        view.mainBody.dom.tabIndex = 0;

        /* focus grid when clicked */
        view.mainBody.on('click',function(){
            view.mainBody.dom.focus();
        });

        /* key handler */
        view.mainBody.on('keydown',function(e){

            var key = e.getKey();

            /* PAGE DOWN */
            if(key == e.PAGE_DOWN){

                var start = paging.cursor + paging.pageSize;

                if(start < allData.length){
                    paging.doLoad(start);
                }

                e.stopEvent();
            }

            /* PAGE UP */
            if(key == e.PAGE_UP){

                var start = paging.cursor - paging.pageSize;

                if(start >= 0){
                    paging.doLoad(start);
                }

                e.stopEvent();
            }

        });

    }

}
,
tbar:[

{
text:'Export Excel',
handler:function(){
exportGrid('excel','A4');
}
},

'-',

{
text:'Export PDF',
handler:function(){

Ext.Msg.show({

title:'Paper Size',
msg:'Select Paper Size',

buttons:{
ok:'A4',
yes:'LEGAL'
},

fn:function(btn){

var paper=(btn=='yes')?'LEGAL':'A4';

exportGrid('pdf',paper);

}

});

}

}

],

bbar:new Ext.PagingToolbar({

pageSize:pageSize,
store:store,
displayInfo:true,

doLoad:function(start){

loadPage(start);

}

})

});

}
else{

grid.reconfigure(store,columns);

}

loadPage(0);

}

});

}

/* ===============================
   PAGE LOAD + TOTAL
   =============================== */

   function loadPage(start){

    var pageData = allData.slice(start,start+pageSize);
    
    var totals={};
    
    var cm=grid.getColumnModel();
    
    Ext.each(cm.config,function(col,index){
    
    if(cm.isHidden(index))return;
    
    if(col.isAmount){
    totals[col.dataIndex]=0;
    }
    
    });
    
    Ext.each(pageData,function(row){
    
    Ext.iterate(totals,function(key){
    
    var v=parseFloat(row[key]);
    
    if(!isNaN(v)){
    totals[key]+=v;
    }
    
    });
    
    });
    
    var totalRow={};
    
    var labelPlaced=false;
    
    Ext.each(cm.config,function(col,index){
    
    if(cm.isHidden(index))return;
    
    if(!labelPlaced && col.isAmount!==true){
    
    totalRow[col.dataIndex]='GRAND TOTAL';
    labelPlaced=true;
    
    }
    else if(totals[col.dataIndex]!==undefined){
    
    var name=col.dataIndex.toUpperCase();
    
    if(name.indexOf('QTY')!=-1){
    totalRow[col.dataIndex]=totals[col.dataIndex].toFixed(3);
    }
    else{
    totalRow[col.dataIndex]=totals[col.dataIndex].toFixed(2);
    }
    
    }
    else{
    totalRow[col.dataIndex]='';
    }
    
    });
    totalRow['__isTotal']=true;
    
    pageData.push(totalRow);
    
    store.loadData(pageData);
    
    store.totalLength=allData.length;
    
    /* IMPORTANT FIX */
    var paging = grid.getBottomToolbar();
    paging.cursor = start;
    
    paging.updateInfo();
    
    }

/* ===============================
   EXPORT FUNCTION
   =============================== */

function exportGrid(type,paper){

var millname="SRI HARI VENKATESWARA PAPER MILLS (P) LTD";

var heading="REPORT FROM";

var fromdate=Ext.util.Format.date(fromDate.getValue(),"d-m-Y");

var todate=Ext.util.Format.date(toDate.getValue(),"d-m-Y");

var cleanColumns=[];

var exportData=Ext.decode(Ext.encode(allData));

var totals={};

var cm=grid.getColumnModel();

for(var i=0;i<cm.getColumnCount();i++){

if(!cm.isHidden(i)){

var c=cm.getColumnAt(i);

cleanColumns.push({

header:c.header,
dataIndex:c.dataIndex,
align:c.align||'left',
isAmount:c.isAmount===true

});

if(c.isAmount){

totals[c.dataIndex]=0;

}

}

}

Ext.each(exportData,function(row){

Ext.iterate(totals,function(k){

var v=parseFloat(row[k]);

if(!isNaN(v)){
totals[k]+=v;
}

});

});

var totalRow={};

var labelPlaced=false;

Ext.each(cleanColumns,function(col){

if(!labelPlaced && col.isAmount!==true){

totalRow[col.dataIndex]='GRAND TOTAL';

labelPlaced=true;

}
else if(totals[col.dataIndex]!==undefined){

var name=col.dataIndex.toUpperCase();

if(name.indexOf('QTY')!=-1){

totalRow[col.dataIndex]=totals[col.dataIndex].toFixed(3);

}
else{

totalRow[col.dataIndex]=totals[col.dataIndex].toFixed(2);

}

}
else{

totalRow[col.dataIndex]='';

}

});

exportData.push(totalRow);

var form=document.createElement("form");

form.method="POST";

form.action="export_"+type+".php";

if(type=='pdf')form.target="_blank";

function addField(name,value){

var input=document.createElement("input");

input.type="hidden";

input.name=name;

input.value=value;

form.appendChild(input);

}

addField("columns",Ext.encode(cleanColumns));
addField("data",Ext.encode(exportData));
addField("fname","columnar_report");
addField("paper",paper||'A4');
addField("millname",millname);
addField("heading",heading);
addField("fromdate",fromdate);
addField("todate",todate);

document.body.appendChild(form);

form.submit();

document.body.removeChild(form);

}

});