
Ext.onReady(function() {
    Ext.QuickTips.init();

var GetModuleListDatastore = new Ext.data.TreeStore({
      id: 'GetModuleListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clsgridtest.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
     
   {name:'cust_ref',type:'string'},
      {name:'invh_no',type:'int'},
      {name:'invh_date' },
      {name:'invh_totwt',type:'float'},
      {name:'invh_netamt',type:'float'}   


      ]
      
      
      ),
      sortInfo: {field: 'cust_ref', direction: 'ASC'},
            groupField: 'cust_ref'
});




    var tree = new Ext.ux.tree.TreeGrid({
        title: 'Customer List',
        width: 900,
        height: 500,
        renderTo: Ext.getBody(),
        enableDD: true,

        columns:[{
            header: 'Task',
            dataIndex: 'task',
            width: 230
        },{
            header: 'Duration',
            width: 100,
            dataIndex: 'duration',
            align: 'center',
            sortType: 'asFloat',
            tpl: new Ext.XTemplate('{duration:this.formatHours}', {
                formatHours: function(v) {
                    if(v < 1) {
                        return Math.round(v * 60) + ' mins';
                    } else if (Math.floor(v) !== v) {
                        var min = v - Math.floor(v);
                        return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                    } else {
                        return v + ' hour' + (v === 1 ? '' : 's');
                    }
                }
            })
        },{
            header: 'Assigned To',
            width: 150,
            dataIndex: 'user'
        }],

        dataUrl: 'treegrid-data.json'
/*

        columns:[{
            header:'Customer',
            width:330,
            dataIndex:'cust_ref'
        },{
            header:'Inv NO',
            width:100,
            dataIndex:'invh_no'
        },{
            header:'Inv. Date',
            width:100,
            dataIndex:'invh_date'
        },
        {
            header:'Weight',
            width:100,
            dataIndex:'invh_totwt'
        },

        {       
            header:'Inv Amount',
            width:100,
            dataIndex:'invh_netamt'
        },

        ],

        loader: new Ext.tree.TreeLoader({
            store :GetModuleListDatastore,

            uiProviders:{
                'col': Ext.ux.tree.ColumnNodeUI
            }
        }),
 */

    });

   tree.getRootNode().reload();

});
