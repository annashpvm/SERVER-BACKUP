

//And here is the updated js file:

/**********************************************************************************************
 * JAFFA - Java Application Framework For All - Copyright (C) 2008 JAFFA Development Group
 *
 * This library is free software; you can redistribute it and/or modify it under the terms
 * of the GNU Lesser General Public License (version 2.1 any later).
 *
 * See http://jaffa.sourceforge.net/site/legal.html for more details.
 *********************************************************************************************/

/** Based on Original Work found at http://extjs.com/forum/showthread.php?p=203828#post203828
 *
 * @author chander, PaulE
 */
Ext.namespace("Ext.ux.grid");

Ext.ux.grid.MultiGroupingView = Ext.extend(Ext.grid.GroupingView, {
    constructor: function (config) {
        Ext.ux.grid.MultiGroupingView.superclass.constructor.apply(this, arguments);
        // Added so we can clear cached rows each time the view is refreshed
        this.on("beforerefresh", function () {
            console.debug("MultiGroupingView.beforerefresh: Cleared Row Cache");
            if (this.rowsCache)
                delete this.rowsCache;
        }, this);

    }

    , displayEmptyFields: false

    , renderRows: function () {
        //alert('renderRows');
        var groupField = this.getGroupField();
        var eg = !!groupField;
        // if they turned off grouping and the last grouped field is hidden
        if (this.hideGroupedColumn) {
            var colIndexes = [];
            if (eg)
                for (var i = 0, len = groupField.length; i < len; ++i)
                {
                    var cidx = this.cm.findColumnIndex(groupField[i]);
                    if (cidx >= 0)
                        colIndexes.push(cidx);
                    else
                        console.debug("Ignore unknown column : ", groupField[i]);
                }
            if (!eg && this.lastGroupField !== undefined) {
                this.mainBody.update('');
                for (i = 0, len = this.lastGroupField.length; i < len; ++i)
                {
                    cidx = this.cm.findColumnIndex(this.lastGroupField[i]);
                    if (cidx >= 0)
                        this.cm.setHidden(cidx, false);
                    else
                        console.debug("Error unhiding column " + cidx);
                }
                delete this.lastGroupField;
                delete this.lgflen;
            } else if (eg && colIndexes.length > 0 && this.lastGroupField === undefined) {
                this.lastGroupField = groupField;
                this.lgflen = groupField.length;
                for (i = 0, len = colIndexes.length; i < len; ++i)
                {
                    this.cm.setHidden(colIndexes[i], true);
                }
            } else if (eg && this.lastGroupField !== undefined && (groupField !== this.lastGroupField || this.lgflen != this.lastGroupField.length)) {
                this.mainBody.update('');
                for (i = 0, len = this.lastGroupField.length; i < len; ++i)
                {
                    cidx = this.cm.findColumnIndex(this.lastGroupField[i]);
                    if (cidx >= 0)
                        this.cm.setHidden(cidx, false);
                    else
                        console.debug("Error unhiding column " + cidx);
                }
                this.lastGroupField = groupField;
                this.lgflen = groupField.length;
                for (i = 0, len = colIndexes.length; i < len; ++i)
                {
                    this.cm.setHidden(colIndexes[i], true);
                }
            }
        }
        return Ext.ux.grid.MultiGroupingView.superclass.renderRows.apply(this, arguments);
    }

    /** This sets up the toolbar for the grid based on what is grouped
     * It also iterates over all the rows and figures out where each group should appeaer
     * The store at this point is already stored based on the groups.
     */

    , doRender: function (cs, rs, ds, startRow, colCount, stripe)
    {
        //console.debug ("MultiGroupingView.doRender: ",cs, rs, ds, startRow, colCount, stripe);
        var ss = this.grid.getTopToolbar();
        if (rs.length < 1)
        {
            return '';
        }

        var groupField = this.getGroupField();
        var gfLen = groupField ? groupField.length : 0;

        // Remove all entries already in the toolbar
        for (var hh = 0; hh < ss.items.length - 1; hh++)
        {
            var tb = ss.items.itemAt(hh);
            Ext.removeNode(Ext.getDom(tb.id));
        }
        console.debug("Toobar size is now ", ss.items.length);

        if (gfLen == 0)
        {
            ss.insertButton(ss.items.length - 2, new Ext.Toolbar.TextItem(this.grid.emptyToolbarText));
            console.debug("MultiGroupingView.doRender: No Groups");
        } else
        {
            //console.debug("MultiGroupingView.doRender: Set width to",gfLen," Groups");
            // Add back all entries to toolbar from GroupField[]
            ss.insertButton(ss.items.length - 2, new Ext.Toolbar.TextItem("Grouped By:"));
            for (var gfi = 0; gfi < gfLen; gfi++)
            {
                var t = groupField[gfi];
                if (gfi > 0)
                    ss.insertButton(ss.items.length - 2, new Ext.Toolbar.Separator());
                var b = new Ext.Toolbar.Button({
                    text: this.cm.getColumnHeader(this.cm.findColumnIndex(t))
                });
                b.fieldName = t;
                ss.insertButton(ss.items.length - 2, b);
                //console.debug("MultiGroupingView.doRender: Added Group to Toolbar :",this,t,'=',b.text);
            }
        }

        this.enableGrouping = !!groupField;

        if (!this.enableGrouping || this.isUpdating) {
            return Ext.grid.GroupingView.superclass.doRender.apply(this, arguments);
        }

        var gstyle = 'width:' + this.getTotalWidth() + ';';
        var gidPrefix = this.grid.getGridEl().id;
        var groups = [], curGroup, i, len, gid;
        var lastvalues = [];
        var added = 0;
        var currGroups = [];

        // Loop through all rows in record set
        for (i = 0, len = rs.length; i < len; i++) {
            added = 0;
            var rowIndex = startRow + i;
            var r = rs[i];
            var differ = 0;
            var gvalue = [];
            var fieldName;
            var fieldLabel;
            var grpFieldNames = [];
            var grpFieldLabels = [];
            var v;
            var changed = 0;
            var addGroup = [];

            for (var j = 0; j < gfLen; j++)
            {
                fieldName = groupField[j];
                fieldLabel = this.cm.getColumnHeader(this.cm.findColumnIndex(fieldName));
                v = r.data[fieldName];
                if (v)
                {
                    if (i == 0)
                    {
                        // First record always starts a new group
                        addGroup.push({idx: j, dataIndex: fieldName, header: fieldLabel, value: v});
                        lastvalues[j] = v;
                    } else
                    {
                        if ((typeof (v) == "object" && (lastvalues[j].toString() != v.toString())) || (typeof (v) != "object" && (lastvalues[j] != v)))
                        {
                            // This record is not in same group as previous one
                            //console.debug("Row ",i," added group. Values differ: prev=",lastvalues[j]," curr=",v);
                            addGroup.push({idx: j, dataIndex: fieldName, header: fieldLabel, value: v});
                            lastvalues[j] = v;
                            changed = 1;
                        } else
                        {
                            if (gfLen - 1 == j && changed != 1)
                            {
                                // This row is in all the same groups to the previous group
                                curGroup.rs.push(r);
                                //console.debug("Row ",i," added to current group");
                            } else if (changed == 1)
                            {
                                // This group has changed because an earlier group changed.
                                addGroup.push({idx: j, dataIndex: fieldName, header: fieldLabel, value: v});
                                //console.debug("Row ",i," added group. Higher level group change");
                            } else if (j < gfLen - 1)
                            {
                                // This is a parent group, and this record is part of this parent so add it
                                if (currGroups[fieldName])
                                    currGroups[fieldName].rs.push(r);
                                //else
                                //    console.error("Missing on row ",i," current group for ",fieldName);
                            }
                        }
                    }
                } else {
                    if (this.displayEmptyFields) {
                        addGroup.push({idx: j, dataIndex: fieldName, header: fieldLabel, value: this.emptyGroupText || '(none)'});
                    }
                }
            }//for j
            //if(addGroup.length>0) console.debug("Added groups for row=",i,", Groups=",addGroup);

            for (var k = 0; k < addGroup.length; k++) {
                var grp = addGroup[k];
                gid = gidPrefix + '-gp-' + grp.dataIndex + '-' + Ext.util.Format.htmlEncode(grp.value);

                // if state is defined use it, however state is in terms of expanded
                // so negate it, otherwise use the default.
                var isCollapsed = typeof this.state[gid] !== 'undefined' ? !this.state[gid] : this.startCollapsed;
                var gcls = isCollapsed ? 'x-grid-group-collapsed' : '';
                var rndr = this.cm.config[this.cm.findColumnIndex(grp.dataIndex)].renderer;
                curGroup = {
                    group: rndr ? rndr(grp.value) : grp.value
                    , groupName: grp.dataIndex
                    , gvalue: grp.value
                    , text: grp.header
                    , groupId: gid
                    , startRow: rowIndex
                    , rs: [r]
                    , cls: gcls
                    , style: gstyle + 'padding-left:' + (grp.idx * 12) + 'px;'
                };
                currGroups[grp.dataIndex] = curGroup;
                groups.push(curGroup);

                r._groupId = gid; // Associate this row to a group
            }//for k
        }//for i

        // Flag the last groups as incomplete if more rows are available
        //NOTE: this works if the associated store is a MultiGroupingPagingStore!
        for (gfi = 0; gfi < gfLen; gfi++) {
            var c = currGroups[groupField[gfi]];
            if (this.grid.store.nextKey)
                c.incomplete = true;
            //console.debug("Final Groups are...",c);
        }

        var buf = [];
        var toEnd = 0;
        for (ilen = 0, len = groups.length; ilen < len; ilen++)
        {
            toEnd++;
            var g = groups[ilen];
            var leaf = g.groupName == groupField[gfLen - 1]
            this.doMultiGroupStart(buf, g, cs, ds, colCount);
            if (g.rs.length != 0 && leaf)
                buf[buf.length] = Ext.grid.GroupingView.superclass.doRender.call(this, cs, g.rs, ds, g.startRow, colCount, stripe);

            if (leaf)
            {
                var jj;
                var gg = groups[ilen + 1];

                if (gg != null)
                {
                    for (jj = 0; jj < groupField.length; jj++)
                    {
                        if (gg.groupName == groupField[jj])
                            break;
                    }
                    toEnd = groupField.length - jj;
                }
                for (k = 0; k < toEnd; k++)
                {
                    this.doMultiGroupEnd(buf, g, cs, ds, colCount);
                }
                toEnd = jj;
            }
        }
        // Clear cache as rows have just been generated, so old cache must be invalid
        if (this.rowsCache)
            delete this.rowsCache;
        return buf.join('');
    }

    /** Initialize new templates */
    , initTemplates: function () {
        Ext.ux.grid.MultiGroupingView.superclass.initTemplates.call(this);

        if (!this.startMultiGroup) {
            this.startMultiGroup = new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}">', '<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>', this.groupTextTpl, '</div></div>', '<div id="{groupId}-bd" class="x-grid-group-body">');
        }
        this.startMultiGroup.compile();
        this.endMultiGroup = '</div></div>';
    }

    /** Private - Selects a custom group template if one has been defined
     */
    , doMultiGroupStart: function (buf, g, cs, ds, colCount) {
        var groupName = g.groupName, tpl = null;

        if (this.groupFieldTemplates) {
            tpl = this.groupFieldTemplates[groupName];
            //console.debug("doMultiGroupStart: Template for group ",groupName, tpl);
            if (tpl && typeof (tpl) == 'string') {
                tpl = new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}">', '<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>', tpl, '</div></div>', '<div id="{groupId}-bd" class="x-grid-group-body">');
                tpl.compile();
                this.groupFieldTemplates[groupName] = tpl;
            }
        }
        if (tpl)
            buf[buf.length] = tpl.apply(g);
        else
            buf[buf.length] = this.startMultiGroup.apply(g);
    }

    , doMultiGroupEnd: function (buf, g, cs, ds, colCount) {
        buf[buf.length] = this.endMultiGroup;
    }

    /** Should return an array of all elements that represent a row, it should bypass
     *  all grouping sections
     */
    , getRows: function () {
        var r = [];
        // This function is called may times, so use a cache if it is available
        if (this.rowsCache) {
            r = this.rowsCache;
            //console.debug('View.getRows: cached');
        } else {
            //console.debug('View.getRows: calculate');
            if (!this.enableGrouping) {
                r = Ext.grid.GroupingView.superclass.getRows.call(this);
            } else {
                var groupField = this.getGroupField();
                var g, gs = this.getGroups();
                // this.getGroups() contains an array of DIVS for the top level groups
                //console.debug("Get Rows", groupField, gs);

                r = this.getRowsFromGroup(r, gs, groupField[groupField.length - 1]);
            }
            // Clone the array, but not the objects in it
            if (r.length >= 0) {
                // Don't cache if there is nothing there, as this happens during a refresh
                //@TODO comment this to disble caching, incase of problems
                this.rowsCache = r;
            }// else
            //console.debug("No Rows to Cache!");
        }
        //console.debug("View.getRows: Found ", r.length, " rows",r[0]);
        //console.trace();
        return r;
    }


    /** Return array of records under a given group
     * @param r Record array to append to in the returned object
     * @param gs Grouping Sections, an array of DIV element that represent a set of grouped records
     * @param lsField The name of the grouping section we want to count
     */
    , getRowsFromGroup: function (r, gs, lsField) {
        var rx = new RegExp(".*-gp-" + lsField + "-.*");

        // Loop over each section
        for (var i = 0, len = gs.length; i < len; i++) {

            // Get group name for this section
            var groupName = gs[i].id;
            if (rx.test(groupName)) {
                //console.debug(groupName, " matched ", lsField);
                g = gs[i].childNodes[1].childNodes;
                for (var j = 0, jlen = g.length; j < jlen; j++) {
                    r[r.length] = g[j];
                }
                //console.debug("Found " + g.length + " rows for group " + lsField);
            } else {
                if (!gs[i].childNodes[1]) {
                    console.error("Can't get rowcount for field ", lsField, " from ", gs, i);
                } else
                    // if its an interim level, each group needs to be traversed as well
                    r = this.getRowsFromGroup(r, gs[i].childNodes[1].childNodes, lsField);
            }
        }
        return r;
    }

    /** Override the onLoad, as it always scrolls to the top, we only
     *  want to do this for an initial load or reload. There is a new event registered in
     *  the constructor to do this
     */
    , onLoad: function () {}
});
/**
 * @author chander
 */
