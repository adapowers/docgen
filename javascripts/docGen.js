// File save
//https://github.com/eligrey/FileSaver.js
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define("FileSaver.js",function(){return saveAs})}

var docGen = {
  client: {
    name : "",
    intro: "clientIntro",
    prereq: {
      counter: 1,
      elementIDs: ["clientPrereq1"]
    },
    version: {
      counter: 1,
      elementIDs: ["clientVersion1"]
    },
    config: {
      counter: 1,
      elementIDs: ["clientConfig1"]
    },
    load: {
      counter: 1,
      elementIDs: ["clientLoad1"]
    },
    data: {
      categoryCounter: 1,
      category: {
        clientDataCategory1 : {
          counter: 1,
          elementIDs: ["clientData1-1"]
        }
      }
    },
    release: {
      counter: 1,
      elementIDs: ["clientRelease1"]
    },
    vendordoc: {
      counter: 1,
      elementIDs: ["clientVendordoc1"]
    },
    loadValues: function(idList, type){
      var values = [];
      switch (type) {
        case 'flat': {
          for (var i=0; i<idList.length; i++){
            values.push($((jQuery('#'+idList[i]))[0]).val());
          }
          return values;
        }
        break;
        case 'config': {
          var configSet = [];
          //clientConfig1
          //clientConfigDescription1
          for (var i=0; i<idList.length; i++){
            //identify config vs vendordoc
            var pairType;
            if(idList[i].indexOf("Config") !== -1) {
              pairType = "Config";
            } else {
              pairType = "Vendordoc";
            }
            configSet[0] = ($((jQuery('#'+idList[i]))[0]).val());
            var num = idList[i].match(/\d/g).join("");
            configSet[1] = ($((jQuery('#client'+pairType+'Description' + num))[0]).val());
            values.push(configSet.slice());
          }
          return values;
        }
        break;
        case 'data': {
          var dataSet = [];
          values = {};
          //Set key in value to category
          for (var catName in idList) {
            values[$((jQuery('#'+catName))[0]).val()] = [];
            for (var i=0; i<idList[catName].elementIDs.length; i++) {
              var num = idList[catName].elementIDs[i].match(/\d.*/g).join("");
              var tempArr = [$((jQuery('#'+idList[catName].elementIDs[i]))[0]).val(), $((jQuery('#clientDataDescription'+num))[0]).val()];
              values[$((jQuery('#'+catName))[0]).val()].push(tempArr);
            }
          }
          return values;
        }
        break;
        default: return values;
      }


    }

  },
  server: {},
  mobile: {}

};
var clientDoc = {
  intro : [],   //['Introduction']
  prereq : [],  //['Google Chrome', 'jQuery']
  version : [], // ["1.0", "1.3"]
  config : [],  // ["PID, "Partner ID"], {"Debug", "Send debug to console"}]
  load : [],    // ["Set to fire on all pages"]
  data : {},    // {Standard: ['Name', Descr], Ecom: ['Name', 'Descr']}
  release : []  // ["v1.3 08/17/2016"]
};

