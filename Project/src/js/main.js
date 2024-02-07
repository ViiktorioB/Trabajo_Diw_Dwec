import "../bootstrap-5.3.2/scss/bootstrap.scss";
import "../bootstrap-5.3.2/scss/bootstrap-grid.scss";
import "../bootstrap-5.3.2/scss/bootstrap-utilities.scss";
import "../bootstrap-5.3.2/scss/bootstrap-reboot.scss";
import '../js/profile.js'

  // Definición de variables
  const noAccount = document.getElementById("nocuenta");
  const closeModal = document.getElementById("closeModal");
  const registroBoton = document.getElementById("registroBoton");
  const goLogin = document.getElementById("goLogin");
  const loginBoton = document.getElementById("loginBoton");
  const closeRegister = document.getElementById("closeRegister");
  const userinfo = document.getElementById("userinfo");

  if (noAccount) {
    noAccount.addEventListener("click", () => {
      closeModal.click();
      registroBoton.click();
    });
  }

  if (goLogin) {
    goLogin.addEventListener("click", () => {
      closeRegister.click();
      loginBoton.click();
    });
  }

  // Sistema de registro
  function saveDataRegister() {
    let name = document.getElementById("nombre");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let level = document.getElementById("level");
    let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push({
      name: name.value,
      email: email.value,
      password: password.value,
      level: level.value,
    });

    localStorage.setItem("users", JSON.stringify(existingUsers));

    if (closeRegister) {
      closeRegister.click();
    }
  }

  // Sistema login.
  function saveDataLogin() {
    let emailLogin = document.getElementById("emailLogin").value;
    let emailPassword = document.getElementById("emailPassword").value;
    let existingUsers = JSON.parse(localStorage.getItem("users"));
    existingUsers.forEach((user) => {
      if (user.email == emailLogin && user.password == emailPassword) {
        let userLog = JSON.parse(localStorage.getItem("userLog")) || [];
        userLog.push({
          name: user.name,
          email: user.email,
          password: user.password,
          level: user.level
        });
        localStorage.setItem("userLog", JSON.stringify(userLog));
        userinfo.innerHTML = user.name;
        displayButtons();
      } else {
        alert("Not found");
      }
    });
  }

  // Listeners
  let saveData = document.getElementById("saveData");
  if (saveData) {
    saveData.addEventListener("click", saveDataLogin);
  }
  let saveDataRegisterbutton = document.getElementById("saveDataRegister");
  if (saveDataRegisterbutton) {
    saveDataRegisterbutton.addEventListener("click", saveDataRegister);
  }
  let cerrarsesion = document.getElementById("cerrarsesion");
  if (cerrarsesion) {
    cerrarsesion.addEventListener("click", () => {
      localStorage.removeItem("userLog");
      window.location.reload();
    });
  }

  function displayButtons() {
    if (localStorage.getItem("userLog")) {
      loginBoton.style.display = "none";
      registroBoton.style.display = "none";
      userinfo.style.display = "block";
      const userLog = JSON.parse(localStorage.getItem("userLog"));
      userinfo.innerHTML = userLog[0].name;
    } else {
      loginBoton.style.display = "block";
      registroBoton.style.display = "block";
      userinfo.style.display = "none";
    }
  };