/**********************************************************************************************
 * JAFFA - Java Application Framework For All - Copyright (C) 2008 JAFFA Development Group
 *
 * This library is free software; you can redistribute it and/or modify it under the terms
 * of the GNU Lesser General Public License (version 2.1 any later).
 *
 * See http://jaffa.sourceforge.net/site/legal.html for more details.
 *********************************************************************************************/

/** Based on Original Work found at http://extjs.com/forum/showthread.php?p=203828#post203828
 *
 * @author chander, PaulE
 */
Ext.namespace("Ext.ux.grid");

Ext.ux.grid.MultiGroupingStore = Ext.extend(Ext.data.GroupingStore, {

    constructor: function (config) {
        Ext.ux.grid.MultiGroupingStore.superclass.constructor.apply(this, arguments);
    }

    /* ----------------------------------------------------------------------
     Below is needed for Multi Grouping
     ---------------------------------------------------------------------- */
    /**
     * @cfg {Object} sortInfo A config object in the format: [{field: "fieldName", direction: "ASC|DESC"}].  The direction
     * property is case-sensitive.
     *
     * This Override Ext.data.Store as this is now an array
     */
    , sortInfo: []

            /**
             * @param field If a single field is passed in it is appended to the grouped
             *              fields (it is ignored if its already in the list).
             *              If an array is passed, we replace the current list of group
             *              fields with this new list.
             *              If field is empty/null it has the same effect as clearGrouping().
             * @param forceRegroup If true it forces the regroup logic even if there were
             *                     no changes to the groupField list.
             *
             * Overrides Ext.data.GroupingStore
             */

    , groupBy: function (field, forceRegroup)
    {
        //alert("groupBy   " + field + "   " + forceRegroup);
        if (!forceRegroup && this.groupField == field)
        {
            return; // already grouped by this field
        }

        //if field passed in is an array, assume this is a complete replacement for the 'groupField'
        if (Ext.isArray(field)) {
            if (field.length == 0)
                // @todo: field passed in is empty/null, assume this means group by nothing, ie remove all groups
                this.groupField = false;
            else
                this.groupField = field;
        } else {
            // Add the field passed as as an additional group
            if (this.groupField) {
                // If there is already some grouping, make sure this field is not already in here
                if (this.groupField.indexOf(field) == -1)
                    this.groupField.push(field);
                else
                    return; // Already grouped by this field
            } else
                // If there is no grouping already use this field
                this.groupField = [field];
        }
        if (this.remoteGroup) {
            if (!this.baseParams) {
                this.baseParams = {};
            }
            this.baseParams['groupBy'] = this.groupField;
        }
        console.debug("store.groupBy: data=", this.lastOptions);
        if (this.lastOptions != null) { // do nothing if the store has never been loaded
            if (this.groupOnSort) {
                this.sort(field);
                return;
            }
            if (this.remoteGroup) {
                this.reload();
            } else {
                var si = this.sortInfo || [];
                if (si.field != field) {
                    this.applySort();
                } else {
                    //  alert(field);
                    this.sortData(field);
                }
                this.fireEvent('datachanged', this);
            }
        }
    }

    /** private - Overrides Ext.data.GroupingStore
     * Initially sort based on sortInfo (if set and not remote)
     * Then resort based on groupFields (if set and not remote)
     */
    , applySort: function () {
        var si = this.sortInfo;
        if (si && si.length > 0 && !this.remoteSort) {
            this.sortData(si, si[0].direction);
        }
        if (!this.groupOnSort && !this.remoteGroup) {
            var gs = this.getGroupState();
            if (gs && gs != this.sortInfo) {
                this.sortData(this.groupField);
            }
        }
    }

    /** private - Overrides Ext.data.Store
     * @param flist is an array of fields to sort by
     */
    , sortData: function (flist, direction) {
        //console.debug('Store.sortData: ',flist, direction);
        direction = direction || 'ASC';
        var st = [];
        var o;
        for (var i = 0, len = flist.length; i < len; ++i) {
            o = flist[i];
            st.push(this.fields.get(o.field ? o.field : o).sortType);
        }
        var fn = function (r1, r2) {
            var v1 = [];
            var v2 = [];
            var len = flist.length;
            var o;
            var name;

            for (var i = 0; i < len; ++i) {
                o = flist[i];
                name = o.field ? o.field : o;
                v1.push(st[i](r1.data[name]));
                v2.push(st[i](r2.data[name]));
            }

            var result;
            for (var i = 0; i < len; ++i) {
                result = v1[i] > v2[i] ? 1 : (v1[i] < v2[i] ? -1 : 0);
                if (result != 0)
                    return result;
            }

            return result; //if it gets here, that means all fields are equal
        };

        this.data.sort(direction, fn);
        if (this.snapshot && this.snapshot != this.data) {
            this.snapshot.sort(direction, fn);
        }
    }

    /**
     * Sort the Records. Overrides Ext.data.store
     * If remote sorting is used, the sort is performed on the server, and the cache is
     * reloaded. If local sorting is used, the cache is sorted internally.
     * @param {String} field This is either a single field (String) or an array of fields [<String>] to sort by
     * @param {String} dir (optional) The sort order, "ASC" or "DESC" (case-sensitive, defaults to "ASC")
     */
    , sort: function (field, dir) {
        //console.debug('Store.sort: ',field,dir);
        var f = [];
        if (Ext.isArray(field)) {
            for (var i = 0, len = field.length; i < len; ++i) {
                f.push(this.fields.get(field[i]));
            }
        } else {
            f.push(this.fields.get(field));
        }

        if (f.length < 1) {
            return false;
        }

        if (!dir) {
            if (this.sortInfo && this.sortInfo.length > 0 && this.sortInfo[0].field == f[0].name) { // toggle sort dir
                dir = (this.sortToggle[f[0].name] || "ASC").toggle("ASC", "DESC");
            } else {
                dir = f[0].sortDir;
            }
        }

        var st = (this.sortToggle) ? this.sortToggle[f[0].name] : null;
        var si = (this.sortInfo) ? this.sortInfo : null;

        this.sortToggle[f[0].name] = dir;
        this.sortInfo = [];
        for (var i = 0, len = f.length; i < len; ++i)
        {
            this.sortInfo.push({
                field: f[i].name,
                direction: dir
            });
        }

        console.debug("store.sort: data=", this.lastOptions);
        if (this.lastOptions != null) { // do nothing if the store has never been loaded
            if (!this.remoteSort) {
                this.applySort();
                this.fireEvent("datachanged", this);
            } else {
                this.nextKey = null;
                if (!this.reload()) {
                    if (st) {
                        this.sortToggle[f[0].name] = st;
                    }
                    if (si) {
                        this.sortInfo = si;
                    }
                }
            }
        }
    }

    /**
     * Returns an object describing the current sort state of this Store.
     * @return {Object} The sort state of the Store. An object with two properties:<ul>
     * <li><b>field : String<p class="sub-desc">The name of the field by which the Records are sorted.</p></li>
     * <li><b>direction : String<p class="sub-desc">The sort order, "ASC" or "DESC" (case-sensitive).</p></li>
     * </ul>
     */
    , getSortState: function ()
    {
        return this.sortInfo && this.sortInfo.length > 0 ?
                {field: this.sortInfo[0].field, direction: this.sortInfo[0].direction} :
                {};
    }

    /**
     * Sets the default sort column and order to be used by the next load operation.
     * Overrides Ext.data.Store
     * @param {String} field The name of the field to sort by, or an array of fields
     * @param {String} dir (optional) The sort order, "ASC" or "DESC" (case-sensitive, defaults to "ASC")
     */
    , setDefaultSort: function (field, dir) {
        // alert('setDefaultSort '+ field);
        dir = dir ? dir.toUpperCase() : "ASC";
        this.sortInfo = [];

        if (!Ext.isArray(field))
            this.sortInfo.push({
                field: field,
                direction: dir
            });
        else {
            for (var i = 0, len = field.length; i < len; ++i) {
                this.sortInfo.push({
                    field: field[i].field,
                    direction: dir
                });
                this.sortToggle[field[i]] = dir;
            }
        }
    }

    , clearGrouping: function () {
        this.groupField = false;
        if (this.groupField) {
            if (this.baseParams)
            {
                delete this.baseParams.groupBy;
                delete this.baseParams.groupDir
            }
            var a = this.lastOptions;
            if (a && a.params) {
                delete a.params.groupBy;
                delete a.params.groupDir
            }
            this.reload()
        } else {
            this.sort();
            this.fireEvent("datachanged", this)
        }
//// if(this.groupField) {
//        //var i=this.groupField.length;
//        this.groupField.removeAll();
//        // See if anything was really removed?
////        if(this.groupField.length < i) {
////           if(this.groupField.length==0)
////             this.groupField=false;
////           // Fire event so grid can be re-drawn
////           this.fireEvent('datachanged', this);
////        }
////      }
    }

    , removeGroupField: function (fld) {
        // @todo
        if (this.groupField) {
            var i = this.groupField.length;
            this.groupField.remove(fld);
            // See if anything was really removed?
            if (this.groupField.length < i) {
                if (this.groupField.length == 0)
                    this.groupField = false;
                // Fire event so grid can be re-drawn
                this.fireEvent('datachanged', this);
            }
        }
    }
});

