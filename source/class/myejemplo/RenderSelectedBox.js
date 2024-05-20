qx.Class.define("myejemplo.RenderSelectedBox", {
    extend: qx.ui.table.cellrenderer.Abstract,

    construct() {
        this.base(arguments);
    },

    members: {
        _getContentHtml: function(cellInfo) {
            let htmlS='<select>'+
                '<option value="value1">'+"Value1"+'</option>'+
                '<option value="value2" selected>'+"Value2"+'</option>'+
                '<option value="value3">'+"Value3"+'</option>'+
            '</select>';
            return htmlS;
        }
    }
});