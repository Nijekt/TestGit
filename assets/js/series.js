// const query = `
// query ($startDate: Int, $endDate: Int) {
//   Page(page: 1, perPage: 50) {
//     airingSchedules(airingAt_greater: $startDate, airingAt_lesser: $endDate) {
//       airingAt
//       episode
//       media {
//         title {
//           romaji
//           english
//         }
//       }
//     }
//   }
// }
// `;

// const variables = {
//   startDate: Math.floor(Date.now() / 1000), // Current date in UNIX timestamp
//   endDate: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 // 7 days from now in UNIX timestamp
// };

// const url = 'https://graphql.anilist.co';
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query: query,
//     variables: variables
//   })
// };

// fetch(url, options)
//   .then(response => response.json())
//   .then(data => {
//     data.data.Page.airingSchedules.forEach(schedule => {
//       const date = new Date(schedule.airingAt * 1000);
//       console.log(`Anime: ${schedule.media.title.romaji} (Episode ${schedule.episode}) airs on ${date.toLocaleString()}`);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });


// const query = `
// query ($startDate: Int, $endDate: Int) {
//   Page(page: 1, perPage: 50) {
//     airingSchedules(airingAt_greater: $startDate, airingAt_lesser: $endDate) {
//       airingAt
//       episode
//       media {
//         title {
//           romaji
//           english
//         }
//       }
//     }
//   }
// }
// `;

// const variables = {
//   startDate: Math.floor(Date.now() / 1000), // Current date in UNIX timestamp
//   endDate: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60 // 14 days from now in UNIX timestamp
// };

// const url = 'https://graphql.anilist.co';
// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query: query,
//     variables: variables
//   })
// };

// function generateDates(numDays) {
//   const dates = [];
//   for (let i = 0; i < numDays; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() + i);
//     dates.push(date.toDateString());
//   }
//   return dates;
// }

// function displaySeries(series) {
//   const seriesRel = document.getElementById('series-rel');
//   seriesRel.innerHTML = '';
//   series.forEach(item => {
//     const newSer = document.createElement('div');
//     newSer.className = 'new-ser';
//     newSer.innerHTML = `
//       <div class="date-name">
//         <div class="new-ser-rel-time">${item.time}</div>
//         <div class="anime-name">${item.title}</div>
//       </div>
//       <div class="episode"><img src="assets/Images/player button.png" alt="">Episode ${item.episode}</div>
//     `;
//     seriesRel.appendChild(newSer);
//   });
// }

// fetch(url, options)
//   .then(response => response.json())
//   .then(data => {
//     const schedules = data.data.Page.airingSchedules;
//     const scheduleByDate = {};

//     schedules.forEach(schedule => {
//       const date = new Date(schedule.airingAt * 1000);
//       const dateString = date.toDateString();
//       const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//       if (!scheduleByDate[dateString]) {
//         scheduleByDate[dateString] = [];
//       }

//       scheduleByDate[dateString].push({
//         time: timeString,
//         title: schedule.media.title.romaji,
//         episode: schedule.episode
//       });
//     });

//     const dates = generateDates(14);
//     const dateCarousel = document.getElementById('date-carousel');

//     dates.forEach(dateString => {
//       const dateCell = document.createElement('div');
//       dateCell.className = 'date-cell';
//       dateCell.innerHTML = `${dateString}`;
//       dateCell.addEventListener('click', () => {
//         document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('active'));
//         dateCell.classList.add('active');
//         displaySeries(scheduleByDate[dateString] || []);
//       });
//       dateCarousel.appendChild(dateCell);
//     });

//     // Display series for the first date by default
//     displaySeries(scheduleByDate[dates[0]] || []);
//   })
//   .catch(error => {
//     console.error(error);
//   });






// const leftBtn = document.querySelector(".left");
// const rightBtn = document.querySelector(".right")


// let scrollAmount = 0;
// const dateCarousel = document.querySelector('.date-carousel');
// const dateCellWidth = 112; // 106 px + 6px gap
// const maxScroll = dateCarousel.scrollWidth - dateCarousel.clientWidth;

// console.log(leftBtn)
// leftBtn.addEventListener("click", function scrollLeft() {
//     scrollAmount -= dateCellWidth * 7;
//     if (scrollAmount < 0) {
//         scrollAmount = 0;
//     }
//     dateCarousel.scrollTo({
//         top: 0,
//         left: scrollAmount,
//         behavior: 'smooth'
//     });
// });