/**
 * @class Ext.ux.grid.MultiGroupingPagingStore
 * @extends Ext.ux.grid.MultiGroupingStore
 * A specialized {@link Ext.data.Store} that allows data to be appended a page at
 * a time as the user scrolls through. It is based on performing server-side sorting
 * and grouping and should be used in conjunction with a {@link Ext.ux.grid.MultiGroupPagingGrid}
 * @constructor
 * Create a new MultiGroupingPagingStore
 * @param {Object} config The config object
 *
 * @author PaulE
 */
Ext.ux.grid.MultiGroupingPagingStore = Ext.extend(Ext.ux.grid.MultiGroupingStore, {

    /** When creating the store, register an internal callback for post load processing
     */
    constructor: function (config) {
        Ext.ux.grid.MultiGroupingPagingStore.superclass.constructor.apply(this, arguments);
        // When loading has finished, need to see if there are more records
        /*
         this.on("load", function(store, r, options) {
         return this.loadComplete(r, options);
         }, this);*/
        this.remoteSort = true;
        this.remoteGroup = true;
    }

    /**
     * @cfg {Number} pageSize
     * The number of records to read/display per page (defaults to 20)
     */
    , pageSize: 20

            /** Private: The Key of the extra record read if there is more that the page size
             */
    , nextKey: null

            /** Override the load method so it can merge the groupFields and sortField
             * into a single sort criteria (group fields need to be sorted by first!)
             */
    , load: function (options) {
        console.debug("Store.load: ", options, this.isLoading);
        options = options || {};
        if (this.fireEvent("beforeload", this, options) !== false) {
            this.storeOptions(options);
            if (options.initial == true) {
                delete this.nextKey;
                delete this.totalCount;
            }
            delete this.baseParams.groupBy;
            var p = Ext.apply(options.params || {}, this.baseParams);
            var sort = [];
            var meta = this.recordType.getField;
            var f;
            if (this.groupField && this.remoteGroup) {
                if (Ext.isArray(this.groupField))
                    for (var i = 0; i < this.groupField.length; i++) {
                        f = meta(this.groupField[i]);
                        sort[sort.length] = (f.sortFieldName || this.groupField[i]) + ' ' + (f.sortDir || '');
                    }
                else {
                    f = meta(this.groupField);
                    sort[sort.length] = (f.sortFieldName || this.groupField) + ' ' + (f.sortDir || '');
                }
            }
            if (this.sortInfo && this.remoteSort) {
                if (Ext.isArray(this.sortInfo))
                    for (var i = 0; i < this.sortInfo.length; i++) {
                        f = meta(this.sortInfo[i].field);
                        sort[sort.length] = (f.sortFieldName || this.sortInfo[i].field) + " " + this.sortInfo[i].direction;
                    }
                else {
                    f = meta(this.sortInfo.field);
                    sort[sort.length] = (f.sortFieldName || this.sortInfo.field) + " " + this.sortInfo.direction;
                }
            }
            p[this.paramNames.sort] = sort.join(",");
            console.debug("Store.load : Query Parameters ", p, sort, this.sortInfo.field, this.sortInfo.direction, this);
            this.proxy.load(p, this.reader, this.loadRecords, this, options);
            return true;
        } else {
            return false;
        }
    }

    /** Reload the current set of record, using by default the current options
     * This will reload the same number of records that have currently been loaded, not
     * just the initial page again.
     * @param options, additional query options that can be provided if needed
     */
    , reload: function (options) {
        var o = Ext.applyIf(options || {}, this.lastOptions);
        var pn = this.paramNames;
        if (!o.params)
            o.params = [];
        o.params[pn.start] = 0;
        o.params[pn.limit] = Math.max(this.pageSize, this.data.length) + 1;
        o.add = false;
        o.initial = false;
        console.debug("Store.reload :", o, this.sortInfo);
        return this.load(o);
    }
    /** Load the next page of records, if there are more available
     * @param initial, set to true if this should be a initial load
     */
    , loadMore: function (initial) {
        if (!initial && !this.nextKey) {
            console.debug("Store.loadMore : Reject load, no more records left");
            return;
        }

        var o = {}, pn = this.paramNames;
        o[pn.start] = initial ? 0 : this.getCount();
        o[pn.limit] = this.pageSize + 1;
        console.debug("Store.loadMore : Loading based on ", o);
        this.load({params: o, add: !initial, initial: initial});
    }

    /** Private - Override default callback handler once records have been loaded.
     * Looks to see if we are able to find more that just the page size, if so
     * it removes the extra one, but keeps it for consistency checking for when the
     * next page is loaded
     * @param r, array of records read from the server
     * @param options, the options that were used by the load operation to do the query
     */
    , loadRecords: function (o, options, success) {
        if (o && success && o.records) {
            var r = o.records;
            console.debug("Store.loadRecords : rows=", r.length, options);
            var nextKey = this.nextKey;
            delete this.nextKey;
            // Need to compare the prior next key, to the first row that was added
            // This could trigger a complete reload
            if (nextKey)
            {
                var id = this.reader.meta.id; // Get key field name from reader
                console.debug("Store.loadRecords : Refresh Check...", id, r[0].data[id], nextKey.data[id]);
                if (r[0].data[id] != nextKey.data[id]) {
                    console.debug("Store.loadRecords : Need to refresh all records as they are out of sync");
                    var pn = this.paramNames;
                    options.params[pn.limit] = options.params[pn.limit] + options.params[pn.start] - 1;
                    options.params[pn.start] = 0;
                    options.add = false;
                    options.initial = false;
                    delete this.nextKey;
                    this.fireEvent("loadexception", this);
                    console.debug("Store.loadRecords : Reload Using ", options);
                    //this.load.defer(20, this, [options]);
                    this.load(options);
                    return;
                }
            }
            // Need to remove the extra record, and put it in the next key.
            if (r.length >= options.params[this.paramNames.limit]) {
                console.debug("Store.loadRecords : More records exist, remove extra one");
                this.nextKey = r[r.length - 1];
                // remove this last record
                r.remove(this.nextKey);
                console.debug("Store.loadRecords : Total=", this.data.length, this.getCount());
            } else
                // Set the total count as we now know what it is
                this.totalCount = r.length + (options.add == true ? this.getCount() : 0);
        }
        Ext.ux.grid.MultiGroupingStore.superclass.loadRecords.call(this, o, options, success);
    }
});

