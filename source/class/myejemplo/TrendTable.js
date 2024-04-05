
// trendTable
qx.Class.define("myejemplo.TrendTable", {
  extend: qx.ui.table.Table,

  construct: function (columnas) {
    this.base(arguments);
    // table model config
    let tableModel = new qx.ui.table.model.Simple();
    tableModel.setColumnSortable(1, false);
    tableModel.setColumns(columnas);
   
    
    this.setTableModel(tableModel);
    this.mouseEventTable();
  },
  
  members:{
  
  	mouseEventTable:function(){
  	
  		this.addListener("contextmenu", function(e){
  		
  		 
      		let menu = new qx.ui.menu.Menu();
  		menu.setOpener(this);
  		
  		let btn1 = new qx.ui.menu.Button("Add Axis");
		
		menu.add(btn1);
		
		menu.openAtPointer(e); 
  		});
  	
  	
  	}
  
  }
});
