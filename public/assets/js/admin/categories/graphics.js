

var Graphics = {
  createNewRow : function(data,editFunction,deleteFunction){
      var element = `
      <tr value = '${data.name}'>
        <td>${data.kind}</td>
        <td>${data.name}</td>
        <td>${data.discount}</td>
        <td>${data.description}</td>
        <td>
          <a class="btn-floating btn-small waves-effect waves-light blue editButton">
            <i class="material-icons">
              edit
            </i>
          </a>
          <a class="btn-floating btn-small waves-effect waves-light red deleteButton">
            <i class="material-icons">
              close
            </i>
          </a>

        </td>
      </tr>
      `;
      var newComponent = $(element);

      newComponent.find('a.editButton').on('click',function(){
          editFunction(data.name);
      });

      newComponent.find('a.deleteButton').on('click',function(){

            deleteFunction(data.name);
      });

      $('#categoriesContainer tbody').prepend(newComponent);
  },
  deleteRow : function(name){
    IssuesGraphic.locateRow('categoriesContainer',name).remove();
  }

}
