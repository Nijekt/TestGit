async function fetchTopTrendingAnime() {
    const query = `
        query {
            Page(perPage: 10, page: 1) {
                media(sort: TRENDING_DESC, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    meanScore
                    popularity
                    coverImage {
                        large
                    }
                }
            }
        }
    `;

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const animeList = data.data.Page.media;

        animeList.forEach((anime, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active');

            const img = document.createElement('img');
            img.classList.add('d-block');
            img.classList.add('w-100');
            img.src = anime.coverImage.large;
            img.alt = anime.title.english || anime.title.romaji || anime.title.native;
            console.log(img.src)

            const carouselContent = document.createElement('div');
            carouselContent.classList.add('carousel-content');
            carouselContent.innerHTML = `<h1 class="carousel-title">${anime.title.english || anime.title.romaji || anime.title.native}</h1>`;

            carouselItem.appendChild(img);
            carouselItem.appendChild(carouselContent);

            document.getElementById('anime-list').appendChild(carouselItem);
        });
    } catch (error) {
        console.error('Error fetching top trending anime:', error);
    }
}

// Вызов функции для получения топа аниме по трендам
fetchTopTrendingAnime();