/**
 * @class Ext.ux.grid.MultiGroupingPagingDWRStore
 * @extends Ext.ux.grid.MultiGroupingPagingStore
 * @constructor Create a new MultiGroupingPagingStore
 * @param {Object} config The config object
 *
 * @author PaulE
 */
Ext.ux.grid.MultiGroupingPagingDWRStore = Ext.extend(Ext.ux.grid.MultiGroupingPagingStore, {

    /** When creating the store, register an internal callback for post load processing
     */
    constructor: function (config) {
        Ext.ux.grid.MultiGroupingPagingDWRStore.superclass.constructor.apply(this, arguments);
        this.paramNames = {
            'start': 'objectStart'
            , 'limit': 'objectLimit'
            , 'sort': 'orderByFields'
            , 'dir': undefined
        }
    }

    /** Override the load method so it can merge the groupFields and sortField
     * into a single sort criteria (group fields need to be sorted by first!)
     */
    , load: function (options) {
        console.debug("Store.load: ", options, this.isLoading);
        options = options || {};
        if (this.fireEvent("beforeload", this, options) !== false) {
            this.storeOptions(options);
            if (options.initial == true) {
                delete this.nextKey;
                delete this.totalCount;
            }
            delete this.baseParams.groupBy;
            var p = Ext.apply(options.params || {}, this.baseParams);
            var sort = [];
            var meta = this.recordType.getField;
            var f;
            if (this.groupField && this.remoteGroup) {
                if (Ext.isArray(this.groupField))
                    for (var i = 0; i < this.groupField.length; i++) {
                        f = meta(this.groupField[i]);
                        sort[sort.length] = {fieldName: f.sortFieldName || this.groupField[i], sortAscending: f.sortDir == 'ASC'};
                    }
                else {
                    f = meta(this.groupField);
                    sort[sort.length] = {fieldName: f.sortFieldName || this.groupField, sortAscending: f.sortDir == 'ASC'};
                }
            }
            if (this.sortInfo && this.remoteSort) {
                if (Ext.isArray(this.sortInfo))
                    for (var i = 0; i < this.sortInfo.length; i++) {
                        f = meta(this.sortInfo[i].field);
                        sort[sort.length] = {fieldName: f.sortFieldName || this.sortInfo[i].field, sortAscending: this.sortInfo[i].direction == 'ASC'};
                    }
                else {
                    f = meta(this.sortInfo.field);
                    sort[sort.length] = {fieldName: f.sortFieldName || this.sortInfo.field, sortAscending: this.sortInfo.direction == 'ASC'};
                }
            }
            p[this.paramNames.sort] = sort;
            console.debug("Store.load : Query Parameters ", p, sort, this.sortInfo.field, this.sortInfo.direction, this);
            this.proxy.load(p, this.reader, this.loadRecords, this, options);
            return true;
        } else {
            return false;
        }
    }
});

