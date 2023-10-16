document.addEventListener("DOMContentLoaded", function(){
    const getList = document.getElementById("login-nav");

    function putContentOnList (){
        const listElements = `
        <div class="center-login-box">
       
            <button id="longinbuttonlabel" class="login-button" for="visible">Iniciar sesión</button>
        
            <div class="container-popup">
                <label id="close-signIn" class="close-btn" title="close">X</label>
                <div id="title-signIn"class="text text-muted">Iniciar sesión</div>
                <form action="#">
                    <div class="data-login">
                    <label>Email:</label>
                    <input class="input-signIn text-dark" id="useremail" type="text" placeholder="Escriba aqui su email" required>
                </div>
                <div class="data-login">
                    <label>Contraseña:</label>
                    <input class="input-signIn text-dark" id="userpassword" type="password" placeholder="Escriba aqui su contraseña" required>
                </div>
                
                <div class="forgot-pass">
                    <a href="#">Olvidé mi contraseña</a>
                </div> 
                <div class="btn-login">
                    <div class="inner-login">
                        <button id="loginbutton" type="submit">Entrar</button>
                    </div>
                </div>
                <div class="signup-link-login">
                    ¿Aún no tienes cuenta? <a href="login.html" target="_blank"><br>Crea tu cuenta</a>
                </div>
            </form>
        </div>
    </div>
        `

        getList.innerHTML = listElements;
    };

    putContentOnList();
})

