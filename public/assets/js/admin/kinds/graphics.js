

var Graphics = {
  createNewRow : function(data,editFunction,deleteFunction){
      var element = `
      <tr value = "${data.id}">
        <td>${data.name}</td>
        <td>${data.associatedView}</td>
        <td>${data.discount}</td>
        <td class = "truncate"><${data.description}</td>
        <td>
          <a class="btn-floating btn-small waves-effect waves-light blue editButton">
            <i class="material-icons">
              edit
            </i>
          </a>
          <a  class="btn-floating btn-small waves-effect waves-light red deleteButton">
            <i class="material-icons">
              close
            </i>
          </a>
        </td>
      </tr>
      `;
      var newComponent = $(element);

      newComponent.find('a.editButton').on('click',function(){
          editFunction(data.id);
      });

      newComponent.find('a.deleteButton').on('click',function(){

            deleteFunction(data.id);
      });

      $('#categoriesContainer tbody').prepend(newComponent);
  },
  deleteRow : function(id){
    console.log('el id :' + id);
    $(`#categoriesContainer tbody`).children(`tr[value='${id}']`).remove();
    //IssuesGraphic.locateRow('categoriesContainer',id).remove();
  }

}