Ext.ux.MultiGroupingStore = Ext.extend(Ext.data.GroupingStore, {
    constructor: function (config) {
        Ext.ux.MultiGroupingStore.superclass.constructor.apply(this, arguments);
    },

    sortInfo: [],

    sort: function (field, dir) {
        var f = [];
        if (Ext.isArray(field)) {
            for (var i = 0, len = field.length; i < len; ++i) {
                f.push(this.fields.get(field[i]));
            }
        } else {
            f.push(this.fields.get(field));
        }

        if (f.length < 1) {
            return false;
        }

        if (!dir) {
            if (this.sortInfo && this.sortInfo.length > 0 && this.sortInfo[0].field == f[0].name) { // toggle sort dir
                dir = (this.sortToggle[f[0].name] || "ASC").toggle("ASC", "DESC");
            } else {
                dir = f[0].sortDir;
            }
        }

        var st = (this.sortToggle) ? this.sortToggle[f[0].name] : null;
        var si = (this.sortInfo) ? this.sortInfo : null;

        this.sortToggle[f[0].name] = dir;
        this.sortInfo = [];
        for (var i = 0, len = f.length; i < len; ++i)
        {
            this.sortInfo.push
                    ({
                        field: f[i].name,
                        direction: dir
                    });
        }

        if (!this.remoteSort) {
            this.applySort();
            this.fireEvent("datachanged", this);
        } else {
            if (!this.load(this.lastOptions)) {
                if (st) {
                    this.sortToggle[f[0].name] = st;
                }
                if (si) {
                    this.sortInfo = si;
                }
            }
        }

    },

    setDefaultSort: function (field, dir) {
        dir = dir ? dir.toUpperCase() : "ASC";
        this.sortInfo = [];

        if (!Ext.isArray(field)) {
            this.sortInfo.push({
                field: field,
                direction: dir
            });
        } else {
            for (var i = 0, len = field.length; i < len; ++i) {
                this.sortInfo.push({
                    field: field[i].field,
                    direction: dir
                });
                this.sortToggle[field[i]] = dir;
            }
        }
    },
    clearGrouping: function () {
        this.groupField = false;
        if (this.remoteGroup) {
            if (this.baseParams) {
                delete this.baseParams.groupBy;
                delete this.baseParams.groupDir
            }
            var a = this.lastOptions;
            if (a && a.params) {
                delete a.params.groupBy;
                delete a.params.groupDir
            }
            this.reload()
        } else {
            this.sort();
            this.fireEvent("datachanged", this)
        }
    },
    groupBy: function (field, forceRegroup) {
        if (!forceRegroup && this.groupField == field) {
            return; // already grouped by this field
        }

        if (this.groupField) {
            for (var z = 0; z < this.groupField.length; z++)
                if (field == this.groupField[z])
                    return;
            this.groupField.push(field);
        } else {
            this.groupField = [field];
        }

        if (this.remoteGroup) {
            if (!this.baseParams) {
                this.baseParams = {};
            }
            this.baseParams['groupBy'] = field;
        }
        if (this.groupOnSort) {
            this.sort(field);
            return;
        }
        if (this.remoteGroup) {
            this.reload();
        } else {
            var si = this.sortInfo || [];
            if (si.field != field) {
                this.applySort();
            } else {
                this.sortData(field);
            }
            this.fireEvent('datachanged', this);
        }
    },

    applySort: function () {

        var si = this.sortInfo;

        if (si && si.length > 0 && !this.remoteSort) {
            this.sortData(si, si[0].direction);
        }

        if (!this.groupOnSort && !this.remoteGroup) {
            var gs = this.getGroupState();
            if (gs && gs != this.sortInfo) {

                this.sortData(this.groupField);
            }
        }
    },

    getGroupState: function () {
        return this.groupOnSort && this.groupField !== false ? (this.sortInfo ? this.sortInfo : undefined) : this.groupField;
    },

    sortData: function (flist, direction) {
//alert('sortData '+ direction);
        direction = direction || 'ASC';

        var st = [];

        var o;
        for (var i = 0, len = flist.length; i < len; ++i) {
            o = flist[i];
            st.push(this.fields.get(o.field ? o.field : o).sortType);
        }

        var fn = function (r1, r2) {

            var v1 = [];
            var v2 = [];
            var len = flist.length;
            var o;
            var name;

            for (var i = 0; i < len; ++i) {
                o = flist[i];
                name = o.field ? o.field : o;

                v1.push(st[i](r1.data[name]));
                v2.push(st[i](r2.data[name]));
            }

            var result;
            for (var i = 0; i < len; ++i) {
                result = v1[i] > v2[i] ? 1 : (v1[i] < v2[i] ? -1 : 0);
                if (result != 0)
                    return result;
            }

            return result; //if it gets here, that means all fields are equal
        };

        this.data.sort(direction, fn);
        if (this.snapshot && this.snapshot != this.data) {
            this.snapshot.sort(direction, fn);
        }
    }

});