//TODO: Add check for empty strings in data (for no prereq cases etc)
// Note, in the UI, do in this order: Standard Tabs, ECM, Events
var dataInject = function(section, tokenized, data) {
  var tempStr = "";
  switch (section) {
    case "intro":
      //Replace token with single string intro
      return tokenized.replace('[docGen:intro]', data);
      break;

    case "prereq":
      //data is an array of values
      //Optional fields
      if (data[0]){
        for (var i=0; i<data.length; i++) {
          tempStr += ("* " + data[i] + "\r\n");
        }
          return tokenized.replace('[docGen:prereq]', tempStr);
      } else {
        return "";
      }
      break;

    case "version":
      if (data[0]){
        for (var i=0; i<data.length; i++) {
          tempStr += ("* " + data[i] + "\r\n");
        }
        return tokenized.replace('[docGen:version]', tempStr);
      } else {
        return "";
      }
      break;

    case "config":
      for(var i=0; i<data.length; i++) {
        //1. ConfigName: Description
        tempStr += (i+1 + ". " + data[i][0] + ": " + data[i][1] + "\r\n");
      }
      return tokenized.replace('[docGen:config]', tempStr);
      break;

    case "load":
      for (var i=0; i<data.length; i++) {
        tempStr += ( data[i] + "\r\n");
      }
      return tokenized.replace('[docGen:load]', tempStr);
      break;
    
    case "data":
      for (var key in data) {
        
        //handle only standard data
        if (key.indexOf("E-Commerce") !== 0 && key.indexOf("Events") !== 0) {
          //Data category
          tempStr += "###" + key + "###\r\n\r\n";
          //Set up table
          tempStr += "**Destination Name**  |  **Description**\r\n------------- | -------------\r\n";
          //Set data in table
          //Each i is a data pair of type array
          for (var i=0; i<data[key].length; i++) {
            tempStr += data[key][i][0] + "| " + data[key][i][1] + "\r\n";
          }
          tempStr += "\r\n";
        } else if (key.indexOf("E-Commerce") === 0) {
          //Todo, add third column
          var tempEcom = "**Destination Name**  |  **Description**\r\n------------- | -------------\r\n";
            for (var i=0; i<data[key].length; i++) {
              tempEcom += data[key][i][0] + "| " + data[key][i][1] + "\r\n";
          }
          //Append E-Comm
          tempStr += clientTemplate.data_ecom.replace('[docGen:data_ecom]', tempEcom);
        } else if (key.indexOf("Events") === 0) {
          var tempEvents = "**Destination Name**  |  **Description**\r\n------------- | -------------\r\n";
            for (var i=0; i<data[key].length; i++) {
              tempEvents += data[key][i][0] + "| " + data[key][i][1] + "\r\n";
          }
          //Append events
          tempStr += clientTemplate.data_events.replace('[docGen:data_event]', tempEvents);
        }
      }

      return tokenized.replace('[docGen:data]', tempStr);
    break;
    
    case "vendordoc":
    if (data[0][0]){
      for (var i=0; i<data.length; i++) {
        
        tempStr += ("* [" + data[i][0] + "](" + data[i][1] + ")\r\n"); 
      }
      return tokenized.replace('[docGen:vendor]', tempStr);
    } else {
      return  "";
    }
      
    break;
    
    default:
      break;
  }
}

