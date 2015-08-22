/**
 * @author Prateek.Srivastava
 */
var proto = Object.create(HTMLElement.prototype);

proto.test = "this.getAttribute('test')";

proto.createdCallback = function() {
	console.log("created");
	this.innerHTML = this.test + '<table id="advanceGrid" class="display" cellspacing="0" width="100%"></table>';
	var groupBy = "office";
	  	$.get("data.json", 
	  	   function(data){
	  	    	var u = {}, a = [], hList = {},hArray = [];
	  	    	var result = "";
	  	    	var header = "";
	  	    	var headerCreated = false;
	  	    	$(data).each(function(index, element){
	  	    		if(!u.hasOwnProperty(element[groupBy])) {
                            a.push(element[groupBy]);
                             u[element[groupBy]] = []; 
                            
                      }
                      
                     u[element[groupBy]].push(element);
                     $.each(element, function(k, v) {
                     	 if(!hList.hasOwnProperty(k.toString())) {
                       	    hList[k] = 1;
                         }
                     });
                     
                });
                 header += '<tr> ';
                  $.each(hList, function(k, v) {
                  	header += '<th> '+ k +' </th>';
                  });
                   header += '</tr> ';
                $(u).each(function(index, innerArray) {
                	  $.each(innerArray, function(key, value) {
                	  	result += '<tr class="header"> <td ><img id="img" src="icons/expand_collapse_minus.gif"/> <b>' + key + '</b></td> </tr>';
                	$(value).each(function(index1,element) {                   
                       result += '<tr style="display: table-row;"> '; 
                       $.each(hList, function(k, v) {
                       //display the key and value pair
                       var value = element[k] || "";
                       result += '<td> '+ value +' </td>';
                       });  
                        result += ' </tr>';
                	   });
                	  });
                	
                  });
                 
                  console.log(JSON.stringify(hList));
                $('#advanceGrid').append(header);
                $('#advanceGrid').append(result);
                //console.log(result);
                //console.log(JSON.stringify(u));
	  	    });
};
proto.attachedCallback = function() {console.log("attached" + this.test);};
document.registerElement('x-advancegrid',{
	prototype: proto
});
