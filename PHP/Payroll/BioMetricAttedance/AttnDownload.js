
    Ext.onReady(function () {

        Ext.QuickTips.init();

        var GinFinid = localStorage.getItem('ginfinid');
        var Gincompcode = localStorage.getItem('gincompcode');
        var finstartdate = localStorage.getItem('gfinstdate');
        var finenddate = localStorage.getItem('gfineddate');
     
         //	localStorage.setItem("gfinstdate",finstdate);
     
         var gstfinyear = localStorage.getItem('gstyear');
        var userid = localStorage.getItem('ginuserid');
        var usertype = localStorage.getItem('ginuser');
     
     
        usertype = 1
        var  gsttype = localStorage.getItem('GSTTYPE');
        var  invfin = localStorage.getItem('invfin');
     
        var  fromyear = localStorage.getItem('fromyear');
        var  toyear = localStorage.getItem('toyear');
        
        
        /* ================= DATE LOGIC ================= */


  
        function getAutoDates() {


          var now   = new Date();
          var year  = now.getFullYear();
          var month = now.getMonth(); // 0-based
          var day   = now.getDate();
  
          // From Date = 1st of current month
          var fromDate = new Date(year, month, 1);
  
          // Last day of current month
          var lastDay = new Date(year, month + 1, 0).getDate();
  
          var endDate;
  
          if (day === lastDay) {
              // If today is month end → next month 1st
              endDate = new Date(year, month + 1, 1);
          } else {
              // Else → today
              endDate = new Date(year, month, day);
          }


  
          return {
              month: month + 1,
              year: year,
              fromDate: fromDate,
              endDate: endDate
          };
      }



        function getYearsFromGST(gstfinyear) {

          if (!gstfinyear) return [];
      
          var parts = gstfinyear.split('-'); // ["2025","2026"]
      
          if (parts.length !== 2) return [];
      
          return [
              [parseInt(parts[0], 10)],
              [parseInt(parts[1], 10)]
          ];
      }

      
        function setDatesByMonthYear() {

          var month = Ext.getCmp('cmbMonth').getValue(); // 1–12
          var year  = Ext.getCmp('cmbYear').getValue();  // yyyy
      
          if (!month || !year) return;
      
          var today = new Date();
      
          // From Date → 1st of selected month
          var fromDate = new Date(year, month - 1, 1);
      
          var endDate;
      
          // If selected month/year is CURRENT month/year
          if (month === (today.getMonth() + 1) && year === today.getFullYear()) {
      
              // End Date = today
              endDate = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
              );
      
          } else {
      
              // End Date = 1st of next month
              if (month === 12) {
                  endDate = new Date(year + 1, 0, 1); // Jan next year
              } else {
                  endDate = new Date(year, month, 1);
              }
          }
      
          Ext.getCmp('FromDate').setValue(fromDate);
          Ext.getCmp('ToDate').setValue(endDate);
      }

      
        function getAuTiDates() {

            var now   = new Date();
            var year  = now.getFullYear();
            var month = now.getMonth(); // 0-based
            var day   = now.getDate();

            // From Date = 1st of current month
            var fromDate = new Date(year, month, 1);

            // Last day of current month
            var lastDay = new Date(year, month + 1, 0).getDate();

            var endDate;

            if (day === lastDay) {
                // If today is month end → next month 1st
                endDate = new Date(year, month + 1, 1);
            } else {
                // Else → today
                endDate = new Date(year, month, day);
            }

            return {
                month: month + 1,
                year: year,
                fromDate: fromDate,
                endDate: endDate
            };
        }

        /* ================= STORES ================= */


  var monthStore = new Ext.data.ArrayStore({
    fields: ['id', 'name'],
    data: [
        [1, 'January'], [2, 'February'], [3, 'March'],
        [4, 'April'], [5, 'May'], [6, 'June'],
        [7, 'July'], [8, 'August'], [9, 'September'],
        [10, 'October'], [11, 'November'], [12, 'December']
    ]
});

var yearData = getYearsFromGST(gstfinyear);

var yearStore = new Ext.data.ArrayStore({
    fields: ['year'],
    data: yearData
});


var FromDate = new Ext.form.DateField({
  fieldLabel : 'From Date',
  id         : 'FromDate',
  name       : 'date',
  format     : 'd-m-Y',
  value      : new Date(),

  width : 100,
  labelStyle	: "font-size:12px;font-weight:bold;",
  listeners:{
          change:function(){

          }
  }
});

var ToDate = new Ext.form.DateField({
  fieldLabel : 'To Date',
  id         : 'ToDate',
  name       : 'date',
  format     : 'd-m-Y',
  value      : new Date(),

  width : 100,
  labelStyle	: "font-size:12px;font-weight:bold;",
  listeners:{
          change:function(){

          }
  }
});

var cmbMonth = new Ext.form.ComboBox({
  fieldLabel      : 'Month ',
  id              : 'cmbMonth',
  width           : 170,
  store           : monthStore,
  displayField    : 'name',
  valueField      : 'id',
  typeAhead       : true,
  mode            : 'local',
  forceSelection  : true,
  triggerAction   : 'all',
  selectOnFocus   : false,
  editable        : true,
  tabIndex	: 0,
  allowblank      : true  ,
  labelStyle	: "font-size:12px;font-weight:bold;",
  style      :"border-radius: 5px;  textTransform: uppercase ", 
  listeners: {
    select: function () {
        setDatesByMonthYear();
    }
}  

});


var cmbYear = new Ext.form.ComboBox({
  fieldLabel      : 'Year ',
  id              : 'cmbYear',
  width           : 80,
  store           : yearStore,
  displayField    : 'year',
  valueField      : 'year',
  typeAhead       : true,
  mode            : 'local',
  forceSelection  : true,
  triggerAction   : 'all',
  selectOnFocus   : false,
  editable        : true,
  tabIndex	: 0,
  allowblank      : true  ,
  labelStyle	: "font-size:12px;font-weight:bold;",
  style      :"border-radius: 5px;  textTransform: uppercase ",
  listeners: {
    select: function () {
        setDatesByMonthYear();
    }
} 

});

        
var btnUpload = new Ext.Button({
  text    : "IMPORT - Logs from Bio-Metric",
  width: 120,   // increase width
  height: 35,  

  id      : 'btnAccUpdate',
  border: 1,
  style: {
      borderColor: 'blue',
      borderStyle: 'solid',

  }, 
  handler: function () {
    Ext.Msg.alert('Import', 'Import logs clicked');
  }
    
});


var btnProcess = new Ext.Button({
  text    : "Process",
  width   : 80,   // increase width
  height  : 35,  
  id      : 'btnProcess',
  border: 1,
  style: {
      borderColor: 'blue',
      borderStyle: 'solid',

  }, 
  handler: function () {
    Ext.Msg.alert('Import', 'Import logs clicked');
  }
    
});


var btnExit = new Ext.Button({
  text    : "Exit",
  width   : 80,   // increase width
  height  : 35,  
  id      : 'btnExit',
  border: 1,
  style: {
      borderColor: 'blue',
      borderStyle: 'solid',

  }, 
  handler: function () {
    TrnAttnWindow.close();
  }
    
});

var TrnAttnPanel = new Ext.FormPanel({
  renderTo    : Ext.getBody(),
  xtype       : 'form',
  title       : 'UPLOAD',
  header      : false,
  width       : 1300,
  height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
  x           : 0,
  y           : 0,
  frame       : false,
  id          : 'TrnAttnPanel',
  method      : 'POST',
  layout      : 'absolute', 
  items: [  
    {
      xtype       : 'fieldset',
      title       : '',
      width       : 900,
      height      : 300,
      x           : 10,
      y           : 10,
      border      : true,
      layout      : 'absolute',
//item - 3 - start
      items:[
             { 
              xtype       : 'fieldset',
              title       : '',
              labelWidth  : 80,
              width       : 300,
              x           : 10,
              y           : 10,
              border      : false,
              items: [cmbMonth]
             },
             { 
              xtype       : 'fieldset',
              title       : '',
              labelWidth  : 80,
              width       : 200,
              x           : 300,
              y           : 10,
              border      : false,
              items: [cmbYear]
             },

             { 
              xtype       : 'fieldset',
              title       : '',
              labelWidth  : 1,
              width       : 300,
              x           : 500,
              y           : 10,
              border      : false,
              items: [btnUpload]
             },             

             { 
              xtype       : 'fieldset',
              title       : '',
              labelWidth  : 80,
              width       : 300,
              x           : 10,
              y           : 80,
              border      : false,
              items: [FromDate]
             },
             { 
              xtype       : 'fieldset',
              title       : '',
              labelWidth  : 80,
              width       : 250,
              x           : 300,
              y           : 80,
              border      : false,
              items: [ToDate]
             },             

             { 
              xtype       : 'fieldset',
              title       : '',
              labelWidth  : 1,
              width       : 300,
              x           : 100,
              y           : 150,
              border      : false,
              items: [btnProcess]
             },   


             { 
              xtype       : 'fieldset',
              title       : '',
              labelWidth  : 1,
              width       : 300,
              x           : 300,
              y           : 150,
              border      : false,
              items: [btnExit]
             },   
            ]
    }     
  ]
});        

var TrnAttnWindow = new Ext.Window({
    height      : 900,
    width       : 1350,
    y           : 30,
    title: '<span style="color:blue;font-size:16px;">EMPLOYEE ATTENDANCE UPLOAD FROM BIO-METRIC SYSTEMS</span>',
    items       : TrnAttnPanel,
    layout      : 'fit',
    closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
    minimizable : true,
    maximizable : true,
    resizable   : false,
    border      : false,
    draggable   : false,
    onEsc:function(){
    },
    listeners:{
      render: function () {


         var d = getAutoDates();

  
         Ext.getCmp('cmbMonth').setValue(d.month);
         Ext.getCmp('cmbYear').setValue(d.year);
         Ext.getCmp('FromDate').setValue(d.fromDate);
         Ext.getCmp('ToDate').setValue(d.endDate);

     }
    } 
});
   TrnAttnWindow.show();  

    });
