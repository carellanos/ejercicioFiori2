sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/m/MessageToast",
	"sap/ui/model/Filter",
    "sap/ui/webc/main/RadioButton",
    "sap/m/RadioButton",
    "sap/ui/webc/main/DatePicker",
    "sap/ui/core/Core",
    "sap/ui/core/library",
    "sap/ui/core/date/UI5Date",
    "sap/ui/core/UIComponent",
    "sap/ui/commons/SearchField",
    "sap/ui/core/ValueState",
    "sap/ui/model/SimpleType",
	"sap/ui/model/ValidateException",
	"sap/m/MessageBox"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,UIComponent,Device, JSONModel ,ValueState) {
        "use strict";
        var valueRadButt = "Ida y vuelta";

        return Controller.extend("flightsearch.flights.controller.flights", {
            onInit: function () {
                
                var oView = this.getView();
			    oView.setModel(this.oModel);

                this.oSF = oView.byId("searchField1");
                this.oSF2 = oView.byId("searchField2");               
                //var btnSearch = this.byId("btnSearch");
                //btnSearch.setEnabled(false);

            },

            onHomePress: function () {
                var oIconTabHeader = this.byId('iconTabHeader');
                oIconTabHeader.setSelectedKey('invalidKey');
    
                var oLabel = this.byId('labelId');
                oLabel.setText('Home Screen');
            },
    
            onSelectTab: function (event) {
                var oLabel = this.byId('labelId');
                var oTab = event.getParameter('item');
    
                oLabel.setText(oTab.getText());
            },

            onSuggest: function (event) {
                var sValue = event.getParameter("suggestValue"),
                     aFilters = [];            
                 if (sValue) {
                     aFilters = [
                         new Filter([
                             new Filter("City", function (sText) {
                                 return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                             }),
                             new Filter("CodCity", function (sDes) {
                                 return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                             })
                         ], false)
                     ];
                 }
     
                 this.oSF.getBinding("suggestionItems").filter(aFilters);
                 this.oSF.suggest();  
             },

             onSuggest2: function (event) {

                var sValue = event.getParameter("suggestValue"),
                     aFilters = [];            
                 if (sValue) {
                     aFilters = [
                         new Filter([
                             new Filter("City", function (sText) {
                                 return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                             }),
                             new Filter("CodCity", function (sDes) {
                                 return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
                             })
                         ], false)
                     ];
                 }
     
                 this.oSF2.getBinding("suggestionItems").filter(aFilters);
                 this.oSF2.suggest();  

             },


             onSelectRadiobutton: function(oEvent){
                var radBtn = oEvent.getSource().getSelectedButton();
                var datePick2 = this.byId("DP2");
                
                if(radBtn.getText() === "Sólo ida"){
                    valueRadButt = "Sólo ida";
                    this.getView().byId("DP2").setValue(null);
                    datePick2.setEnabled(false);                    
                }else if(radBtn.getText() === "Ida y vuelta"){
                   valueRadButt = "Ida y vuelta";
                   datePick2.setEnabled(true);
                }
            },            

            changeValueState: function(oEvent){
                let oValue = oEvent.getSource().getValue();
                if(oValue){
                    oEvent.getSource().setValueState("None");
                }
            },

            onValidate: function(oEvent){
                console.log("onValidate");
                var aValues = [];
                var result = [];
                var item = this.getOwnerComponent().getModel('flights').getData();
                let search1 = this.byId("searchField1").getValue();
                let search2 = this.byId("searchField2").getValue();
                let datePick1 = this.byId("DP1");
                let datePick2 = this.byId("DP2");

                //======= Se evalua si los searchFields estan vacios ==============
                if(search1 != ""){
                    var se1 = search1.split(" ",1);
                    aValues.push(se1);
                }else{
                    return;
                }
                if(search2 != ""){
                    var se2 = search2.split(" ",1);
                    aValues.push(se2);
                }else{
                    return;
                }
                //======= Se evalua si los datePickers estan vacios ==============
                if(datePick1.getValue() === ""){
                    datePick1.setValueState("Error");
                }else{
                    aValues.push(datePick1.getValue());
                }
                if(valueRadButt === "Ida y vuelta"){
                    if(datePick2.getValue() === ""){
                        datePick2.setValueState("Error");
                    }else{
                        aValues.push(datePick2.getValue());
                    }
                }else{
                    aValues.push("");
                }
                
                if(aValues.length > 0){
                    console.log("dentro de if");
                    for(var i = 0; i < item.length; i++){
                        console.log("dentro de for");
                       if(item[i].Date == aValues[2] && item[i].CodFrom == aValues[0] && item[i].CodDestination == aValues[1]){
                            result.push(item[i]);
                        }
                    }
                }
                console.log("finalizo ciclo");
                console.log("result: "+JSON.stringify(result));
                console.log("result.id: "+result[0].id);
                let oRouter =  sap.ui.core.UIComponent.getRouterFor(this);// linea para hacer la navegacion
                oRouter.navTo("TargetResultSearchView",{flightId : result[0].id});     
            },

            onValidate2: function(oEvent){
                console.log("entro en onValidate2");
                let aValues = [];
                let result = [];
                let oInput1 = this.byId("input1");
                let oInput2 = this.byId("input2");
                console.log("input1: "+oInput1);
                console.log("input2: "+oInput2);
                console.log("input1.value: "+oInput1.getValue());
                console.log("input2.value: "+oInput2.getValue());
                var dataMock = this.getOwnerComponent().getModel('Reservations').getData(); 

                 if(oInput1.getValue() === ""){
                    oInput1.setValueState("Error");
                    return;
                 }else{
                    aValues.push(oInput1.getValue());
                 }
                 if(oInput2.getValue() === ""){
                    oInput2.setValueState("Error");
                    return;
                 }else{
                    aValues.push(oInput2.getValue());
                 }

                 console.log("avalues: "+JSON.stringify(aValues));
                 if(aValues.length > 0){
                    console.log("dentro de if");
                    for(var i = 0; i < dataMock.length; i++){
                        console.log("dentro de for");
                       if(dataMock[i].CodReservartion == aValues[0] && dataMock[i].PassengerLastname == aValues[1]){
                            result.push(dataMock[i]);
                        }
                    }
                }
                let oRouter =  sap.ui.core.UIComponent.getRouterFor(this);// linea para hacer la navegacion
                oRouter.navTo("TargetResultSearchReservationView",{resultId:result[0].id});  
            },
        
            changeUppercase: function(oEvent){
                var input = oEvent.getSource();
                input.setValue(input.getValue().toUpperCase());
            },

        });


    });
