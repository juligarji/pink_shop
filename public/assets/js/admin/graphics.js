var PUBLIC_ADDRESS = 'assets/img/products/';

var Graphics = {

  addPhotoToModal : function(path,deleteFunction){
    //console.log(typeof(deleteFunction('hola.jpg',0)));

    var container = $('#photoModal ul.slides');
    var rowIndex = $('#photoModal ul.slides img').length;

    var addr = PUBLIC_ADDRESS + path;
    var element =
    `<li>
      <img src="${addr}">
      <div class="caption center-align">
        <h3>${rowIndex + 1}</h3>
      </div>
    </li>`;

    var table = $('#photoModal table tbody');

    var listElement = `
    <tr>
      <td class = "col l1 m1 s1">${rowIndex + 1}</td>
      <td>
          <p>${path}</p>
      </td>
      <td>
        <a class="btn-floating btn-small waves-effect waves-light red deleteButton">
              <i class="material-icons">close</i>
        </a>
      </td>
    </tr>
    `;

    container.append(element);
    table.prepend(listElement);

    table.children().eq(0).find('a.deleteButton').on('click',function(){
          deleteFunction(path);
    });

    $('.slider').slider();
  },

  fillPhotoModal : function(arrayPaths,uploadFunction,deleteFunction){//actualizar contenedor


    if(!Array.isArray(arrayPaths)){return;}
    if(arrayPaths==[]){return;}

    var container = $('#photoModal ul.slides');
    var table = $('#photoModal table tbody');

    container.empty();
    $('.slider').slider('start');
    table.empty();

    $('#photoModalAction').on('click',function(){
        uploadFunction('Determinado luego');
    });

    var max = arrayPaths.length;
    for(var i=0;i<max;i++){
      if(arrayPaths[i]!=''){
          Graphics.addPhotoToModal(arrayPaths[i],deleteFunction);
      }
    }
  },

  addRowToTable : function(data,orderReg){
    var table = $('#fragancesTable tbody');
    var rowIndex = table.children().length;

    var element = `
    <tr value = "${data.name}">
      <td>${data.name}</td>
      <td>${data.group}</td>
      <td>${data.brand}</td>
      <td>${data.discount}</td>
      <td>${data.ammount}</td>
      <td>${data.price}</td>
      <td><a type = "submit" class="btn-floating btn-small waves-effect waves-light blue editAction" onclick = "loadEditModal('${data.name}')">
            <i class="material-icons">edit</i>
          </a>
          <a type = "submit" class="btn-floating btn-small waves-effect waves-light amber carouselAction" onclick = "loadEditModalPhotos('${data.name}')">
                <i class="material-icons">view_carousel</i>
              </a>
          <a type = "submit" class="btn-floating btn-small waves-effect waves-light red deleteAction" onclick = "deleteRegistry('${data.name}')"><i class="material-icons">close</i></a>
      </td>
    </tr>
    `;
    if(orderReg){
        table.append(element);
        return;
    }
        table.prepend(element);
  },

  loadToTable : function(arrayData,newReg){
      if(!Array.isArray(arrayData)){return;}
      if(arrayData==[]){return;}

      if(newReg){$('#fragancesTable tbody').empty();}

      for(var i=0;i<arrayData.length;i++){
        Graphics.addRowToTable(arrayData[i],true);
      }
  },

  createNewRow : function(data){
    //if(Array.isArray(data)){return;}
    if(data==undefined){return;}

    console.log('ejecuto &&&');
      Graphics.addRowToTable(data,false);
  },

  editRow : function(oldName,data){

    //var row = $('#fragancesTable tbody').children().eq(index);
    var row = Graphics.locateRow(oldName);
    row.attr('value',data.name);
    //console.log(Object.keys(row.children()));
    row.children().eq(0).text(data.name);
    row.children().eq(1).text(data.group);
    row.children().eq(2).text(data.brand);
    row.children().eq(3).text(data.discount);
    row.children().eq(4).text(data.ammount);
    row.children().eq(5).text(data.price);
    // sobre escribir las acciones con el nuevo nombre si es el caso
    row.find('a.editAction').attr('onclick',`loadEditModal('${data.name}')`);
    row.find('a.carouselAction').attr('onclick',`loadEditModalPhotos('${data.name}')`);
    row.find('a.deleteAction').attr('onclick',`deleteRegistry('${data.name}')`);
  },

  deleteRow : function(name){
      Graphics.locateRow(name).remove();
  },
  locateRow : function(name){
      var output = $('#fragancesTable tbody').children(`tr[value='${name}']`);
      return output;
  },
  fillEditModal : function(index,data,callback){


    $('#editModal').children('input').val('');

    $(`#editModal input[name='name']`).attr('value',data.name);

    $(`#editModal input[name='name']`).val(data.name);
    $(`#editModal select[name='size']`).find(`option[value='${data.size}']`).attr(`selected`,true);
    $(`#editModal select[name='gender']`).find(`option[value='${data.gender}']`).attr(`selected`,true);
    $(`#editModal select[name='fragance']`).find(`option[value='${data.fragance}']`).attr(`selected`,true);
    $(`#editModal select[name='group']`).find(`option[value='${data.group}']`).attr(`selected`,true);
    $(`#editModal select[name='brand']`).find(`option[value='${data.brand}']`).attr(`selected`,true);
    $(`#editModal input[name='discount']`).val(data.discount);
    $(`#editModal input[name='price']`).val(data.price);
    $(`#editModal input[name='minForDiscount']`).val(data.minForDiscount);
    $(`#editModal input[name='wholesale']`).val(data.wholesale);
    $(`#editModal input[name='description']`).val(data.description);
    $(`#editModal input[name='ammount']`).val(data.ammount);


    $(`#editModalAction`).one('click',function(){

        callback(data.name);
    });
  }
}
