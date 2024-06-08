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
        displayTopTrendingAnime(data.data.Page.media);
    } catch (error) {
        console.error('Error fetching top trending anime:', error);
    }
}

function displayTopTrendingAnime(animeList) {
    const animeListDiv = document.getElementById('anime-list');
    animeListDiv.innerHTML = ''; // Очистить предыдущие результаты
    animeList.forEach(anime => {
        const animeDiv = document.createElement('div');
        animeDiv.classList.add('anime');
        
        const image = document.createElement('img');
        image.src = anime.coverImage.large;
        image.alt = anime.title.english || anime.title.romaji || anime.title.native;

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('anime-details');
        
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = anime.title.english || anime.title.romaji || anime.title.native;
        
        const scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score');
        scoreDiv.textContent = `Score: ${anime.meanScore}, Popularity: ${anime.popularity}`;

        detailsDiv.appendChild(titleDiv);
        // detailsDiv.appendChild(scoreDiv);

        animeDiv.appendChild(image);
        animeDiv.appendChild(detailsDiv);

        animeListDiv.appendChild(animeDiv);
    });
}

// Вызов функции для получения топа аниме по трендам
fetchTopTrendingAnime();


const animeCarousel = document.querySelector(".anime-list");
const animeScroll = document.querySelector(".scroll-bar")

let isDragStart = false, prevPageX, prevScrollLeft;

function draggingStart(e){
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = animeCarousel.scrollLeft;
}

function dragging(e){
    if(!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    animeCarousel.scrollLeft = prevScrollLeft - positionDiff;
    scrollDrag()
}

function scrollDrag() {
    let scrollPercentage = animeCarousel.scrollLeft / (animeCarousel.scrollWidth - animeCarousel.clientWidth);
    let scrollPosition = scrollPercentage * (animeCarousel.clientWidth - animeScroll.clientWidth);

    
    animeScroll.style.left = `${scrollPosition}px`;
    console.log(scrollPosition)
}

function draggingStop(){
    isDragStart = false;
}

animeCarousel.addEventListener("mousedown", draggingStart)
animeCarousel.addEventListener("mousemove", dragging)
animeCarousel.addEventListener("mouseup", draggingStop)

animeScroll.addEventListener("mousedown", (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = animeCarousel.scrollLeft;
});

