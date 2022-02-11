// CRUD de Workspaces
async function addWorkspace(){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const owner=document.getElementsByName('wUsername')[0].value;
    const email=document.getElementsByName('wEmail')[0].value;
    const servername=document.getElementsByName('wServername')[0].value;
    const port=document.getElementsByName('wPort')[0].value;
    const user=document.getElementsByName('wUserDB')[0].value;
    const pass=document.getElementsByName('wPassword')[0].value;
    const formatDB=document.getElementsByName('wDBFormat')[0].value;
    const canBeModified=document.getElementsByName('wcanBeModified')[0].value;
    const workspaceName=document.getElementsByName('wName')[0].value;

    if( servername.length==0 || port.length==0 || user.length==0 || pass.length==0 || workspaceName.length==0 || formatDB==="Tipo de base de datos"){ 
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Compeltar todos los datos',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
    $.ajax({
        url: '/addWorkspace/',
        type: 'POST',
        data:  
          {
            createWorkspace:true, 
            csrfmiddlewaretoken:csrftoken, 
            owner:owner,
            email:email,
            servername:servername,
            port:port,
            user:user,
            pass:pass,
            formatDB:formatDB,
            canBeModified:canBeModified,
            workspaceName:workspaceName
          },
        success: function( response){
            if(response.status=="ok"){
                Swal.fire({
                    title:`Workspace agregado`,
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){ 
                    window.location.href="/workspace/"
                   }, 1500);
            }
            else{
                Swal.fire({
                    title:'¡Lo sentimos el Nombre de Workspace, ya existe!',
                    icon:'error',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){ }, 2000);
            }
            
        },
        error: function( data ){
          console.log(data);
        }
    });
  }

}
async function editWorkspace(id){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const owner=document.getElementsByName('wUsername')[0].value;
    const email=document.getElementsByName('wEmail')[0].value;
    const servername=document.getElementsByName('wServername')[0].value;
    const port=document.getElementsByName('wPort')[0].value;
    const user=document.getElementsByName('wUserDB')[0].value;
    const pass=document.getElementsByName('wPassword')[0].value;
    const formatDB=document.getElementsByName('wDBFormat')[0].value;
    const canBeModified=document.getElementsByName('wcanBeModified')[0].value;
    const workspaceName=document.getElementsByName('wName')[0].value;
    if( servername.length==0 || port.length==0 || user.length==0 || pass.length==0 || workspaceName.length==0 || formatDB==="Tipo de base de datos"){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Compeltar todos los datos',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
    $.ajax({
        url: '/editWorkspace/'+id,
        type: 'POST',
        data:
          {
            editWorkspace:true,
            csrfmiddlewaretoken:csrftoken,
            owner:owner,
            email:email,
            servername:servername,
            port:port,
            user:user,
            pass:pass,
            formatDB:formatDB,
            canBeModified:canBeModified,
            workspaceName:workspaceName
          },
        success: function( response){
            if(response.status=="ok"){
                Swal.fire({
                    title:`Workspace editado`,
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){
                    window.location.href="/workspace/"
                  }, 1500);
            }
          },
          error: function( data ){
            console.log(data);
          }
    });
}
}
async function deleteWorkspace(id){
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  Swal.fire({
    title: 'Esta seguro?',
    text: "Esta accion eliminara bases de datos reales!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, borrar!',
  })
  .then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/deleteWorkspace/'+id,
        type: 'POST',
        data:  
          {
            csrfmiddlewaretoken:csrftoken,
          },
        success: function( response){
          console.log(response);
            if(response.status=="ok"){
                Swal.fire({
                    title:`Workspace eliminado con ${response.dbCount} bases de datos.`,
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){ 
                    window.location.href="/workspace/"
                   }, 1500);
            }
            else{
                Swal.fire({
                    title:'¡Lo sentimos no se pudo eliminar este workspace!',
                    icon:'error',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        },
        error: function( data ){
          console.log(data);
        }
      });
    }
  })  
}

