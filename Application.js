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
      // Call super class
      super.main();
      qx.log.Logger.info(this, "antes de todo");
      //importando el modulo echarts
	var myEcharts = require("echarts");//fino
	
      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }
      
      
	qx.log.Logger.info(this, "0");
	var win = new qx.ui.window.Window("Ventana");
   
	win.setWidth(1200);
	win.setHeight(800);
	win.setShowMinimize(false);
	
	win.setCenterOnAppear(true);
	win.setLayout(new qx.ui.layout.Canvas());
	
	qx.log.Logger.info(this, "023123");
	
	
	//Contenedores
	var com1 = new qx.ui.container.Composite();
	//com1.setBackgroundColor("blue");
	com1.setLayout( new qx.ui.layout.Canvas());
	
	 var com2 = new qx.ui.container.Composite();
	com2.setBackgroundColor("red");
	com2.setLayout( new qx.ui.layout.Canvas());
	qx.log.Logger.info(this, "2");
	
	var com3 = new qx.ui.container.Composite();
	com3.setBackgroundColor("green");
	com3.setLayout( new qx.ui.layout.Canvas());
	com3.setMargin(10);
	//Lienzo donde se dibuja la figura
	var canvas1 = new qx.ui.embed.Canvas().set({
        canvasWidth: 200,
        canvasHeight: 200,
        syncDimension: false,
      });
	
	  //4)
     //EVENTO QUE REDIBUJA EL LIENZO
     canvas1.addListener("redraw", function(e)
      {
      
       var chartDom = com3.getContentElement().getDomElement();
      qx.log.Logger.info(this, chartDom);
        qx.log.Logger.info(this, "estoy aqui");

      	var myChart = myEcharts.init(chartDom, 'dark');//fino
        var option;

	qx.log.Logger.info(this, "ahora aqui");
	
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
     
	
	//toolbarsn()
	var toolbar = new qx.ui.toolbar.ToolBar();
	var toolbar2 = new qx.ui.toolbar.ToolBar();
	
	
	qx.log.Logger.info(this, "1");
	
	//Panel horizontal
	var splitPane = new qx.ui.splitpane.Pane();
	 splitPane.setOrientation("vertical");
	qx.log.Logger.info(splitPane.getOrientation());
	
	
	
	
	
	//Botones del toolbar
	var btnNuevo = new qx.ui.toolbar.MenuButton("Nuevo");
	var btnAbrir = new qx.ui.toolbar.MenuButton("Abrir");
	var btnGuardar = new qx.ui.toolbar.MenuButton("Guardar");
	
	var btnNuevo2 = new qx.ui.toolbar.MenuButton("Nuevo");
	var btnAbrir2 = new qx.ui.toolbar.MenuButton("Abrir");
	var btnGuardar2 = new qx.ui.toolbar.MenuButton("Guardar");
	
	
	var menu = new qx.ui.menu.Menu();
	var opc1 = new qx.ui.menu.Button("Archivo .doc");
	var opc2 = new qx.ui.menu.Button("Archivo .xls");
	
	var menu2 = new qx.ui.menu.Menu();
	var opc11 = new qx.ui.menu.Button("Archivo .doc");
	var opc22 = new qx.ui.menu.Button("Archivo .xls");
	
	qx.log.Logger.info(this, "3");
	menu.add(opc1);
	menu.add(new qx.ui.menu.Separator());
	menu.add(opc2);
	
	menu2.add(opc11);
	menu2.add(new qx.ui.menu.Separator());
	menu2.add(opc22);
	
	btnNuevo.setMenu(menu);
	
	btnNuevo2.setMenu(menu2);
	qx.log.Logger.info(this, "4");
	
	
	//toolbar.add(boton);
	toolbar.add(btnNuevo);
	toolbar.add(btnAbrir);
	toolbar.add(btnGuardar);
	
	
	toolbar2.add(btnNuevo2);
	toolbar2.add(btnAbrir2);
	toolbar2.add(btnGuardar2);
	qx.log.Logger.info(this, "5");
	
	
	com1.add(com3, {edge: 0});
	com1.add(toolbar, {top: 0});
	com2.add(toolbar2, {top: 0});
	
	
	splitPane.add(com1);
	splitPane.add(com2);
	
	
	win.getChildrenContainer().add(splitPane, {edge: 0});
	
	this.getRoot().add(win, {edge: 0});
	win.open();
    }
  }
});
