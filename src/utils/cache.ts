import redis from "./redis";
export const setCache = async <T>(key: string, data: T, ttlInSeconds = 600): Promise<void> => {
    try {
        const value = JSON.stringify(data);
        await redis.setex(key, ttlInSeconds, value);
    } catch (error: any) {
        console.log(`Faliled to set Chache for ${key}`, error);
    }
}

export const getCache = async <T>(key: string): Promise<T | null> => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) as T : null;
    } catch (error: any) {
        console.log(`Failed to get chache for the key ${key}`, error);
        return null;
    }
}

export const  deleteCache = async (key : string) : Promise<void> =>{
    try {
        await redis.del(key)
    } catch (error : any) {
        console.log(`Error in deleting the cache for the key ${key}` , error);
}
}