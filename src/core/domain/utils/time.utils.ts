export function currentTime(): Date {
    return new Date();
}


// ✅ Format using reusable function
function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

// 👇️ format as "YYYY-MM-DD hh:mm:ss"
// You can tweak formatting easily
function formatDateTime(date: Date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

function formatDate(date: Date, seperator = "-"): string {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join(seperator);
}

function formatDate2(date: Date, seperator = "-"): string {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join(seperator);
}

function formatTime(date: Date, seperator = "-"): string {
    return [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
    ].join(':')
}

function dateFromString(dateStr: string, seperator = "-"): Date {
    const [day, month, year] = dateStr.split(seperator);
    return new Date(+year, +month - 1, +day);
}

function dateFromString2(dateStr: string, seperator = "-"): Date {
    const [year, month, day] = dateStr.split(seperator);
    console.log(year, month, day);

    return new Date(+year, +month - 1, +day);
}
export {
    formatDateTime,
    formatDate,
    formatDate2,
    formatTime,
    dateFromString,
    dateFromString2
}