// CRUDS de DATABASE
async function addDataBase(id){
  const { value: formValues } = await Swal.fire({
    title: 'Crear Base de Datos',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nombre de la Base de Datos">',
      "showCancelButton":true,
      "confirmButtonText":"Si, Crear",
      "cancelButtonText":"No, Cancelar",
      "confirmButtonColor":"#28a745",
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
      ]
    }
  })
  if (formValues) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $.ajax({
      url: '/addDataBase/'+id,
      type: 'POST',
      data:  
        {
          csrfmiddlewaretoken:csrftoken, 
          dbName:formValues[0]
        },
      success: function( response){
        console.log(response);
          if(response.status=="ok"){
            Swal.fire({
                title:`Base de Datos creada`,
                icon:'success',
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(function(){ 
                window.location.href="/getAllDBs/"+id
               }, 1500);
          }
          else{
            Swal.fire({
                title:`Error: ${response.message}`,
                icon:'error',
                showConfirmButton: false,
                timer: 1500
              })
          }
      },
      error: function( data ){
        console.log(data);
      }
  });
  }
}
async function getAllDBs(id){
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  $.ajax({
    url: "/verifyWSConection/"+id,
    type: 'POST',
    data:
      {
        csrfmiddlewaretoken:csrftoken,
      },
    success: function (response) {
     if (response.isWorking===false) {
        Swal.fire({
            title:`Verificar conexión de workspace`,
            icon:'error',
            showConfirmButton: false,
            timer: 1500
          })
      }
      else{
         window.location.href="/getAllDBs/"+id
      }
    },
    error: function (error) {
      console.log(error);
    }
  });

}
async function editDataBase(wId,dbId,oldDBName){
  const { value: formValues } = await Swal.fire({
    title: `Actualizar Nombre de Base de Datos: ${oldDBName}`,
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nuevo Nombre">',
      "showCancelButton":true,
      "confirmButtonText":"Si, Actualizar",
      "cancelButtonText":"No, Cancelar",
      "confirmButtonColor":"#28a745",
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
      ]
    }
  })
  if (formValues) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    $.ajax({
      url: '/editDataBase/'+wId+'/'+dbId,
      type: 'POST',
      data:  
        {
          csrfmiddlewaretoken:csrftoken, 
          oldDBName:oldDBName,
          newDBName:formValues[0]
        },
      success: function( response){
        console.log(response);
          if(response.status=="ok"){
            Swal.fire({
                title:`${response.message}`,
                icon:'success',
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(function(){ 
                window.location.href="/getAllDBs/"+wId
               }, 1500);
          }
          else{
            Swal.fire({
                title:`Error: ${response.message}`,
                icon:'error',
                showConfirmButton: false,
                timer: 1500
              })
          }
      },
      error: function( data ){
        console.log(data);
      }
  });
  }
}
async function deleteDataBase(wId,dbName){
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  Swal.fire({
    title: 'Esta seguro?',
    text: "Esta accion eliminara una base de datos real!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, borrar!',
  })
  .then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/deleteDataBase/'+wId,
        type: 'POST',
        data:  
          {
            csrfmiddlewaretoken:csrftoken,
            dbName:dbName
          },
        success: function( response){
          console.log(response);
            if(response.status=="ok"){
                Swal.fire({
                    title:`${response.message}`,
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){ 
                    window.location.href="/getAllDBs/"+wId
                   }, 1500);
            }
            else{
                Swal.fire({
                    title:`${response.message}`,
                    icon:'error',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        },
        error: function( data ){
          console.log(data);
        }
      });
    }
  })
}

