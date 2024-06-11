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

        const animeLink = document.createElement('a');
        animeLink.href = `https://anilist.co/anime/${anime.id}`; // Предполагается, что у вас есть ID аниме
        animeLink.classList.add('anime-link'); // Добавьте класс для управления стилями ссылок

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

        animeLink.appendChild(image);
        animeLink.appendChild(detailsDiv);

        animeDiv.appendChild(animeLink);
        animeListDiv.appendChild(animeDiv);

        // Prevent link click if dragging
        animeLink.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });
    });
}

// Вызов функции для получения топа аниме по трендам
fetchTopTrendingAnime();


const animeCarousel = document.querySelector(".anime-list");
const animeScroll = document.querySelector(".scroll-bar");
const scrollbarWrapper = document.querySelector(".scrollbar-wrapper");
const prevButton = document.querySelector('.anime-car-prev');
const nextButton = document.querySelector('.anime-car-next');

let isDragStart = false, isDragging = false, isScrollbarDragStart = false, prevPageX, prevScrollLeft, scrollbarPrevPageX;

function draggingStart(e) {
    e.preventDefault(); // Prevent default behavior
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = animeCarousel.scrollLeft;
}

function dragging(e) {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    let positionDiff = e.pageX - prevPageX;
    animeCarousel.scrollLeft = prevScrollLeft - positionDiff;
    scrollDrag();
}

function scrollbarDraggingStart(e) {
    e.preventDefault(); // Prevent default behavior
    isScrollbarDragStart = true;
    scrollbarPrevPageX = e.pageX;
}

function scrollbarDragging(e) {
    if (!isScrollbarDragStart) return;
    e.preventDefault();
    let scrollbarPositionDiff = e.pageX - scrollbarPrevPageX;
    const maxScrollLeft = animeCarousel.scrollWidth - animeCarousel.clientWidth;
    const maxScrollbarLeft = scrollbarWrapper.clientWidth - animeScroll.clientWidth;

    let newScrollLeft = (scrollbarPositionDiff / maxScrollbarLeft) * maxScrollLeft;
    animeCarousel.scrollLeft += newScrollLeft;
    scrollbarPrevPageX = e.pageX;
    scrollDrag();
}

function scrollDrag() {
    const maxScrollLeft = animeCarousel.scrollWidth - animeCarousel.clientWidth;
    const maxScrollbarLeft = scrollbarWrapper.clientWidth - animeScroll.clientWidth;

    let scrollPercentage = animeCarousel.scrollLeft / maxScrollLeft;
    let scrollPosition = scrollPercentage * maxScrollbarLeft;

    // Ensure the scrollbar does not exceed bounds
    scrollPosition = Math.max(0, Math.min(scrollPosition, maxScrollbarLeft));
    
    animeScroll.style.left = `${scrollPosition}px`;
    console.log(scrollPosition);
}

function draggingStop() {
    isDragStart = false;
    isScrollbarDragStart = false;
    setTimeout(() => isDragging = false, 0); // Delay resetting isDragging to capture click event if not dragging
}

animeCarousel.addEventListener("mousedown", draggingStart);
animeCarousel.addEventListener("mousemove", dragging);
animeCarousel.addEventListener("mouseup", draggingStop);
animeCarousel.addEventListener("mouseleave", draggingStop);

animeScroll.addEventListener("mousedown", scrollbarDraggingStart);
window.addEventListener("mousemove", scrollbarDragging);
window.addEventListener("mouseup", draggingStop);
window.addEventListener("mouseleave", draggingStop);


animeCarousel.addEventListener('scroll', scrollDrag);

function getAnimeWidth() {
    const animeElement = document.querySelector('.anime');
    return animeElement ? animeElement.clientWidth : 230; // Default to 230px if no element found
}

prevButton.addEventListener('click', () => {
    console.log("Hello")
    const animeWidth = getAnimeWidth();
    animeCarousel.scrollBy({ left: -animeWidth, behavior: 'smooth' }); // Scroll back by one image width

});

nextButton.addEventListener('click', () => {
    const animeWidth = getAnimeWidth();
    animeCarousel.scrollBy({ left: animeWidth, behavior: 'smooth' }); // Scroll forward by one image width

});


