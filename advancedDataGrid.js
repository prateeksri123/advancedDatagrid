/**
 * @author Prateek.Srivastava
 */
var proto = Object.create(HTMLElement.prototype);

proto.groupBy = "";
proto.dataProvider = [];
proto.rowStyle = {"evenRowColor":"#ffffff","oddRowColor":"#C0C0C0"};
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

proto.drawGrid = function() {
	var temp = this.dataProvider;
	var groupBy = this.groupBy;
	var headerList = this.header;
	var rowStyle = this.rowStyle;
	var dataSource = this.dataProvider;
	/*= Object.keys(temp).map(function(k) {
	 return temp[k];
	 });*/
	var u = {}, a = [], hList = {}, hArray = [];
	var result = "";
	var header = "";
	var headerCreated = false;
	var evenRow=true;
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
	header += '<tr> ';
	$.each(hList, function(k, v) {
		header += '<th> ' + (headerList[k] || k) + ' </th>';
	});
	header += '</tr> ';
	$(u).each(function(index, innerArray) {
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