// CRUD CATALOGS
async function getAllDBsByWs(){
  var wId = document.getElementById("selectWorkspaceById").value;
  var tInstances = document.getElementById('databases');
  tInstances.innerHTML = "";
  $.ajax({
    type: "GET",
    url: "/getAllInstances/" + wId,
    success: function (response) {
      const wData = response.databases;
      const option = document.createElement('OPTION')
      // <!-- <option disabled selected>Base de datos</option> -->
      option.value = "item";
      option.text = "Base de datos";
      option.setAttribute('selected', 'selected');
      option.setAttribute('disabled', "disabled");
      tInstances.appendChild(option);
      if (wData.length > 0) {
        wData.map(item => {
          const option = document.createElement('OPTION')
          option.value = item;
          option.text = item;
          tInstances.appendChild(option);
        })
      } else {
        const option = document.createElement('OPTION')
        option.value = "item";
        option.text = "Sin Datos";
        tInstances.appendChild(option);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });

}
async function getAllCatalogsByWs(){
  document.getElementById("AddCatalog").style.visibility = "visible";
  table.clear().draw();
  var wId = document.getElementById("selectWorkspaceById").value;
  var dbName = document.getElementById('databases').value;
  $.ajax({
    url: "/getAllCatalogs/"+wId+"/"+dbName+"/",
    type: "GET",
    dataType:"json",
    success: function (response) {
      const rData = response.catalogs;
     //console.log(response.data);
     if (rData.length > 0) {
      
      rData.map(item => {
          table.row.add( [
              item['name'],
              item['owner'],
              item['created'],
              item['updated'],
              '<td class="td-actions dbAdmin"><a onclick="updateCatalog()" title="Actualizar Catalogo" href="#" class="btn btn-primary btn-link btn-sm"><i class="material-icons">edit</i></a><a onclick="deleteCatalog()" title="Eliminar Catalogo" href="#" class="btn btn-danger btn-link btn-sm"><i class="material-icons">close</i></a></td>',
      ] ).draw( false );
      })
    }
    },
    error: function (error) {
      console.log(error);
    }
  });

}
async function addCatalog() {
  var wId = document.getElementById("selectWorkspaceById").value;
  var dbName = document.getElementById('databases').value;
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  $.ajax({
    url: '/addCatalog/'+wId+"/"+dbName+"/",
    type: 'POST',
    data:  
      {
        csrfmiddlewaretoken:csrftoken, 
        wId:wId,
        dbName:dbName
      },
    success: function( response){
      console.log(response);
      window.location.href='/addCatalog/'+wId+"/"+dbName+"/"
    },
    error: function( data ){
      console.log(data);
    }
});
  
}
async function updateCatalog() {
  console.log("updateCatalog");
}
async function deleteCatalog() {
  console.log("deleteCatalog");
}
var counter = 1;
async function addColRow() {
  
    var t = $('#example').DataTable();
    // console.log(setFormatCell());
    t.row.add( [
        `<input type="text" id="colName_${counter}" placeholder="Nombre Columna">`,
        `<select onChange="setFormatCell(${counter})" size="1" id="dataType_${counter}"><option disabled selected>Tipo de Dato</option><option value="Int">Int</option><option value="String">String</option><option value="Boolean">Boolean</option><option value="Float">Float</option><option value="Date">Date</option><option value="DateTime">DateTime</option><option value="Time">Time</option></select>`,
        "Algo",
        `<select size="1" id="versionate_${counter}"><option disabled selected>Tipo de Versionado</option><option value="SCD1">SCD1</option><option value="SCD2">SCD2</option></select>`,
        `<select size="1" id="nullable_${counter}"><option disabled selected>Valor Nulo</option><option value="True">True</option><option value="False">False</option></select>`,
    ] ).draw( false );

    counter++;
}
async function deleteColRow() {
  console.log("deleteColRow");
}
async function createCat() {
  console.log("createCat");
}
async function selectCatOption() {
  var catOption = document.getElementById("catOption").value;
  console.log(catOption);
}
async function addFile() {
  const { value: file } = await Swal.fire({
    title: 'Select image',
    input: 'file',
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Upload your profile picture'
    }
  })
  
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      Swal.fire({
        title: 'Your uploaded picture',
        imageUrl: e.target.result,
        imageAlt: 'The uploaded picture'
      })
    }
    reader.readAsDataURL(file)
  }
}
async function setFormatCell(counter=0){
  var dataType = document.getElementById("dataType_"+counter).value;
  console.log(dataType);
  // result=`'<input type="text" id="colRange_${counter}" placeholder="${dataType}">`
  // return dataType;
}