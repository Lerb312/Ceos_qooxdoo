
// trendTable
qx.Class.define("myejemplo.TrendTable", {
  extend: qx.ui.table.Table,

  construct: function (columnas, id) {
    this.base(arguments);
    // table model config
    let tableModel = new qx.ui.table.model.Simple();
    tableModel.setColumnSortable(1, false);
    tableModel.setColumns(columnas);
   
    
    this.setTableModel(tableModel);
    
    if(id == "Trace"){
    	this.mouseEventTable2();
    }else if(id == "ValueAxes"){
    	 this.mouseEventTable();
    }
   
  },
  
  members:{
  
  	mouseEventTable:function(){
  	
  		this.addListener("contextmenu", function(e){
  		
  		 
      		let menu = new qx.ui.menu.Menu();
  		menu.setOpener(this);
  		
  		let btn1 = new qx.ui.menu.Button("Add Axis");
		
			btn1.addListener("execute", function(){
				//logica para agregar registros a la tabla
			
			});
		menu.add(btn1);
		
		menu.openAtPointer(e); 
  		});
  	
  	
  	},
  	
  	mouseEventTable2:function(){
  	
  		this.addListener("contextmenu", function(e){
  		
  		 
      		let menu = new qx.ui.menu.Menu();
  		menu.setOpener(this);
  		
  		let btn1 = new qx.ui.menu.Button("Add PV");
		let btn2 = new qx.ui.menu.Button("Add Formula");
			
			btn1.addListener("execute", function(){
				//logica 
			
			});
			
			btn2.addListener("execute", function(){
				//logica 
			
			});
			
		menu.add(btn1);
		menu.add(btn2);
		
		menu.openAtPointer(e); 
  		});
  	
  	
  	}
  
  }
});
