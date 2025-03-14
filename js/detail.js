const bodyElm = document.querySelector("body");
const search = location.search;
const params = new URLSearchParams(search);
let id = params.get("id");

// ?append_to_response=videos,credits

fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits,release_dates`, {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTczZGMyOWRjYmY1NDczMzJjY2U0MmRlYjA4MWNhMiIsIm5iZiI6MTc0MDk5MTMzNC40NjU5OTk4LCJzdWIiOiI2N2M1NmI2NjU2NGQyNTc1ZDk5MWZlN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G4h3x3o0L52tDvz02mqtdJmLu0FlIg5opy4t0EX4cMI'
  }
})
.then(response => response.json())
.then(data => {
  console.log(data.videos)
    
  // Find and display the trailer link  
  const trailer = data.videos.results.find(video => video.site === 'YouTube');
  console.log(trailer);
  
  const trailerElm = document.createElement('div');
  trailerElm.className = 'trailer-container';

  if (trailer) {
    const trailerUrl =`https://www.youtube.com/embed/${trailer.key}?controls=0`;
    console.log(trailerUrl);
        
    trailerElm.innerHTML = `
      <iframe width="100%" height="800" src=${trailerUrl} frameborder="0"  allowfullscreen></iframe>
    `;
  } else {
    trailerElm.innerHTML = 'No trailer found.';
  } 
  //---- End trailer -----

  //---- header Section  -----------
  const headerElm = document.createElement("div");
    
  headerElm.innerHTML = `
    <header class="detail__header">
      <div class="detail__logo disply--flex">
        <i id="back--arrow" class='fas fa-arrow-left detail__arrow'></i>
        <div class="switchBtn detail__btn">
          <input type="checkbox" id="checkBox--detail">
          <label for="checkBox--detail" class="checkBtn"></label>
        </div>
      </div>
      <p class="play--trailer">Play trailer</p>
    </header>     
  `

  //--- Display movie title, runtime, cast  -----
  // console.log(data.release_dates.results[0].release_dates[0].certification)

  const mainElm = document.createElement("div");
  mainElm.className = "detail__main";
  
  mainElm.innerHTML = `
    <div class="disply--flex">
      <h1>${data.title}</h1>
      <i class="fa fa-bookmark-o"></i>
    </div>
    <p class="disply--flex imdb--style">
      <img class="starClock--img" src="images/Star.png" alt="star"><span>${data.vote_average.toFixed(2)}/10 IMDb</span>
    </p>
    <ul class="detail__genres disply--flex justify--start">${data.genres.map(gn => {                    
        let currentGenre = genres.
          find(genre => genre.id == gn.id)
          return `<li class="popularCat-btn">${currentGenre.name}</li>`
        }).join("")
      }
    </ul>
    <ul class="disply--flex justify--start">
      <li><p class="para">Lenght</p><p>${Math.floor(data.runtime / 60)}h ${(data.runtime % 60)}min</p></li>
      <li><p class="para">Language</p><p>${data.spoken_languages[0].name}</p></li>
      <li><p class="para">Rating</p><p>${data.release_dates.results[0].iso_3166_1}${data.release_dates.results[0].release_dates[0].certification}</p></li>
    </ul>
    <div class="detail__descipt">
      <h4 class="heading--style">Description</h4>
      <p class="para">${data.overview}</p>
    </div>

    <div class="cast">
      <div class="cast__top disply--flex">
        <h2 class="heading--style">Cast</h2>
        <button id="cast--seeMore" class="btn">See more</button>
      </div>
      <ul class="cast__cards grid--five">
        ${data.credits.cast.map(ct => 
          ` <li class="cast__card">
              <div class="div--img">
                <img class="card--img" src="https://image.tmdb.org/t/p/original${ct.profile_path}" alt="${ct.name}">
              </div>              
              <p>${ct.name}
              </p>
            </li>
          `).join('')}
      </ul>
    </div>  
  `;

  bodyElm.append(trailerElm, headerElm, mainElm);

  // Back to home page ------------
  const backHome = document.querySelector("#back--arrow");
  backHome.addEventListener("click", () =>{
    location.href = 'home.html';
  })

  // Invisible arrow and switchBTN    
  const playT = document.querySelector(".play--trailer");
  const trailerV = document.querySelector(".trailer-container iframe");
  
  trailerV.addEventListener("mouseenter", () =>{
    playT.style.display = 'none';
  })
  
  trailerV.addEventListener("mouseout", () =>{
    playT.style.display = 'block';
  })


  // "See More button" ---------------------
  const castCards = document.querySelectorAll('.cast__card');
  const allItems = Array.from(castCards); 
  const seeMoreBtn = document.querySelector("#cast--seeMore");      
  const itemsLength = data.credits.cast.length;
  let maxItems = 5;

  showCard(allItems, seeMoreBtn, itemsLength, maxItems);

  //--- For Dark Mode ----------
  const switchElmDetail = document.querySelector("#checkBox--detail");
  console.log(switchElmDetail);    
  darkMode(switchElmDetail);
})

// .catch(error => {
//     console.error('Error fetching trailer data:', error);
//     const bd = document.querySelector('body');
//     console.log();
    
//     // .innerHTML = 'Failed to load trailer.';
// });