// rightBtn.addEventListener("click", function scrollRight() {
//   console.log("Work")
//     scrollAmount += dateCellWidth * 7;
//     if (scrollAmount > maxScroll) {
//         scrollAmount = maxScroll;
//     }
//     dateCarousel.scrollTo({
//         top: 0,
//         left: scrollAmount,
//         behavior: 'smooth'
//     });
// })

document.addEventListener("DOMContentLoaded", function() {
  const query = `
    query ($startDate: Int, $endDate: Int, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
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

  const startDate = Math.floor(Date.now() / 1000); // Current date in UNIX timestamp
  const endDate = startDate + 14 * 24 * 60 * 60; // 14 days from now in UNIX timestamp
  const perPage = 50; // Number of results per page
  const url = 'https://graphql.anilist.co';

  function generateDates(numDays) {
    const dates = [];
    for (let i = 0; i < numDays; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 3);
      const month = date.toLocaleDateString('en-US', { month: 'short' }).substring(0, 3);
      const dayNum = date.getDate();
      dates.push({ day, month, dayNum, fullDate: date.toDateString() });
    }
    return dates;
  }

  function displaySeries(series, showAll = false) {
    const seriesRel = document.getElementById('series-rel');
    seriesRel.innerHTML = '';
    let count = 0;
    series.forEach(item => {
      if (showAll || count < 6) { // Limit to 6 items per date, unless showAll is true
        const newSer = document.createElement('div');
        newSer.className = 'new-ser';
        newSer.innerHTML = `
          <div class="date-name">
            <div class="new-ser-rel-time">${item.time}</div>
            <div class="anime-name">${item.title}</div>
          </div>
          <div class="episode"><img src="assets/Images/player button.png" alt="">Episode ${item.episode}</div>
        `;
        seriesRel.appendChild(newSer);
        count++;
      }
    });

    const showMore = document.createElement('div');
    showMore.className = 'show-more';
    showMore.textContent = 'Show More';
    seriesRel.appendChild(showMore);

    showMore.addEventListener('click', () => {
      displaySeries(series, true); // Show all items
      seriesRel.removeChild(showMore); // Remove the "Show More" button after showing all items
    });
  }

  function fetchData(page) {
    const variables = {
      startDate,
      endDate,
      page,
      perPage,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

    return fetch(url, options)
      .then(response => response.json())
      .then(data => data.data.Page.airingSchedules)
      .catch(error => {
        console.error('Error fetching data:', error);
        return []; // Return empty array in case of error
      });
  }

  function fetchDataForAllPages(numPages) {
    const promises = [];
    for (let page = 1; page <= numPages; page++) {
      promises.push(fetchData(page));
    }

    Promise.all(promises)
      .then(results => {
        const allSchedules = results.flat(); // Flatten array of arrays into a single array
        const scheduleByDate = {};

        allSchedules.forEach(schedule => {
          const date = new Date(schedule.airingAt * 1000);
          const dateString = date.toDateString();
          const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          if (!scheduleByDate[dateString]) {
            scheduleByDate[dateString] = [];
          }

          scheduleByDate[dateString].push({
            time: timeString,
            title: schedule.media.title.romaji,
            episode: schedule.episode
          });
        });

        const dates = generateDates(14);
        const dateCarousel = document.getElementById('date-carousel');
        dateCarousel.innerHTML = ''; // Clear existing content

        dates.forEach((dateObj, index) => {
          const dateCell = document.createElement('div');
          dateCell.className = 'date-cell';
          dateCell.innerHTML = `${dateObj.day} <br> ${dateObj.month} ${dateObj.dayNum}`;
          dateCell.addEventListener('click', () => {
            document.querySelectorAll('.date-cell').forEach(cell => cell.classList.remove('active'));
            dateCell.classList.add('active');
            displaySeries(scheduleByDate[dateObj.fullDate] || []);
          });
          dateCarousel.appendChild(dateCell);

          // Automatically click the first date cell to display initial series
          if (index === 0) {
            dateCell.click();
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data for all pages:', error);
      });
  }

  fetchDataForAllPages(4); // Fetch data for 2 pages initially (adjust as needed)

  // Carousel navigation
  const leftBtn = document.querySelector('.left');
  const rightBtn = document.querySelector('.right');
  const dateCarousel = document.getElementById('date-carousel');

  leftBtn.addEventListener('click', () => {
    dateCarousel.scrollTo({
      left: dateCarousel.scrollLeft - dateCarousel.clientWidth,
      behavior: 'smooth'
    });
  });

  rightBtn.addEventListener('click', () => {
    dateCarousel.scrollTo({
      left: dateCarousel.scrollLeft + dateCarousel.clientWidth,
      behavior: 'smooth'
    });
  });
});
