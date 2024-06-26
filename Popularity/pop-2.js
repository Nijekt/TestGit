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
        genres
        status
        nextAiringEpisode {
          airingAt
          episode
        }
        description
      }
    }
  }
`;

const apiUrl = 'https://graphql.anilist.co';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

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

const fetchMultiplePages = async (totalPages) => {
  const fetchPromises = [];
  for (let page = 1; page <= totalPages; page++) {
    fetchPromises.push(fetchPage(page));
  }

  const results = await Promise.all(fetchPromises);
  return results.flat();
};

const formatTimeUntilNextEpisode = (airingAt) => {
    const now = new Date();
    const nextEpisodeDate = new Date(airingAt * 1000); // converting from seconds to milliseconds
    const timeDifference = nextEpisodeDate - now;
  
    if (timeDifference <= 0) return "Already aired";
  
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${days}d ${hours}h ${minutes}m`;
  };

function updateAnimeList(animeList, currentPage = 1, itemsPerPage = 16) {
  const animeContainer = document.getElementById('popular-anime-list');
  animeContainer.innerHTML = ''; 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnimeList = animeList.slice(startIndex, endIndex);

  currentAnimeList.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('recently-updated-card');

    const truncatedTitle = truncateString(anime.title.romaji, 20);
    const timeUntilNextEpisode = anime.nextAiringEpisode ? formatTimeUntilNextEpisode(anime.nextAiringEpisode.airingAt) : "No info";
    const genres = anime.genres.slice(0, 3).map(genre => `<span class="anime-genre">${genre}</span>`).join(" ")

    card.innerHTML = `
      <a href="https://anilist.co/anime/${anime.id}">
      <img src="${anime.coverImage.large}" alt="">
      <div class="card-anime-title">${truncatedTitle}</div>
      </a>
      <div class="recently-card-information-p">
        
        <div class="rec-card-desk-p">
          <div class="next-episode-time">Ep ${anime.episodes+1} airing in </br> ${timeUntilNextEpisode}</div>
          <div class="form-ep">
          <div class="format">${anime.format}</div>
          <div class="dot"></div>
          <div class="episodes">${anime.episodes} episodes</div>
          </div>
           <div class="anime-desk-p">${truncateString(anime.description, 200)}</div>
           
        </div>
        <div class="anime-genres">${genres}</div>
      </div>
    `;

    animeContainer.appendChild(card);
  });

  updateCarouselIndicators(animeList.length, currentPage, itemsPerPage);
}

function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

function updateCarouselIndicators(totalItems, currentPage, itemsPerPage) {
  const indicatorsContainer = document.getElementById('carousel-indicators');
  indicatorsContainer.innerHTML = '';

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisibleIndicators = 5;
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

let animeList = [];
let filteredAnimeList = [];
let selectedGenre = [];
let selectedYear = [];
let selectedType = [];
let selectedStatus = [];

const applyFilters = () => {
  filteredAnimeList = animeList.filter(anime => {
    const matchesGenre = selectedGenre.length ? selectedGenre.some(genre => anime.genres.includes(genre)) : true;
    const matchesYear = selectedYear.length ? selectedYear.includes(anime.startDate.year.toString()) : true;

    const matchesType = selectedType.length ? selectedType.includes(anime.format) : true;
    const matchesStatus = selectedStatus.length ? selectedStatus.includes(anime.status) : true;
    return matchesGenre && matchesYear && matchesType && matchesStatus;
  });
  updateAnimeList(filteredAnimeList, 1);
};

document.getElementById('apply-filters').addEventListener('click', applyFilters);

const updateFilterSelection = (selector, filterArray) => {
  document.querySelectorAll(selector).forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const value = checkbox.value;
      if (checkbox.checked) {
        filterArray.push(value);
      } else {
        const index = filterArray.indexOf(value);
        if (index > -1) {
          filterArray.splice(index, 1);
        }
      }
    });
  });
};

updateFilterSelection('#year-options input', selectedYear);
updateFilterSelection('#genre-options input', selectedGenre);
updateFilterSelection('#type-options input', selectedType);
updateFilterSelection('#status-options input', selectedStatus);

document.querySelectorAll('.filter-category h4').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});

const totalPages = 10;

fetchMultiplePages(totalPages).then(data => {
  animeList = data;
  filteredAnimeList = animeList;
  updateAnimeList(animeList, currentPage);
});
