qx.Class.define("myejemplo.WindowAddPV", {
    extend: qx.ui.window.Window,
    
    construct(modeloTabla, modelColumn, historico,  scroll, charts, tabla) {
    this.base(arguments);
    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setAllowClose(true);
    this.setAllowMaximize(false);
    this.setAllowMinimize(false);
    this.setShowStatusbar(false);
    this.setCaption("Add PV");
    this.setCenterOnAppear(true);
    this.setMinWidth(600);
    this.setMinHeight(300);
    this.setLayout(new qx.ui.layout.VBox());

    this.addPV(scroll, charts, modeloTabla, modelColumn ,historico);
    },

    members: {
        addPV: function(scroll, charts, modeloTabla, modelColumn ,historico){
           


              //Renders
            modelColumn.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
            modelColumn.setDataCellRenderer(1, new qx.ui.table.cellrenderer.String());
            modelColumn.setDataCellRenderer(2, new qx.ui.table.cellrenderer.String());
            modelColumn.setDataCellRenderer(3, new myejemplo.RenderButton());
            modelColumn.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number());
            modelColumn.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number());
            //se debe crear un renderizador para este selectBox 
            modelColumn.setDataCellRenderer(6, new myejemplo.RenderSelectedBox());

//Components
        let btnAceptar = new qx.ui.form.Button("Aceptar");
        let btnCancelar = new qx.ui.form.Button("Cancelar");
        let cont = new qx.ui.container.Composite(new qx.ui.layout.Grid(15, 15));
        let slBAxes = new qx.ui.form.SelectBox();
        let txtBlock = new qx.ui.form.TextField();
        let txtName = new qx.ui.form.TextField();
        let chkActiveOrNot= new qx.ui.form.CheckBox();
            txtBlock.setEnabled(false);
            txtBlock.setValue("0.0");
            chkActiveOrNot.setValue(true);

   

            chkActiveOrNot.addListener("changeValue", function (e) {
    
                if(e.getData()){
                    txtBlock.setEnabled(false);
                }else{
                    txtBlock.setEnabled(true);

                }
            });

            
            let selectedItem = 0;  
            let selectedText = 0;
            slBAxes.add(new qx.ui.form.ListItem("<use new or new empty axis>"));
            slBAxes.addListener("changeSelection", function(e){
                selectedItem = e.getData()[0];
     	        selectedText = selectedItem.getLabel();
            });
 
          

            let option;
			let myChart = 0;
			let fechas=['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];//can be modified
            let tamaño=0;
            let datos = [-50, 800, 10, 4000, 5000, 45565, 55, -33, 224, 786, -221, 24, -234, -56, 564, 50000, 983, 123, -44400, 0, 23, 12, 43,-22];//para probar
            let datos1 = [-7000, 800, 10, -4000, 50, 65, 75, -33, 224, 786, -221, 24, -234, -56, 564, 90, 983, -123, -44, 1110, 27, 12, 473,-22];//para probar
          
            //EVENTOS
            btnAceptar.addListener("execute", function(){
            //creates a record in the Trace table and in turn must create an equivalent record in the Value Axes table to configure the Y-axis values.
            //"Show", "Item(PV, Formula)", "Display Name", "Color","Scan Period", "Buffer Size", "Axis"
            modeloTabla.addRows([[true, txtName.getValue(), txtName.getValue(), , 0.0, 5000,  ]]);
           

            //////////////////////
               
            alert("Antes de anexar " +historico. obtenerContador());
        let canvas1 = new qx.ui.embed.Canvas().set({
            canvasWidth: 200,
            canvasHeight: 200,
            syncDimension: false,
          });
       
        //display on the graphic 
        canvas1.addListener("redraw", function()
        {
         let chartDom = scroll.getContentElement().getDomElement();
         myChart = charts.init(chartDom);
        

  
      option = {
        xAxis: {
          type: 'category',
          data: fechas
        },
        yAxis: [{
          type: 'value'
        }],
        series: [
          {
            data: historico. obtenerElementoActual(),
           type: 'line'
         }
       ]
      };
      
    
      //Debe anexarse uno nuevo segun lo configurado

      //Serie
      let newSerie= {
        name: 'nuevaserie',
        type: 'line',
        data: [12, 300, -5555, 900],
        color: ["#3398DB"]
      };
       
      //Otra Serie
      let newSerie1= {
        name: 'secondserie',
        type: 'line',
        data: [1000, -700, 5632, -2000],
        color: ["#ea7ccc"]
      };

      //Add in the Array option.series
      option.series.push(newSerie);
      myChart.setOption(option);
      option.series.push(newSerie1); 
      myChart.setOption(option);

      //save option.series.data 
         historico.agregarEstado(newSerie.data);//anexado de manera individual
         historico.agregarEstado(newSerie1.data);//anexado de manera individual

         
          
      
        }, this); 
     
          //////////////////////


            this.close();
            }, this);



        btnCancelar.addListener("execute", function(){
        this.close();
        }, this);
        
        cont.add(new qx.ui.basic.Label("Enter PV name, configure scan period"), {row: 0, column: 0});
        cont.add(new qx.ui.basic.Label("Name:"), {row: 1, column: 0});
        cont.add(txtName, {row: 1, column: 1, colSpan: 15});
        cont.add(new qx.ui.basic.Label("Scan Period [second]:"),  {row: 2, column: 0});
        cont.add(txtBlock, {row: 2, column: 1, colSpan: 10});
        cont.add(chkActiveOrNot, {row: 2, column: 12});
        cont.add(new qx.ui.basic.Label("Value Axes"),  {row: 3, column: 0});
        cont.add(slBAxes,  {row: 3, column: 1, colSpan: 15});
        cont.add(btnCancelar,  {row: 5, column: 17});
        cont.add(btnAceptar,  {row: 5, column: 20});
        
       
        this.getChildrenContainer().add(cont);
        
        

}
    }
});