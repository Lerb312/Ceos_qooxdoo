// main app
qx.Class.define("myejemplo.Application", {
  extend: qx.application.Standalone,

  members: {
    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main() {
      // Call super class
      super.main();

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      // Crea una instancia de test.SplitScreen
      var splitScreen = new myejemplo.SplitScreen();
      //var searchWindow = new myejemplo.SearchWindow();
      

      // Añade splitScreen al documento principal
      var root = this.getRoot()
      root.add(splitScreen, { edge: 0 });
      //root.add(searchWindow)
    },
    
  },
});
