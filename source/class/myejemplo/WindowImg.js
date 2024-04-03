qx.Class.define("myejemplo.WindowImg", {
extend: qx.ui.window.Window,

construct: function (titulo){
	this.base(arguments);
    this.setShowMaximize(false);
    this.setShowMinimize(false);
    this.setAllowClose(true);
    this.setAllowMaximize(false);
    this.setAllowMinimize(false);
    this.setShowStatusbar(false);
    this.setCaption(titulo);
    this.setCenterOnAppear(true);
    this.setMinWidth(550);
    this.setMaxWidth(800);
    this.setMinHeight(460);
    this.setMaxHeight(700);
}


});
