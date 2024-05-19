qx.Class.define("myejemplo.RenderButton", {
    extend: qx.ui.table.cellrenderer.Abstract,

    construct() {
    },

    members: {

        _getContentHtml(cellInfo) {
        let color = "Color";
        let htmlb = '<button>'+color+'</button>'

            return htmlb;

            // return  '<button onclick="myejemplo.handlerButtonClick('+cellInfo.value+')">'+color+'</button>'
          },

          
        //other data
        //return qx.bom.String.escape(cellInfo.value);
    }
});