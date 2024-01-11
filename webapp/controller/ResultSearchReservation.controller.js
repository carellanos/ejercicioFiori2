sap.ui.define([
    "sap/ui/core/mvc/Controller",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        
  
        return Controller.extend("flightsearch.flights.controller.ResultSearchReservation", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("TargetResultSearchReservationView").attachMatched(this._onObjectMatched, this);

            },

            _onObjectMatched: function (oEvent) {
                let oArgs, oView;
                oArgs = oEvent.getParameter("arguments");
                let valor = oArgs.reservationId - 1;
                oView = this.getView();

                oView.bindElement({
                    path: `Reservations>/${valor}`
                })

            }
            
            
        });
    });
