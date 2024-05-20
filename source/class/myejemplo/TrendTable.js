
// trendTable
qx.Class.define("myejemplo.TrendTable", {
  extend: qx.ui.table.Table,

  construct: function (columnas, id, scroll, charts, control) {
    this.base(arguments);
    // table model config
    let tableModel = new qx.ui.table.model.Simple();
	tableModel.setColumns(columnas);
	
    this.setTableModel(tableModel);
   
	this
	.getSelectionModel()
	.setSelectionMode(
	  qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION
	);
	
    if(id == "Trace"){
		//"Show", "Item(PV, Formula)", "Display Name", "Color","Scan Period", "Buffer Size", "Axis"
		tableModel.setColumnEditable(0,false);
		tableModel.setColumnEditable(1,true);
		tableModel.setColumnEditable(2,true);
		tableModel.setColumnEditable(3,false);
		tableModel.setColumnEditable(4,true);
		tableModel.setColumnEditable(5,true);
		tableModel.setColumnEditable(6,false);
		let columnModelTrace = this.getTableColumnModel();
    	this.mouseEventTable2(scroll, charts, tableModel, control, columnModelTrace ,this);
		
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

  //iterator to count the records in the table
  statics:{
	INDEXV_A: 1,
	INDEXTRACE: 1
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
		
		
		columnModel.setDataCellRenderer(6, new myejemplo.RenderButton()); 
		columnModel.setDataCellRenderer(7, new qx.ui.table.cellrenderer.Number());
		columnModel.setDataCellRenderer(8, new qx.ui.table.cellrenderer.Number());
		columnModel.setDataCellRenderer(9, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setDataCellRenderer(10, new qx.ui.table.cellrenderer.Boolean());
				
			
			
				tableModel.addRows([[true, `Value ${this.self(arguments).INDEXV_A++}`, false, true, true, false, ,0.0, 10.0, false, false]]);//de esta forma se añaden registros
									//0,               1,                                 2,   3,    4,     5,    6,    7,   8,     9,    10

							
				//event on table cells
			
				tabla.addListener("cellTap", function(e){
			 
				 let col = e.getColumn();
				 let row = e.getRow();
				 
			 
				 
				 let canvas1 = new qx.ui.embed.Canvas().set({
					canvasWidth: 200,
					canvasHeight: 200,
					syncDimension: false,
				  });
				  	let option;
					let myChart = 0;
					let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];//can be modified
 				let nuevo = tableModel.getValue(1, row);
				let nuevo_1;
				if(col === 0){
					let valorActual = tableModel.getValue(col, row);//value currently contained

					 tableModel.setValue(col, row, !valorActual);
					 
						 if(tableModel.getValue(col, row) === false){//---->Check is false
						
					
					/*	let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///can be modified*/
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
						
						   ////////end of graph
						 }else{//---->true
						
				
						/*	let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///can be modified*/
						canvas1.addListener("redraw", function(e)
						   {
							let chartDom = scroll.getContentElement().getDomElement();
							myChart = charts.init(chartDom, 'dark');
						   
					 
					 
						 option = {
							tooltip: {
								trigger: "axis",
								axisPointer: {
								  type: "shadow"
								}
							  },
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
			 
					
					
					 
					 
				}else if(col === 2){
						let valorCol = tableModel.getValue(col, row);
						tableModel.setValue(col, row, !valorCol);
						nuevo_1 = tableModel.getValue(1, row);
					
					
						if(tableModel.getValue(col, row)){
				
						 /*	let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///can be modified*/
						   canvas1.addListener("redraw", function(e)
							  { 
								
								let chartDom= scroll.getContentElement().getDomElement();
							   myChart = charts.init(chartDom, 'dark');
							  
						
						
							option = {
								tooltip: {
									trigger: "axis",
									axisPointer: {
									  type: "shadow"
									}
								  },
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
							
						  /*	let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///can be modified*/
						   canvas1.addListener("redraw", function(e)
							  {
							   let chartDom = scroll.getContentElement().getDomElement();
							   myChart = charts.init(chartDom, 'dark');
							  
						
						
							option = {
								tooltip: {
									trigger: "axis",
									axisPointer: {
									  type: "shadow"
									}
								  },
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
							
						/*	let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///can be modified*/
						   canvas1.addListener("redraw", function(e)
							  {
							   let chartDom = scroll.getContentElement().getDomElement();
							   myChart = charts.init(chartDom, 'dark');
							  
						
						
							option = {
								tooltip: {
									trigger: "axis",
									axisPointer: {
									  type: "shadow"
									}
								  },
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
						
						
						   /*	let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///can be modified*/
						   canvas1.addListener("redraw", function(e)
							  {
							   let chartDom = scroll.getContentElement().getDomElement();
							   myChart = charts.init(chartDom, 'dark');
							  
						
						
							option = {
								tooltip: {
									trigger: "axis",
									axisPointer: {
									  type: "shadow"
									}
								  },
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
				}if(col === 6){
					let cl = new qx.ui.basic.Label();
					let color = new qx.ui.control.ColorPopup(); 
					color.exclude(); 			
					color.setValue("#2BFFFB");
					color.placeToWidget(tabla);
       				color.show();

					   color.addListener("changeValue", function (e) {
					
						canvas1.addListener("redraw", function()
						{ 
						
						 
						  let chartDom= scroll.getContentElement().getDomElement();
						 myChart = charts.init(chartDom, 'dark');

							
					  option = {
						//color stats------> color: [" rgba(197, 19, 19, 1)"],
						  tooltip: {
							  trigger: "axis",
							  axisPointer: {
								type: "shadow"
							  }
							},
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
							},
							/*axisLine: {
								lineStyle: {
								  color: 
								}
							  }*/
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
						
					  }, this);
					 

						
					
					  }
					   
						
				

				if(col === 1){
					
					nuevo_1= tableModel.getValue(1, row)
					
					
					
				/*	let option;
						 let myChart = 0;
						 let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///can be modified*/
				   canvas1.addListener("redraw", function(e)
					  { 

						
						let chartDom= scroll.getContentElement().getDomElement();
					   myChart = charts.init(chartDom, 'dark');
					  
				
				
					option = {
						tooltip: {
							trigger: "axis",
							axisPointer: {
							  type: "shadow"
							}
						  },
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
					if(col === 10){
						let logaritmos= [];
						var selection = [];
						tabla.getSelectionModel().iterateSelection(function (ind) {
						  selection.push(ind + "");
						});
						

					//aqui faltaria hacer que cada linea disponible puede pasarse a logaritmo base 10 para sus valores de y
						

						
					
		
				}
			});// end cellTap
		
			});
		
			//method that deletes records individually
			btn2.addListener(
				"execute",
				function (evt) {
				  var selection = [];
				  tabla.getSelectionModel().iterateSelection(function (ind) {
					selection.push(ind + "");
				  });
				 
				  
				  tableModel.removeRows(selection[0], 1, true);
				},
				this
			  );
			//Removes all rows from the table
			btn3.addListener("execute", function(){
				tableModel.removeRows(0, tableModel.getRowCount(), true);
			});

		menu.add(btn1);
	    menu.add(btn2);
		menu.add(btn3);

		
		menu.openAtPointer(e); 
		

	
  		});
		
  	},


  	mouseEventTable2:function(scroll, charts, modeloTabla, control, modelColumn, tabla){
		let winAddPv = new myejemplo.WindowAddPV(modeloTabla, modelColumn, control, scroll, charts, tabla);
  		this.addListener("contextmenu", function(e){
  		
  		 
      	let menu = new qx.ui.menu.Menu();
  		menu.setOpener(this);
  		
  		let btn1 = new qx.ui.menu.Button("Add PV");
		let btn2 = new qx.ui.menu.Button("Add Formula");
			
			btn1.addListener("execute", function(){
				
			
			
			winAddPv.open();
			tabla.addListener("cellTap", function(e){
				let col = e.getColumn();
                let row = e.getRow();
                
                if(col === 0){
                    let valorCol = modeloTabla.getValue(col, row);
					modeloTabla.setValue(col, row, !valorCol);
					if(modeloTabla.getValue(col, row)){
						//si esta true
						//se debe mostrar la linea correspondiente a este registro
					}else{
						alert(" no activa")
						//false
						//se debe ocultar la linea correspondiente a este registro, pero no su value axes. Se mostrara un mensaje con una advertencia 
					}

			}
			if(col === 3){
				//corresponde al boton que abre el ColorPopup
				let color = new qx.ui.control.ColorPopup(); 
					color.exclude(); 			
					color.setValue("#2BFFFB");
					color.placeToWidget(tabla);
       				color.show();

					   color.addListener("changeValue", function (e) {});

			}
		});
			
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
 
