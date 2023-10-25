sap.ui.define(
    ["sap/ui/core/ComponentContainer"],
  
    function (ComponentContainer) {
      "use strict";
      new ComponentContainer({
        name: "assignment1",
        settings: {
          id: "assignment1",
        },
        async: true,
      }).placeAt("content");
    }
  );
  