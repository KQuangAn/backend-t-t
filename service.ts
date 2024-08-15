import axios from 'axios';

export async function checkUrls(urls: { url: string; priority: number }[]) {
  const urlCheckPromises = urls.map(async (entry) => {
    try {
      const response = await axios.get(entry.url, { timeout: 5000 });
      return response.status >= 200 && response.status < 300 ? entry : null;
    } catch (error) {
      return null;
    }
  });

  const checkedUrls = await Promise.all(urlCheckPromises);
  return checkedUrls.filter(url => url !== null).sort((a, b) => a!.priority - b!.priority);
}
