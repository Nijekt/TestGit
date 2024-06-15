const query = `
query ($startDate: Int, $endDate: Int) {
  Page(page: 1, perPage: 50) {
    airingSchedules(airingAt_greater: $startDate, airingAt_lesser: $endDate) {
      airingAt
      episode
      media {
        title {
          romaji
          english
        }
      }
    }
  }
}
`;

const variables = {
  startDate: Math.floor(Date.now() / 1000), // Current date in UNIX timestamp
  endDate: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 // 7 days from now in UNIX timestamp
};

const url = 'https://graphql.anilist.co';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables: variables
  })
};

fetch(url, options)
  .then(response => response.json())
  .then(data => {
    data.data.Page.airingSchedules.forEach(schedule => {
      const date = new Date(schedule.airingAt * 1000);
      console.log(`Anime: ${schedule.media.title.romaji} (Episode ${schedule.episode}) airs on ${date.toLocaleString()}`);
    });
  })
  .catch(error => {
    console.error(error);
  });












const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right")


let scrollAmount = 0;
const dateCarousel = document.querySelector('.date-carousel');
const dateCellWidth = 112; // 106px + 6px gap
const maxScroll = dateCarousel.scrollWidth - dateCarousel.clientWidth;

console.log(leftBtn)
leftBtn.addEventListener("click", function scrollLeft() {
    scrollAmount -= dateCellWidth * 7;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    dateCarousel.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
    });
});

rightBtn.addEventListener("click", function scrollRight() {
    scrollAmount += dateCellWidth * 7;
    if (scrollAmount > maxScroll) {
        scrollAmount = maxScroll;
    }
    dateCarousel.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
    });
})