//Sample call: dataInject("intro", clientTemplate.intro, clientDoc.intro)
var clientTemplate = {
  //End each line with appropriate line breaks
  name: "",
  intro : "[docGen:intro]\r\n <div id='toc'>Table of Contents Placeholder</div> \r\n\r\n",
  prereq : "##Pre-requisites\r\n\r\n[docGen:prereq]\r\n",
  version : "##Supported Versions\r\n\r\n[docGen:version]\r\n",
  config : "##Tag Configuration\r\nFirst, go to Tealium\'s Tag Marketplace and add the [docGen:name] Tag to your profile ([how to add a Tag?](https:\/\/community.tealiumiq.com\/t5\/Tealium-iQ-Tag-Management\/Tags\/ta-p\/5016)).\r\n\r\nAfter adding the Tag, configure the below settings:\r\n\r\n[docGen:config]\r\n",
  load : "##Load Rules\r\n[Load Rules](https:\/\/community.tealiumiq.com\/t5\/1-Getting-Started-Documentation\/Load-Rules-Creation\/ta-p\/9422) determine when and where to load an instance of this Tag on your site.\r\n\r\nRecommended Load Rule: [docGen:load]\r\n",
  data : "##Data Mappings##\r\n\r\nMapping is the process of sending data from a [Data Layer Variable](https:\/\/community.tealiumiq.com\/t5\/Tealium-iQ-Tag-Management\/Variable-Types-formerly-Data-Sources\/ta-p\/10645#mapping_data_sources) to the corresponding destination variable of the vendor Tag. For instructions on how to map a Variable to a Tag destination, see [Data Mappings](https:\/\/community.tealiumiq.com\/t5\/Tealium-iQ-Tag-Management\/Data-Mappings\/ta-p\/10645#mapping_data_sources).\r\n\r\nThe destination variables for the [docGen:name] Tag are built into its Data Mapping tab. Available categories are:\r\n\r\n[docGen:data]\r\n",
  data_ecom :"###E-Commerce\r\nSince the [docGen:name] Tag is e-commerce enabled, it will automatically use the default E-Commerce Extension mappings. Manually mapping in this category is generally not needed unless:\r\n\r\n* you want to override any Extension mappings\r\n* your desired ecommerce variable is not offered in the Extension\r\n\r\n[docGen:data_ecom]\r\n",
  data_events : "###Events\r\nMap to these destinations for triggering specific events on a page. To trigger an event,\r\n\r\n1. Select an event from the dropdown list. You may choose from the predefined list or create a \'Custom\' event. For \'Custom\' event, enter a name with which to identify it.\r\n2. In the \'Trigger\' field, enter the value of the Variable being mapped.\r\n3. To map more events, click the + button and repeat steps #1 and #2.\r\n4. Click \'Apply\'.\r\n\r\nThe event triggers when the supplied value is found in the Data Layer.\r\n\r\n[docGen:data_event]\r\n",
  release: "<!---\r\n##Release Notes\r\n\r\n### {VERSION NUM XX\/XX\/XXXX}\r\n\r\n* note 1\r\n* note 2\r\n\r\n-->\r\n\r\n",
  vendordoc : "##Vendor Documentation\r\n\r\n[docGen:vendor]\r\n"
};

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
//Add/remove single field func
  $(document).ready(function() {
  $(".client-add-more").click(function(evt) {
    evt.preventDefault();
    var next, addto, integrationType, section, formattedTypedSection;
    //Return list of parents
    var parentList = $(this).parents().map(function() {
      return this.id;
    }).get();
    // Look for the ancestor that holds the sections
    for (var i = 0; i < parentList.length - 1; i++) {
      if (parentList[i].indexOf('List') !== -1) {
        integrationType = parentList[i].substr(0, 6);
        section = parentList[i].substr(6, parentList[i].length - 10).toLowerCase();
        formattedTypedSection = integrationType + section.capitalizeFirstLetter();

        next = docGen[integrationType][section].counter;
        addto = "#" + parentList[i];
        addRemove = "#" + integrationType + section + next;
        docGen[integrationType][section].counter += 1;
        next = docGen[integrationType][section].counter;
        // Let global obj know what exists
        docGen[integrationType][section].elementIDs.push(formattedTypedSection+next);
        break;
      }
    }
    // Handle multi field
    if (evt.currentTarget.classList.value.indexOf("client-add-multi") !== -1){
      //console.log("from multi");
      var newIn = ' <div class="form-group ">  <input type="text" class="form-control" id="' + formattedTypedSection + next + '"> </div> <div class="form-group">  <input type="text" class="form-control" id="' + formattedTypedSection + 'Description' + next + '"placeholder=""> <button id="remove' + formattedTypedSection + next + '" class="btn btn-danger remove-me" " type="button"><span class="glyphicon glyphicon-minus"></button> </div>';
      var newInput = $(newIn);
      $(addto).append(newInput);
      $("#" + formattedTypedSection + next).attr('data-source', $(addto).attr('data-source'));

      $('#remove' + formattedTypedSection + next).on('click', function(e) {
        e.preventDefault();
        var fieldNum = this.id.match(/\d/g).join("");
        var fieldID = "#" + formattedTypedSection + fieldNum;
        var fieldDescriptionID = "#" + formattedTypedSection + "Description" + fieldNum;
        //remove from global obj
        docGen[integrationType][section].elementIDs.splice(docGen[integrationType][section].elementIDs.indexOf(formattedTypedSection+fieldNum), 1);
        // Remove button and both fields
        $(this).remove();
        $(fieldID).remove();
        $(fieldDescriptionID).remove();
      });
    }
    else {
      //console.log("not multi");
      var newIn = '<div class="input-group"><input type="text" class="form-control" id="' + formattedTypedSection + next + '" placeholder=""><span class="input-group-btn"> <button id="remove' + formattedTypedSection + next + '" class="btn btn-danger remove-me" " type="button"><span class="glyphicon glyphicon-minus"></button> </span></div>';
      var newInput = $(newIn);
      $(addto).append(newInput);
      $("#" + formattedTypedSection + next).attr('data-source', $(addto).attr('data-source'));
      $('#remove' + formattedTypedSection + next).on('click', function(e) {
        e.preventDefault();
        var fieldNum = this.id.match(/\d/g).join("");
        var fieldID = "#" + formattedTypedSection + fieldNum;
        //remove from global obj
        docGen[integrationType][section].elementIDs.splice(docGen[integrationType][section].elementIDs.indexOf(formattedTypedSection+fieldNum), 1);

        $(this).remove();
        $(fieldID).remove();
      });
    }
  });
});

