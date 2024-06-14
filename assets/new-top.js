// AniList GraphQL endpoint
const ANILIST_API = 'https://graphql.anilist.co';

// GraphQL queries
const queries = {
    newAdded: `
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: ANIME, sort: UPDATED_AT_DESC, seasonYear: 2024) {
                id
                title {
                    romaji
                }
                coverImage {
                    large
                }
                episodes
                duration
            }
        }
    }`,
    newRelease: `
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: ANIME, sort: START_DATE_DESC) {
                id
                title {
                    romaji
                }
                coverImage {
                    large
                }
                episodes
                duration
            }
        }
    }`,
    topOngoing: `
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: ANIME, sort: TRENDING_DESC, status: RELEASING) {
                id
                title {
                    romaji
                }
                coverImage {
                    large
                }
                episodes
                duration
            }
        }
    }`
};

// Fetch data from AniList API
async function fetchAnime(query, page, perPage) {
    const variables = {
        page: page,
        perPage: perPage
    };

    const response = await fetch(ANILIST_API, {
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
    return data.data.Page.media;
}

// Populate HTML with fetched data
async function populateAnime(sectionId, query) {
    const section = document.getElementById(sectionId);
    const list = section.querySelector(`#${sectionId}-list`);
    
    const animeList = await fetchAnime(query, 1, 3);
    
    animeList.forEach(anime => {
        const animeElement = document.createElement('div');
        animeElement.className = 'new-added-anime another-color';
        const episodes = anime.episodes ? `Ep ${anime.episodes}` : 'Ep TBD';
        animeElement.innerHTML = `
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <div class="new-added-anime-desk">
                <div class="new-added-anime-name">${anime.title.romaji}</div>
                <ul class="new-added-anime-desk-list">
                    <li class="new-added-anime-element">Anime</li>
                    <li class="new-added-anime-element"><img style="width:10px" src="assets/Images/Ellipse 13.png" alt="">${episodes}</li>
                    <li class="new-added-anime-element"><img style="width:10px" src="assets/Images/Ellipse 13.png" alt="">${anime.duration} min</li>
                </ul>
            </div>
        `;
        list.appendChild(animeElement);
    });
}

// Fetch and display new added anime
populateAnime('new-added', queries.newAdded);

// Fetch and display new releases
populateAnime('new-release', queries.newRelease);

// Fetch and display top ongoing anime
populateAnime('top-ongoing', queries.topOngoing);
