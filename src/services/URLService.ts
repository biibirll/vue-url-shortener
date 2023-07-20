import mockData from '../mock-data/url'

export default {
    async getShortURL(url: string): Promise<string> {
        if (mockData.has(url)) {
            return mockData.get(url) as string;
        }

        let randStr = Math.random().toString(36).slice(2);

        while (randStr.length < 5) {
            randStr = Math.random().toString(36).slice(2);
        }

        mockData.set(url, 'https://urlshortener.io/' + randStr.slice(0, 5));

        return mockData.get(url) as string;
    }
}