Ext.ux.MultiGroupingView = Ext.extend(Ext.grid.GroupingView, {
    constructor: function (config) {
        Ext.ux.MultiGroupingView.superclass.constructor.apply(this, arguments);
// Added so we can clear cached rows each time the view is refreshed
        this.on("beforerefresh",
                function () {
                    if (this.rowsCache) {
                        delete rowsCache;
                    }
                }, this);
    },

    displayEmptyFields: false,

    displayFieldSeparator: ', ',

    renderRows: function () {
        var groupField = this.getGroupField();
        var eg = !!groupField;
// if they turned off grouping and the last grouped field is hidden
        if (this.hideGroupedColumn) {
            var colIndexes = [];
            for (var i = 0, len = groupField.length; i < len; ++i) {
                var cidx = this.cm.findColumnIndex(groupField[i]);
                if (cidx >= 0) {
                    colIndexes.push(cidx);
                }
            }
            if (!eg && this.lastGroupField !== undefined) {
                this.mainBody.update('');
                for (var i = 0, len = this.lastGroupField.length; i < len; ++i) {
                    var cidx = this.cm.findColumnIndex(this.lastGroupField[i]);
                    if (cidx >= 0) {
                        this.cm.setHidden(cidx, false);
                    } else {
                        alert("Unhide Col: " + cidx);
                    }
                }
                delete this.lastGroupField;
                delete this.lgflen;
            } else if (eg && colIndexes.length > 0 && this.lastGroupField === undefined) {
                this.lastGroupField = groupField;
                this.lgflen = groupField.length;
                for (var i = 0, len = colIndexes.length; i < len; ++i) {
                    this.cm.setHidden(colIndexes[i], true);
                }
            } else if (eg && this.lastGroupField !== undefined && (groupField !== this.lastGroupField || this.lgflen != this.lastGroupField.length)) {
                this.mainBody.update('');
                for (var i = 0, len = this.lastGroupField.length; i < len; ++i) {
                    var cidx = this.cm.findColumnIndex(this.lastGroupField[i]);
                    if (cidx >= 0) {
                        this.cm.setHidden(cidx, false);
                    }
                }
                this.lastGroupField = groupField;
                this.lgflen = groupField.length;
                for (var i = 0, len = colIndexes.length; i < len; ++i) {
                    this.cm.setHidden(colIndexes[i], true);
                }
            }
        }
        return Ext.ux.MultiGroupingView.superclass.renderRows.apply(this, arguments);
    },

    /** This sets up the toolbar for the grid based on what is grouped
     * It also iterates over all the rows and figures out where each group should appeaer
     * The store at this point is already stored based on the groups.
     */

    doRender: function (cs, rs, ds, startRow, colCount, stripe) {
        if (rs.length < 1) {
            return '';
        }

        var groupField = this.getGroupField();
        var gfLen = groupField.length;

        var ss = this.grid.getTopToolbar();


        if (ss) {
// Remove all entries alreay in the toolbar
            for (var hh = 0; hh < ss.items.length; hh++) {
                Ext.removeNode(Ext.getDom(ss.items.itemAt(hh).id));
            }

            if (gfLen == 0) {
                ss.addItem(new Ext.Toolbar.TextItem("Drop Columns Here To Group"));
            } else {
// Add back all entries to toolbar from GroupField[]
                ss.addItem(new Ext.Toolbar.TextItem("Grouped By:"));
                for (var gfi = 0; gfi < gfLen; gfi++) {
                    var t = groupField[gfi];
                    if (gfi > 0) {
                        ss.addItem(new Ext.Toolbar.Separator());
                    }
                    var b = new Ext.Toolbar.Button({
                        text: this.cm.lookup[this.cm.findColumnIndex(t)].header
                    });
                    b.fieldName = t;
                    ss.addItem(b);
                }
            }
        }

        this.enableGrouping = !!groupField;

        if (!this.enableGrouping || this.isUpdating)
        {
            return Ext.grid.GroupingView.superclass.doRender.apply(this, arguments);
        }

        var gstyle = 'width:' + this.getTotalWidth() + ';';
        var gidPrefix = this.grid.getGridEl().id;
        var groups = [], curGroup, i, len, gid;
        var lastvalues = [];
        var added = 0;
        var currGroups = [];

// Create a specific style
        var st = Ext.get(gidPrefix + "-style");
        if (st)
            st.remove();
        Ext.getDoc().child("head").createChild({
            tag: 'style',
            id: gidPrefix + "-style",
            html: "div#" + gidPrefix + " div.x-grid3-row {padding-left:" + (gfLen * 12) + "px}" + "div#" + gidPrefix + " div.x-grid3-header {padding-left:" + (gfLen * 12) + "px}"
        });

        for (var i = 0, len = rs.length; i < len; i++) {
            added = 0;
            var rowIndex = startRow + i;
            var r = rs[i];
            var differ = 0;
            var gvalue = [];
            var fieldName;
            var fieldLabel;
            var grpFieldNames = [];
            var grpFieldLabels = [];
            var v;
            var changed = 0;
            var addGroup = [];

            for (var j = 0; j < gfLen; j++) {
                fieldName = groupField[j];
                fieldLabel = this.cm.lookup[this.cm.findColumnIndex(fieldName)].header;
                v = r.data[fieldName];
                if (v) {
                    if (i == 0) {
// First record always starts a new group
                        addGroup.push({
                            idx: j,
                            dataIndex: fieldName,
                            header: fieldLabel,
                            value: v
                        });
                        lastvalues[j] = v;

                        gvalue.push(v);
                        grpFieldNames.push(fieldName);
                        grpFieldLabels.push(fieldLabel + ': ' + v);
//gvalue.push(v); ????
                    } else {
                        if (lastvalues[j] != v) {
// This record is not in same group as previous one
//console.debug("Row ",i," added group. Values differ: prev=",lastvalues[j]," curr=",v);
                            addGroup.push({
                                idx: j,
                                dataIndex: fieldName,
                                header: fieldLabel,
                                value: v
                            });
                            lastvalues[j] = v;
                            changed = 1;

                            gvalue.push(v);
                            grpFieldNames.push(fieldName);
                            grpFieldLabels.push(fieldLabel + ': ' + v);
                        } else {
                            if (gfLen - 1 == j && changed != 1) {
// This row is in all the same groups to the previous group
                                curGroup.rs.push(r);
                            } else if (changed == 1) {
// This group has changed because an earlier group changed.
                                addGroup.push({
                                    idx: j,
                                    dataIndex: fieldName,
                                    header: fieldLabel,
                                    value: v
                                });

                                gvalue.push(v);
                                grpFieldNames.push(fieldName);
                                grpFieldLabels.push(fieldLabel + ': ' + v);
                            } else if (j < gfLen - 1) {
// This is a parent group, and this record is part of this parent so add it
                                if (currGroups[fieldName]) {
                                    currGroups[fieldName].rs.push(r);
                                }

                            }
                        }
                    }
                } else {
                    if (this.displayEmptyFields) {
                        addGroup.push({
                            idx: j,
                            dataIndex: fieldName,
                            header: fieldLabel,
                            value: this.emptyGroupText || '(none)'
                        });
                        grpFieldNames.push(fieldName);
                        grpFieldLabels.push(fieldLabel + ': ');
                    }
                }
            } //for j


            for (var k = 0; k < addGroup.length; k++) {
                var gp = addGroup[k];
                g = gp.dataIndex;
                var glbl = addGroup[k].header;
// There is no current group, or its not for the right field, so create one
                gid = gidPrefix + '-gp-' + gp.dataIndex + '-' + Ext.util.Format.htmlEncode(gp.value);

// if state is defined use it, however state is in terms of expanded
// so negate it, otherwise use the default.
                var isCollapsed = typeof this.state[gid] !== 'undefined' ? !this.state[gid] : this.startCollapsed;
                var gcls = isCollapsed ? 'x-grid-group-collapsed' : '';
                curGroup = {
                    group: gp.dataIndex,
                    gvalue: gp.value,
                    text: gp.header,
                    groupId: gid,
                    startRow: rowIndex,
                    rs: [r],
                    cls: gcls,
                    style: gstyle + 'padding-left:' + (gp.idx * 12) + 'px;'
                };
                currGroups[gp.dataIndex] = curGroup;
                groups.push(curGroup);
                r._groupId = gid; // Associate this row to a group
            } //for k
        } //for i

        var buf = [];
        var toEnd = 0;
        for (var ilen = 0, len = groups.length; ilen < len; ilen++) {
            toEnd++;
            var g = groups[ilen];
            var leaf = g.group == groupField[gfLen - 1];
            this.doMultiGroupStart(buf, g, cs, ds, colCount);

            if (g.rs.length != 0 && leaf) {
                buf[buf.length] = Ext.grid.GroupingView.superclass.doRender.call(this, cs, g.rs, ds, g.startRow, colCount, stripe);
            }

            if (leaf) {
                var jj;
                var gg = groups[ilen + 1];
                if (gg != null) {
                    for (var jj = 0; jj < groupField.length; jj++) {
                        if (gg.group == groupField[jj]) {
                            break;
                        }
                    }
                    toEnd = groupField.length - jj;
                }
                for (var k = 0; k < toEnd; k++) {
                    this.doMultiGroupEnd(buf, g, cs, ds, colCount);
                }
                toEnd = jj;
            }

        }

        return buf.join('');
    },

    initTemplates: function () {
        Ext.grid.GroupingView.superclass.initTemplates.call(this);
        this.state = {};

        var sm = this.grid.getSelectionModel();
        sm.on(sm.selectRow ? 'beforerowselect' : 'beforecellselect', this.onBeforeRowSelect, this);

        if (!this.startMultiGroup) {
            this.startMultiGroup = new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}">', '<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>', this.groupTextTpl, '</div></div>', '<div id="{groupId}-bd" class="x-grid-group-body">');
        }
        this.startMultiGroup.compile();
        this.endMultiGroup = '</div></div>';
    },

    doMultiGroupStart: function (buf, g, cs, ds, colCount) {
        var groupName = g.group.toLowerCase(),
                groupFieldTemplate;

        if (ds.groupFieldTemplates && (groupFieldTemplate = ds.groupFieldTemplates[groupName])) {
            if (typeof (groupFieldTemplate) == 'string') {
                groupFieldTemplate = new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}">', '<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>', groupFieldTemplate, '</div></div>', '<div id="{groupId}-bd" class="x-grid-group-body">');
                groupFieldTemplate.compile();
            }
            buf[buf.length] = groupFieldTemplate.apply(g);
        } else {
            buf[buf.length] = this.startMultiGroup.apply(g);
        }

    },

    doMultiGroupEnd: function (buf, g, cs, ds, colCount) {
        buf[buf.length] = this.endMultiGroup;
    },

    /** Should return an array of all elements that represent a row, it should bypass
     * all grouping sections
     */
    getRows: function () {

// This function is called may times, so use a cache if it is available
        if (this.rowsCache) {
            r = this.rowsCache.slice(0);
        } else {
            if (!this.enableGrouping) {
                return Ext.grid.GroupingView.superclass.getRows.call(this);
            }
            var groupField = this.getGroupField();
            var r = [];
            var g, gs = this.getGroups();
// this.getGroups() contains an array of DIVS for the top level groups
            r = this.getRowsFromGroup(r, gs, groupField[groupField.length - 1]);

// Clone the array, but not the objects in it
        }
        return r;
    }

    /** Return array of records under a given group
     * @param r Record array to append to in the returned object
     * @param gs Grouping Sections, an array of DIV element that represent a set of grouped records
     * @param lsField The name of the grouping section we want to count
     */
    ,
    getRowsFromGroup: function (r, gs, lsField) {
        var rx = new RegExp(".*-gp-" + lsField + "-.*");

// Loop over each section
        for (var i = 0, len = gs.length; i < len; i++) {

// Get group name for this section
            var groupName = gs[i].id;
            if (rx.test(groupName)) {
                g = gs[i].childNodes[1].childNodes;
                for (var j = 0, jlen = g.length; j < jlen; j++) {
                    r[r.length] = g[j];
                }
            } else {
                if (!gs[i].childNodes[1]) {
                } else {
                    r = this.getRowsFromGroup(r, gs[i].childNodes[1].childNodes, lsField);
                }
            }
        }
        return r;
    }
});

