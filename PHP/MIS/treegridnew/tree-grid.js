/*
This file is part of Ext JS 3.4

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-04-03 15:07:25
*/
Ext.onReady(function() {
    Ext.QuickTips.init();


var loaddesignationdatastore = new Ext.data.Store({
      id: 'loaddesignationdatastore',
   //   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clstreetest.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
          //  baseParams:{task:"loadDesignation"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'id','cust_ref','invh_totwt','invh_netamt'
      ]),
    });	



    var tree = new Ext.ux.tree.TreeGrid({
        title: 'TREE GRID',
        width: 600,
        height: 420,
        renderTo: Ext.getBody(),
        enableDD: true,
        dataUrl: 'Clstreetest.php',
        columns:[
        {
            header: 'Code',
            dataIndex: 'id',
            width: 70,
     //       hidden : 'true',
        },
        {
            header: 'Customer',
            dataIndex: 'cust_ref',
            width: 230
        },
        {
            header: 'Weight',
            width: 150,
            dataIndex: 'invh_totwt'
        },
       {
            header: 'Net Amount',
            width: 100,
            dataIndex: 'invh_netamt',
            align: 'center',
            sortType: 'asFloat',

            tpl: new Ext.XTemplate('{invh_netamt:this.formatHours}', {
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
                    dataUrl:  'Clstreetest.php'

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
                        grpparent: node.id

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


/*
        listeners: {
            beforeexpandnode: function (node) {
                node.removeAll();
            },
            expandnode: function (node) {

                Ext.Ajax.request({
                    url: '/SHVPM/Accounts/RepFinance/RepTrialBalance/clsTrialbal.php',
                    params: {
                        grpparent: node.id
//                        grpparent: 1
                    },
                    success: function (response, me) {
                        var nodearr = [];
                        nodearr = Ext.decode(response.responseText);
                        node.appendChild(nodearr);
                    }
                });
                SubGroupsdatastore.removeAll();
                SubGroupsdatastore.load({
                    url: '/SHVPM/Accounts/clsAccounts4.php',
                    params:
                            {
                                task: "getsubgroup",
                                grpparent: node.id,
                                gincompcode : GinCompcode
                            },
                    callback: function () {
                        GetGridTotal();
                    }
                });
            },
            click: function (node) {
//alert("Node Clicked");
                node.removeAll();
                Ext.Ajax.request({
                    url: '/SHVPM/Accounts/RepFinance/RepTrialBalance/clsTrialbal.php',
                    params: {
                        grpparent: node.id
                    },
                    success: function (response, me) {
                        var nodearr = [];
                        nodearr = Ext.decode(response.responseText);
                        node.appendChild(nodearr);
                    }
                });
                SubGroupsdatastore.removeAll();
                SubGroupsdatastore.load({
                    url: '/SHVPM/Accounts/clsAccounts4.php',
                    params:
                            {
                                task: "getsubgroup",
                                grpparent: node.id,
                                gincompcode : GinCompcode
                            },
                    callback: function () {
                        GetGridTotal();
                    }
                });
            }
        },


//        dataUrl: 'treegrid-data.json'
//          dataUrl: 'Clstreetest.php',
*/
            });


                loaddesignationdatastore.removeAll();
                loaddesignationdatastore.load({
                    url: 'Clstreetest.php',
                    callback: function () {
                    }
                }); 


 var treeNode = tree.getRootNode();
          
        });
