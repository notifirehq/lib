export const initApiClient = (apiKey: string, baseURL = 'https://api.novu.co') => {
  const apiUrl = process.env.NOVU_API_URL || baseURL;

  return {
    post: async (route: string, data: Record<string, unknown>) => {
      return (
        await fetch(apiUrl + '/v1' + route, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `ApiKey ${apiKey}`,
          },
          body: JSON.stringify(data),
        })
      ).json();
    },
  };
};