// Handle add remove categories
$(document).ready(function() {
  $(".client-add-data-category").click(function(evt) {
    console.log('Data category');
    evt.preventDefault();
    var next, addto, categoryCounter, categoryFieldID, dataFieldID;
        docGen.client.data.categoryCounter++;
        next = docGen.client.data.categoryCounter;
        addto = "#clientDataForm";
        categoryFieldID = "clientDataCategory" + next;
        //clientData(category)(fieldnumber)
        dataFieldID = "clientData" + next + "-1";
        // Let global obj know what exists
        docGen.client.data.category[categoryFieldID] = {
          counter: 1,
          elementIDs: [dataFieldID]
        };
    
      var newIn = '<div id="clientFullDataForm' + next + '"> <div> <label for="clientDataCategory' + next + '">Category:</label> <div class="input-group"> <input type="text" class="form-control" id="clientDataCategory' + next + '" placeholder="Data Category"> <span class="input-group-btn"> <button class="btn btn-danger " id="client-remove-data-category' + next + '" type="button"><span class="glyphicon glyphicon-minus"></span> </button> <button class="btn btn-primary client-add-data-field" id="client-add-data-field-'+ next +'" type="button"><span class="glyphicon glyphicon-option-vertical"></span></span> </div> </div> <div class="form-inline pull-right col-lg-12"  id="clientDataList' + next + '"> <div class="form-group "> <label for="clientData' + next + '-1">Destination</label> <input type="text" class="form-control" id="clientData' + next + '-1" placeholder="Destination Name"> </div> <div class="form-group"> <label for="clientDataDescription' + next + '-1">Description</label> <input type="text" class="form-control" id="clientDataDescription' + next + '-1" placeholder="Description"> <button class="btn invis-button" type="button"><span class="glyphicon glyphicon-plus"></span> </button> </div> </div> </div>';
      var newInput = $(newIn);
      $(addto).append(newInput);
      //$("#" + formattedTypedSection + next).attr('data-source', $(addto).attr('data-source'));

      $('#client-remove-data-category'+next).on('click', function(e) {
        e.preventDefault();

        var fieldID = $('#clientFullDataForm'+next);

        //remove from global obj
        delete docGen.client.data.category[categoryFieldID];
        // Remove button and both fields
        $(this).remove();
        fieldID.remove();
      });
  });
});

