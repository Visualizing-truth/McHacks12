const fs = require("fs");
const ICAL = require("ical.js");
const calendarPath = "myCalendar.ics";

const firstDate = new Date(2025, 0, 27, 0, 0, 0);
const lastDate = new Date(2025, 1, 3, 0, 0, 0);

fs.readFile(calendarPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file", err);
    return;
  }

  const jcalData = ICAL.parse(data);
  const comp = new ICAL.Component(jcalData);

  const events = comp.getAllSubcomponents("vevent");

  const sortedEvents = events;

  // printing scheduled events in this year
  /*
  events.forEach((event) => {
    if (
      new Date(event.getFirstPropertyValue("dtstart")).getFullYear() ===
      new Date().getFullYear()
    ) {
      console.log(
        `Free from ${new Date(event.getFirstPropertyValue("dtstart")).toLocaleDateString()} ${new Date(event.getFirstPropertyValue("dtstart")).toLocaleTimeString()} \
        to ${new Date(event.getFirstPropertyValue("dtstart")).toLocaleDateString()} ${new Date(event.getFirstPropertyValue("dtend")).toLocaleTimeString()}`
      );
    }
  });
  */

  // printing free events

  // getFreeTime
  /*
  const sortedEvents = events.sort((a, b) => {
    return (
      new Date(a.getFirstPropertyValue("dtstart")).getTime() -
      new Date(b.getFirstPropertyValue("dtstart")).getTime()
    );
  });
  */

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

  console.log(`total free time length - ${freeTime.length}`);

  // print freeTime without day splits
  /*
  freeTime.forEach((block) => {
    if (block.start.getFullYear() === new Date().getFullYear()) {
      console.log(`Free from ${block.start} to ${block.end}`);
    }
  });
  */

  const yearlyFreeTime = freeTime.filter((block) => {
    return block.start.getFullYear() === new Date().getFullYear();
  });

  console.log(`2025 year free time length - ${yearlyFreeTime.length}`);

  const freeTimeSplit = [];

  // splitDays
  yearlyFreeTime.forEach((block) => {
    let startTime = new Date(block.start);
    let endTime = new Date(block.end);

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

  console.log("SPLIT TIME STARTS NOW");

  const weeklyFreeTime = freeTimeSplit.filter((block) => {
    return block.start >= firstDate && block.end <= lastDate;
  });

  console.log(
    `events within date range free time length - ${weeklyFreeTime.length}`
  );

  console.log(`final free time list - ${weeklyFreeTime.length}`);

  weeklyFreeTime.forEach((block) => {
    console.log(`Free from ${block.start} to ${block.end}`);
  });

  // sort the freeTime blocks
  /*
  freeTimeSplit.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
  */

  // print freeTime with day splits

  // get freeTime for 1 week only
  /*
  const weeklyFreeTime = freeTimeSplit.filter((block) => {
    return block.start >= firstDate && block.end <= lastDate;
  });
  */
});
