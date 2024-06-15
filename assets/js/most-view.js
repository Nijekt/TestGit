document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://graphql.anilist.co';
    const container = document.getElementById('most-viewed-anime-container');
    const periodButtons = document.querySelectorAll('.day-week-month-element');
  
    // Добавляем обработчики событий для кнопок
    periodButtons.forEach(button => {
      button.addEventListener('click', () => {
        const period = button.dataset.period;
        fetchMostViewedAnime(period);
  
        // Удаляем класс 'active' со всех кнопок и добавляем к текущей
        periodButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  
    // Функция для получения данных с Anilist API
    async function fetchMostViewedAnime(period) {
      const query = `
        query ($sort: [MediaSort], $type: MediaType) {
          Page(page: 1, perPage: 5) {
            media(sort: $sort, type: $type) {
              id
              title {
                english
              }
              coverImage {
                large
              }
              trending
              favourites
            }
          }
        }
      `;
  
      const variables = {
        sort: period === 'day' ? ['TRENDING_DESC'] : (period === 'week' ? ['POPULARITY_DESC'] : ['SCORE_DESC']),
        type: 'ANIME'
      };
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            variables: variables
          })
        });
  
        const data = await response.json();
        displayMostViewedAnime(data.data.Page.media);
      } catch (error) {
        console.error('Error fetching data from Anilist API', error);
      }
    }
  
    // Функция для отображения данных на странице
    function displayMostViewedAnime(animeList) {
      container.innerHTML = ''; // Очищаем контейнер перед обновлением
  
      animeList.forEach((anime, index) => {
        const animeElement = document.createElement('div');
        animeElement.classList.add('most-viewed-anime');
  
        animeElement.innerHTML = `
          <div class="counter">${String(index + 1).padStart(2, '0')}</div>
          <div class="most-viewed-anime-element">
            <img src="${anime.coverImage.large}" alt="${anime.title.english}">
            <div class="most-viewed-anime-element-content">
              <div class="most-viewed-anime-title">${anime.title.english}</div>
              <div class="likes-views">
                <div class="views">
                  <img src="assets/Images/eye.png" alt="">
                  ${anime.trending}
                </div> 
                <div class="likes">
                  <img src="assets/Images/heart.png" alt="">
                  ${anime.favourites}
                </div>
              </div>
            </div>
          </div>
        `;
  
        container.appendChild(animeElement);
      });
    }
  
    // Загрузим данные для "Day" по умолчанию при загрузке страницы
    fetchMostViewedAnime('day');
    document.querySelector('.day-week-month-element.day').classList.add('active');
  });
  