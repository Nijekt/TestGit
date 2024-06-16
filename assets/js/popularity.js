// async function fetchTopPopularityAnime(){
//     const query = `
//         query {
//             Page(perPage:12, page:1){
//                 media(sort: POPULARITY_DESC, type:ANIME){
//                     id
//                     title{
//                         english
//                     }
//                     popularity
//                     coverImage{
//                         large
//                     }
//                     episodes
//                 }
//             }
//         }
//     `;


//     const url = 'https://graphql.anilist.co';

//     const options = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({ query })
//     };

//     try {
//         const response = await fetch(url, options)
//         const data = await response.json()
//         displayTopPopularityAnime(data.data.Page.media)
//     } catch (error) {
//         console.error('Error fetching top trending anime:', error);
//     }
// }


// function displayTopPopularityAnime(animelist){
//     const popularListDiv = document.getElementById("popular-anime-list");
//     popularListDiv.innerHTML = "";

//     animelist.forEach(anime => {
//         const animeDiv = document.createElement("div");
//         animeDiv.classList.add("recently-updated-card");

//         const animeLink = document.createElement("a");
//         animeLink.href = `https://anilist.co/anime/${anime.id}`;
//         animeLink.classList.add("anime-link");


//         const image = document.createElement('img');
//         image.src = anime.coverImage.large;
//         image.alt = anime.title.english || anime.title.romaji || anime.title.native;

//         const animeEp = document.createElement("div");


//         popularListDiv.appendChild(animeDiv)

//         animeDiv.appendChild(animeLink)

//         animeLink.appendChild(image)


//     });
// }

// fetchTopPopularityAnime()

// GraphQL Query to retrieve top 20 popular anime
const query = `
  query {
    Page(page: 1, perPage: 12) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        episodes
        format
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

// AniList GraphQL API endpoint
const apiUrl = 'https://graphql.anilist.co';

// Headers for the POST request
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// POST request options
const options = {
  method: 'POST',
  headers,
  body: JSON.stringify({ query }),
};

// Fetching data from AniList API
fetch(apiUrl, options)
  .then(response => response.json())
  .then(data => {
    const animeList = data.data.Page.media;

    // Assuming you have a function to update HTML based on retrieved data
    updateAnimeList(animeList);
  })
  .catch(error => console.error('Error fetching data:', error));

  function updateAnimeList(animeList) {
    const animeContainer = document.getElementById('popular-anime-list');
    animeContainer.innerHTML = ''; // Очищаем предыдущее содержимое
  
    animeList.forEach(anime => {
      const card = document.createElement('div');
      card.classList.add('recently-updated-card');
  
      // Обрезаем название аниме до 20 символов
      const truncatedTitle = truncateString(anime.title.romaji, 10);
  
      card.innerHTML = `
        <img src="${anime.coverImage.large}" alt="">
        <div class="card-episods">${anime.episodes} EPS</div>
        <div class="recently-card-information">
          <div class="card-anime-title">${truncatedTitle}</div>
          <div class="rec-card-desk"> 
            <div class="format">${anime.format}</div>
            <div class="dot"></div>
            <div class="card-anime-date">${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}</div>
          </div>
        </div>
      `;
  
      animeContainer.appendChild(card);
    });
  }

  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }
