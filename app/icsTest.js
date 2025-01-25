const fs = require("fs");
const ICAL = require("ical.js");
const calendarPath = "myCalendar.ics";

fs.readFile(calendarPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file", err);
    return;
  }

  const jcalData = ICAL.parse(data);
  const comp = new ICAL.Component(jcalData);

  const events = comp.getAllSubcomponents("vevent");

  // getFreeTime
  const sortedEvents = events.sort((a, b) => {
    return (
      new Date(a.getFirstPropertyValue("dtstart")).getTime() -
      new Date(b.getFirstPropertyValue("dtstart")).getTime()
    );
  });

  const freeTime = [];
  let lastEndTime = null;
  // free time blocks between events
  sortedEvents.forEach((event) => {
    const startTime = new Date(event.getFirstPropertyValue("dtstart"));
    const endTime = new Date(event.getFirstPropertyValue("dtend"));

    // console.log(startTime) ;

    if (lastEndTime && startTime > lastEndTime) {
      freeTime.push({ start: lastEndTime, end: startTime });
    }

    lastEndTime = endTime;
  });

  // print freeTime
  freeTime.forEach((block) => {
    if (block.start.getFullYear() === new Date().getFullYear()) {
      console.log(`Free from ${block.start} to ${block.end}`);
    }
  });
});

/*
function splitDays(freeTime) {
  let freeTimeSplit = [];

  freeTime.forEach((event) => {
    let startTime = new Date(event.getFirstPropertyValue("dtstart"));
    let endTime = new Date(event.getFirstPropertyValue("dtend"));

    while (startTime < endTime) {
      const nextMidnight = new Date(startTime);
      nextMidnight.setHours(24, 0, 0, 0); // Set to the next midnight

      if (lastEndTime && startTime > lastEndTime) {
        freeTimeSplit.push({ start: lastEndTime, end: startTime });
      }

      if (endTime < nextMidnight) {
        lastEndTime = endTime;
        break;
      } else {
        freeTimeSplit.push({ start: startTime, end: nextMidnight });
        startTime = nextMidnight;
      }
    }
  });

  return freeTimeSplit;
}

readICS(calendarPath)
  .then((events) => {
    // console.log(events);

    const freeTime = getFreeTime(events);
    printFreeTime(freeTime);

    const freeTimeSplit = splitDays(freeTime);
    //printFreeTime(freeTimeSplit);
  })
  .catch((err) => {
    console.error("Failed to read ICS file", err);
  });
  */

/*
const result = readImage(imagePath);
console.log(result);
*/
