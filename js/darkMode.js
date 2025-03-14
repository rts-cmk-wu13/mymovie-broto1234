function darkMode(dmElm) {

  const rootElm = document.documentElement;
  // console.log(rootElm);
  
  const darkmode = localStorage.getItem("darkmode");
  const browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // console.log(browserDark);
  
  if(browserDark || darkmode == "true") {
    enableDarkMode();
    dmElm.checked = true;  // 
  } else {
    enableLightMode();
  }
  
  function enableDarkMode() {
    // console.log("checked");
    rootElm.setAttribute("data-mode", "dark");
    localStorage.setItem("darkmode", "true")
    
  }
  
  function enableLightMode() {
    rootElm.setAttribute("data-mode", "light")
    // console.log("not checked")
    localStorage.setItem("darkmode", "false");  
  }
  
  function handleChange() {
    if(dmElm.checked) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }  
  
  // Toggle dark mode ----
  dmElm.addEventListener("change", handleChange)
    
  // Save the current mode to LocalStorage----
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
    return "Data was saved with the key " + key
  }

}  
