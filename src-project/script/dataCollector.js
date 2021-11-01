export class DataCollector {
    async getData (url) {
        let data;
        try {
            const res = await fetch(`${url}`);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            data = await res.json();
        } catch ({message}) {
            throw new Error(message)
        }
        return data;
    }
}
