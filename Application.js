/* ************************************************************************

   Copyright: 2024 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * This is the main application class of "myejemplo"
 *
 * @asset(myejemplo/*)
 @asset(echarts.js)
 */
qx.Class.define("myejemplo.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    main()
    {
    
      super.main();
    
      //importando el modulo echarts
	var myEcharts = require("echarts");//fino
	
      
      if (qx.core.Environment.get("qx.debug"))
      {
       
        qx.log.appender.Native;
        qx.log.appender.Console;
      }
      
      
	qx.log.Logger.info(this, "0");
	var win = new qx.ui.window.Window("Ventana");
   
	win.setWidth(1200);
	win.setMaxWidth(2000);
	win.setHeight(800);
	win.setMaxHeight(1500);
	win.setShowMinimize(false);
	
	win.setCenterOnAppear(true);
	win.setLayout(new qx.ui.layout.Canvas());
	
	qx.log.Logger.info(this, "023123");
	
	
	//Contenedores
	var com1 = new qx.ui.container.Composite();
	com1.setBackgroundColor("green");
	var grid = new  qx.ui.layout.Grid(10, 12);
	//Ajuste del tamaño de la celda del layout grid
	grid.setRowHeight(0, 34);
	
	
	com1.setLayout(grid);
	
	
	 var com2 = new qx.ui.container.Composite();
	com2.setBackgroundColor("red");
	com2.setLayout( new qx.ui.layout.Grid(2, 1));
	qx.log.Logger.info(this, "2");
	
	
	 var com3 = new qx.ui.container.Composite();
	com3.setLayout( new qx.ui.layout.Canvas());
	 
	com3.setWidth(com1.getWidth());
	//Lienzo donde se dibuja la figura
	
	
	var canvas1 = new qx.ui.embed.Canvas().set({
        canvasWidth: 500,
        canvasHeight: 500,
        syncDimension: false,
      });
      
	  //4)
     //EVENTO QUE REDIBUJA EL LIENZO
     canvas1.addListener("redraw", function(e)
      {
      
       var chartDom = com3.getContentElement().getDomElement();
       qx.log.Logger.info(this, chartDom);

      var myChart = myEcharts.init(chartDom, 'dark');//fino
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
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
  
        qx.log.Logger.info(this, "por aqui");
     	myChart.setOption(option);
        qx.log.Logger.info(this, myChart.getOption());

      }, this);
     //\4)
     
	
	//toolbars
	var toolbar = new qx.ui.toolbar.ToolBar();
	var toolbar2 = new qx.ui.toolbar.ToolBar();
	
	
	qx.log.Logger.info(this, "1");
	
	//Panel horizontal
	var splitPane = new qx.ui.splitpane.Pane();
	splitPane.setOrientation("vertical");
	splitPane.setWidth(2000);
	splitPane.setHeight(1500);
	


	//Botones del toolbar
	var btnNuevo = new qx.ui.toolbar.MenuButton("Nuevo");
	var btnAbrir = new qx.ui.toolbar.MenuButton("Abrir");
	var btnGuardar = new qx.ui.toolbar.MenuButton("Guardar");
	
	var btnNuevo2 = new qx.ui.toolbar.MenuButton("Nuevo");
	var btnAbrir2 = new qx.ui.toolbar.MenuButton("Abrir");
	var btnGuardar2 = new qx.ui.toolbar.MenuButton("Guardar");
	
	
	//Menus
	var menu = new qx.ui.menu.Menu();
	var opc1 = new qx.ui.menu.Button("Archivo .doc");
	var opc2 = new qx.ui.menu.Button("Archivo .xls");
	
	var menu2 = new qx.ui.menu.Menu();
	var opc11 = new qx.ui.menu.Button("Archivo .doc");
	var opc22 = new qx.ui.menu.Button("Archivo .xls");
	
	//Se añaden opciones al menu1
	qx.log.Logger.info(this, "3");
	menu.add(opc1);
	menu.add(new qx.ui.menu.Separator());
	menu.add(opc2);
	
	//Se añaden opciones al menu2
	menu2.add(opc11);
	menu2.add(new qx.ui.menu.Separator());
	menu2.add(opc22);
	
	//El menuboton añade su menu1
	btnNuevo.setMenu(menu);
	btnNuevo.setWidth(80);
	
	//El menuboton2 añade su menu2
	btnNuevo2.setMenu(menu2);
	qx.log.Logger.info(this, "4");
	
	
	//toolbar de la parte superior añade elementos dentro de si
	toolbar.add(btnNuevo);
	toolbar.add(btnAbrir);
	toolbar.add(btnGuardar);
	
	//toolbar de la parte inferior  añade elementos dentro de si
	toolbar2.add(btnNuevo2);
	toolbar2.add(btnAbrir2);
	toolbar2.add(btnGuardar2);
	
	qx.log.Logger.info(this, "5");
	
	

	//contenedor 1 añade su toolbar 
	com1.add(toolbar, {row: 0, column: 0});
	//contenedor 1 añade otro contenedor para mostrar el grafico
	com1.add(com3, {row: 1, column: 0, rowSpan: 30, colSpan: 150});
	//contenedor 2 añade su toolbar
	com2.add(toolbar2, {row: 1, column: 1});
	
	//panel dividido añade ambos contenedores
	splitPane.add(com1, 1);
	splitPane.add(com2, 2);
	
	qx.log.Logger.info(splitPane.getWidth());
	com1.setWidth(splitPane.getWidth());
	qx.log.Logger.info(com1.getWidth());
	win.getChildrenContainer().add(splitPane, {edge: 0});
	
	canvas1.addListener("resize", function(){
	canvas1.setCanvasWidth(com1.getWidth());
	} );
	
	this.getRoot().add(win, {edge: 0});
	win.open();
    }
  }
});
