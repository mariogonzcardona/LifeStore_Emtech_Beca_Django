// Process to login
document.getElementById("btnLogin").addEventListener("click", login);
async function login(){
    const username=document.getElementById('inputUsername');
    const password = document.getElementById('inputPass');
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      $.ajax({
        url: '/login/',
        type: 'POST',
        data:  
          {
            csrfmiddlewaretoken:csrftoken, 
            username: username.value, 
            password: password.value
          },
        success: function( response){
            if(response.isLogged===true){
                Swal.fire({
                    title:'Bienvenido!',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){ 
                    window.location.href="/"
                   }, 1500);
            }
            else{
                Swal.fire({
                    title:'¡Usuario y/o contraseña incorrectos!',
                    icon:'error',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(function(){ 
                    window.location.href="/login/"
                   }, 1500);
            }
        },
        error: function( data ){
          console.log(data);
        }
    });
    
    
}