Ext.ux.MultiGroupingPanel = function (config) {
    config = config || {};
    config.tbar = new Ext.Toolbar({
        id: 'grid-tbr'
    });
    Ext.ux.MultiGroupingPanel.superclass.constructor.call(this, config);
};
Ext.extend(Ext.ux.MultiGroupingPanel, Ext.grid.GridPanel, {

    initComponent: function () {
        Ext.ux.MultiGroupingPanel.superclass.initComponent.call(this);

// Initialise DragZone
        this.on("render", this.setUpDragging, this);
    },

    setUpDragging: function () {
        this.dragZone = new Ext.dd.DragZone(this.getTopToolbar().getEl(), {
            ddGroup: "grid-body",
            panel: this,
            scroll: false,
            onInitDrag: function (e) {
// alert('init');
                var clone = this.dragData.ddel;
                clone.id = Ext.id('ven');
// clone.class='x-btn button';
                this.proxy.update(clone);
                return true;
            },
            getDragData: function (e) {
                var target = Ext.get(e.getTarget().id);
                if (target.hasClass('x-toolbar x-small-editor')) {
                    return false;
                }

                d = e.getTarget().cloneNode(true);
                d.id = Ext.id();
//console.debug("getDragData",this, target);

                this.dragData = {
                    repairXY: Ext.fly(target).getXY(),
                    ddel: d,
                    btn: e.getTarget()
                };
                return this.dragData;
            }

//Provide coordinates for the proxy to slide back to on failed drag.
//This is the original XY coordinates of the draggable element.
            ,
            getRepairXY: function () {
                return this.dragData.repairXY;
            }

        });

// This is the target when columns are dropped onto the toolbar (ie added to the group)
        this.dropTarget2s = new Ext.dd.DropTarget('grid-tbr', {
            ddGroup: "gridHeader" + this.getGridEl().id,
            panel: this,
            notifyDrop: function (dd, e, data) {
                var btname = this.panel.getColumnModel().getDataIndex(this.panel.getView().getCellIndex(data.header));
                this.panel.store.groupBy(btname);
                return true;
            }
        });

// This is the target when columns are dropped onto the grid (ie removed from the group)
        this.dropTarget22s = new Ext.dd.DropTarget(this.getView().el.dom.childNodes[0].childNodes[1], {
            ddGroup: "grid-body",
            panel: this,
            notifyDrop: function (dd, e, data) {
                var txt = Ext.get(data.btn).dom.innerHTML;
                var tb = this.panel.getTopToolbar();
                var bidx = tb.items.findIndexBy(function (b) {
                    return b.text == txt;
                }, this);
                if (bidx < 0)
                    return; // Error!
                var fld = tb.items.get(bidx).fieldName;

// Remove from toolbar
                Ext.removeNode(Ext.getDom(tb.items.get(bidx).id));
                if (bidx > 0) {
                    Ext.removeNode(Ext.getDom(tb.items.get(bidx - 1).id));
                    ;
                }

                var cidx = this.panel.view.cm.findColumnIndex(fld);

                this.panel.view.cm.setHidden(cidx, false);

                var temp = [];

                for (var i = this.panel.store.groupField.length - 1; i >= 0; i--) {
                    if (this.panel.store.groupField[i] == fld) {
                        this.panel.store.groupField.pop();
                        break;
                    }
                    temp.push(this.panel.store.groupField[i]);
                    this.panel.store.groupField.pop();
                }

                for (var i = temp.length - 1; i >= 0; i--) {
                    this.panel.store.groupField.push(temp[i]);
                }

                if (this.panel.store.groupField.length == 0) {
                    this.panel.store.groupField = false;
                }

                this.panel.store.fireEvent('datachanged', this);
                return true;
            }
        });

    }
});
