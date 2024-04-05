qx.Class.define("myejemplo.WindowWarning", {
extend: qx.ui.window.Window,

construct: function (){
    this.base(arguments);
    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setAllowClose(true);
    this.setAllowMaximize(false);
    this.setAllowMinimize(false);
    this.setShowStatusbar(false);
    this.setCaption("Mensaje");
    this.setCenterOnAppear(true);
    this.setMinWidth(350);
    this.setMaxWidth(400);
    this.setMinHeight(200);
    this.setMaxHeight(300);
    this.setLayout(new qx.ui.layout.VBox());
    
    
    
    		
 		
 
    this.warning();
    

 		
},
 members: {
 	
 	warning: function(){
 			let btnAceptar = new qx.ui.form.Button("Aceptar");
 		let cont = new qx.ui.container.Composite(new qx.ui.layout.Grid(15, 15));
 		
 		
 		let textArea1 = new qx.ui.form.TextArea();
 			textArea1.setReadOnly(true);
 			textArea1.setValue("Mensaje");
 		let textArea2 = new qx.ui.form.TextArea();
 			textArea2.setReadOnly(true);
 			textArea2.setValue("To add annotation, firts add traces to the plot");
 		
 		btnAceptar.addListener("execute", function(){
 		this.close();
 		}, this);
 		
 		cont.add(textArea1, {row: 0, column: 0, colSpan: 20});
 		cont.add(textArea2,  {row: 1, column: 0, colSpan: 20});
 		cont.add(btnAceptar,  {row: 2, column: 17});
 		
 		
 		this.getChildrenContainer().add(cont);
 		
 		
 
 }
}

});
