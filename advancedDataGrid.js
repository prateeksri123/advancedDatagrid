/**
 * @author Prateek.Srivastava
 */
var proto = Object.create(HTMLElement.prototype);
var u = {}, a = [], hList = {}, hArray = [];
proto.sortDirection = "asc";
proto.groupBy = "";
proto.dataProvider = [];
proto.groupedProvider = {};

proto.rowStyle = {
	"evenRowColor" : "#ffffff",
	"oddRowColor" : "#C0C0C0"
};
proto.header = [];

proto.refreshGrid = function() {
	console.log(this.groupBy);
	console.log( typeof this.dataProvider);
	this.drawGrid();

};

proto.createdCallback = function() {
	console.log("created");
	this.innerHTML = '<table id="advanceGrid" class="display" cellspacing="0" width="100%"></table>';
};

proto.makeGroups = function() {
	console.log("makeGroups");
	var dataSource = this.dataProvider;
	var groupBy = this.groupBy;
	$(dataSource).each(function(index, element) {
		if (!u.hasOwnProperty(element[groupBy])) {
			a.push(element[groupBy]);
			u[element[groupBy]] = [];

		}

		u[element[groupBy]].push(element);
		$.each(element, function(k, v) {
			if (!hList.hasOwnProperty(k.toString())) {
				hList[k] = 1;
			}
		});

	});
	this.groupedProvider = u;
	this.sortArray(this.groupBy);

};

proto.sortArray = function(sortBy) {
	console.log("sortArray " + sortBy);
	this.sortDirection = this.sortDirection === "asc" ? "dsc" : "asc";
	var sortedTo = this.sortDirection;
	$(this.groupedProvider).each(function(index, innerArray) {
		$.each(innerArray, function(key, value) {
			console.log("sortGroup " + key + "  " + sortedTo);
			
			value.sort(function(a, b) {
			   var result = 0;
			   if(sortedTo === "asc") {
			   	result = a[sortBy].localeCompare(b[sortBy]);
			   } else {
			   	result = b[sortBy].localeCompare(a[sortBy]);
			   }
			   console.log(result);
				return result;
			});
			console.log(value.toString());
		});

	});
	this.drawGrid();
};

proto.drawGrid = function() {
	console.log("drawGrid");
	var temp = this.dataProvider;
	var headerList = this.header;
	var rowStyle = this.rowStyle;
	var result = "";
	var header = "";
	
	var evenRow = true;
	var Table = document.getElementById("advanceGrid");
	Table.innerHTML = "";
	header += '<tr> ';
	$.each(hList, function(k, v) {
		header += '<th><button onclick="sortArray(&quot;' + k + '&quot;)"> ' + (headerList[k] || k) + ' </button></th>';
	});
	header += '</tr> ';
	$(this.groupedProvider).each(function(index, innerArray) {
		$.each(innerArray, function(key, value) {
			result += '<tr class="header"> <td ><img id="img" src="icons/expand_collapse_minus.gif"/> <b>' + key + '</b></td> </tr>';
			$(value).each(function(index1, element) {

				if (evenRow) {
					rowColor = rowStyle["evenRowColor"];
					evenRow = false;
				} else {
					rowColor = rowStyle["oddRowColor"];
					evenRow = true;
				}
				result += '<tr bgcolor=' + rowColor + ' style="display: table-row;"> ';
				$.each(hList, function(k, v) {
					//display the key and value pair
					var value = element[k] || "";
					result += '<td> ' + value + ' </td>';
				});
				result += ' </tr>';
			});
		});

	});

	$('#advanceGrid').append(header);
	$('#advanceGrid').append(result);

};

proto.attachedCallback = function() {
	console.log("attached");
};
document.registerElement('x-advancegrid', {
	prototype : proto
});
