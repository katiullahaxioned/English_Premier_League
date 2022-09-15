// *** prevent current active page to go to previous page : start *** //
function preventBack() {
  window.history.forward();
}

window.addEventListener("load", function () {
  preventBack();
});
// *** prevent current active page to go to previous page : end *** //

// *** logout function declaration start *** //
var logOut = document.querySelector(".logout-button a");

function logOutPage(e) {
  e.preventDefault();
  location.href = "English_Premier_League/../login.html";
  localStorage.removeItem("isLoggedIn");
}
// *** logout function declaration end *** //

// *** active nav link : start *** //
var navAnchors = document.querySelectorAll('.nav-menu a');
var currentLocation = location.href;

function activeAnchor() {
  navAnchors.forEach(function(anchor){
    var anchorHref = anchor.href;

    if(anchorHref == currentLocation) {
      anchor.classList.add('active');
    } else {
      anchor.classList.remove('active');
    }
  })
}
// *** active nav link : end *** //

// *** menu toggle hamburger : start *** //
var menuToggle = document.querySelector('.menu-toggle');
var nav = document.querySelector('nav');
var html = document.querySelector('html');

function navMenuToggle() {
  var bars = menuToggle.querySelectorAll(".bar");

  for (var i = 0; i < bars.length; i++) {
    bars[i].classList.toggle("active");
  }

  nav.classList.toggle("active");
  html.classList.toggle("overflow-hidden");
}
// *** menu toggle hamburger : end *** //

// *** API fetch : start *** //
var apiLinkClub = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json';
var apiLinkMatch = 'https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json';

// showMoreList()
function showMoreList(startNum, endNum, listItem, showMoreButton) {
  for (var i = startNum; i < endNum; i++) {
    if (endNum == listItem.length) {
      showMoreButton.classList.remove("active");
    }
    listItem[i].style.display = "";
  }
}

