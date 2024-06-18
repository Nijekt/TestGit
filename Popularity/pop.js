const query = (page) => `
  query {
    Page(page: ${page}, perPage: 50) {
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

// Function to fetch data from a specific page
const fetchPage = (page) => {
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: query(page) }),
  };

  return fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => data.data.Page.media)
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
};

// Fetching data from multiple pages
const fetchMultiplePages = async (totalPages) => {
  const fetchPromises = [];
  for (let page = 1; page <= totalPages; page++) {
    fetchPromises.push(fetchPage(page));
  }

  const results = await Promise.all(fetchPromises);
  return results.flat(); // Flatten the array of arrays
};

// Update HTML based on retrieved data and current page
function updateAnimeList(animeList, currentPage = 1, itemsPerPage = 16) {
  const animeContainer = document.getElementById('popular-anime-list');
  animeContainer.innerHTML = ''; // Clear previous content

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnimeList = animeList.slice(startIndex, endIndex);

  currentAnimeList.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('recently-updated-card');

    // Truncate the anime title to 10 characters
    const truncatedTitle = truncateString(anime.title.romaji, 10);

    card.innerHTML = `
      <a href="https://anilist.co/anime/${anime.id}">
      <img src="${anime.coverImage.large}" alt=""></a>
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

  // Update carousel indicators
  updateCarouselIndicators(animeList.length, currentPage, itemsPerPage);
}

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  } else {
    return str;
  }
}

// Update carousel indicators
function updateCarouselIndicators(totalItems, currentPage, itemsPerPage) {
  const indicatorsContainer = document.getElementById('carousel-indicators');
  indicatorsContainer.innerHTML = ''; // Clear previous content

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisibleIndicators = 5; // Max number of indicators to show at once
  const startPage = Math.max(1, Math.min(totalPages - maxVisibleIndicators + 1, currentPage - Math.floor(maxVisibleIndicators / 2)));
  const endPage = Math.min(totalPages, startPage + maxVisibleIndicators - 1);

  for (let page = startPage; page <= endPage; page++) {
    const indicator = document.createElement('span');
    indicator.textContent = page;
    indicator.classList.add('carousel-indicator');
    if (page === currentPage) {
      indicator.classList.add('active');
    }
    indicator.addEventListener('click', () => {
      currentPage = page;
      updateAnimeList(animeList, currentPage, itemsPerPage);
    });
    indicatorsContainer.appendChild(indicator);
  }
}

// Carousel controls
let currentPage = 1;

document.getElementById('prev-button').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updateAnimeList(animeList, currentPage);
  }
});

document.getElementById('next-button').addEventListener('click', () => {
  const totalPages = Math.ceil(animeList.length / 16);
  if (currentPage < totalPages) {
    currentPage++;
    updateAnimeList(animeList, currentPage);
  }
});

// Number of pages to fetch
const totalPages = 10; // Adjust this number based on your needs

let animeList = [];

fetchMultiplePages(totalPages).then(data => {
  animeList = data;
  updateAnimeList(animeList, currentPage);
});
