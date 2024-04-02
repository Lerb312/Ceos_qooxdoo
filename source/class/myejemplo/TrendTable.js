
// trendTable
qx.Class.define("myejemplo.TrendTable", {
  extend: qx.ui.table.Table,

  construct: function (columnas) {
    this.base(arguments);
    // table model config
    var tableModel = new qx.ui.table.model.Simple();
    tableModel.setColumnSortable(1, false);
    tableModel.setColumns(columnas);
   
    
    this.setTableModel(tableModel);
  }
});