// showClubList()
function showClubList(selectedValue, clubSummaryList, showMoreButton, apiLinkMatch) {
  fetch(apiLinkMatch)
    .then(function (response) {
      return response.json();
    })
    .then(function (match) {
      var clubMatchAll = match.matches;
      var clubMatchLength = clubMatchAll.length;

      for (var j = 0; j < clubMatchLength; j++) {
        if (selectedValue == (clubMatchAll[j].team1 || clubMatchAll[j].team2)) {
          clubSummaryList.innerHTML +=
            '<li><span class="match-date">' +
            clubMatchAll[j].date +
            '</span><div class="team-summary"><div class="team-one-summary"><h4 class="team-one">' +
            clubMatchAll[j].team1 +
            '</h4><span class="team-one-score">' +
            clubMatchAll[j].score.ft[0] +
            '</span></div><div class="team-two-summary"><span class="team-two-score">' +
            clubMatchAll[j].score.ft[1] +
            '</span><h4 class="team-two">' +
            clubMatchAll[j].team2 +
            "</h4></div></div></li>";
        }
      }

      var initialNum = 0;
      var tillNum = 5;
      var listItem = clubSummaryList.children;

      if (clubSummaryList.innerHTML != "") {
        showMoreButton.classList.add("active");
      } else {
        showMoreButton.classList.remove("active");
      }

      if (listItem.length != 0) {
        for (var li of listItem) {
          li.style.display = "none";
        }

        showMoreList(initialNum, tillNum, listItem, showMoreButton);

        showMoreButton.addEventListener("click", function (e) {
          e.preventDefault();
          initialNum = tillNum;
          tillNum += 5;
          if (tillNum >= listItem.length) tillNum = listItem.length;
          showMoreList(initialNum, tillNum, listItem, showMoreButton);
        });
      } else {
        clubSummaryList.innerHTML =
          '<span style="text-align: center">no data found</span>';
        showMoreButton.classList.remove("active");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// getClub()
function getClub(selectClubList) {
  fetch(apiLinkMatch)
    .then(function (response) {
      return response.json();
    })
    .then(function (match) {
      var matchAll = match.matches;
      var clubNamesArr = [];

      matchAll.forEach(function (match) {
        if (!clubNamesArr.includes(match.team1)) {
          clubNamesArr.push(match.team1);
        }
        if (!clubNamesArr.includes(match.team2)) {
          clubNamesArr.push(match.team2);
        }
      });

      clubNamesArr.forEach(function (clubname) {
        selectClubList.innerHTML +=
        '<option value="' + clubname + '">' + clubname + "</option>";
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// getMatchday()
function getMatchday(selectMatchDay, clubSummaryList) {
  fetch(apiLinkMatch)
    .then(function (response) {
      return response.json();
    })
    .then(function (match) {
      var matchAll = match.matches;
      var matchDayArr = [];

      matchAll.forEach(function (match) {
        if (!matchDayArr.includes(match.round)) {
          matchDayArr.push(match.round);
        }
      });

      matchDayArr.forEach(function (matchday) {
        selectMatchDay.innerHTML +=
          '<option value="' + matchday + '">' + matchday + "</option>";
      });

      selectMatchDay.addEventListener("change", function () {
        var selectedValue = this.value;

        clubSummaryList.innerHTML = "";

        if (this.value != "") {
          var clubMatchAll = match.matches;
          var clubMatchLength = clubMatchAll.length;

          for (var j = 0; j < clubMatchLength; j++) {
            if (selectedValue == clubMatchAll[j].round) {
              clubSummaryList.innerHTML +=
                '<li><span class="match-date">' +
                clubMatchAll[j].date +
                '</span><div class="team-summary"><div class="team-one-summary"><h4 class="team-one">' +
                clubMatchAll[j].team1 +
                '</h4><span class="team-one-score">' +
                clubMatchAll[j].score.ft[0] +
                '</span></div><div class="team-two-summary"><span class="team-two-score">' +
                clubMatchAll[j].score.ft[1] +
                '</span><h4 class="team-two">' +
                clubMatchAll[j].team2 +
                "</h4></div></div></li>";
            }
          }

          var listItem = clubSummaryList.children;

          if (listItem.length != 0) {
            for (var a = 0; a < listItem.length; a++) {
              var teams = listItem[a].querySelectorAll("h4");
              teams.forEach(function (team) {
                team.addEventListener("click", function () {
                  localStorage.setItem("teamName", team.innerText);
                  location.href = "English_Premier_League/../clublist.html";
                });
              });
            }
          } else {
            clubSummaryList.innerHTML =
              '<span style="text-align: center">no data found</span>';
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
// *** API fetch : end *** //

// *********************** matchdetailsPageJS() start ************************** //
function matchdetailsPageJS() {
  if (!localStorage.getItem("isLoggedIn")) {
    location.href = "English_Premier_League/../login.html";
  }

  var selectMatchDay = document.getElementById("selectMatchDay");
  var clubSummaryList = document.querySelector(".club-summary-list");

  activeAnchor();
  
  clubSummaryList.innerHTML = "";

  getMatchday(selectMatchDay, clubSummaryList);

  menuToggle.addEventListener('click', function(){
    navMenuToggle();
  })

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

  var selectClubList = document.getElementById("selectClubList");
  var showMoreButton = document.querySelector(".show-more-button");
  var clubSummaryList = document.querySelector(".club-summary-list");

  activeAnchor();

  clubSummaryList.innerHTML = "";
  showMoreButton.classList.remove("active");

  getClub(selectClubList);

  // *** get localStorage value of teamName : start *** //
  setTimeout(function(){
    var getTeamName = localStorage.getItem("teamName");
    localStorage.removeItem("teamName");
    
    if (getTeamName) {
      clubSummaryList.innerHTML = "";
      selectClubList.value = getTeamName;
      
      if (selectClubList.value != "") {
        showClubList(selectClubList.value, clubSummaryList, showMoreButton, apiLinkMatch);
      } else {
        console.log("err");
      }
    }
  }, 1500)
  // *** get localStorage value of teamName : end *** //

  selectClubList.addEventListener("change", function () {
    var selectedValue = this.value;

    clubSummaryList.innerHTML = "";
    showMoreButton.classList.remove("active");

    if (this.value != "") {
      showClubList(selectedValue, clubSummaryList, showMoreButton, apiLinkMatch);
    }
  });

  menuToggle.addEventListener('click', function(){
    navMenuToggle();
  })

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

  activeAnchor();

  menuToggle.addEventListener('click', function(){
    navMenuToggle();
  })

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
      localStorage.removeItem('user');
    }
  });
  // ------------ Login code end ------------- //

  // ------------ Login / SignUp toggle code start ------------- //
  spanSignup.addEventListener("click", function () {
    loginCard.classList.add("active");
    signupCard.classList.add("active");
    loginEmail.value = "";
    loginPassword.value = "";
    loginEmail.nextElementSibling.classList.remove("active");
    loginPassword.nextElementSibling.classList.remove("active");
  });

  spanLogin.addEventListener("click", function () {
    loginCard.classList.remove("active");
    signupCard.classList.remove("active");
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    signupName.nextElementSibling.classList.remove("active");
    signupEmail.nextElementSibling.classList.remove("active");
    signupPassword.nextElementSibling.classList.remove("active");
  });
  // ------------ Login / SignUp toggle code end ------------- //
}
// *********************** loginPageJS() end ************************** //

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