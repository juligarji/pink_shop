var PUBLIC_ADDRESS = 'assets/img/products/';

var Graphics = {

  addPhotoToModal : function(path){

    var container = $('#photoModal ul.slides');
    var length = $('#photoModal ul.slides img').length;

    var addr = PUBLIC_ADDRESS + path;
    var element =
    `<li>
      <img src="${addr}">
      <div class="caption center-align">
        <h3>${length + 1}</h3>
      </div>
    </li>`;

    var table = $('#photoModal table tbody');

    var listElement = `
    <tr>
      <td class = "col l1 m1 s1">${length + 1}</td>
      <td>
          <p>${path}</p>
      </td>
      <td>
        <a class="btn-floating btn-small waves-effect waves-light red" onclick = "removePic('${path}')">
              <i class="material-icons">close</i>
        </a>
      </td>
    </tr>
    `;

    container.append(element);
    table.prepend(listElement);
    $('.slider').slider();
  },

  fillPhotoModal : function(arrayPaths){//actualizar contenedor
    if(!Array.isArray(arrayPaths)){return;}
    if(arrayPaths==[]){return;}

    var container = $('#photoModal ul.slides');
    var table = $('#photoModal table tbody');
    container.empty();
    $('.slider').slider('start');
    table.empty();

    var max = arrayPaths.length;

    for(var i=0;i<max;i++){
      if(arrayPaths[i]!=''){

          Graphics.addPhotoToModal(arrayPaths[i]);
      }
    }
  },

  addRowToTable : function(data){
    var table = $('#fragancesTable tbody');
    var rowIndex = table.children().length;

    var element = `
    <tr>
      <td>${data.name}</td>
      <td>${data.group}</td>
      <td>${data.brand}</td>
      <td>${data.disccount}</td>
      <td>${data.ammount}</td>
      <td>${data.price}</td>
      <td><a class="btn-floating btn-small waves-effect waves-light blue" onclick = "loadEditModal('${data.name}',${rowIndex})">
            <i class="material-icons">edit</i>
          </a>
          <a class="btn-floating btn-small waves-effect waves-light amber" onclick = "loadPhotoModal('${data.name}')">
                <i class="material-icons">view_carousel</i>
              </a>
          <a class="btn-floating btn-small waves-effect waves-light red" onclick = "deleteRegistry('${data.name}',${rowIndex})"><i class="material-icons">close</i></a>
      </td>
    </tr>
    `;
    table.append(element);
  },
  fillTable : function(arrayData){
      if(!Array.isArray(arrayData)){return;}
      if(arrayData==[]){return;}

      var table = $('#fragancesTable tbody');
      table.empty();

      for(var i=0;i<arrayData.length;i++){
        Graphics.addRowToTable(arrayData[i]);
      }
  },
  loadToTable : function(arrayData){
      if(!Array.isArray(arrayData)){return;}
      if(arrayData==[]){return;}

      for(var i=0;i<arrayData.length;i++){
        Graphics.addRowToTable(arrayData[i]);
      }
  },
  deleteRow : function(index){
      $('#fragancesTable tbody').children().eq(index).remove();
  }
}
