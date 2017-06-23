
var IssuesGraphic = {

  locateRow : function(tableId,name){
      var output = $(`#${tableId} tbody`).children(`tr[value='${name}']`);
      return output;
  },

}
