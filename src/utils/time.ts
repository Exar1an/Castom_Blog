const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const milliseconds = now.getMilliseconds();

export const timeString = `${hours}${minutes}${seconds}${milliseconds}`;