
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
   
	this
	.getSelectionModel()
	.setSelectionMode(
	  qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION
	);
	
    if(id == "Trace"){
    	this.mouseEventTable2(scroll, charts, tableModel, control, this);
		
    }else if(id == "ValueAxes"){
		tableModel.setColumnEditable(0,false);
		tableModel.setColumnEditable(1,true);
		tableModel.setColumnEditable(2,false);
		tableModel.setColumnEditable(3,false);
		tableModel.setColumnEditable(4,false);
		tableModel.setColumnEditable(5,false);
		tableModel.setColumnEditable(6,false);
		tableModel.setColumnEditable(7,true);
		tableModel.setColumnEditable(8,true);
		tableModel.setColumnEditable(9,false);
		tableModel.setColumnEditable(10,false);
		let colModelTabla = this.getTableColumnModel();
    	 this.mouseEventTable(scroll, charts, tableModel, control, colModelTabla, this);
		
    }
   
  },
  
  members:{
  
  	mouseEventTable:function(scroll, charts, tableModel, control, columnModel, tabla){
	
		
		
  		tabla.addListener("contextmenu", function(e){
 
		let menu = new qx.ui.menu.Menu();
  		menu.setOpener(this);
  		
  		let btn1 = new qx.ui.menu.Button("Add Axis");
		let btn2 = new qx.ui.menu.Button("Delete Axis");
		let btn3 = new qx.ui.menu.Button("Remove Empty Axes");

		if(tableModel.getRowCount() === 0){
            btn2.setEnabled(false);
            btn3.setEnabled(false);
		}else if (tableModel.getColumnCount() > 0){
			btn2.setEnabled(true);
            btn3.setEnabled(true);
		}

		btn1.addListener("execute", function(){
		columnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.String());
		columnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(6, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(7, new qx.ui.table.cellrenderer.Number());
		columnModel.setDataCellRenderer(8, new qx.ui.table.cellrenderer.Number());
		columnModel.setDataCellRenderer(9, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(10, new qx.ui.table.cellrenderer.Boolean());
				
				
				tableModel.addRows([[true, "Value 1", false, true, true, false, false, 0.0, 10.0, false, false]]);//de esta forma se añaden registros
									//0,    1,        2,     3,    4,   5,     6,      7,     8,      9,    10

									
				//evento sobre las celdas de la tabla
			
				tabla.addListener("cellTap", function(e){
			 
				 let col = e.getColumn();
				 let row = e.getRow();
				 
			 
				 //activa o desactiva el checkbox dentro de la tabla. Aplicar a todas las columnas que deben tener checkbox
				 let canvas1 = new qx.ui.embed.Canvas().set({
					canvasWidth: 200,
					canvasHeight: 200,
					syncDimension: false,
				  });

 				let nuevo = tableModel.getValue(1, row);
				let nuevo_1;
				if(col === 0){
					let valorActual = tableModel.getValue(col, row);//valor contenido actulmente

					 tableModel.setValue(col, row, !valorActual);
					 
						 if(tableModel.getValue(col, row) === false){//---->Check esta false
						
						 //inicio del grafico
						/* let canvas1 = new qx.ui.embed.Canvas().set({
							 canvasWidth: 200,
							 canvasHeight: 200,
							 syncDimension: false,
						   });*/  
					 
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
						   yAxis: [{
							 type: 'value',
							 show: false
						   }],
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
						   yAxis: [{
							 type: 'value',
							 show: true
						   }],
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
			 
					
					 //aprovechar el estado del checkbox para modificar la grafica
					 
					 
				}else if(col === 2){
						let valorCol = tableModel.getValue(col, row);
						tableModel.setValue(col, row, !valorCol);
						nuevo_1 = tableModel.getValue(1, row);
					
					
						if(tableModel.getValue(col, row)){
				
						   let option;
							let myChart = 0;
							let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///modificable
						   canvas1.addListener("redraw", function(e)
							  { 
								
								let chartDom= scroll.getContentElement().getDomElement();
							   myChart = charts.init(chartDom, 'dark');
							  
						
						
							option = {
								
							  xAxis: {
								type: 'category',
								data: fechas
							  },
							  yAxis: [{
								type: 'value',
								name: nuevo,
								nameLocation: "end",
								nameTextStyle: {
									fontWeight: "bold",
									fontSize: 16
								  }
							  }],
							  series: [
								{
								  data: control.obtenerElementoActual(),
								  type: 'line'
								}
							  ]
							};
								 myChart.setOption(option);
							
						
							
							  }, this); 
	
						}else{
							
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
							  yAxis: [{
								type: 'value',
								name: "",
								nameLocation: "end",
								
							  }],
							  series: [
								{
								  data: control.obtenerElementoActual(),
								  type: 'line'
								}
							  ]
							};
								 myChart.setOption(option);
					 
	
						}, this);
					
					 
				 }
				  
				}else if(col === 5){
					let valorCol = tableModel.getValue(col, row);
						tableModel.setValue(col, row, !valorCol);

						if(tableModel.getValue(col, row)){
							
						
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
							  yAxis: [{
								type: 'value',
								position: "right"
							  }],
							  series: [
								{
								  data: control.obtenerElementoActual(),
								  type: 'line'
								}
							  ]
							};
								 myChart.setOption(option);
					 
	
						}, this);
						}else{
						
						
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
							  yAxis: [{
								type: 'value',
								position: "left"
							  }],
							  series: [
								{
								  data: control.obtenerElementoActual(),
								  type: 'line'
								}
							  ]
							};
								 myChart.setOption(option);
					 
	
						}, this);
						}
				}else if(col ===6){
					//debo añadir esto al echarts en el yAxis 
					/*axisLabel: {
      				color: "rgba(234, 0, 255, 1)"
   					 }*/
  
				}

				if(col === 1){//tableModel.getValue(1, row)=== nuevo 
					
					nuevo_1= tableModel.getValue(1, row)
					
					
					
					let option;
					let myChart = 0;
					let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///modificable
				   canvas1.addListener("redraw", function(e)
					  { 

						
						let chartDom= scroll.getContentElement().getDomElement();
					   myChart = charts.init(chartDom, 'dark');
					  
				
				
					option = {
						
					  xAxis: {
						type: 'category',
						data: fechas
					  },
					  yAxis: [{
						type: 'value',
						name: nuevo_1,
						nameLocation: "end",
						nameTextStyle: {
							fontWeight: "bold",
							fontSize: 16
						  }
					  }],
					  series: [
						{
						  data: control.obtenerElementoActual(),
						  type: 'line'
						}
					  ]
					};
						 myChart.setOption(option);
					
				
					
					  }, this); 
					}
					
		
			
			});//cellTap
		
			});//execute boton
			//tableModel.removeRows(fila, 1, true);
			//FALTA HACER LA FUNCIONALIDAD DEL BOTON2, QUE ELIMINA REGISTROS DE FORMA INDIVIDUAL

			//Remueve todas las filas de la tablas
			btn3.addListener("execute", function(){
				tableModel.removeRows(0, tableModel.getRowCount(), true);
			});

		menu.add(btn1);
	    menu.add(btn2);
		menu.add(btn3);

		
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
 
