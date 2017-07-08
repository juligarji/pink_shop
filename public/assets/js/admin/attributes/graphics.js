

var Graphics = {
  createNewRow : function(containerId,data){

      /*var element2 = `
      <li value = '${data._id}'>
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>${data.name}

        </div>
        <div class="collapsible-body">
          <div class = "row">
          <a class="waves-effect waves-light btn" onclick = "deleteComponent(event,'${data._id}')"><i class="material-icons left">close</i></a>

        <div class = "container col l12">
          <div class = "col l12">
            <form value = "${data._id}" onsubmit="createAttributeToComp(event,'${data._id}');" method="post">
              <div class="input-field col l7 s6">
                <input name = "value" placeholder="Valor" type="text" class="validate">
              </div>
              <div class="input-field col l3">
                <input name = "discount" placeholder="Desc" type="number" class="validate">
              </div>
              <div class = "input-field col l2">
                  <button type="submit" class = "waves-effect waves-light btn green"><i class="material-icons left">add</i></button>
              </div>
            </form>
          </div>
        </div>

          </div>

        </div>
      </li>`;*/


      var element = `<li value = "${data._id}">
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>${data.name}

        </div>
        <div class="collapsible-body">

          <!--  <a class="waves-effect waves-light btn" onclick = "deleteComponent(event,'${data._id}')"><i class="material-icons left">close</i></a> -->

            <div class = "row">
              <div class = "container col l12">
                <a class="waves-effect waves-light btn red" onclick = "deleteComponent(event,'${data._id}')"><i class="material-icons left">close</i></a>
              </div>
              <div class="container attributeContainer " value="${data._id}">

              </div>

              <div class = "container col l12">
                <div class = "col l12">
                  <form value = "${data._id}" onsubmit="createAttributeToComp(event,'${data._id}');" method="post">
                    <div class="input-field col l7 s6">
                      <input name = "value" placeholder="Valor" type="text" class="validate">
                    </div>
                    <div class="input-field col l3">
                      <input name = "discount" placeholder="Desc" type="number" class="validate">
                    </div>
                    <div class = "input-field col l2">
                        <button type="submit" class = "waves-effect waves-light btn green"><i class="material-icons left">add</i></button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
        </div>
      </li>`;

      var newComponent = $(element);
      console.log('cargar aqui');
      $(`ul[value="${containerId}"]`).append(newComponent);
  },
  deleteRow : function(id){
    $(`li[value='${id}']`).remove();
    //IssuesGraphic.locateRow('categoriesContainer',id).remove();
  },
  createNewAttributeCont : function(containerId,data){
    var element = `
      <div value = "${data._id}" class = "col l5 z-depth-2 offset-l1">
        <span>  ${data.value}</span> <a onclick = "deleteAttributeToComp(event,'${containerId}','${data._id}')" class="btn-floating btn-small waves-effect waves-light right"><i class="material-icons">close</i></a>
      </div>
    `;
    console.log(containerId);

    var newComponent = $(element);
    $(`div[value='${containerId}']`).append(newComponent);
  },
  deleteAttributeCont : function(id){
    $(`div[value='${id}']`).remove();
    //IssuesGraphic.locateRow('categoriesContainer',id).remove();
  },

}
