qx.Class.define("myejemplo.SearchWindow", {
  extend: qx.ui.window.Window,

  construct: function () {
    let win = new qx.ui.window.Window("Browser");
    win.setLayout(new qx.ui.layout.VBox(10));
    win.setStatus("Application is ready");
    win.open();
    //win.add(win, { left: 350, top: 120 });

    let atom = new qx.ui.basic.Atom("Search");
    win.add(atom);

    let box = new qx.ui.container.Composite();
    box.setLayout(new qx.ui.layout.HBox(10));
    win.add(box, { flex: 1 });
    // props
    win.setShowMaximize(true);
    win.setShowMinimize(true);
    win.setAllowClose(true);
    win.setAllowMaximize(false);
    win.setAllowMinimize(false);
    win.setShowStatusbar(true);
    // define grupo de cajas
    var basicSettings = new qx.ui.groupbox.GroupBox("Tag filter");
    basicSettings.setLayout(new qx.ui.layout.VBox(4));
    box.add(basicSettings, { flex: 1 });

    //var showClose = new qx.ui.form.CheckBox("Show Close");
    //showClose.setValue(false);
    // showClose.addListener("changeValue", function (e) {
    //   win.setShowClose(e.getData());
    // });
    //basicSettings.add(showClose);

    // var showMaximize = new qx.ui.form.CheckBox("Show Maximize");
    // showMaximize.setValue(true);
    // showMaximize.addListener("changeValue", function (e) {
    //   win.setShowMaximize(e.getData());
    // });
    // basicSettings.add(showMaximize);

    // var showMinimize = new qx.ui.form.CheckBox("Show Minimize");
    // showMinimize.setValue(true);
    // showMinimize.addListener("changeValue", function (e) {
    //   win.setShowMinimize(e.getData());
    // });
    // basicSettings.add(showMinimize);

    // var allowClose = new qx.ui.form.CheckBox("Allow Close");
    // allowClose.setValue(false);
    // allowClose.addListener("changeValue", function (e) {
    //   win.setAllowClose(e.getData());
    // });
    // basicSettings.add(allowClose);

    // var allowMaximize = new qx.ui.form.CheckBox("Allow Maximize");
    // allowMaximize.setValue(false);
    // allowMaximize.addListener("changeValue", function (e) {
    //   win.setAllowMaximize(e.getData());
    // });
    // basicSettings.add(allowMaximize);

    // var allowMinimize = new qx.ui.form.CheckBox("Allow Minimize");
    // allowMinimize.setValue(true);
    // allowMinimize.addListener("changeValue", function (e) {
    //   win.setAllowMinimize(e.getData());
    // });
    // basicSettings.add(allowMinimize);

    // var showStatusbar = new qx.ui.form.CheckBox("Show Statusbar");
    // showStatusbar.setValue(true);
    // showStatusbar.addListener("changeValue", function (e) {
    //   win.setShowStatusbar(e.getData());
    // });
    // basicSettings.add(showStatusbar);

    let resize = new qx.ui.groupbox.GroupBox("Tag filter");
    resize.setLayout(new qx.ui.layout.VBox(4));
    box.add(resize, { flex: 1 });

    let button = new qx.ui.form.ToggleButton(
      "Toggle Button"
      //"icon/22/apps/internet-web-browser.png"
    );
    button.focus();
    resize.add(button);

    button.addListener(
      "changeValue",
      function (e) {
        this.debug("Checked: " + e.getData());
      },
      this
    );

    // var resizeFrame = new qx.ui.form.CheckBox("Use resize frame");
    // resizeFrame.setValue(true);
    // resizeFrame.addListener("changeValue", function (e) {
    //   win.setUseResizeFrame(e.getData());
    // });
    // resize.add(resizeFrame);

    // Get edges to NO resize, for allow change value to TRUE.
    let edges = ["left", "right"];
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i];
      let resizable = new qx.ui.form.CheckBox("Resizable " + edge).set({
        value: false,
      });

      resizable.bind("value", win, "resizable" + qx.lang.String.firstUp(edge));
      //resize.add(resizable);
    }

    // test
    //var blockResize = ["left, right"];
    //win.

    // var move = new qx.ui.groupbox.GroupBox("Moveable");
    // move.setLayout(new qx.ui.layout.VBox(4));
    // box.add(move, { flex: 1 });

    // var movable = new qx.ui.form.CheckBox("Movable");
    // movable.setValue(true);
    // movable.addListener("changeValue", function (e) {
    //   win.setMovable(e.getData());
    // });
    // move.add(movable);

    // var moveFrame = new qx.ui.form.CheckBox("Use move frame");
    // moveFrame.addListener("changeValue", function (e) {
    //   win.setUseMoveFrame(e.getData());
    // });
    // move.add(moveFrame);
  },
});
