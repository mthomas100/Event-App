export const dateConverter = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
}