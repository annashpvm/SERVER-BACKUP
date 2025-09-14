
    Ext.onReady(function(){
   Ext.QuickTips.init();

Ext.define('Fiddle.form.field.Decimal', {
        extend: 'Ext.form.field.Number',
        alias: 'widget.decimalfield',
     
        setCaretPosition: function(pos) {
            var el = this.inputEl.dom;
            if (typeof(el.selectionStart) === "number") {
                el.focus();
                el.setSelectionRange(pos, pos);
            } else if (el.createTextRange) {
                var range = el.createTextRange();
                range.move("character", pos);
                range.select();
            } else {
                throw 'setCaretPosition() not supported';
            }
        },
     
        getCaretPosition: function() {
            var el = this.inputEl.dom;
            if (typeof(el.selectionStart) === "number") {
                return el.selectionStart;
            } else if (document.selection && el.createTextRange) {
                var range = document.selection.createRange();
                range.collapse(true);
                range.moveStart("character", - el.value.length);
                return range.text.length;
            } else {
                throw 'getCaretPosition() not supported';
            }
        }
    });
     


    Ext.create('Ext.form.Panel', {
        title: 'Personal Info',
        width: 300,
        bodyPadding: 10,
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'decimalfield',
            anchor: '100%',
            name: 'age',
            fieldLabel: 'Age',
            minValue: 0,
            decimalPrecision: 2,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
     
            enableKeyEvents: true,
            listeners: {
                keyup: function() {
                    var rv = (this.getRawValue() || '').toString(),
                        dp = this.decimalPrecision,
                        pos, re;
                    
                    try {
                        pos = this.getCaretPosition();
                    } catch (ignore) {}
     
                    // set a decimal precision if not already define
                    if (isNaN(dp) || dp < 0 || !(this.allowDecimals)) {
                        dp = 0;
                    }
     
                    // only set the value if decimal points are allowed. otherwise
                    // let the component handle this as intended
                    if (dp > 0) {
                        re = new RegExp('^\\d+((\\.)(\\d{0,' + dp + '}))?', 'g');
                        this.setRawValue(rv.match(re));
                        try {
                            this.setCaretPosition(pos || rv.length);
                        } catch (ignore) {}
                    }
                }
            }
        }]
    });


});
