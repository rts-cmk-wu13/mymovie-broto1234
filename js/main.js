const mainElm = document.querySelector(".main");
// console.log(mainElm);

//-- Now Showing Section -----------

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTczZGMyOWRjYmY1NDczMzJjY2U0MmRlYjA4MWNhMiIsIm5iZiI6MTc0MDk5MTMzNC40NjU5OTk4LCJzdWIiOiI2N2M1NmI2NjU2NGQyNTc1ZDk5MWZlN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G4h3x3o0L52tDvz02mqtdJmLu0FlIg5opy4t0EX4cMI'
  }
 })
  .then(response => response.json())
  .then ( data => {
    const showingElm = document.createElement('section');
    showingElm.classList.add('showing');
    
    showingElm.innerHTML = `
          <div class="showing__top disply--flex">
            <h2 class="showing__heading heading--style">Now Showing</h2>
            <button id="see-more" class="btn">See more</button>
          </div>
          <ul class="showing__cards grid--three">
            ${data.results.map(item => 
              `            
              <li class="showing__card">
              <div class="showing--img">
              <a href="detail.html?id=${item.id}">
                  <img class="card--img" src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.original_title}">
                  </a>
                </div>
                <h3 class="showingCard__heading"> ${item.original_title}</h3>
                <p class="disply--flex imdb--style"><img class="starClock--img" src="images/Star.png" alt="star"> <span class="showing--imdb">${item.vote_average.toFixed(2)}/10 IMDb</span></p>
                </li>
              `
            ).join('')}
          </ul>
      `;

  mainElm.append(showingElm);


// "See More button" ---------------------

  const showingCards = document.querySelectorAll('.showing__card');
    // Convert NodeList to array
  const allItems = Array.from(showingCards); 
    // console.log(allItems);
  const seeMoreBtn = document.querySelector("#see-more");      
  const itemsLength = data.results.length;
  let maxItems = 3;

  showCard(allItems, seeMoreBtn, itemsLength, maxItems);
})

// ----- Popular Section ----------
fetch('https://api.themoviedb.org/3/movie/popular?append_to_response=runtime', {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTczZGMyOWRjYmY1NDczMzJjY2U0MmRlYjA4MWNhMiIsIm5iZiI6MTc0MDk5MTMzNC40NjU5OTk4LCJzdWIiOiI2N2M1NmI2NjU2NGQyNTc1ZDk5MWZlN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G4h3x3o0L52tDvz02mqtdJmLu0FlIg5opy4t0EX4cMI'
  }
 })
  .then(response => response.json())
  .then( popular => {
    console.log(popular);
    const popularElm = document.createElement('section');
    popularElm.classList.add('popular');
    
    popularElm.innerHTML = `
      <div class="popular__top disply--flex">
        <h2 class="popular__heading heading--style">Popular</h2>
        <button id="popular-seeMore" class="btn">See more</button>
      </div>
      <ul class="popular__cards">
            ${popular.results.map(item => 
              `
              <li class="popular__card">
              <div class="pCard grid--two">
                <div class="popular--img">
                  <a href="detail.html?id=${item.id}">
                  <img class="card--img" src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.original_title}">
                  </a>
                </div>
                <div class="popularCard__right">
                  <h1 class="popularCard__heading"> ${item.original_title}</h1>
                  <p class="disply--flex imdb--style">
                    <img class="starClock--img" src="images/Star.png" alt="star"> <span>${item.vote_average.toFixed(2)}/10 IMDb</span>
                  </p>                   
                  <ul class="disply--flex">${item.genre_ids.map(genre_id => {
                        let currentGenre = genres.find(genre => genre.id == genre_id)
                        // console.log(currentGenre)
                        return `<li class="popularCat-btn">${currentGenre.name}</li>`
                  }).join("")}
                  </ul>
                </div>
                </div>
              </li>
              `
            ).join('')}
          </ul>
    `;
    mainElm.append(popularElm);

    // "See More button" ---------------------

    const popularCards = document.querySelectorAll('.popular__card');
    // console.log(popularCards);
    const allItems = Array.from(popularCards); 
      // console.log(allItems);
      
    const seeMoreBtn = document.querySelector("#popular-seeMore");      
    const itemsLength = popular.results.length;
    let maxItems = 3;

    showCard(allItems, seeMoreBtn, itemsLength, maxItems);    
  })
  
  

  

