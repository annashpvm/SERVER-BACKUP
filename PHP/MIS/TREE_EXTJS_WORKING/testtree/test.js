//Ext.BLANK_IMAGE_URL = '/Financials/General/testtree/ext/resources/images/default/s.gif';

Ext.onReady(function () {
    Ext.QuickTips.init();

// Grouping Grid

    function totalStores(v, params, data)
    {
        params.attr = 'ext:qtip="Total no. of Items"'; // summary column tooltip example
        return v ? ((v === 0 || v > 1) ? 'Grand Total  : (' + v + ' Items)' : 'Total  Invoices  : (1 Items)') : '';
    }

    var summary = new Ext.ux.grid.GridSummary();


//cust_ref,cust_add1,cust_add2,cust_add3,cust_gstin

    var cfareader = new Ext.data.JsonReader({}, [
        {name: 'cust_ref'},
        {name: 'cust_add1'},
        {name: 'cust_add2'},
        {name: 'cust_cr_days'},
        {name: 'cust_gstin'}
    ]);


    var gridstore = new Ext.data.GroupingStore({
        autoLoad : true,
//        url: '/Financials/General/testtree/testclass.php'
        url: 'testclass.php'
        , reader: cfareader
        , sortInfo: {field: 'cust_ref', direction: 'ASC'}
        , groupField: ['cust_gstin'],
        listeners:
                {
                    'load': function ()
                    {
                        if (this.getCount() <= 0)
                        {
                            Ext.Msg.alert("Alert", "Details not found")
                        }
                    }
                }
    })


    var grid = new Ext.grid.GridPanel({
        store: gridstore,
        frame: true,
	hidden:true,
        title: '',
        autoShow: true,
        loadMask: true,
        stripeRows: true,
        height: 500,
        width: 1500,
        plugins: [summary],
        columns: [new Ext.grid.RowNumberer(),
            {header: "Customer Name", width: 200, sortable: true, dataIndex: 'cust_ref'},
            {header: "Customer Address1", width: 50, sortable: true, dataIndex: 'cust_add1'},
            {header: "Customer Address2", width: 350, sortable: true, dataIndex: 'cust_add2'},
            {header: 'GST', width: 300, align: 'left', sortable: true, dataIndex: 'cust_gstin', summaryType: 'count', summaryRenderer: totalStores},
            {header: 'Qty', width: 75, align: 'left', sortable: true, dataIndex: 'cust_cr_days', summaryType: 'sum'},
        ],
        view: new Ext.grid.GroupingView({
            forceFit: true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Items"]})'
        }),
        listeners:
                {
                    mouseover: function ()
                    {

                    }
                }
    })

    // Create the "SampleTreePanel" pre-configured class

    SampleTreePanel = Ext.extend(Ext.tree.TreePanel, {
        title: 'Reporting',
        width: 320,
        height: 610,
        autoScroll: true,
        rootVisible: false,
        border: false,
        initComponent: function () {
            Ext.apply(this, {
                root: new Ext.tree.AsyncTreeNode({
                    children: [
                        {
                            text: 'Transaction',
                            expanded: false,
                            children: [
                                {
                                    text: 'Invoice',
                                    leaf: true,
                                    listeners:
                                            {
                                                click: function ()
                                                {
						 gridstore.removeAll();
                                                 gridstore.load();
						 grid.show(); 	
                                                }
                                            }
                                }
                            ]
                        },
                        {
                            text: 'Reports',
                            expanded: false,
                            children: [
                                {
                                    text: 'Details Report',
                                    leaf: true,
                                    listeners:
                                            {
                                                click: function ()
                                                {
                                                    /*Ext.Msg.alert("Please Wait", "Details Report")
                                                    var redirect = '/repotrs/Details.php';
                                                    location.href = redirect;*/
						    grid.hide(); 	
                                                }
                                            }
                                }
                            ]
                        }
                    ]
                })
            })

            SampleTreePanel.superclass.initComponent.apply(this, arguments);
        }
    });

    Ext.reg('tree_panel', SampleTreePanel);

    var tree = new SampleTreePanel();

    tree.on('click', function (node, e) {
        debugger;
    }, this);

    var myFormPanel = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Detail',
        header: false,
        width: 1350,
        height: 600,
        bodyStyle: {"background-color": "#344F8C"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        x: 0,
        y: 0,
        frame: false,
        id: 'myFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, []),
        items: [ 
		    {
                        xtype: 'fieldset',
                        title: '',
                        width: 850,
            		height: 650,
                        x: 330,
                        y: 10,
                        border: false,
                        items: [grid]
                    },tree
        ],
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 30,
            items: [
		"TreeView"
            ]
        }
    })

    var wind = new Ext.Window({
        plain: true,
        height: 600,
        width: 1200,
        y: 45,
        items: tree,
        bodyStyle: {"background-color": "#3399CC"},
        layout: 'absolute',
        closable: true, 
        maximized: false,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        items: [myFormPanel],
        listeners:
                {
                    show: function ()
                    {
			
                    }
                }
    });

    wind.show();

});



