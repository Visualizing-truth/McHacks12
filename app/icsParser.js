const fs = require("fs");
const ICAL = require("ical.js");
const { blob } = require("stream/consumers");
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

  const sortedEvents = events.sort((a, b) => {
    return (
      new Date(a.getFirstPropertyValue("dtstart")).getTime() -
      new Date(b.getFirstPropertyValue("dtstart")).getTime()
    );
  });

  // Create a new list that contains the start and end points of the free time blocks between the actual events
  const freeTimeBlocks = [];

  // Initialize the start of the first free time block to the start of the day
  let freeStartTime = new Date(firstDate);
  freeStartTime.setHours(0, 0, 0, 0);

  sortedEvents.forEach((event) => {
    const eventStartTime = event.getFirstPropertyValue("dtstart").toJSDate();
    const eventEndTime = event.getFirstPropertyValue("dtend").toJSDate();

    if (freeStartTime < eventStartTime) {
      freeTimeBlocks.push({ start: freeStartTime, end: eventStartTime });
    }

    freeStartTime = eventEndTime;
  });

  // Handle the time after the last event until the end of the day
  const endOfDay = new Date(lastDate);
  endOfDay.setHours(23, 59, 59, 999);
  if (freeStartTime < endOfDay) {
    freeTimeBlocks.push({ start: freeStartTime, end: endOfDay });
  }

  // get all free blocks in current year
  let freeYearBlocks = freeTimeBlocks.filter(
    (block) => block.start.getFullYear() === new Date().getFullYear()
  );

  /*
  console.log("Free time blocks between events:");
  freeYearBlocks.forEach((block) => {
    console.log(`Free from ${block.start} to ${block.end}`);
  });
  */

  //
  //
  //
  //
  //
  //
  //
  //
  //

  // a function that breaks a time block into multiple sub blocks if it spans over multiple days
  function splitTimeBlockOverDays(start, end) {
    const timeBlocks = [];
    let currentStart = new Date(start);

    while (currentStart < end) {
      const currentEnd = new Date(currentStart);
      currentEnd.setHours(23, 59, 59, 999);

      if (currentEnd > end) {
        timeBlocks.push({ start: currentStart, end: end });
        break;
      } else {
        timeBlocks.push({ start: currentStart, end: currentEnd });
        currentStart = new Date(currentEnd);
        currentStart.setMilliseconds(currentStart.getMilliseconds() + 1);
      }
    }

    return timeBlocks;
  }

  console.log("BREAKKKKKKK!!!!!!!");

  // find the time blocks in target week

  let freeYearSplit = [];

  freeYearBlocks.forEach((block) => {
    const splitBlocks = splitTimeBlockOverDays(block.start, block.end);
    freeYearSplit.push(...splitBlocks);
  });

  /*
  console.log(`year split length - ${freeYearSplit.length}`);
  freeYearSplit.forEach((block) => {
    console.log(`Free from ${block.start} to ${block.end}`);
  });
  */

  const freeWeekSplit = freeYearSplit.filter((block) => {
    return block.start >= firstDate && block.end <= lastDate;
  });

  freeWeekSplit.forEach((block) => {
    console.log(`Free from ${block.start} to ${block.end}`);
  });
});
