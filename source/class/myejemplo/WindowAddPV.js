qx.Class.define("myejemplo.WindowAddPV", {
    extend: qx.ui.window.Window,

    construct(modeloTabla, historico) {
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

    this.addPV(modeloTabla, historico);
    },

    members: {
        addPV: function(modeloTabla, historico){
        let btnAceptar = new qx.ui.form.Button("Aceptar");
        let btnCancelar = new qx.ui.form.Button("Cancelar");
        let cont = new qx.ui.container.Composite(new qx.ui.layout.Grid(15, 15));
        let slBAxes = new qx.ui.form.SelectBox();
        let txtBlock = new qx.ui.form.TextField();
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

           
            btnAceptar.addListener("execute", function(){
            //creates a record in the Trace table and in turn must create an equivalent record in the Value Axes table to configure the Y-axis values.
            modeloTabla.addRows([[]]);
            }, this);



        btnCancelar.addListener("execute", function(){
        this.close();
        }, this);
        
        cont.add(new qx.ui.basic.Label("Enter PV name, configure scan period"), {row: 0, column: 0});
        cont.add(new qx.ui.basic.Label("Name:"), {row: 1, column: 0});
        cont.add(new qx.ui.form.TextField(), {row: 1, column: 1, colSpan: 15});
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