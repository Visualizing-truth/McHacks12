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

  const sortedEvents = events.sort((a, b) => {
    return (
      new Date(a.getFirstPropertyValue("dtstart")).getTime() -
      new Date(b.getFirstPropertyValue("dtstart")).getTime()
    );
  });

  // sortedEvents check - working fine
  /*
  console.log(`sorted events length - ${sortedEvents.length}`);
  sortedEvents.forEach((block) => {
    console.log(sortedEvents);
  });
  */

  let sortedBlocks = [];
  sortedEvents.forEach((event) => {
    const startTime = new Date(
      event.getFirstPropertyValue("dtstart")
    ).getTime();
    const endTime = new Date(event.getFirstPropertyValue("dtend")).getTime();

    // console.log(startTime);
    sortedBlocks.push({ start: startTime, end: endTime });
  });

  // console.log(sortedBlocks);

  // list containing the start and end points of the free time blocks between the actual events
  let freeTimeBlocks = [];

  let prevEndTime = 0;
  let count = 0;

  for (let i = 0; i < sortedBlocks.length; i++) {
    let block = sortedBlocks[i];
    if (count === 0) {
      // first iteration of block so initialize first prevEndTime
      count++;
      prevEndTime = block.end;
      continue;
    }
    let currentStartTime = block.start;

    // add a free block only if free time more than 1 hour
    if (
      (new Date(currentStartTime).getTime() - new Date(prevEndTime).getTime()) /
        (1000 * 60 * 60) <
      1
    ) {
      prevEndTime = block.end;
      continue;
    }

    freeTimeBlocks.push({ start: prevEndTime, end: currentStartTime });
    prevEndTime = block.end;
  }

  /*
  console.log(`all free time block length - ${freeTimeBlocks.length}`);
  freeTimeBlocks.forEach((block) => {
    console.log(`Free from ${block.start} to ${block.end}`);
  });
  */

  //
  //
  //
  //
  //
  //

  // get all free blocks in current year
  let freeYearBlocks = freeTimeBlocks.filter(
    (block) => new Date(block.start).getFullYear() === new Date().getFullYear()
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
