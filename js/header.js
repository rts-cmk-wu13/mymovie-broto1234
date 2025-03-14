const headerElm = document.querySelector(".header");
// console.log(headerElm);
headerElm.classList.add('disply--flex');

headerElm.innerHTML = `
  <a href="home.html">
  <img class="header__img" src="/images/logo.svg" alt="logo Image">
  </a>
  <h1 class="header__heading heading--style">MyMovies</h1>
  <div class="switchBtn">
    <input type="checkbox" id="checkBox">
    <label for="checkBox" class="checkBtn"></label>
  </div>

`;

//--- For Dark Mode ----------

const switchElm = document.querySelector("#checkBox");
darkMode(switchElm);