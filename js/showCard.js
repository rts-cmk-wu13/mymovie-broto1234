
function showCard(itms, seeBtn, itmsLength, maxItms) {
  
  let visibleItems = maxItms;

  function showItems() {
      itms.slice(0, visibleItems).forEach(element => {
        element.style.display = 'block';
        // console.log(element);          
      });

      if (visibleItems >= itmsLength) {
        seeBtn.style.display = 'none';
      }        
  }
    
  showItems();

  seeBtn.addEventListener('click', () => {
      visibleItems += maxItms;
      showItems();
  })

}