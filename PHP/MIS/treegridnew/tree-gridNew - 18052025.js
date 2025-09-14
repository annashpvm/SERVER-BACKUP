
Ext.onReady(function() {
    Ext.QuickTips.init();


var loadMainDatastore = new Ext.data.Store({
      id: 'loadMainDatastore',
   //   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClstreeMain.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
          //  baseParams:{task:"loadDesignation"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'main_grpcode','main_grpname',  'debit', 'credit'
      ]),
    });	



    var tree = new Ext.ux.tree.TreeGrid({
        title: 'TREE GRID',
        width: 600,
        height: 420,
        renderTo: Ext.getBody(),
        enableDD: true,
        dataUrl: 'ClstreeMain.php',
        columns:[
        {
            header: 'Code',
            dataIndex: 'main_grpcode',
            width: 70,
     //       hidden : 'true',
        },
        {
            header: 'Group Name',
            dataIndex: 'main_grpname',
            width: 230
        },
        {
            header: 'Debit',
            width: 150,
            dataIndex: 'debit'
        },
       {
            header: 'Credit',
            width: 100,
            dataIndex: 'credit',
            align: 'center',
            sortType: 'asFloat',

            tpl: new Ext.XTemplate('{debit:this.formatHours}', {
                formatHours: function(v) {
                    if(v < 1) {
                        return Math.round(v);
                    } else if (Math.floor(v) !== v) {
               //         var min = v - Math.floor(v);
                        return Math.floor(v);
                    } else {
                        return v ;
                    }
                }
            })

        },

 ],
              loader: new Ext.tree.TreeLoader({
                    dataUrl:  'ClstreeMain.php'

                }),

        listeners: {


//         beforeexpandnode: function (node) {
//                node.removeAll();
//            },


           expandnode: function (node) {
   //     node.removeAll();
                Ext.Ajax.request({
                    url: 'Clstreetest_SubGroup.php',
                    params: {
                        grpparent: node.main_grpcode

                    },
                    success: function (response, me) {
                        var nodearr = [];
                        nodearr = Ext.decode(response.responseText);
                        node.appendChild(nodearr);
                    }
                });

           },        

            click: function (node) {
alert(node.id);

                Ext.Ajax.request({
                    url: 'Clstreetest_SubGroup.php',
                    params: {
                        grpparent: node.id
                    },
                    success: function (response, me) {
                        var nodearr = [];
                        nodearr = Ext.decode(response.responseText);
                        node.appendChild(nodearr);
                    }
                });

            }
        } 
            });




 var treeNode = tree.getRootNode();
          
        });
