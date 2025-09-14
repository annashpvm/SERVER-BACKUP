/**
 * @class Ext.ux.grid.HybridSummary
 * @extends Ext.ux.grid.GroupSummary
 * Adds capability to specify the summary data for the group via json as illustrated here:
 * <pre><code>
{
    data: [
        {
            projectId: 100,     project: 'House',
            taskId:    112, description: 'Paint',
            estimate:    6,        rate:     150,
            due:'06/24/2007'
        },
        ...
    ],

    summaryData: {
        'House': {
            description: 14, estimate: 9,
                   rate: 99, due: new Date(2009, 6, 29),
                   cost: 999
        }
    }
}
 * </code></pre>
 *
 */
Ext.ux.grid.HybridSummary = Ext.extend(Ext.ux.grid.GroupSummary, {
    /**
     * @private
     * @param {Object} rs
     * @param {Object} cs
     */
    calculate : function(rs, cs){
        var gcol = this.view.getGroupField(),
            gvalue = rs[0].data[gcol],
            gdata = this.getSummaryData(gvalue);
        return gdata || Ext.ux.grid.HybridSummary.superclass.calculate.call(this, rs, cs);
    },

    /**
     * <pre><code>
grid.on('afteredit', function(){
    var groupValue = 'Ext Forms: Field Anchoring';
    summary.showSummaryMsg(groupValue, 'Updating Summary...');
    setTimeout(function(){ // simulate server call
        // HybridSummary class implements updateSummaryData
        summary.updateSummaryData(groupValue,
            // create data object based on configured dataIndex
            {description: 22, estimate: 888, rate: 888, due: new Date(), cost: 8});
    }, 2000);
});
     * </code></pre>
     * @param {String} groupValue
     * @param {Object} data data object
     * @param {Boolean} skipRefresh (Optional) Defaults to false
     */
    updateSummaryData : function(groupValue, data, skipRefresh){
        var json = this.grid.getStore().reader.jsonData;
        if(!json.summaryData){
            json.summaryData = {};
        }
        json.summaryData[groupValue] = data;
        if(!skipRefresh){
            this.refreshSummary(groupValue);
        }
    },

    /**
     * Returns the summaryData for the specified groupValue or null.
     * @param {String} groupValue
     * @return {Object} summaryData
     */
    getSummaryData : function(groupValue){
        var reader = this.grid.getStore().reader,
            json = reader.jsonData,
            fields = reader.recordType.prototype.fields,
            v;
            
        if(json && json.summaryData){
            v = json.summaryData[groupValue];
            if(v){
                return reader.extractValues(v, fields.items, fields.length);
            }
        }
        return null;
    }
});

//backwards compat
Ext.grid.HybridSummary = Ext.ux.grid.HybridSummary;
