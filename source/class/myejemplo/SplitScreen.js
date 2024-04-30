/**
*
*@asset(charts.js)
*/

// SplitScreen layout - pantalla dividida
qx.Class.define("myejemplo.SplitScreen", {
  extend: qx.ui.splitpane.Pane,
  construct: function () {
    
    // Llama al constructor de la clase base
    this.base(arguments, "vertical"); // "vertical" para un divisor horizontal

	 let Myecharts = require("echarts");
	 //Objeto que guarda los estados de la grafica (valores numericos)
	 let controladorGrafica = new myejemplo.ManejadorGrafica(); 
    // SplitScreen TOP component
    let topComponent = new qx.ui.tabview.TabView();
    // test

     topComponent.setMinHeight(200);
     topComponent.setMaxHeight(550); 
     
     
     //contenedorMainTop.add(topComponent);
     let graph1 = new qx.ui.tabview.Page("Data Browser");
     graph1.setShowCloseButton(true);
     graph1.setLayout(new qx.ui.layout.Grid(30, 25));
     
     //Container compatible con el graph1 que contendra el grafico de echarts
     let scroller = new qx.ui.container.Scroll();
     scroller.setHeight(450);
     scroller.setMaxHeight(450);
     
     scroller.setMaxWidth(1820);//buscar ajustar este tamaño
    
  
	
     //MenuBar para el graph1
     let menuBar1 = new qx.ui.menubar.MenuBar();	
     
     
     	
     		
     		
     	//Boton dentro del menuBar1
     	let btnMenuBar1 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/configure_gris.png");
   		let btnMenuBar2 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/add_annotation_gris.png");
     	let btnMenuBar3 = new qx.ui.menubar.Button(null,"myejemplo/imagenes/edit_annotation_gris.png");
     	let btnMenuBar4 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/crosshair_gris.png");
     	let btnMenuBar5 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/stagger_gris.png");
     	//let btnMenuBar6 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/zoom_in_gris.png");
     	//let btnMenuBar7 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/zoom_out_gris.png");
     	let btnMenuBar8 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/pan_gris.png");
     	let btnMenuBar9 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/pointer.png");
     	let btnMenuBar10 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/undo_gris.png");
     	let btnMenuBar11 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/redo_gris.png");
     	let btnMenuBar12 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/scroll_on_gris.png");
     	let btnMenuBar13 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/time_range_gris.png");
     	let btnMenuBar14 = new qx.ui.menubar.Button("Save changes");
  
		

     	btnMenuBar3.setEnabled(false);
     	//btnMenuBar6.setEnabled(false);//se esta usando la que trae echarts
		//btnMenuBar7.setEnabled(false);//se esta usando la que trae echarts
     	btnMenuBar11.setEnabled(false);
        btnMenuBar5.setEnabled(false);
        btnMenuBar8.setEnabled(false);
		btnMenuBar9.setEnabled(false);
		btnMenuBar12.setEnabled(false);
     	//eventos de los botones btnMenuBar del 1 al 13
     	
      this.windowConfig1(btnMenuBar1, scroller);
      this.addAnotation(btnMenuBar2);
      this.openTimeDialog(btnMenuBar13);
	  this.openAxis(btnMenuBar4, scroller, Myecharts, controladorGrafica);
     	
     	//menuBar1 añade a btnMenuBar
     	menuBar1.add(btnMenuBar1);
	    menuBar1.add(btnMenuBar2);
     	menuBar1.add(btnMenuBar3);
     	menuBar1.add(btnMenuBar4);
     	menuBar1.add(btnMenuBar5);
     	//menuBar1.add(btnMenuBar6);
     	//menuBar1.add(btnMenuBar7);
     	menuBar1.add(btnMenuBar8);
     	menuBar1.add(btnMenuBar9);
     	menuBar1.add(btnMenuBar10);
     	menuBar1.add(btnMenuBar11);
     	menuBar1.add(btnMenuBar12);
     	menuBar1.add(btnMenuBar13);
		//menuBar1.add(btnMenuBar14);
   //------------------------------------------------------------------------------------//
   	 //CREACION DEL GRAFICO DENTRO //------//
   	 
   	 let canvas1 = new qx.ui.embed.Canvas().set({
        canvasWidth: 500,
        canvasHeight: 500,
        syncDimension: true,
      });

   let option;
    let myChart = 0;
	let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///modificable
	let unicValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	

   canvas1.addListener("redraw", function(e)
      {
       let chartDom = scroller.getContentElement().getDomElement();
	   myChart = Myecharts.init(chartDom);
      
		

	option = {
		//toolbox solo se coloca una vez al elemento dom
		toolbox: {
			show: true,
			
			feature: {
			  dataZoom: {
				yAxisIndex: "none"
			  },
			  magicType: {
				type: ["line", "bar"]
			  },
			  dataView: {
				readOnly: false
			  },
			  restore: {
				show : true
			  },
			  saveAsImage: {
				name: "Grafico",
				type: "png",
				icon: 'path://Save.png',
			  iconStyle: {
				color: "rgba(156, 156, 160, 1)"
			  }
			},
			left: "0%"
		  },
		  tooltip: {
			trigger: "axis",
			axisPointer: {
			  type: "shadow"
			}
		  },
	  xAxis: [{
	    type: 'category',
	    data: fechas,
		
	  }],
	  yAxis: [{
	    type: 'value',
		
		
	  }],
	  
		
	  grid: {//muestra la linea que recubre al la grafica, es decir, el borde
		containLabel: false,
		show: true
	  },
	  
	  series: [//aqui se representan las lineas
	    {
		  color: ["#91cc75"],
	      data: controladorGrafica.obtenerElementoActual(),
	      type: 'line',
		
	    },
		//Esta es la forma para configurar una nueva linea
		/*{
			// other configurations of series 2
			color: ["#ea7ccc"],
			data: [-50, 800, 10, 4000, 5000, 45565, 55, -33, 224, 786, -221, 24, -234, -56, 564, 50000, 983, 123, -44400, 0, 23, 12, 43,-22],
			type: 'line',
	
		}*/
	  ]
	};
	
     	myChart.setOption(option);
	

	
      }, this); 

	  //VALORES QUE SIRVIERON PARA PROBAR LOS METODOS UNDO Y REDO
	  //[150, 230, 600, 224, 218, 1000, 147, 260]
	 controladorGrafica.agregarEstado(unicValues);
	
	// controladorGrafica.agregarEstado([12, 200, 450, 760]);
	 //controladorGrafica.agregarEstado([25, 0, 1570, -3]);
	  
	 
      graph1.add(menuBar1, {row: 0, column: 0, colSpan: 50});
      graph1.add(scroller, {row: 1, column: 0, colSpan: 150});
	  this.undoFunction(btnMenuBar10, btnMenuBar11, controladorGrafica, scroller, Myecharts);
	  this.redoFunction(btnMenuBar11, btnMenuBar10, controladorGrafica, scroller, Myecharts);
	 // this.saveState(btnMenuBar14, controladorGrafica, estado);
      this.mouseEventTable(scroller);
	 
   //------------------------------------------------------------------------------------//
    
    let graph2 = new qx.ui.tabview.Page("Trend 2");
    graph2.setShowCloseButton(true);
    topComponent.add(graph1);
   // topComponent.add(graph2);

    
    // SplitScreen BOTTOM component
    
    let bottomComponent = new qx.ui.tabview.TabView();
    let page1 = new qx.ui.tabview.Page("Properties");
    page1.setLayout(new qx.ui.layout.VBox()); // Define un layout vertical
    page1.setShowCloseButton(true);
    ///////////////////////////////////////////////////////////////////
    
    //Tabviews
    let contenido = new qx.ui.tabview.TabView();
    let opcTrace = new qx.ui.tabview.TabView();
    //////////////////////////////////////////////
    
    //creando paginas para el tabview contenido.
    let trace = new qx.ui.tabview.Page("Trace");
    let time_Axis = new qx.ui.tabview.Page("Time Axis");
    let value_Axes = new qx.ui.tabview.Page("Value Axes");
    let misc = new qx.ui.tabview.Page("Misc.");
    let statistics = new qx.ui.tabview.Page("Statistics");
    
    //añadiendo layout  a las paginas dentro de contenido
    trace.setLayout(new qx.ui.layout.Grid(15, 15));
    time_Axis.setLayout(new qx.ui.layout.Grid(15, 15));
    value_Axes.setLayout(new qx.ui.layout.Grid(15, 15));
    misc.setLayout(new qx.ui.layout.Grid(15, 15));
    statistics.setLayout(new qx.ui.layout.Grid(15, 15));
    
    //añadiendo paginas contenido
    contenido.add(trace);
    contenido.add(time_Axis);
    contenido.add(value_Axes);
    contenido.add(misc);
    contenido.add(statistics);
    ////////////////////////////
    
    
    //tabview contenido añadido a la pagina 1 del tabview bottomComponent
    page1.add(contenido);
    /////////////////////////////////////////
    
    //ELEMENTOS PARA LA PAGINA  trace//////////////////////////
    
    
    //Añadiendo lista con los encabezados a la pagina Trace
    const encanbezado_Tabla = ["Show", "Item(PV, Formula)", "Display Name", "Color", "Cursor Value", "Scan Period", "Buffer Size", "Axis", "Trace Type", "Width", "Style", "Point", "Size", "Request", "Index"];
    		
	///////borrar
	let tableModel = new qx.ui.table.model.Simple();
	tableModel.setColumns(encanbezado_Tabla);
///////

    		//añadiendo su tabla respectiva
    let trendTable = new myejemplo.TrendTable(encanbezado_Tabla, "Trace", scroller, Myecharts, controladorGrafica);
         
	/*
    //valida si la tabla no posee elementos. En caso que si este vacia, se muestra a un lado de la tabla en letras rojas el mensaje "No hay trazas"       
     if(trendTable.getTableModel().getData().length === 0){
    let msgVacio = new qx.ui.basic.Label("No hay trazas");
     trace.add(msgVacio, {row: 0, column: 1});
     msgVacio.setTextColor("red");
    }    */
    	//se añade la tabla a la pagina trace
     trace.add(trendTable, {row: 0, column: 0});
    /////////////////////////////////////////////
    
    
    ////////ELEMENTOS PARA LA PAGINA time_Axis
    let cuadroTextoStart = new qx.ui.form.TextField();
    let cuadroTextoEnd = new qx.ui.form.TextField();
    let grid = new qx.ui.basic.Label("Grid:");
    let btnradioAct = new qx.ui.form.RadioButton("Activar");
    let btnradioDes = new qx.ui.form.RadioButton("Desactivar");
     	let grupo = new qx.ui.form.RadioGroup();
    	grupo.add(btnradioAct, btnradioDes);
    let btn30min = new qx.ui.form.Button("30 Minutos");
    let btn1hora = new qx.ui.form.Button("1 Hora");
    let btn12horas = new qx.ui.form.Button("12 horas");
    let btn1dia = new qx.ui.form.Button("1 Dìa");
    let btn7dias = new qx.ui.form.Button("7 dias");
    let btnAjusteFecha = new qx.ui.form.Button("Ajuste"); //se debe anexar un icono
    
    	//se añaden los elementos a la pagina time_Axis
    time_Axis.add(new qx.ui.basic.Label("Start Time:"), {row: 0, column: 0});
    time_Axis.add(cuadroTextoStart, {row: 0, column: 1});
    time_Axis.add(new qx.ui.basic.Label("End Time:"), {row: 0, column: 2});
    time_Axis.add(cuadroTextoEnd, {row: 0, column: 3});
    time_Axis.add(btnAjusteFecha, {row: 0, column: 4});
    time_Axis.add(grid, {row: 1, column: 0});
    time_Axis.add(btnradioAct, {row: 1, column: 1});
    time_Axis.add(btnradioDes, {row: 1, column: 2});
    time_Axis.add(btn30min, {row: 2, column: 0});
    time_Axis.add(btn1hora, {row: 2, column: 1});
    time_Axis.add(btn12horas, {row: 2, column: 2});
    time_Axis.add(btn1dia, {row: 2, column: 3});
    time_Axis.add(btn7dias, {row: 2, column: 4});
    
    ///evento de el boton btnAjusteFecha
    btnAjusteFecha.addListener("execute", function(e){
     let winAjuste = new qx.ui.window.Window("Configuraciòn");
     //Ajustes de la ventana
     winAjuste.setLayout(new qx.ui.layout.Grid(15, 15));
     winAjuste.setWidth(1000);
     winAjuste.setHeight(200);
     winAjuste.setCenterOnAppear(true);
     winAjuste.setShowMaximize(false);
     winAjuste.setShowMinimize(false);
     winAjuste.setShowClose(false);
     winAjuste.open();
     
     
     let btnClose = new qx.ui.form.Button("Close");
     let btnApply = new qx.ui.form.Button("Apply");
     
     let split = new qx.ui.splitpane.Pane("horizontal");
     split.setHeight(winAjuste.getHeight());
     split.setWidth(winAjuste.getWidth());
     winAjuste.add(split, {row: 0, column: 0});
     
     
     //ELEMENTOS DEL SPLIT///// Contenedor del lado izquierdo y del lado derecho de la ventana winajuste
     let contenedorIzq = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
     let contenedorDer = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
     
     
     contenedorDer.setMinWidth(400); 
     contenedorDer.setMaxWidth(600);
     contenedorIzq.setMinWidth(400); 
     contenedorIzq.setMaxWidth(600);
     /////////////////////////////////////////Fin de los elementos del split
     
     ////ELEMENTOS DEL contenedorIzq////
     let labelResumen = new qx.ui.basic.Label("0/0/0");
     	 labelResumen.setBackgroundColor("#cacfd2");
     
     //Time spinners
     let spinnerHora = new qx.ui.form.Spinner(0, 1, 23);
     let spinnerMinute = new qx.ui.form.Spinner(0, 1, 59);
     let spinnerSecond = new qx.ui.form.Spinner(0, 1, 59);
     let btnResetTime = new qx.ui.form.Button("00:00");
     
      //Spinners para year, month, days, hours, minutes, seconds
      let spinnerYear = new qx.ui.form.Spinner(0, 1, 99);//buscar còmo bloquear las fechas que no son hoy
      let spinnerMonth = new qx.ui.form.Spinner(0, 1, 11);
      let spinnerDays = new qx.ui.form.Spinner(0, 1, 30);
      let spinnerHours = new qx.ui.form.Spinner(0, 1, 23);
      let spinnerMinutes = new qx.ui.form.Spinner(0, 1, 59);
      let spinnerSeconds = new qx.ui.form.Spinner(0, 1, 59);
     
     //Botones para 12h, 1 day, 3 days. 7days
      let btnStart12H = new qx.ui.form.Button("12 h");
      let btnStart1D = new qx.ui.form.Button("1 day");
      let btnStart3D = new qx.ui.form.Button("3 days");
      let btnStart7D = new qx.ui.form.Button("7 days");
      
      let año=0; 
      let mes=0;
      let dia=0;
       //Boton para escoger la fecha
     let btnChooser = new qx.ui.form.Button("Get Date");
     let labelSetDate = new qx.ui.basic.Label("##");
     labelSetDate.setBackgroundColor("#cacfd2");
     //objeto que permite escoger la fecha
     let chooserDate = new qx.ui.control.DateChooser();
     
     
     //evento del boton para escoger la fecha
     let wind1 = new qx.ui.window.Window("Get Date");
     let btnWindAceptar1 = new qx.ui.form.Button("Aceptar");
     
     	btnChooser.addListener("execute", function(e){
     	//ventana que sirve para mostrar el seleccionador de fechas y su boton aceptar
     	
	
     	wind1.setLayout(new qx.ui.layout.VBox());
     	wind1.add(chooserDate);
     	wind1.setCenterOnAppear(true);
     	wind1.setShowMaximize(false);
	wind1.setShowMinimize(false);
	wind1.setShowClose(false);
	
	
	wind1.add(btnWindAceptar1);
	if(!wind1.isActive()){
	
		wind1.open();
	}
	//evento que permite cambiar el valor a obtener del seleccionador de fechas
	
	chooserDate.addListener("changeValue", function(e){
		
		var date = e.getData();
		año = date.getFullYear();
		mes = date.getMonth() +1;
		dia = date.getDate();
		labelSetDate.setValue(date.toDateString());
		labelResumen.setValue(año+"/"+mes+"/"+dia );
		
	//evento del boton aceptar	
	btnWindAceptar1.addListener("execute", function(e){
		
		wind1.close();
		});
	});
     
     	});		
     	
     	
	
     	//evento que permite resetear el tiempo hh/min/sec
     	btnResetTime.addListener("execute", function(e){
		spinnerHora.resetValue();
		spinnerMinute.resetValue();
		spinnerSecond.resetValue();
		});
      
      
     /* 
      var segundosTotales = 0;
      const AÑO = 31563000;
      const MES = 2592000;
      const DIA = 86400;
      const HORA = 3600;
      const MIN = 60;*/
      
      //eventos de los botones (btnStart12H, btnStart1D, btnStart3D, btnStart7D)//////////
      btnStart12H.addListener("execute", function(e){
	//se ajusta el spinner hours y se resetean los demas spinners
		spinnerHours.setValue(12);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerDays.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
		
		labelResumen.setValue(año+"/"+mes+"/"+dia);
		});
	
	
	 btnStart1D.addListener("execute", function(e){
	//se ajusta el spinner days a 1 y se resetean los demas spinners
		spinnerDays.setValue(1);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerHours.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
	
		//se asigna a el label labelResumen
		labelResumen.setValue(año+"/"+mes+"/"+dia +" "+spinnerDays.getValue().toString()+" day");
		});
	
      
       btnStart3D.addListener("execute", function(e){
	//se ajusta el spinner days a 3 y se resetean los demas spinners
		spinnerDays.setValue(3);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerHours.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
	
		//se asigna a el label labelResumen
		labelResumen.setValue(año+"/"+mes+"/"+dia +" "+spinnerDays.getValue().toString()+" days");
		});
	
      
       btnStart7D.addListener("execute", function(e){
	//se ajusta el spinner days a 7  y se resetean los demas spinners
		spinnerDays.setValue(7);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerHours.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
	
		//se asigna a el label labelResumen
		labelResumen.setValue(año+"/"+mes+"/"+dia +" "+spinnerDays.getValue().toString()+" days");
		});
	
	
      /////////////////////////////////////fin de los eventos/////////////
      
    
			//se añaden los elementos al contenedorIzq
     contenedorIzq.add(new qx.ui.basic.Label("Start"), {row: 0, column: 0});
     contenedorIzq.add(new qx.ui.basic.Label("Date"), {row: 1, column: 0});
     contenedorIzq.add(labelSetDate, {row: 1, column: 1});
     contenedorIzq.add(btnChooser, {row: 1, column: 2});
     contenedorIzq.add(new qx.ui.basic.Label("Time"), {row: 2, column: 0});
     contenedorIzq.add(spinnerHora, {row: 2, column: 1});
     contenedorIzq.add(spinnerMinute, {row: 2, column: 2});
     contenedorIzq.add(spinnerSecond, {row: 2, column: 3});
     contenedorIzq.add(btnResetTime, {row: 2, column: 4});
     contenedorIzq.add(new qx.ui.basic.Label("Year"), {row: 3, column: 0});
     contenedorIzq.add(spinnerYear, {row: 3, column: 1});
     contenedorIzq.add(new qx.ui.basic.Label("Hours"), {row: 3, column: 2});
     contenedorIzq.add(spinnerHours, {row: 3, column: 3});
     contenedorIzq.add(new qx.ui.basic.Label("Month"), {row: 4, column: 0});
     contenedorIzq.add(spinnerMonth, {row: 4, column: 1});
     contenedorIzq.add( new qx.ui.basic.Label("Minutes"), {row: 4, column: 2});
     contenedorIzq.add(spinnerMinutes, {row: 4, column: 3});
     contenedorIzq.add(new qx.ui.basic.Label("Days"), {row: 5, column: 0}); 
     contenedorIzq.add(spinnerDays, {row: 5, column: 1}); 
     contenedorIzq.add(new qx.ui.basic.Label("Seconds"), {row: 5, column: 2}); 
     contenedorIzq.add(spinnerSeconds, {row: 5, column: 3});      
     contenedorIzq.add(btnStart12H, {row: 6, column: 0});  
     contenedorIzq.add(btnStart1D, {row: 6, column: 1});  
     contenedorIzq.add(btnStart3D, {row: 6, column: 2});  
     contenedorIzq.add(btnStart7D, {row: 6, column: 3});  
     contenedorIzq.add(labelResumen, {row: 7, column: 0});  
     ///////////////////////////////////
     
     
     ///////////////ELEMENTOS DEL CONTENEDOR contenedorDer
     let labelResumen_2 = new qx.ui.basic.Label("0/0/0");
     	 labelResumen_2.setBackgroundColor("#cacfd2");
     let labelSetDate_2 = new qx.ui.basic.Label("##");
     		labelSetDate_2.setBackgroundColor("#cacfd2");
     		
     		
      //Time spinners
     let spinnerHoraEnd = new qx.ui.form.Spinner(0, 1, 23);
     let spinnerMinuteEnd = new qx.ui.form.Spinner(0, 1, 59);
     let spinnerSecondEnd = new qx.ui.form.Spinner(0, 1, 59);
     let btnResetTimeEnd = new qx.ui.form.Button("00:00");
     
     //evento que permite resetear el tiempo hh/min/sec
     	btnResetTimeEnd.addListener("execute", function(e){
		spinnerHoraEnd.resetValue();
		spinnerMinuteEnd.resetValue();
		spinnerSecondEnd.resetValue();
		});
     
     
      let chooserDate_2 =new qx.ui.control.DateChooser();
     let btnChooser_2 = new qx.ui.form.Button("Get Date");
     
      let añoEnd=0; 
      let mesEnd=0;
      let diaEnd=0;
      let wind2 = new qx.ui.window.Window("Get Date");
  
	let btnWindAceptar2 = new qx.ui.form.Button("Aceptar");
	
     btnChooser_2.addListener("execute", function(e){
     
     
     	
     	
     	wind2.setLayout(new qx.ui.layout.VBox());
   	wind2.setCenterOnAppear(true);
     	wind2.setShowMaximize(false);
	wind2.setShowMinimize(false);
	wind2.setShowClose(false);
	wind2.add(chooserDate_2);
	
	
     
	wind2.add(btnWindAceptar2);
	 if(!wind2.isActive()){
     	wind2.open();
     }
     
     chooserDate_2.addListener("execute", function(e){
     	let actual = chooserDate_2.getValue();
     	labelResumen_2.setValue(actual);
     
     });
     
     
     
     chooserDate_2.addListener("changeValue", function(e){
     
     		var date = e.getData();
		añoEnd = date.getFullYear();
		mesEnd = date.getMonth() +1;
		diaEnd = date.getDate();
		
		labelSetDate_2.setValue(date.toDateString());
		labelResumen_2.setValue(añoEnd+"/"+mesEnd+"/"+diaEnd );
	
	
		//evento del boton aceptar	
	btnWindAceptar2.addListener("execute", function(e){
		
		wind2.close();
		});
     });
    
     });
     
     
     let btnNow =  new qx.ui.form.Button("Now");
     
     btnNow.addListener("execute", function(e){
		chooserDate_2.setValue(new Date());
		
		añoEnd = chooserDate_2.getValue().getFullYear();
		mesEnd = chooserDate_2.getValue().getMonth() +1;
		diaEnd = chooserDate_2.getValue().getDate();
		labelResumen_2.setValue(añoEnd+"/"+mesEnd+"/"+diaEnd);
		
		labelSetDate_2.setValue(labelResumen_2.getValue());
		});
     	
     	//se añaden los elementos al contenedorDer
      contenedorDer.add(new qx.ui.basic.Label("End"), {row: 0, column: 0}); 
      contenedorDer.add(new qx.ui.basic.Label("Date"), {row: 1, column: 0}); 
      contenedorDer.add(labelSetDate_2, {row: 1, column: 1}); 
      contenedorDer.add(btnChooser_2, {row: 1, column: 2});  
      contenedorDer.add(new qx.ui.basic.Label("Time"), {row: 2, column: 0});  
      contenedorDer.add(spinnerHoraEnd, {row: 2, column: 1});  
      contenedorDer.add(spinnerMinuteEnd, {row: 2, column: 2});  
      contenedorDer.add(spinnerSecondEnd, {row: 2, column: 3});  
      contenedorDer.add(btnResetTimeEnd, {row: 2, column: 4});  
      contenedorDer.add(btnNow, {row: 3, column: 0});  
      contenedorDer.add(labelResumen_2, {row: 4, column: 0});  
       
      
     ////////////////////////Fin del contenedor de la derecha///////////////////////////
     
     
     //se añaden los contenedores: contenedorIzq y contenedorDer
     split.add(contenedorIzq, 1);
     split.add(contenedorDer, 1);
     ///////////////////////////
     
     //eventos de esos botones: para cerrar o aplicar los cambios
   btnClose.addListener("execute", function(e){
   	winAjuste.close();
   	});
    
    btnApply.addListener("execute", function(e){
   	
   	cuadroTextoStart.setValue(labelResumen.getValue());
   	cuadroTextoEnd.setValue(labelResumen_2.getValue());
   	winAjuste.close();
   	});
   	
   	
   	winAjuste.add(btnClose, {row: 1, column: 1});
   	winAjuste.add(btnApply, {row: 1, column: 2});
    });
    
    //Eventos de los botones btn30min, btn1hora, btn12hours, btn1dia, btn7dias 
    //NOTA: estos botones deberian poder cambiar los valores horizontales de tiempo de la grafica
    btn30min.addListener("execute", function(){
    cuadroTextoStart.setValue("30 minutos");
    
    });
    
    btn1hora.addListener("execute", function(){
    cuadroTextoStart.setValue("1 hora");
    
    });
    
    btn12horas.addListener("execute", function(){
    cuadroTextoStart.setValue("12 horas");
    
    });
    
    btn1dia.addListener("execute", function(){
    cuadroTextoStart.setValue("1 dia");
    
    });
    
    btn7dias.addListener("execute", function(){
    cuadroTextoStart.setValue("7 dias");
    
    });
    /////////Fin de time_Axis///////////////////////////////////
    
    
    ////ELEMENTOS PARA LA PAGINA value_Axes
     let situacion = new qx.ui.basic.Label("Cuando llegan los datos archivados:");
     let btnradioNotDo = new qx.ui.form.RadioButton("No hacer nada");
     let btnradioExe = new qx.ui.form.RadioButton("Ejecutar 'Escalonamiento'");
     let grupoRd = new qx.ui.form.RadioGroup();
     grupoRd.add(btnradioNotDo, btnradioExe);
     
     
     	//encabezado de la tabla trandTable_2
     	let lista = ["Show", "Axis Name", "Axis Name?", "Trace Names?", "Grid", "On Right", "Color", "Min", "Max", "Auto-Scale", "Log.Scale"];
     let trendTable_2 = new myejemplo.TrendTable(lista, "ValueAxes", scroller, Myecharts, controladorGrafica);
     
     //se añaden los elementos a la pagina value_Axes
    value_Axes.add(situacion, {row: 0, column: 0});
    value_Axes.add(btnradioNotDo, {row: 0, column: 1});
    value_Axes.add(btnradioExe, {row: 0, column: 2});
    value_Axes.add(trendTable_2, {row: 1, column: 0});
   
   //verifica si la tabla esta vacia. En caso de que si, se muestra un mensahje en letras rojas al lado de la tabla: "Tabla sin contenido"
   /* if(trendTable_2.getTableModel().getData().length === 0){
    qx.log.Logger.info(this, "entre al if");
    let mensajeVacio = new qx.ui.basic.Label("Tabla sin contenido");
     value_Axes.add(mensajeVacio, {row: 1, column: 1});
     mensajeVacio.setTextColor("red");
    }*/
    /////////////////////////////////////////////////
    
    
    ///////////////////////////////////ELEMENTOS DE LA PAGINA misc.///   
    let textFTitle = new qx.ui.form.TextField();
    let textFPlot = new qx.ui.form.TextField("3.0");
    let textFScroll = new qx.ui.form.TextField("5.0");
    
    let lbColor = new qx.ui.basic.Label("Color");
    let lbColor1 = new qx.ui.basic.Label("Color");
    //selector de color
    let colorSelectorFore = new qx.ui.control.ColorPopup(); 
    colorSelectorFore.exclude(); 			
    colorSelectorFore.setValue("#EFFF44");
    lbColor.setBackgroundColor(colorSelectorFore.getValue());
    //boton se añade pagina y activa al selector
    let btnColor = new qx.ui.form.Button("Color");
    btnColor.addListener("execute", function(){
    colorSelectorFore.placeToWidget(btnColor);
    colorSelectorFore.show();
    });
    
      colorSelectorFore.addListener("changeValue", function (e) {
        lbColor.setBackgroundColor(e.getData());
      });
      
    let colorSelectorBack = new qx.ui.control.ColorPopup();
    colorSelectorBack.exclude(); 			
    colorSelectorBack.setValue("#2BFFFB");
    lbColor1.setBackgroundColor(colorSelectorBack.getValue());
    //boton se añade pagina y activa al selector
    let btn1Color = new qx.ui.form.Button("Color");
    btn1Color.addListener("execute", function(){
    colorSelectorBack.placeToWidget(btn1Color);
    colorSelectorBack.show();
    });
    
     colorSelectorBack.addListener("changeValue", function (e) {
        lbColor1.setBackgroundColor(e.getData());
      });
      
    let checkBSave = new qx.ui.form.CheckBox();
    let btnTitleF = new qx.ui.form.Button("#########");
    let btnLabelF = new qx.ui.form.Button("#########");
    let btnScaleF = new qx.ui.form.Button("#########");
    let btnLegend = new qx.ui.form.Button("#########");
    let checkBLegend = new qx.ui.form.CheckBox();
    
    
    checkBSave.addListener("changeValue", function (e) {
    
    	if(e.getData()){
    		//logica de cuando el check este activo
    	}else{
    		//logica de cuando el check no este activo
    	}
    });
    
    
    checkBLegend.addListener("changeValue", function (e) {
    
    	if(e.getData()){
    		//logica de cuando el check este activo
    	}else{
    		//logica de cuando el check no este activo
    	}
    });
    
   //llamada a la funcion para mostrar ventana de ajuste del texto del boton btnTitleF
   this.windowSelectFont(btnTitleF);
   //fin de la funcion
    ///
   //llamada a la funcion para mostrar ventana de ajuste del texto del boton btnLabelF
    this.windowSelectFont(btnLabelF);
    ///fin del evento del boton btnLabelF
    
     //llamada a la funcion para mostrar ventana de ajuste del texto del boton btnScaleF
    this.windowSelectFont(btnScaleF);
    ///fin del evento del boton btnScaleF
    
    //llamada a la funcion para mostrar ventana de ajuste del texto del boton btnLegend
    this.windowSelectFont(btnLegend);
    ///fin del evento del boton btnLegend
    
    misc.add(new qx.ui.basic.Label("Title:"), {row: 0, column: 0});
    misc.add(textFTitle, {row: 0 , column: 1});
    misc.add(new qx.ui.basic.Label("Title font:"), {row: 0, column: 3});
    misc.add(btnTitleF, {row: 0, column: 4});
    misc.add(new qx.ui.basic.Label("Plot redraw period [second]:"), {row: 1, column: 0});
    misc.add(textFPlot, {row: 1, column: 1});
    misc.add(new qx.ui.basic.Label("Label Font:"), {row: 1, column: 3});
    misc.add(btnLabelF, {row: 1, column: 4});
    misc.add(new qx.ui.basic.Label("Scroll Step [second]:"), {row: 2, column: 0});
    misc.add(textFScroll, {row: 2, column: 1});
    misc.add(new qx.ui.basic.Label("Scale Font:"), {row: 2, column: 3});
    misc.add(btnScaleF, {row: 2, column: 4});
    misc.add(new qx.ui.basic.Label("Foreground Color:"), {row: 3, column: 0});
    misc.add(btnColor, {row: 3, column: 1});
    misc.add(lbColor, {row: 3, column: 2});
    misc.add(new qx.ui.basic.Label("Legend Font:"), {row: 3, column: 3});
    misc.add(btnLegend, {row: 3, column: 4});
    misc.add(new qx.ui.basic.Label("Background Color:"), {row: 4, column: 0});
    misc.add(btn1Color, {row: 4, column: 1});
    misc.add(lbColor1, {row: 4, column: 2});
    misc.add(new qx.ui.basic.Label("Legend:"), {row: 4, column: 3});
    misc.add(checkBLegend, {row: 4, column: 4});
    misc.add(new qx.ui.basic.Label("Save Changes:"), {row: 5, column: 0});
    misc.add(checkBSave, {row: 5, column: 1});
    
    //////////////////////////////////////////////////////////////
    
    ////////ELEMENTOS DE LA PAGINA statistics////
    let btnRefresh = new qx.ui.form.Button("Refresh");
    let listaSta = ["Display Name", "Sample Count", "Mean", "Median", "Standard Deviation", "Min Value", "Max Value", "Sum"];
    
    let trendTable_3 = new myejemplo.TrendTable(listaSta, "nada", scroller, Myecharts);
    
    statistics.add(btnRefresh, {row: 0, column: 0});
    statistics.add(trendTable_3, {row: 1, column: 1, colSpan: 80});
   
    if(trendTable_3.getTableModel().getData().length === 0){
    let mVacio = new qx.ui.basic.Label("No hay Trazas");
     statistics.add(mVacio, {row: 1, column: 81});
     mVacio.setTextColor("red");
    }
    
    btnRefresh.addListener("execute", function(){
				//logica 
			
			});
    ////////////////////////////////////////////////////////
    
    // renderizando
    bottomComponent.add(page1);
    //bottomComponent.add(page2);
    // Limita el crecimiento del panel inferior
    bottomComponent.setMinHeight(200); // Altura mínima de 200 píxeles
    bottomComponent.setMaxHeight(400); // Altura máxima de 400 píxeles
    // Añade los componentes al contenedor
    this.add(topComponent, 1);
    this.add(bottomComponent, 2);
  },
  
  //Metodos
	members: {
	//metodo 1
		windowSelectFont: function(btn){
		
    btn.addListener("execute", function(e){
    let btnCerrar = new qx.ui.form.Button("Aceptar y salir");//Se puede colocar otro boton para salir de esa ventana en dado caso que no se quiera escoger ninguna opcion.
    let winTitle = new qx.ui.window.Window("Configuraciòn del tipo de letra");
     //Ajustes de la ventana
     winTitle.setLayout(new qx.ui.layout.Grid(15, 15));
     winTitle.setWidth(300);
     winTitle.setHeight(150);
     winTitle.setCenterOnAppear(true);
     winTitle.setShowMaximize(false);
     winTitle.setShowMinimize(false);
     winTitle.setShowClose(false);
     winTitle.open();
     
     
     //elementos d es ventana winTitle
     let slBFuente = new qx.ui.form.SelectBox();
     //rellenar el slBFuente con sus opciones.
     slBFuente.add(new qx.ui.form.ListItem("Arial"));
     slBFuente.add(new qx.ui.form.ListItem("Times New Roman"));
     let cmBSize = new qx.ui.form.ComboBox();
     //rellenar el cmBSize
     cmBSize.add(new qx.ui.form.ListItem("8"));
     cmBSize.add(new qx.ui.form.ListItem("10"));
     cmBSize.add(new qx.ui.form.ListItem("12"));
     cmBSize.add(new qx.ui.form.ListItem("14"));
     cmBSize.add(new qx.ui.form.ListItem("16"));
     cmBSize.add(new qx.ui.form.ListItem("18"));
     cmBSize.add(new qx.ui.form.ListItem("20"));
     cmBSize.add(new qx.ui.form.ListItem("22"));
     cmBSize.add(new qx.ui.form.ListItem("24"));
     cmBSize.add(new qx.ui.form.ListItem("32"));
     
     //toma el primer valor y lo deja fijo al abrirse la ventana
     cmBSize.setValue(
        cmBSize.getChildrenContainer().getSelectables()[0].getLabel()
      );
      
    //checkBoxs:  checkBold y checkItalic
    let checkBold = new qx.ui.form.CheckBox("Bold");
    let checkItalic = new qx.ui.form.CheckBox("Italics");
    
    let textArea = new qx.ui.form.TextArea("Ejemplo");
    	textArea.setReadOnly(true);
    	textArea.setWidth(150);
    	textArea.setHeight(100);
    	
    	
     //evento del selectBox
        let selectedItem = 0;
     	let selectedText = 0;
     	let tamaño = cmBSize.getChildrenContainer().getSelectables()[0].getLabel();
     	textArea.setFont(new qx.bom.Font.fromString(tamaño));
     	textArea.set({
        liveUpdate: true,
      });
     	slBFuente.addListener("changeSelection", function(e){
     	selectedItem = e.getData()[0];
     	selectedText = selectedItem.getLabel();
     	
     	btn.setLabel(selectedText+","+tamaño); 
     	
     	});
     	
     	cmBSize.addListener("changeValue", function(e){
     	btn.reset();
     	tamaño= e.getData();
     	btn.setLabel(selectedText+","+tamaño);
     	textArea.setFont(new qx.bom.Font.fromString(tamaño));
     });
     	
     	
     	 //boton-evento para cerrar la ventana winTitle
     	btnCerrar.addListener("execute", function(e){
        winTitle.close();
		 });
 
   checkBold.addListener("changeValue", function(e){
   		
   		btn.setFont(new qx.bom.Font(12));
   		
   		
   		if(e.getData()){
   		//necesito revisar por què al ponerse negrita se cambia el tamaño de la letra ojo
   		textArea.setFont("bold");
   		//textArea.setFont(new qx.bom.Font.fromString(tamaño));
   		btn.reset();
   		btn.setLabel(selectedText+","+tamaño+","+"bold");
   		  
   		}else{
   		textArea.setFont(null);
		textArea.setFont(new qx.bom.Font.fromString(tamaño));	
   		btn.reset();
   		btn.setLabel(selectedText+","+tamaño);
   	
   		}
   });
   
  
   checkItalic.addListener("changeValue", function(e){
   		if(e.getData()){
   			//buscar la forma e poner letra italica
   			//textArea.setFont(ital.getItalic());
   		
   		}else{
   			textArea.setFont(null);
   			btn.setFont(new qx.bom.Font(12));
   		}
   });
   
     //fin del evento para cerrar la ventana winTitle
     
     winTitle.add(new qx.ui.basic.Label("Font Name"), {row: 0, column: 0});
     winTitle.add(slBFuente, {row: 0, column: 1});
     winTitle.add(new qx.ui.basic.Label("Size"), {row: 1, column: 0});
     winTitle.add(cmBSize, {row: 1, column: 1});
     winTitle.add(new qx.ui.basic.Label("Style"), {row: 2, column: 0});
     winTitle.add(checkBold, {row: 2, column: 1});
     winTitle.add(checkItalic, {row: 2, column: 2});
     winTitle.add(textArea, {row: 3, column: 0});
     winTitle.add(btnCerrar, {row: 4, column: 3});
    });
		},
		
		
		mouseEventTable:function(cont){
  	
  		cont.addListener("contextmenu", function(e){
  		
  		 
      		let menu = new qx.ui.menu.Menu();
  		menu.setOpener(cont);
  		
  		let btn1 = new qx.ui.menu.Button("Hide Toolbar");
  		let btn2 = new qx.ui.menu.Button("Add PV");
  		let btn3 = new qx.ui.menu.Button("Add Formula");
  		let btn4 = new qx.ui.menu.Button("Import csv");
  		let btn5 = new qx.ui.menu.Button("Print...");
  		let btn6 = new qx.ui.menu.Button("Save Snapshot");
  		let btn7 = new qx.ui.menu.Button("Create Log");
  		let btn8 = new qx.ui.menu.Button("Send Email");
  		let btn9 = new qx.ui.menu.Button("Open Archive Search Panel");
  		let btn10 = new qx.ui.menu.Button("Open Properties Panel");
  		let btn11 = new qx.ui.menu.Button("Open Data Export Panel");
  		let btn12 = new qx.ui.menu.Button("Inspect Samples");
  		let btn13 = new qx.ui.menu.Button("Inspect Waveforms");
  		let btn14 = new qx.ui.menu.Button("Refresh");
		
		
		//eventos de los botones de1 al 14
		btn1.addListener("execute", function(e){});
		btn2.addListener("execute", function(e){});
		btn3.addListener("execute", function(e){});
		btn4.addListener("execute", function(e){});
		btn5.addListener("execute", function(e){});
		btn6.addListener("execute", function(e){});
		btn7.addListener("execute", function(e){});
		btn8.addListener("execute", function(e){});
		btn9.addListener("execute", function(e){});
		btn10.addListener("execute", function(e){});
		btn11.addListener("execute", function(e){});
		btn12.addListener("execute", function(e){});
		btn13.addListener("execute", function(e){});
		btn14.addListener("execute", function(e){});
		
		
		
		menu.add(btn1);
		menu.add(new qx.ui.menu.Separator());
		menu.add(btn2);
		menu.add(btn3);
		menu.add(btn4);
		menu.add(new qx.ui.menu.Separator());
		menu.add(btn5);
		menu.add(btn6);
		menu.add(btn7);
		menu.add(btn8);
		menu.add(new qx.ui.menu.Separator());
		menu.add(btn9);
		menu.add(btn10);
		menu.add(btn11);
		menu.add(btn12);
		menu.add(btn13);
		menu.add(btn14);
		
		menu.openAtPointer(e); 
  		});
  	
  	
  	},
  	
  	windowConfig1:function(btnImg, scroll){
  	
  		let win = new myejemplo.WindowImg("Runtime Settings");
  		win.setLayout(new qx.ui.layout.VBox());
  		let winCont = new qx.ui.container.Composite(new qx.ui.layout.Grid(15, 15));
  		let text1 = new qx.ui.form.TextField();
  			text1.setWidth(135);
  			text1.setValue("5.132075471698114");
  		let text2 = new qx.ui.form.TextField();
  			text2.setWidth(135);
  			text2.setValue("5.132075471698114");
  		
  	let grouplabel1 = new qx.ui.groupbox.GroupBox();	
  		grouplabel1.setLayout(new qx.ui.layout.HBox());
  		grouplabel1.add(new qx.ui.basic.Label("CHANGE PLOT RUNTIME SETTINGS"));
  	
  	
  	//inicio de groupCheck	
      	let groupCheck = new qx.ui.groupbox.GroupBox("Options");
      	 groupCheck.setLayout(new qx.ui.layout.VBox(10));
  	
  	
  	let autoScale = new qx.ui.form.CheckBox("Auto-scale");
  		autoScale.addListener("changeValue", function (e) {
		
		if(e.getData()){
			text1.setEnabled(false);
			text2.setEnabled(false);
		}else{
			text1.setEnabled(true);
			text2.setEnabled(true);
		}
	      });
	      
	    groupCheck.add(autoScale);
	    
	    let visible = new qx.ui.form.CheckBox("Visible");
	    visible.setValue(true);
  		
  		visible.addListener("changeValue", function (e) {
		
		if(e.getData()){
			scroll.setVisibility("visible");
		}else{
			scroll.setVisibility("hidden");
		}
	      });
	      
	    groupCheck.add(visible);
	    
	    let logScale = new qx.ui.form.CheckBox("Log scale");
	 
  		logScale.addListener("changeValue", function (e) {
		
		if(e.getData()){
		//logica
		}else{
		//logica
		}
	      });
	      
	    groupCheck.add(logScale);
  	
  		let showTraceNames = new qx.ui.form.CheckBox("Show Trace Names");
	 
  		showTraceNames.addListener("changeValue", function (e) {
		
		if(e.getData()){
		//logica
		}else{
		//logica
		}
	      });
	      
	    groupCheck.add(showTraceNames);
  	///fin del groupCheck
  	
  	let groupTraces = new qx.ui.groupbox.GroupBox("Traces");
  		groupTraces.setLayout(new qx.ui.layout.VBox(10));	
  		
  	let groupHorAxis = new qx.ui.groupbox.GroupBox("Horizontal Axis");
  		groupHorAxis.setLayout(new qx.ui.layout.VBox(10));
  		
  	let btnCloseWinCont = new qx.ui.form.Button("Close");
  	
  		btnCloseWinCont.addListener("execute", function(e){
  		
  			win.close();
  		});
  		
  		
  		
  		winCont.add(grouplabel1, { row: 0, column: 0, colSpan: 17});
  		
  		winCont.add(new qx.ui.basic.Label("Value Axes"), { row: 1, column: 1});
  		winCont.add(new qx.ui.basic.Label("Axis Name"), { row: 2, column: 1});
  		winCont.add(new qx.ui.basic.Label("Value"), { row: 2, column: 2});
  		winCont.add(new qx.ui.basic.Label("Start, End:"), { row: 3, column: 1});
  		winCont.add(text1, { row: 3, column: 2});
  		winCont.add(text2, { row: 3, column: 3});
  		winCont.add(groupCheck, { row: 4, column: 1});
  		//winCont.add(groupHorAxis, { row: 4, column: 2});
  		winCont.add(groupTraces, { row: 4, column: 2, colSpan: 15});
  		winCont.add(btnCloseWinCont, { row: 5, column: 15});
  		
  		win.getChildrenContainer().add(winCont);	
  		btnImg.addListener("execute", function(){

  			
  				//Verifica si la ventana esta activa para no repetir la ventana
  				if(!win.isActive()){
  				
  					
  					win.open();
  				}
  				
  		
  		});
  	},
  	
  	activePan: function(btnBar){
  		//se cambia la forma del cursor por el de mini-pan y que genere efecto de 
  	},
  	
  	addAnotation: function(btnAdd){
  		let win = new myejemplo.WindowImg("Add Annotation");
  		win.setLayout(new qx.ui.layout.VBox());
  		let winWarning = new myejemplo.WindowWarning();
  		let winCont = new qx.ui.container.Composite(new qx.ui.layout.Grid(15, 15));
  		let textArea1 = new qx.ui.form.TextArea();
  		let textArea2 = new qx.ui.form.TextArea();
  				textArea2.setValue("{0}\n{1}, {2}\n{3}");
  		let textArea3 = new qx.ui.form.TextArea();
  			textArea3.setValue("Annotation will replace\n{0} with name of trace,\n{1} with position and\n{2} with value at that position,\n{3} with alarm information.\nOther braces {...} are not permitted.");
  			textArea3.setReadOnly(true);		
  		
  		let btnCancelar = new qx.ui.form.Button("Cancelar");
  		let btnAceptar = new qx.ui.form.Button("Aceptar");
  		let match = "{0}\n{1}, {2}\n{3}";
  		
  		//eventos de los botones: btnCancelar y btnAceptar
  		
  		btnAceptar.addListener("execute", function(){
  		
  			
  				if(textArea2.getValue() == match){
  					winWarning.open();
  				}else{
  				//logica para cuando los datos son validos. Preguntar al sr Cesar
  				}
  			  });
  		btnCancelar.addListener("execute", function(){
  			win.close();
  		
  		});
  		
  		
  		textArea2.addListener("input", function(e){
  		this.setValue(e.getData());
  			}, this);
  			
  		
  			
  		winCont.add(new qx.ui.basic.Label("Select trace to which annotation will be added, then adjust content of annotation as desired."), { row: 0, column: 0, colSpan: 40});
  		winCont.add(new qx.ui.basic.Label("Trace"), {row: 1, column: 0});
  		winCont.add(textArea1, {row: 1, column: 1, colSpan: 35});
  		winCont.add(new qx.ui.basic.Label("Content"), {row: 2, column: 0});
  		winCont.add(textArea2, {row: 2, column: 1, colSpan: 35});
  		winCont.add(textArea3, {row: 3, column: 0, rowSpan: 10 , colSpan: 15});
  		winCont.add(btnCancelar, {row: 10, column: 30});
  		winCont.add(btnAceptar, {row: 10, column: 35});
  		win.getChildrenContainer().add(winCont);	
  		
  		
  		//solo se abre la ventana una sola vez sin repetirse	
  		btnAdd.addListener("execute", function(){
  			//Verifica si la ventana esta activa para no repetir la ventana
  				if(!win.isActive()){
  					win.open();
  				}
  				
  				});
  			},
  			
  		////METODO	
  		openTimeDialog: function(btntime){
  			let winAjuste = new qx.ui.window.Window("Configuration");
  				
  			let cont = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));	
  				
		  
		     //Ajustes de la ventana
		     winAjuste.setLayout(new qx.ui.layout.VBox());
		     winAjuste.setWidth(1000);
		     winAjuste.setHeight(200);
		     winAjuste.setCenterOnAppear(true);
		     winAjuste.setShowMaximize(false);
		     winAjuste.setShowMinimize(false);
		     winAjuste.setShowClose(false);
		 
			cont.setHeight(250);
  			cont.setWidth(winAjuste.getWidth());
  			
		  let btnClose = new qx.ui.form.Button("Close");
     		  let btnApply = new qx.ui.form.Button("Apply");
		  
	     let split = new qx.ui.splitpane.Pane("horizontal");
	     split.setHeight(cont.getHeight());
	     split.setWidth(cont.getWidth());
	     
	     //se ñade el split a la ventana
	    cont.add(split, {row: 0 , column: 0, rowSpan: 30, colSpan: 50});
	    cont.add(btnClose, {row: 31 , column: 80});
	    cont.add(btnApply, {row: 31 , column: 85});
	     
	     //ELEMENTOS DEL SPLIT///// Contenedor del lado izquierdo y del lado derecho de la ventana winajuste
	     let contenedorIzq = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
	     let contenedorDer = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
     
     
     		 contenedorDer.setMinWidth(500); 
		 contenedorDer.setMaxWidth(600);
		 contenedorIzq.setMinWidth(500); 
		  contenedorIzq.setMaxWidth(600);
	  ////ELEMENTOS DEL contenedorIzq////
     let labelResumen = new qx.ui.basic.Label("0/0/0");
     	 labelResumen.setBackgroundColor("#cacfd2");
     	
     //Time spinners
     let spinnerHora = new qx.ui.form.Spinner(0, 1, 23);
     let spinnerMinute = new qx.ui.form.Spinner(0, 1, 59);
     let spinnerSecond = new qx.ui.form.Spinner(0, 1, 59);
     let btnResetTime = new qx.ui.form.Button("00:00");
     
      //Spinners para year, month, days, hours, minutes, seconds
      let spinnerYear = new qx.ui.form.Spinner(0, 1, 99);//buscar còmo bloquear las fechas que no son hoy
      let spinnerMonth = new qx.ui.form.Spinner(0, 1, 11);
      let spinnerDays = new qx.ui.form.Spinner(0, 1, 30);
      let spinnerHours = new qx.ui.form.Spinner(0, 1, 23);
      let spinnerMinutes = new qx.ui.form.Spinner(0, 1, 59);
      let spinnerSeconds = new qx.ui.form.Spinner(0, 1, 59);
     
     //Botones para 12h, 1 day, 3 days. 7days
      let btnStart12H = new qx.ui.form.Button("12 h");
      let btnStart1D = new qx.ui.form.Button("1 day");
      let btnStart3D = new qx.ui.form.Button("3 days");
      let btnStart7D = new qx.ui.form.Button("7 days");
      
      let año=0; 
      let mes=0;
      let dia=0;
       //Boton para escoger la fecha
     let btnChooser = new qx.ui.form.Button("Get Date");
     let labelSetDate = new qx.ui.basic.Label("##");
     labelSetDate.setBackgroundColor("#cacfd2");
 
     //objeto que permite escoger la fecha
     let chooserDate = new qx.ui.control.DateChooser();
     
     	 
	  //evento del boton para escoger la fecha
	let wind = new qx.ui.window.Window("Get Date");
	let btnWindAceptar = new qx.ui.form.Button("Aceptar");
	
     	btnChooser.addListener("execute", function(e){
     	//ventana que sirve para mostrar el seleccionador de fechas y su boton aceptar
     	
     	wind.setLayout(new qx.ui.layout.VBox());
     	wind.add(chooserDate);
     	wind.setCenterOnAppear(true);
     	wind.setShowMaximize(false);
	wind.setShowMinimize(false);
	wind.setShowClose(false);
	
	wind.add(btnWindAceptar);
	  
     if(!wind.isActive()){
     	wind.open();
     }
	//evento que permite cambiar el valor a obtener del seleccionador de fechas
	
	chooserDate.addListener("changeValue", function(e){
		
		var date = e.getData();
		año = date.getFullYear();
		mes = date.getMonth() +1;
		dia = date.getDate();
		labelSetDate.setValue(date.toDateString());
		labelResumen.setValue(año+"/"+mes+"/"+dia );
		
	//evento del boton aceptar	
	btnWindAceptar.addListener("execute", function(e){
		
		wind.close();
		});
	});
	

     
     	});		
     	
     	//evento que permite resetear el tiempo hh/min/sec
     	btnResetTime.addListener("execute", function(e){
		spinnerHora.resetValue();
		spinnerMinute.resetValue();
		spinnerSecond.resetValue();
		});
      
      
     /* 
      var segundosTotales = 0;
      const AÑO = 31563000;
      const MES = 2592000;
      const DIA = 86400;
      const HORA = 3600;
      const MIN = 60;*/
      
      //eventos de los botones (btnStart12H, btnStart1D, btnStart3D, btnStart7D)//////////
      btnStart12H.addListener("execute", function(e){
	//se ajusta el spinner hours y se resetean los demas spinners
		spinnerHours.setValue(12);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerDays.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
		
		labelResumen.setValue(año+"/"+mes+"/"+dia);
		});
	
	
	 btnStart1D.addListener("execute", function(e){
	//se ajusta el spinner days a 1 y se resetean los demas spinners
		spinnerDays.setValue(1);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerHours.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
	
		//se asigna a el label labelResumen
		labelResumen.setValue(año+"/"+mes+"/"+dia +" "+spinnerDays.getValue().toString()+" day");
		});
	
      
       btnStart3D.addListener("execute", function(e){
	//se ajusta el spinner days a 3 y se resetean los demas spinners
		spinnerDays.setValue(3);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerHours.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
	
		//se asigna a el label labelResumen
		labelResumen.setValue(año+"/"+mes+"/"+dia +" "+spinnerDays.getValue().toString()+" days");
		});
	
      
       btnStart7D.addListener("execute", function(e){
	//se ajusta el spinner days a 7  y se resetean los demas spinners
		spinnerDays.setValue(7);
		spinnerYear.resetValue();
		spinnerMonth.resetValue();
		spinnerHours.resetValue();
		spinnerMinutes.resetValue();
		spinnerSeconds.resetValue();
	
		//se asigna a el label labelResumen
		labelResumen.setValue(año+"/"+mes+"/"+dia +" "+spinnerDays.getValue().toString()+" days");
		});
	
	
      /////////////////////////////////////fin de los eventos/////////////
      
    
			//se añaden los elementos al contenedorIzq
     contenedorIzq.add(new qx.ui.basic.Label("Start"), {row: 0, column: 0});
     contenedorIzq.add(new qx.ui.basic.Label("Date"), {row: 1, column: 0});
     contenedorIzq.add(labelSetDate, {row: 1, column: 1});
     contenedorIzq.add(btnChooser, {row: 1, column: 2});
     contenedorIzq.add(new qx.ui.basic.Label("Time"), {row: 2, column: 0});
     contenedorIzq.add(spinnerHora, {row: 2, column: 1});
     contenedorIzq.add(spinnerMinute, {row: 2, column: 2});
     contenedorIzq.add(spinnerSecond, {row: 2, column: 3});
     contenedorIzq.add(btnResetTime, {row: 2, column: 4});
     contenedorIzq.add(new qx.ui.basic.Label("Year"), {row: 3, column: 0});
     contenedorIzq.add(spinnerYear, {row: 3, column: 1});
     contenedorIzq.add(new qx.ui.basic.Label("Hours"), {row: 3, column: 2});
     contenedorIzq.add(spinnerHours, {row: 3, column: 3});
     contenedorIzq.add(new qx.ui.basic.Label("Month"), {row: 4, column: 0});
     contenedorIzq.add(spinnerMonth, {row: 4, column: 1});
     contenedorIzq.add( new qx.ui.basic.Label("Minutes"), {row: 4, column: 2});
     contenedorIzq.add(spinnerMinutes, {row: 4, column: 3});
     contenedorIzq.add(new qx.ui.basic.Label("Days"), {row: 5, column: 0}); 
     contenedorIzq.add(spinnerDays, {row: 5, column: 1}); 
     contenedorIzq.add(new qx.ui.basic.Label("Seconds"), {row: 5, column: 2}); 
     contenedorIzq.add(spinnerSeconds, {row: 5, column: 3});      
     contenedorIzq.add(btnStart12H, {row: 6, column: 0});  
     contenedorIzq.add(btnStart1D, {row: 6, column: 1});  
     contenedorIzq.add(btnStart3D, {row: 6, column: 2});  
     contenedorIzq.add(btnStart7D, {row: 6, column: 3});  
     contenedorIzq.add(labelResumen, {row: 7, column: 0});  
     ///////////////////////////////////
     
     
       ///////////////ELEMENTOS DEL CONTENEDOR contenedorDer
     let labelResumen_2 = new qx.ui.basic.Label("0/0/0");
     	 labelResumen_2.setBackgroundColor("#cacfd2");
     let labelSetDate_2 = new qx.ui.basic.Label("##");
     		labelSetDate_2.setBackgroundColor("#cacfd2");
     		
     		
      //Time spinners
     let spinnerHoraEnd = new qx.ui.form.Spinner(0, 1, 23);
     let spinnerMinuteEnd = new qx.ui.form.Spinner(0, 1, 59);
     let spinnerSecondEnd = new qx.ui.form.Spinner(0, 1, 59);
     let btnResetTimeEnd = new qx.ui.form.Button("00:00");
     
     //evento que permite resetear el tiempo hh/min/sec
     	btnResetTimeEnd.addListener("execute", function(e){
		spinnerHoraEnd.resetValue();
		spinnerMinuteEnd.resetValue();
		spinnerSecondEnd.resetValue();
		});
     
     
      let chooserDate_2 =new qx.ui.control.DateChooser();
     let btnChooser_2 = new qx.ui.form.Button("Get Date");
     
      let añoEnd=0; 
      let mesEnd=0;
      let diaEnd=0;
      
       let wind3 = new qx.ui.window.Window("Get Date");
       let btnWindAceptar3 = new qx.ui.form.Button("Aceptar");
     btnChooser_2.addListener("execute", function(e){
     
     
	
     	wind3.setLayout(new qx.ui.layout.VBox());
     	wind3.add(chooserDate_2);
     	wind3.setCenterOnAppear(true);
     	wind3.setShowMaximize(false);
	wind3.setShowMinimize(false);
	wind3.setShowClose(false);
	
	wind3.add(btnWindAceptar3);
     
     if(!wind3.isActive()){
     	wind3.open();
     }
     chooserDate_2.addListener("execute", function(e){
     	let actual = chooserDate_2.getValue();
     	labelResumen_2.setValue(actual);
     
     });
     
     chooserDate_2.addListener("changeValue", function(e){
     
     		var date = e.getData();
		añoEnd = date.getFullYear();
		mesEnd = date.getMonth() +1;
		diaEnd = date.getDate();
		
		labelSetDate_2.setValue(date.toDateString());
		labelResumen_2.setValue(añoEnd+"/"+mesEnd+"/"+diaEnd );
	
	
		//evento del boton aceptar	
	btnWindAceptar3.addListener("execute", function(e){
		
		wind3.close();
		});
     });
     
     });
     
     let btnNow =  new qx.ui.form.Button("Now");
     
     btnNow.addListener("execute", function(e){
		chooserDate_2.setValue(new Date());
		
		añoEnd = chooserDate_2.getValue().getFullYear();
		mesEnd = chooserDate_2.getValue().getMonth() +1;
		diaEnd = chooserDate_2.getValue().getDate();
		labelResumen_2.setValue(añoEnd+"/"+mesEnd+"/"+diaEnd);
		
		labelSetDate_2.setValue(labelResumen_2.getValue());
		});
     	
     	//se añaden los elementos al contenedorDer
      contenedorDer.add(new qx.ui.basic.Label("End"), {row: 0, column: 0}); 
      contenedorDer.add(new qx.ui.basic.Label("Date"), {row: 1, column: 0}); 
      contenedorDer.add(labelSetDate_2, {row: 1, column: 1}); 
      contenedorDer.add(btnChooser_2, {row: 1, column: 2});  
      contenedorDer.add(new qx.ui.basic.Label("Time"), {row: 2, column: 0});  
      contenedorDer.add(spinnerHoraEnd, {row: 2, column: 1});  
      contenedorDer.add(spinnerMinuteEnd, {row: 2, column: 2});  
      contenedorDer.add(spinnerSecondEnd, {row: 2, column: 3});  
      contenedorDer.add(btnResetTimeEnd, {row: 2, column: 4});  
      contenedorDer.add(btnNow, {row: 3, column: 0});  
      contenedorDer.add(labelResumen_2, {row: 4, column: 0}); 
     	 
	     	
	winAjuste.getChildrenContainer().add(cont);    
		
     //se añaden los contenedores: contenedorIzq y contenedorDer
    split.add(contenedorIzq, 1);
     split.add(contenedorDer, 1);
     ///////////////////////////
     
     //eventos de esos botones: para cerrar o aplicar los cambios
   btnClose.addListener("execute", function(e){
   	winAjuste.close();
   	});
    
    btnApply.addListener("execute", function(e){
   	//modificar los datos de tiempo de la grafica
   	
   	
   	});
   	
   	
   	
   	
   		btntime.addListener("execute", function(e){
  				
  					if(!winAjuste.isActive()){
  					winAjuste.open();
  				}
  				
  				
  				});
  			
  			
    },
	
	undoFunction: function(btnUndo, btnRedo, control, scroll, charts1) {
		
		btnUndo.addListener("execute", function(e){
			
		let canvas1 = new qx.ui.embed.Canvas().set({
			canvasWidth: 200,
			canvasHeight: 200,
			syncDimension: false,
		  });
	
			if(control.obtenerContador() !== 0 && control.obtenerElementoActual() !== true){
				btnRedo.setEnabled(true);

			
		   let option;
			let myChart = 0;
		   canvas1.addListener("redraw", function(e)
			  {
			   let chartDom = scroll.getContentElement().getDomElement();
			   myChart = charts1.init(chartDom, 'dark');
			  
			
			option = {
			  xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
			 
			}else{
				
				btnUndo.setEnabled(false);
				btnRedo.setEnabled(true);
			}

	

	});


		},
	
	      
  		
	
	saveState: function(btnSave, control, nuevoEstado){
		btnSave.addListener("execute", function(){
		//control.agregarEstado(nuevoEstado);   
			
	});
},

redoFunction: function(btnRedo, btnUndo, control, scroll, charts1) {
	

	btnRedo.addListener("execute", function(e){
		let canvas1 = new qx.ui.embed.Canvas().set({
			canvasWidth: 200,
			canvasHeight: 200,
			syncDimension: false,
		  });
		  
		if(control.obtenerLimiteAgregado() !== true){
		
			btnUndo.setEnabled(true);

	
	   let option;
		let myChart = 0;
	   canvas1.addListener("redraw", function(e)
		  {
		   let chartDom = scroll.getContentElement().getDomElement();
		   myChart = charts1.init(chartDom, 'dark');
	
		
		option = {
		  xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		  },
		  yAxis: {
			type: 'value'
		  },
		  series: [
			{
			  data: control.obtenerEstadoSiguiente(),
			  type: 'line'
			}
		  ]
		};
	

			 myChart.setOption(option);
	
	
	
		  }, this); 
		 
		}else{
			btnRedo.setEnabled(false);
			btnUndo.setEnabled(true);
		
		}	
		
});

	},
	openAxis:function(btnAxis, scroll, echarts, control){
	let cont =0;
	
		btnAxis.addListener("execute", function(e){
			
			let canvas1 = new qx.ui.embed.Canvas().set({
				canvasWidth: 200,
				canvasHeight: 200,
				syncDimension: false,
			  });
		
			if(cont %2 === 0){
				cont+=1;
			
			   let option;
				let myChart = 0;
				let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///modificable
			   canvas1.addListener("redraw", function(e)
				  {
				   let chartDom = scroll.getContentElement().getDomElement();
				   myChart = echarts.init(chartDom, 'dark');
				  
			
			
				option = {
					
				  xAxis: {
					type: 'category',
					data: fechas
				  },
				  yAxis: {
					type: 'value',
					
				  },
					tooltip: {
					trigger: "axis",
					axisPointer: {
				  type: "cross"
				},
				show: true
			  },
				  grid: {
					containLabel: false,
					show: true
				  },
				  series: [
					{
					  color: ["#91cc75"],
					  data: control.obtenerElementoActual(),
					  type: 'line'
					}
				  ]
				};
				
					 myChart.setOption(option);
				
			
				
				  }, this); 
				 
				}else{
					cont+=1;
					
					let myChart = 0;
					let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];///modificable
				   canvas1.addListener("redraw", function(e)
					  {
					   let chartDom = scroll.getContentElement().getDomElement();
					   myChart = echarts.init(chartDom, 'dark');
					  
				
				
					option = {
						
					  xAxis: {
						type: 'category',
						data: fechas
					  },
					  yAxis: {
						type: 'value',
						
					  },tooltip: {
						trigger: "axis",
						axisPointer: {
					  type: "cross"
					}, show: false
				  },
					  grid: {
						containLabel: false,
						show: true
					  },
					  series: [
						{
						  color: ["#91cc75"],
						  data: control.obtenerElementoActual(),
						  type: 'line'
						}
					  ]
					};
					
						 myChart.setOption(option);
					
				
					
					  }, this); 
					  

				}
		});
	}

		
	}
});




			
