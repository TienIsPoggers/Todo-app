export function ConvertToDate(date){
    console.log(new Date(date).getTime())
}
export function CounterDeadLineTime(deadLine){
    let currentTime = new Date(deadLine).getTime();
    let Time = currentTime - (new Date().getTime())
    let second = Math.floor(Time / 1000) % 60
    let minute = Math.floor(Time / (1000 * 60)) % 60
    let hour = Math.floor(Time / (1000 * 60 * 60)) % 24
    let day = Math.floor(Time / (1000 * 60 * 60 * 24))
    if(Time > 0)
        return `${day}:${hour}:${minute}:${second}`
    return 'expired'
}
export function GetMinTime(){
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
}