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

	 var Myecharts = require("echarts");
	 
    // SplitScreen TOP component
    var topComponent = new qx.ui.tabview.TabView();
    // test

     topComponent.setMinHeight(200);
     topComponent.setMaxHeight(550); 
     
     
     //contenedorMainTop.add(topComponent);
     var graph1 = new qx.ui.tabview.Page("Data Browser");
     graph1.setShowCloseButton(true);
     graph1.setLayout(new qx.ui.layout.Grid(30, 25));
     
     //Container compatible con el graph1 que contendra el grafico de echarts
     var scroller = new qx.ui.container.Scroll();
     scroller.setHeight(400);
     
     
     scroller.setMaxWidth(1820);//buscar ajustar este tamaño
    
  
	
     //MenuBar para el graph1
     var menuBar1 = new qx.ui.menubar.MenuBar();	
     
     
     	
     		
     		
     	//Boton dentro del menuBar1
     	let btnMenuBar1 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/configure.png");
   	let btnMenuBar2 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/add_annotation.png");
     	let btnMenuBar3 = new qx.ui.menubar.Button(null,"myejemplo/imagenes/edit_annotation.png");
     	var btnMenuBar4 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/crosshair.png");
     	var btnMenuBar5 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/stagger.png");
     	var btnMenuBar6 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/zoom_in.png");
     	var btnMenuBar7 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/zoom_out.png");
     	var btnMenuBar8 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/pan.png");
     	var btnMenuBar9 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/pointer.png");
     	var btnMenuBar10 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/undo.png");
     	var btnMenuBar11 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/redo.png");
     	var btnMenuBar12 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/scroll_on.png");
     	var btnMenuBar13 = new qx.ui.menubar.Button(null, "myejemplo/imagenes/time_range.png");
     	
     	
     	btnMenuBar3.setEnabled(false);
     	btnMenuBar4.setEnabled(false);
     	btnMenuBar11.setEnabled(false);
     
     	//eventos de los botones btnMenuBar del 1 al 13
     	
      this.windowConfig1(btnMenuBar1, scroller);
      this.addAnotation(btnMenuBar2);
   	
     	btnMenuBar3.addListener("execute", function(e){});
     	btnMenuBar4.addListener("execute", function(e){});
     	btnMenuBar5.addListener("execute", function(e){});
     	btnMenuBar6.addListener("execute", function(e){});
     	btnMenuBar7.addListener("execute", function(e){});
     	btnMenuBar8.addListener("execute", function(e){});
     	btnMenuBar9.addListener("execute", function(e){});
     	btnMenuBar10.addListener("execute", function(e){});
     	btnMenuBar11.addListener("execute", function(e){});
     	btnMenuBar12.addListener("execute", function(e){});
     	btnMenuBar13.addListener("execute", function(e){});
     	
     	
     	//menuBar1 añade a btnMenuBar
     	menuBar1.add(btnMenuBar1);
	menuBar1.add(btnMenuBar2);
     	menuBar1.add(btnMenuBar3);
     	menuBar1.add(btnMenuBar4);
     	menuBar1.add(btnMenuBar5);
     	menuBar1.add(btnMenuBar6);
     	menuBar1.add(btnMenuBar7);
     	menuBar1.add(btnMenuBar8);
     	menuBar1.add(btnMenuBar9);
     	menuBar1.add(btnMenuBar10);
     	menuBar1.add(btnMenuBar11);
     	menuBar1.add(btnMenuBar12);
     	menuBar1.add(btnMenuBar13);
     
   //------------------------------------------------------------------------------------//
   	 //CREACION DEL GRAFICO DENTRO //------//
   	 
   	 var canvas1 = new qx.ui.embed.Canvas().set({
        canvasWidth: 200,
        canvasHeight: 200,
        syncDimension: false,
      });
      
   canvas1.addListener("redraw", function(e)
      {
       var chartDom = scroller.getContentElement().getDomElement();
      var myChart = Myecharts.init(chartDom, 'dark');
      var option;

	
        const data2 = [];
        for (let i = 0; i <= 360; i++) {
          let t = (i / 180) * Math.PI;
          let r = Math.sin(2 * t) * Math.cos(2 * t);
          data2.push([r, i]);
        }

        

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
	      data: [150, 230, 600, 224, 218, 1000, 147, 260],
	      type: 'line'
	    }
	  ]
	};
     	myChart.setOption(option);

      }, this); 
      
       graph1.add(menuBar1, {row: 0, column: 0, colSpan: 50});
      graph1.add(scroller, {row: 2, column: 0, colSpan: 150});
      
      this.mouseEventTable(scroller);
   //------------------------------------------------------------------------------------//
    
    var graph2 = new qx.ui.tabview.Page("Trend 2");
    graph2.setShowCloseButton(true);
    topComponent.add(graph1);
   // topComponent.add(graph2);

    
    // SplitScreen BOTTOM component
    
    var bottomComponent = new qx.ui.tabview.TabView();
    var page1 = new qx.ui.tabview.Page("Properties");
    page1.setLayout(new qx.ui.layout.VBox()); // Define un layout vertical
    page1.setShowCloseButton(true);
    ///////////////////////////////////////////////////////////////////
    
    //Tabviews
    var contenido = new qx.ui.tabview.TabView();
    var opcTrace = new qx.ui.tabview.TabView();
    //////////////////////////////////////////////
    
    //creando paginas para el tabview contenido.
    var trace = new qx.ui.tabview.Page("Trace");
    var time_Axis = new qx.ui.tabview.Page("Time Axis");
    var value_Axes = new qx.ui.tabview.Page("Value Axes");
    var misc = new qx.ui.tabview.Page("Misc.");
    var statistics = new qx.ui.tabview.Page("Statistics");
    
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
    		
    		//añadiendo su tabla respectiva
    var trendTable = new myejemplo.TrendTable(encanbezado_Tabla);
             
    //valida si la tabla no posee elementos. En caso que si este vacia, se muestra a un lado de la tabla en letras rojas el mensaje "No hay trazas"       
     if(trendTable.getTableModel().getData().length === 0){
    var msgVacio = new qx.ui.basic.Label("No hay trazas");
     trace.add(msgVacio, {row: 0, column: 1});
     msgVacio.setTextColor("red");
    }    
    	//se añade la tabla a la pagina trace
     trace.add(trendTable, {row: 0, column: 0});
    /////////////////////////////////////////////
    
    
    ////////ELEMENTOS PARA LA PAGINA time_Axis
    var cuadroTextoStart = new qx.ui.form.TextField();
    var cuadroTextoEnd = new qx.ui.form.TextField();
    var grid = new qx.ui.basic.Label("Grid:");
    var btnradioAct = new qx.ui.form.RadioButton("Activar");
    var btnradioDes = new qx.ui.form.RadioButton("Desactivar");
     	var grupo = new qx.ui.form.RadioGroup();
    	grupo.add(btnradioAct, btnradioDes);
    var btn30min = new qx.ui.form.Button("30 Minutos");
    var btn1hora = new qx.ui.form.Button("1 Hora");
    var btn12horas = new qx.ui.form.Button("12 horas");
    var btn1dia = new qx.ui.form.Button("1 Dìa");
    var btn7dias = new qx.ui.form.Button("7 dias");
    var btnAjusteFecha = new qx.ui.form.Button("Ajuste"); //se debe anexar un icono
    
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
     var winAjuste = new qx.ui.window.Window("Configuraciòn");
     //Ajustes de la ventana
     winAjuste.setLayout(new qx.ui.layout.Grid(15, 15));
     winAjuste.setWidth(1000);
     winAjuste.setHeight(200);
     winAjuste.setCenterOnAppear(true);
     winAjuste.setShowMaximize(false);
     winAjuste.setShowMinimize(false);
     winAjuste.setShowClose(false);
     winAjuste.open();
     
     
     var btnClose = new qx.ui.form.Button("Close");
     var btnApply = new qx.ui.form.Button("Apply");
     
     var split = new qx.ui.splitpane.Pane("horizontal");
     split.setHeight(winAjuste.getHeight());
     split.setWidth(winAjuste.getWidth());
     winAjuste.add(split, {row: 0, column: 0});
     
     
     //ELEMENTOS DEL SPLIT///// Contenedor del lado izquierdo y del lado derecho de la ventana winajuste
     var contenedorIzq = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
     var contenedorDer = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
     
     
     contenedorDer.setMinWidth(400); 
     contenedorDer.setMaxWidth(600);
     contenedorIzq.setMinWidth(400); 
     contenedorIzq.setMaxWidth(600);
     /////////////////////////////////////////Fin de los elementos del split
     
     ////ELEMENTOS DEL contenedorIzq////
     var labelResumen = new qx.ui.basic.Label("0/0/0");
     	 labelResumen.setBackgroundColor("#cacfd2");
     
     //Time spinners
     var spinnerHora = new qx.ui.form.Spinner(0, 1, 23);
     var spinnerMinute = new qx.ui.form.Spinner(0, 1, 59);
     var spinnerSecond = new qx.ui.form.Spinner(0, 1, 59);
     var btnResetTime = new qx.ui.form.Button("00:00");
     
      //Spinners para year, month, days, hours, minutes, seconds
      var spinnerYear = new qx.ui.form.Spinner(0, 1, 99);//buscar còmo bloquear las fechas que no son hoy
      var spinnerMonth = new qx.ui.form.Spinner(0, 1, 11);
      var spinnerDays = new qx.ui.form.Spinner(0, 1, 30);
      var spinnerHours = new qx.ui.form.Spinner(0, 1, 23);
      var spinnerMinutes = new qx.ui.form.Spinner(0, 1, 59);
      var spinnerSeconds = new qx.ui.form.Spinner(0, 1, 59);
     
     //Botones para 12h, 1 day, 3 days. 7days
      var btnStart12H = new qx.ui.form.Button("12 h");
      var btnStart1D = new qx.ui.form.Button("1 day");
      var btnStart3D = new qx.ui.form.Button("3 days");
      var btnStart7D = new qx.ui.form.Button("7 days");
      
      var año=0; 
      var mes=0;
      var dia=0;
       //Boton para escoger la fecha
     var btnChooser = new qx.ui.form.Button("Get Date");
     var labelSetDate = new qx.ui.basic.Label("##");
     labelSetDate.setBackgroundColor("#cacfd2");
     //objeto que permite escoger la fecha
     var chooserDate = new qx.ui.control.DateChooser();
     
     
     //evento del boton para escoger la fecha
     	btnChooser.addListener("execute", function(e){
     	//ventana que sirve para mostrar el seleccionador de fechas y su boton aceptar
     	var wind = new qx.ui.window.Window("Get Date");
	var btnWindAceptar = new qx.ui.form.Button("Aceptar");
	
     	wind.setLayout(new qx.ui.layout.VBox());
     	wind.add(chooserDate);
     	wind.setCenterOnAppear(true);
     	wind.setShowMaximize(false);
	wind.setShowMinimize(false);
	wind.setShowClose(false);
	wind.open();
	wind.add(btnWindAceptar);
	
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
     var labelResumen_2 = new qx.ui.basic.Label("0/0/0");
     	 labelResumen_2.setBackgroundColor("#cacfd2");
     var labelSetDate_2 = new qx.ui.basic.Label("##");
     		labelSetDate_2.setBackgroundColor("#cacfd2");
     		
     		
      //Time spinners
     var spinnerHoraEnd = new qx.ui.form.Spinner(0, 1, 23);
     var spinnerMinuteEnd = new qx.ui.form.Spinner(0, 1, 59);
     var spinnerSecondEnd = new qx.ui.form.Spinner(0, 1, 59);
     var btnResetTimeEnd = new qx.ui.form.Button("00:00");
     
     //evento que permite resetear el tiempo hh/min/sec
     	btnResetTimeEnd.addListener("execute", function(e){
		spinnerHoraEnd.resetValue();
		spinnerMinuteEnd.resetValue();
		spinnerSecondEnd.resetValue();
		});
     
     
      var chooserDate_2 =new qx.ui.control.DateChooser();
     var btnChooser_2 = new qx.ui.form.Button("Get Date");
     
      var añoEnd=0; 
      var mesEnd=0;
      var diaEnd=0;
     btnChooser_2.addListener("execute", function(e){
     
     var wind = new qx.ui.window.Window("Get Date");
	var btnWindAceptar = new qx.ui.form.Button("Aceptar");
	
     	wind.setLayout(new qx.ui.layout.VBox());
     	wind.add(chooserDate_2);
     	wind.setCenterOnAppear(true);
     	wind.setShowMaximize(false);
	wind.setShowMinimize(false);
	wind.setShowClose(false);
	wind.open();
	wind.add(btnWindAceptar);
     
     chooserDate_2.addListener("execute", function(e){
     	var actual = chooserDate_2.getValue();
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
	btnWindAceptar.addListener("execute", function(e){
		
		wind.close();
		});
     });
     
     });
     
     var btnNow =  new qx.ui.form.Button("Now");
     
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
     var situacion = new qx.ui.basic.Label("Cuando llegan los datos archivados:");
     var btnradioNotDo = new qx.ui.form.RadioButton("No hacer nada");
     var btnradioExe = new qx.ui.form.RadioButton("Ejecutar 'Escalonamiento'");
     var grupoRd = new qx.ui.form.RadioGroup();
     grupoRd.add(btnradioNotDo, btnradioExe);
     
     
     	//encabezado de la tabla trandTable_2
     	var lista = ["Show", "Axis Name", "Axis Name?", "Trace Names?", "Grid", "On Right", "Color", "Min", "Max", "Auto-Scale", "Log.Scale"];
     var trendTable_2 = new myejemplo.TrendTable(lista);
     
     //se añaden los elementos a la pagina value_Axes
    value_Axes.add(situacion, {row: 0, column: 0});
    value_Axes.add(btnradioNotDo, {row: 0, column: 1});
    value_Axes.add(btnradioExe, {row: 0, column: 2});
    value_Axes.add(trendTable_2, {row: 1, column: 0});
   
   //verifica si la tabla esta vacia. En caso de que si, se muestra un mensahje en letras rojas al lado de la tabla: "Tabla sin contenido"
    if(trendTable_2.getTableModel().getData().length === 0){
    qx.log.Logger.info(this, "entre al if");
    var mensajeVacio = new qx.ui.basic.Label("Tabla sin contenido");
     value_Axes.add(mensajeVacio, {row: 1, column: 1});
     mensajeVacio.setTextColor("red");
    }
    /////////////////////////////////////////////////
    
    
    ///////////////////////////////////ELEMENTOS DE LA PAGINA misc.///   
    var textFTitle = new qx.ui.form.TextField();
    var textFPlot = new qx.ui.form.TextField("3.0");
    var textFScroll = new qx.ui.form.TextField("5.0");
    
    var lbColor = new qx.ui.basic.Label("Color");
    var lbColor1 = new qx.ui.basic.Label("Color");
    //selector de color
    var colorSelectorFore = new qx.ui.control.ColorPopup(); 
    colorSelectorFore.exclude(); 			
    colorSelectorFore.setValue("#EFFF44");
    lbColor.setBackgroundColor(colorSelectorFore.getValue());
    //boton se añade pagina y activa al selector
    var btnColor = new qx.ui.form.Button("Color");
    btnColor.addListener("execute", function(){
    colorSelectorFore.placeToWidget(btnColor);
    colorSelectorFore.show();
    });
    
      colorSelectorFore.addListener("changeValue", function (e) {
        lbColor.setBackgroundColor(e.getData());
      });
      
    var colorSelectorBack = new qx.ui.control.ColorPopup();
    colorSelectorBack.exclude(); 			
    colorSelectorBack.setValue("#2BFFFB");
    lbColor1.setBackgroundColor(colorSelectorBack.getValue());
    //boton se añade pagina y activa al selector
    var btn1Color = new qx.ui.form.Button("Color");
    btn1Color.addListener("execute", function(){
    colorSelectorBack.placeToWidget(btn1Color);
    colorSelectorBack.show();
    });
    
     colorSelectorBack.addListener("changeValue", function (e) {
        lbColor1.setBackgroundColor(e.getData());
      });
      
    var checkBSave = new qx.ui.form.CheckBox();
    var btnTitleF = new qx.ui.form.Button("#########");
    var btnLabelF = new qx.ui.form.Button("#########");
    var btnScaleF = new qx.ui.form.Button("#########");
    var btnLegend = new qx.ui.form.Button("#########");
    var checkBLegend = new qx.ui.form.CheckBox();
    
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
    var btnRefresh = new qx.ui.form.Button("Refresh");
    var listaSta = ["Display Name", "Sample Count", "Mean", "Median", "Standard Deviation", "Min Value", "Max Value", "Sum"];
    
    var trendTable_3 = new myejemplo.TrendTable(listaSta);
    
    statistics.add(btnRefresh, {row: 0, column: 0});
    statistics.add(trendTable_3, {row: 1, column: 0});
   
    if(trendTable_3.getTableModel().getData().length === 0){
    var mVacio = new qx.ui.basic.Label("No hay Trazas");
     statistics.add(mVacio, {row: 1, column: 1});
     mVacio.setTextColor("red");
    }
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
    var btnCerrar = new qx.ui.form.Button("Aceptar y salir");//Se puede colocar otro boton para salir de esa ventana en dado caso que no se quiera escoger ninguna opcion.
    var winTitle = new qx.ui.window.Window("Configuraciòn del tipo de letra");
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
     var slBFuente = new qx.ui.form.SelectBox();
     //rellenar el slBFuente con sus opciones.
     slBFuente.add(new qx.ui.form.ListItem("Arial"));
     slBFuente.add(new qx.ui.form.ListItem("Times New Roman"));
     var cmBSize = new qx.ui.form.ComboBox();
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
    var checkBold = new qx.ui.form.CheckBox("Bold");
    var checkItalic = new qx.ui.form.CheckBox("Italics");
    
    var textArea = new qx.ui.form.TextArea("Ejemplo");
    	textArea.setReadOnly(true);
    	textArea.setWidth(150);
    	textArea.setHeight(100);
    	
    	
     //evento del selectBox
        var selectedItem = 0;
     	var selectedText = 0;
     	var tamaño = cmBSize.getChildrenContainer().getSelectables()[0].getLabel();
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
  		btnAdd.addListener("execute", function(e){
  		
  			let win = new myejemplo.WindowImg("Add Annotation");
  			win.setLayout(new qx.ui.layout.VBox());
  			let winCont = new qx.ui.container.Composite(new qx.ui.layout.Grid(15, 15));
  			
  			
  			
  			//Verifica si la ventana esta activa para no repetir la ventana
  				if(!win.isActive()){	
  					win.open();
  				}
  				
  				
  			winCont.add(new qx.ui.basic.Label("Select trace to which annotation will be added, then adjust content of annotation as desired."), { row: 0, column: 0, colSpan: 40});
  		
  			winCont.add(new qx.ui.basic.Label("Trace"), {row: 1, column: 0});
  			winCont.add(new qx.ui.form.TextArea(), {row: 1, column: 1, colSpan: 30});
  		
  		win.getChildrenContainer().add(winCont);
  		});
  		
  	
  	}
		
	}
});
