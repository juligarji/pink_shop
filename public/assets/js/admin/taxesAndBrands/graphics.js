
var Graphics = {
  createNewBrand : function(data){
      var element = `
      <tr value="${data._id}">
        <td>
          <p>${data.name} </p>
        </td>
        <td>
          <p>${data.discount}</p>
        </td>
        <td>
          <p>
            ${data.description}
          </p>
        </td>
        <td>
          <a onclick="editBrand('${data._id}')" width = "50%" style = "font-size:15px" class="waves-effect waves-teal btn-flat blue"><i class="material-icons">&#xE3C9;</i></a>
            <a onclick="deleteBrand('${data._id}')" width = "50%" style = "font-size:15px" class="waves-effect waves-teal btn-flat red"><i class="material-icons">&#xE5CD;</i></a>
        </td>
      </tr>
      `;
      var newComponent = $(element);

      $('#brandsContainer').append(newComponent);
  },
  deleteBrand : function(id){

    $(`#brandsContainer`).children(`tr[value='${id}']`).remove();

  },
  createNewTax : function(data){
      var element = `
      <tr value = "${data._id}">
        <td>${data.name}</td>
        <td>${data.value}</td>
        <td>
          <a onclick= "editTax('${data._id}')"width = "50%" style = "font-size:15px" class="waves-effect waves-teal btn-flat blue"><i class="material-icons">&#xE3C9;</i></a>
            <a onclick= "deleteTax('${data._id}')" width = "50%" style = "font-size:15px" class="waves-effect waves-teal btn-flat red"><i class="material-icons">&#xE5CD;</i></a>
        </td>
      </tr>
      `;
      var newComponent = $(element);

      $('#taxesContainer').append(newComponent);
  },
  deleteTax : function(id){

    $(`#taxesContainer`).children(`tr[value='${id}']`).remove();

  }

}
