
// trendTable
qx.Class.define("myejemplo.TrendTable", {
  extend: qx.ui.table.Table,

  construct: function (columnas, id, scroll, charts, control) {
    this.base(arguments);
    // table model config
    let tableModel = new qx.ui.table.model.Simple();
	tableModel.setColumns(columnas);
	//tableModel.setColumnEditable(0,true);
	 //tableModel.setColumnSortable(0, true);
/*  tableModel.setColumnEditable(1,true);
	tableModel.setColumnEditable(2,true);
	tableModel.setColumnEditable(3,true);
	tableModel.setColumnEditable(4,true);
	tableModel.setColumnEditable(5,true);
	tableModel.setColumnEditable(6,true);
	tableModel.setColumnEditable(7,true);
	tableModel.setColumnEditable(8,true);
	tableModel.setColumnEditable(9,true);
	tableModel.setColumnEditable(10,true);
	tableModel.setColumnEditable(11,true);
	tableModel.setColumnEditable(12,true);
	tableModel.setColumnEditable(13,true);
	tableModel.setColumnEditable(14,true);
	tableModel.setColumnEditable(15,true);*/
	
    
 /*   this.getSelectionModel().setSelectionMode(
          qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION
        );*/
    
    this.setTableModel(tableModel);
   

    if(id == "Trace"){
    	this.mouseEventTable2(scroll, charts, tableModel, control, this);
    }else if(id == "ValueAxes"){
		tableModel.setColumnEditable(0,false);
		tableModel.setColumnEditable(1,true);
		tableModel.setColumnEditable(2,true);
		tableModel.setColumnEditable(3,true);
		tableModel.setColumnEditable(4,true);
		tableModel.setColumnEditable(5,true);
		tableModel.setColumnEditable(6,true);
		tableModel.setColumnEditable(7,true);
		tableModel.setColumnEditable(8,true);
		tableModel.setColumnEditable(9,true);
		tableModel.setColumnEditable(10,true);
		let colModelTabla = this.getTableColumnModel();
    	 this.mouseEventTable(scroll, charts, tableModel, control, colModelTabla, this);
    }
   
  },
  
  members:{
  
  	mouseEventTable:function(scroll, charts, tableModel, control, columnModel, tabla){
		
  		this.addListener("contextmenu", function(e){
 
        let menu = new qx.ui.menu.Menu();
  		menu.setOpener(this);
  		
  		let btn1 = new qx.ui.menu.Button("Add Axis");
		  

			btn1.addListener("execute", function(){
				
				
				columnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(6, new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(9, new qx.ui.table.cellrenderer.Boolean());
				columnModel.setDataCellRenderer(10, new qx.ui.table.cellrenderer.Boolean());
				tableModel.addRows([[true, "Value 1", true, true, true, true, true, "siete", "ocho", true, true]]);//de esta forma se añaden registros
									//0,    1,        2,     3,    4,   5,     6,      7,     8,      9,    10
				//evento sobre las celdas de la tabla

				tabla.addListener("cellTap", function(e){
			 
				 let col = e.getColumn();
				 let row = e.getRow();
			 
				
			 
				 //activa o desactiva el checkbox dentro de la tabla. Aplicar a todas las columnas que deben tener checkbox
				 
				 if(col === 0){
					 let valorActual = tableModel.getValue(row, col);//valor contenido actulmente
					 tableModel.setValue(row, col, !valorActual);
			 
					 if(valorActual){//---->Check esta false
						
						 //inicio del grafico
						 let canvas1 = new qx.ui.embed.Canvas().set({
							 canvasWidth: 200,
							 canvasHeight: 200,
							 syncDimension: false,
						   });
					 
						let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///modificable
						canvas1.addListener("redraw", function(e)
						   {
							let chartDom = scroll.getContentElement().getDomElement();
							myChart = charts.init(chartDom, 'dark');
						   
					 
					 
						 option = {
						   xAxis: {
							 type: 'category',
							 data: fechas
						   },
						   yAxis: {
							 type: 'value'
						   },
						   series: [
							 {
							   data: [],
							   type: 'line'
							 }
						   ]
						 };
							  myChart.setOption(option);
						 
					 
						 
						   }, this); 
						  
						 control.agregarEstado([]);
						   ////////fin del grafico
					 }else{//---->true
						 //inicio del grafico
						 let canvas1 = new qx.ui.embed.Canvas().set({
							 canvasWidth: 200,
							 canvasHeight: 200,
							 syncDimension: false,
						   });
					 
						let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///modificable
						canvas1.addListener("redraw", function(e)
						   {
							let chartDom = scroll.getContentElement().getDomElement();
							myChart = charts.init(chartDom, 'dark');
						   
					 
					 
						 option = {
						   xAxis: {
							 type: 'category',
							 data: fechas
						   },
						   yAxis: {
							 type: 'value'
						   },
						   series: [
							 {
							   data: control.obtenerEstadoPrevio(),
							   type: 'line'
							 }
						   ]
						 };
							  myChart.setOption(option);
						 
					 
						 
						   }, this); 
						 
					 }
			 
					 this.updateRowData(row);
					 //aprovechar el estado del checkbox para modificar la grafica
					 
					 
				 }
				});
			
			});
		menu.add(btn1);
		
		menu.openAtPointer(e); 
  		});
  	
  	
  	},
  	
  	mouseEventTable2:function(scroll, charts, modeloTabla, control){
  	
  		this.addListener("contextmenu", function(e){
  		
  		 
      	let menu = new qx.ui.menu.Menu();
  		menu.setOpener(this);
  		
  		let btn1 = new qx.ui.menu.Button("Add PV");
		let btn2 = new qx.ui.menu.Button("Add Formula");
			
			btn1.addListener("execute", function(){
				//logica 
			/*let chk1 = new qx.ui.form.CheckBox();
			let chk2 = new qx.ui.form.CheckBox();
			let chk3 = new qx.ui.form.CheckBox();
			let chk4 = new qx.ui.form.CheckBox();
			let chk5 = new qx.ui.form.CheckBox();    
			let chk6 = new qx.ui.form.CheckBox();
			let chk7 = new qx.ui.form.CheckBox();
			let text1 = new qx.ui.form.TextField();
			     text1.setValue("Value 1");
			let text2 = new qx.ui.form.TextField();
				text2.setValue("Value 2");

			chk1.setValue(true);
			chk3.setValue(true);
			chk4.setValue(true);
			chk5.setValue(true);*/

 
			//["jkjawhd"], [], [], [], [], [], [], [], [], [], [], [], [], [], []
			
			
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
 
