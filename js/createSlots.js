
// let attractionID = '5f43e0d2c97dfd074f1b45b4'
let startHour = 9
let startMinute = 0
let endHour = 11
let increment = 20
let capacity = 3

let currHour = startHour;
let currMinute = startMinute;

let command = 'db.slots.insert(['

while (currHour < endHour) {
    let formattedTime = currHour.toString() + ":" + currMinute.toString()
    if (currMinute.toString().length < 2) formattedTime += "0"

    let seconds = parseInt(currHour) * 3600 + parseInt(currMinute) * 60
    command += `{attractionID:ObjectId("${attractionID}"),label:"${formattedTime}PM",capacity:${capacity},disappear:${seconds}}`
    
    if (currMinute + increment > 60) {
        currHour += 1
        currMinute = increment + currMinute - 60
    } else {
        currMinute += increment
    }
}

command += '])'
console.log(command);

// db.slots.insert([{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"6:00-6:10 PM",capacity:10}
// db.slots.insert([{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"8:00-8:10 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"8:10-8:20 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"8:20-8:30 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"8:30-8:40 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"8:40-8:50 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"8:50-9:00 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"9:00-9:10 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"9:10-9:20 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"9:20-9:30 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"9:30-9:40 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"9:40-9:50 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"9:50-10:00 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"10:00-10:10 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"10:10-10:20 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"10:20-10:30 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"10:30-10:40 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"10:40-10:50 PM",capacity:10},{attractionID:ObjectId("5f43e0d2c97dfd074f1b45b4"),label:"10:50-11:00 PM",capacity:10}])
