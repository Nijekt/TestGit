// queries.js

export const combinedQuery = `
  query ($startDate: Int, $endDate: Int, $page: Int, $perPage: Int, $sort: [MediaSort], $type: MediaType) {
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
