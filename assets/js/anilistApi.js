// anilistApi.js

export async function fetchAniListData(query, variables) {
    const url = 'https://graphql.anilist.co';
  
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
  
    try {
      const response = await fetch(url, options);
      return response.json();
    } catch (error) {
      console.error('Error fetching data from Anilist API', error);
      throw error;
    }
  }
  