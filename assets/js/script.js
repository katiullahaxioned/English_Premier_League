// *** prevent current active page to go to previous page : start *** //
function preventBack() {
  window.history.forward();
}

preventBack();
// *** prevent current active page to go to previous page : end *** //

// *** logout function declaration start *** //
var logOut = document.querySelector(".logout-button a");

function logOutPage(e) {
  e.preventDefault();
  location.href = "English_Premier_League/../login.html";
  localStorage.removeItem("isLoggedIn");
}
// *** logout function declaration end *** //

// condition to run JS code for active page only : start //
if (document.body.classList.contains("loginBody")) {
  loginPageJS();
} else if (document.body.classList.contains("indexBody")) {
  indexPageJS();
} else if (document.body.classList.contains("clublistBody")) {
  clublistPageJS();
} else if (document.body.classList.contains("matchdetailsBody")) {
  matchdetailsPageJS();
}
// condition to run JS code for active page only : end //

// *********************** matchdetailsPageJS() start ************************** //
function matchdetailsPageJS() {
  if (!localStorage.getItem("isLoggedIn")) {
    location.href = "English_Premier_League/../login.html";
  }

  logOut.addEventListener("click", function (e) {
    logOutPage(e);
  });
}
// *********************** matchdetailsPageJS() end ************************** //

// *********************** clublistPageJS() start ************************** //
function clublistPageJS() {
  if (!localStorage.getItem("isLoggedIn")) {
    location.href = "English_Premier_League/../login.html";
  }

  logOut.addEventListener("click", function (e) {
    logOutPage(e);
  });
}
// *********************** clublistPageJS() end ************************** //

// *********************** indexPageJS() start ************************** //
function indexPageJS() {
  if (!localStorage.getItem("isLoggedIn")) {
    location.href = "English_Premier_League/../login.html";
  }

  logOut.addEventListener("click", function (e) {
    logOutPage(e);
  });
}
// *********************** indexPageJS() end ************************** //

// *********************** loginPageJS() start ************************** //
function loginPageJS() {
  if (localStorage.getItem("isLoggedIn")) {
    location.href = "English_Premier_League/../index.html";
  }

  // ------------ SignUp code start ------------- //
  var formSignup = document.formSignup;
  var signupName = formSignup.yourName;
  var signupEmail = formSignup.signupEmail;
  var signupPassword = formSignup.signupPassword;

  var loginCard = document.querySelector(".login-card");
  var signupCard = document.querySelector(".signup-card");
  var spanSignup = document.querySelector(".span-signup");
  var spanLogin = document.querySelector(".span-login");

  // RegEx Pattern
  var nameRegEx = /^([a-zA-Z]{3,})$/;
  var emailRegEx = /^([a-z][a-z0-9\.\-\_]+[a-z0-9])\@([a-z]+)\.([a-z]{2,5})$/;
  var upperRegEx = /(?=.*[A-Z])/;
  var lowerRegEx = /(?=.*[a-z])/;
  var numericRegEx = /(?=.*[0-9])/;
  var specialCharRegEx =
    /(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\.\>\<\,\/\\\]\[\}\{\|])/;

  // checkPattern()
  function checkPattern(inputField, inputValue, RegExPattern) {
    if (RegExPattern.test(inputValue)) {
      inputField.nextElementSibling.classList.remove("active");
    } else {
      inputField.nextElementSibling.classList.add("active");
      inputField.value = "";
      return false;
    }
    return true;
  }

  // checkPassword()
  function checkPassword(inputField, inputValue, upperPattern, lowerPattern, numericPattern, sCharPattern) {
    if (upperPattern.test(inputValue) && lowerPattern.test(inputValue) && numericPattern.test(inputValue) && sCharPattern.test(inputValue) && inputValue.length >= 5 && inputValue.length <= 10) {
      inputField.nextElementSibling.classList.remove("active");
    } else {
      inputField.nextElementSibling.classList.add("active");
      inputField.value = "";
      return false;
    }
    return true;
  }

  // event on form SignUp
  formSignup.addEventListener("submit", function (e) {
    e.preventDefault();

    var signupNameValue = signupName.value;
    var signupEmailValue = signupEmail.value;
    var signupPasswordValue = signupPassword.value;

    var signupNameCheck = checkPattern(signupName, signupNameValue, nameRegEx);
    var signupEmailCheck = checkPattern(signupEmail, signupEmailValue, emailRegEx);
    var signupPasswordCheck = checkPassword(signupPassword, signupPasswordValue, upperRegEx, lowerRegEx, numericRegEx, specialCharRegEx);

    if (signupNameCheck && signupEmailCheck && signupPasswordCheck) {
      var userDetails = {
        username: signupNameValue,
        email: signupEmailValue,
        pass: signupPasswordValue,
      };

      localStorage.setItem("user", JSON.stringify(userDetails));

      alert("Registration Successful!");

      loginCard.classList.remove("active");
      signupCard.classList.remove("active");

      signupName.value = "";
      signupEmail.value = "";
      signupPassword.value = "";
    }
  });
  // ------------ SignUp code end ------------- //

  // ------------ Login code start ------------- //
  var formLogin = document.formLogin;
  var loginEmail = formLogin.loginEmail;
  var loginPassword = formLogin.loginPassword;

  // matchInputValue()
  function matchInputValue(emailInput, passInput, emailValue, passValue, userObj) {
    if (emailValue == userObj.email) {
      emailInput.nextElementSibling.classList.remove("active");
      if (passValue == userObj.pass) {
        passInput.nextElementSibling.classList.remove("active");
      } else {
        passInput.nextElementSibling.classList.add("active");
        passInput.value = "";
        return false;
      }
    } else {
      emailInput.nextElementSibling.classList.add("active");
      emailInput.value = "";
      return false;
    }
    return true;
  }

  // event on form Login
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    var loginEmailValue = loginEmail.value;
    var loginPasswordValue = loginPassword.value;

    var userObj = JSON.parse(localStorage.getItem("user"));
    if (userObj == null) {
      alert("It seems you are new user, please signup first");
    } else {
      var isLoginMatched = matchInputValue(loginEmail, loginPassword, loginEmailValue, loginPasswordValue, userObj);
    }

    if (isLoginMatched) {
      localStorage.setItem("isLoggedIn", true);
      loginEmail.value = "";
      loginPassword.value = "";
      location.href = "English_Premier_League/../index.html";
      // localStorage.removeItem('user');
    }
  });
  // ------------ Login code end ------------- //

  // ------------ Login / SignUp toggle code start ------------- //
  spanSignup.addEventListener("click", function () {
    loginCard.classList.add("active");
    signupCard.classList.add("active");
    loginEmail.value = "";
    loginPassword.value = "";
  });

  spanLogin.addEventListener("click", function () {
    loginCard.classList.remove("active");
    signupCard.classList.remove("active");
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
  });
  // ------------ Login / SignUp toggle code end ------------- //
}
// *********************** loginPageJS() end ************************** //