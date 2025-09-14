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


var summary = new Ext.ux.grid.GroupSummary();

    var tree = new Ext.ux.tree.TreeGrid({
        title: 'TRIAL BALANCE',
        width: 1200,
        height: 550,
        renderTo: Ext.getBody(),
        enableDD: true,

        columns:[{
            header: 'GROUP / LEDGER NAME',
            dataIndex: 'ledgername',
            width: 600
        },{
            header: 'Debit Amount',
            width: 100,
            dataIndex: 'DebitAmount',
            align: 'center',
            sortType: 'asFloat',

        },
/* 
{
            header: 'Credit Amount',
            width: 150,
            dataIndex: 'CreditAmount',

        }
*/
            {header: "Credit Amount " , dataIndex: 'CreditAmount', sortable:true,width:100,align:'right',summaryType: 'sum',renderer:function (value, record) {return Ext.util.Format.number(value, '0,0.00');}},

],

     //   dataUrl: 'treegrid-data.json'
          dataUrl: 'test.json'
    });
   tree.getRootNode().reload();
});