//Handle add remove datafields within categories
$(document).ready(function() {
  $('body').on('click', '.client-add-data-field',(function(evt) {
    evt.preventDefault();
    var dataCounter, addto, categoryNum, categoryName, destinationFieldID, descriptionFieldID;
    //1
    categoryNum = evt.currentTarget.id.match(/\d/g).join("");
    //clientDataList1
    addto = "#clientDataList" + categoryNum;
    categoryName = "clientDataCategory" + categoryNum;
    //Update global tracker
    docGen.client.data.category[categoryName].counter++;
    dataCounter = docGen.client.data.category[categoryName].counter;
    destinationFieldID = "clientData" + categoryNum +"-"+ dataCounter;
    //clientData(category)(fieldnumber)
    descriptionFieldID = "clientDataDescription"+ categoryNum +"-"+ dataCounter;
    // Update global tracker
    docGen.client.data.category[categoryName].elementIDs.push(destinationFieldID);

    var newIn = '<div class="form-group"> <input type="text" class="form-control" id="'+ destinationFieldID +'" placeholder=""> </div> <div class="form-group"> <input type="text" class="form-control" id="'+ descriptionFieldID +'" placeholder=""> <button class="btn btn-danger" id="remove-'+ destinationFieldID +'" type="button"><span class="glyphicon glyphicon-minus"></span> </button> </div>';
    var newInput = $(newIn);
    $(addto).append(newInput);

    //Remove fields
     $('#remove-'+destinationFieldID).on('click', function(e) {
      e.preventDefault();
      var field1 = $('#'+destinationFieldID);
      var field2 = $('#'+descriptionFieldID);
      //remove from global obj
      docGen.client.data.category[categoryName].elementIDs.splice(docGen.client.data.category[categoryName].elementIDs.indexOf(destinationFieldID), 1);

      // Remove button and both fields
      $(this).remove();
      field1.remove();
      field2.remove();
    });
    
  }));
});

$(document).ready(function() {
  $('body').on('click', '.client-generate',(function(evt) {
    evt.preventDefault();
    //Name
    clientDoc.name = jQuery('#clientName').val();
    //Intro
    clientDoc.intro = jQuery('#clientIntro').val();
    //Prereq
    clientDoc.prereq = docGen.client.loadValues(docGen.client.prereq.elementIDs, "flat");
    //Version
    clientDoc.version = docGen.client.loadValues(docGen.client.version.elementIDs, "flat");
    //Config
    clientDoc.config = docGen.client.loadValues(docGen.client.config.elementIDs, "config");
    //Load rules
    clientDoc.load = docGen.client.loadValues(docGen.client.load.elementIDs, "flat");
    //Data
    clientDoc.data = docGen.client.loadValues(docGen.client.data.category, "data");
    //Vendor doc
    clientDoc.vendordoc = docGen.client.loadValues(docGen.client.vendordoc.elementIDs, "config");
    //Todo Release


    clientTemplate.name = clientDoc.name;
    clientTemplate.intro = dataInject("intro", clientTemplate.intro, clientDoc.intro);
    clientTemplate.prereq = dataInject("prereq", clientTemplate.prereq, clientDoc.prereq);
    clientTemplate.version = dataInject("version", clientTemplate.version, clientDoc.version);
    clientTemplate.config = dataInject("config", clientTemplate.config, clientDoc.config);
    clientTemplate.load = dataInject("load", clientTemplate.load, clientDoc.load);
    clientTemplate.data = dataInject("data", clientTemplate.data, clientDoc.data);
    clientTemplate.vendordoc = dataInject("vendordoc", clientTemplate.vendordoc, clientDoc.vendordoc);

    var template = clientTemplate.intro + clientTemplate.prereq + clientTemplate.version + clientTemplate.config + clientTemplate.load + clientTemplate.data + clientTemplate.release + clientTemplate.vendordoc;
    //Sub names
    var nameReplace = /\[docGen:name\]/gi;
    template = template.replace(nameReplace, clientTemplate.name);
    //File name
    var fileName = clientTemplate.name + ".md";
    fileName = fileName.replace(/\s+/g, '').toLowerCase();

    var blob = new Blob([template], {type: "text/plain;charset=utf-8"});
    saveAs(blob, fileName);

  }));
});