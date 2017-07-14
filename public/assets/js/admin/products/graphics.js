var PUBLIC_ADDRESS = '../assets/img/products/';

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
fillAttributes : function(container,data){
  var element;
  $(container).empty();
  // poner animacion luego
      var options;

      data.components.forEach(function(componentsElement){

          options = `<option value="" disabled selected>Selecciona</option>`;
            componentsElement.attributes.forEach(function(attributesElement){
            options = options + `<option value="${attributesElement._id}">${attributesElement.value}</option>`;
          });


          element = `
          <div value='${componentsElement._id}' class="col l6 valign-wrapper z-depth-1 attributePill">
                <div class="col l6">
                    ${componentsElement.name}
                </div>
                <div class="col l6">
                  <div class="input-field attributeInput">
                    <select class = "browser-default attributeSelector">
                       ${options}
                    </select>
                  </div>
                </div>
            </div>
          `;
          $(container).append(element);
      });
},
/*MODALS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXX */
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
fillEditProduct : function(selector,data){

  console.log(data.kind._id);
  $(selector + " input[name='name']").val(data.name);
  $(selector + " input[name='reference']").val(data.reference);



    $(selector + ` select[name='brand']`).children(`option[value='${data.brand._id}']`).attr(`selected`,true);

  $(selector + ` select[name='tax']`).find(`option[value='${data.tax._id}']`).attr(`selected`,true);
    $(selector + ` select[name='kind']`).find(`option[value='${data.kind._id}']`).attr(`selected`,true);

  $(selector + " input[name='realPrice']").val(data.realPrice);
  $(selector + " input[name='priceWholesale']").val(data.priceWholesale);
  $(selector + " input[name='discountGeneral']").val(data.discountGeneral);
  $(selector + " input[name='discountWholesale']").val(data.discountWholesale);
  $(selector + " input[name='minForWholesale']").val(data.minForWholesale);
  $(selector + " input[name='ammount']").val(data.ammount);
  $(selector + " input[name='price']").val(data.price);
  $(selector + " input[name='description']").val(data.description);
},

fillEditProductAttributes : function(container,data){

  data.attributes.forEach(function(attributesElement){
      console.log(`${attributesElement}`);
      $(container).find(` option[value='${attributesElement}']`).attr(`selected`,true);
  });
},
addRow : function(containerTable,data){
  var element = `
        <tr value = "${data._id}">
        <td>  <p>
            <input class = "eraseCheck" type="checkbox" id="${data._id}" />
            <label for = "${data._id}"></label>
              </p>

        </td>
        <td><span class="nameData">${data.name}</span></td>
        <td><span class="referenceData">${data.reference}</span></td>
        <td><span class="brandData">${data.brand.name}</span></td>
        <td>
          <div class="row">
            <div class="col l12">
              <span>Al Detal:<span class="priceData"> ${data.price}</span> </span>                                    </div>
            <div class="col l12">
                <span>Mayor: <span class="priceWholesaleData">${data.priceWholesale}</span> </span>
            </div>
          </div>
        </td>
        <td>
          <div class="row">
            <div class="col l12">
              <span>Detal: <span class="discountGeneralData">${data.discountGeneral}%</span> </span>
            </div>
            <div class="col l12">
              <span>Mayor: <span class="discountWholesaleData">${data.discountWholesale}%</span> </span>
            </div>
            <div class="col l12">
              <span>Minimo: <span class="minForWholesaleData">${data.minForWholesale}</span> (Und) </span>
            </div>
          </div>
        </td>
        <td><span class = "ammountData">${data.ammount}</span></td>
        <td> <span class="descriptionData">${data.description}</span></td>
        <td><a class="btn-floating btn-small waves-effect waves-light blue" onclick = "loadEditProduct('${data._id}')">
              <i class="material-icons">edit</i>
        </a>

            <a onclick = "deleteProduct('${data._id}')" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">close</i></a>
        </td>
      </tr>
   `;
   $(containerTable).append(element);
},
editRow : function(containerTable,data){

  $(containerTable).find(`tr[value='${data._id}']`).find('span.nameData').text(data.name);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.referenceData').text(data.reference);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.brandData').text(data.brand.name);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.priceData').text(data.price);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.priceWholesaleData').text(data.priceWholesale);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.discountGeneralData').text(data.discountGeneral);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.discountWholesaleData').text(data.discountWholesale);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.minForWholesaleData').text(data.minForWholesale);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.ammountData').text(data.ammount);
  $(containerTable).find(`tr[value='${data._id}']`).find('span.descriptionData').text(data.description);
},
deleteRow : function(container,id){
  $(container).find(`tr[value='${id}']`).remove();
},
fillSearchForm : function(container,data){
  var element;
  $(container).empty();
  // poner animacion luego
      var options;

      data.components.forEach(function(componentsElement){

          options = `<option value="-1" selected>Todos</option>`;
            componentsElement.attributes.forEach(function(attributesElement){
            options = options + `<option value="${attributesElement._id}">${attributesElement.value}</option>`;
          });


          element = `
          <div value='${componentsElement._id}' class="col l4 valign-wrapper z-depth-1 attributeSearch">
                <div class="col l5">
                    ${componentsElement.name}
                </div>
                <div class="col l7">
                  <div class="input-field">
                    <select class = "browser-default attributeInput">
                       ${options}
                    </select>
                  </div>
                </div>
            </div>
          `;
          $(container).append(element);
      });
},
fillTableSearch : function(container,arrayData){

  if(arrayData.length==0){
      alert('busqueda Vacia');
      return
  }
  $(container).empty();

  arrayData.forEach(function(data){
      Graphics.addRow(container,data);
  });

}

}


//$('#fragancesTable tbody').find(`tr[value='5964d8276d40964458d34428']`).find('span.nameData').text('sisas') ;
