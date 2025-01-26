import OpenAI from "openai";
import { writeFileSync } from 'fs';
import {createEvents} from 'ics';
import { start } from "repl";
import fs from 'fs';
import { stringify } from "querystring";

const openai = new OpenAI(); 


const handleCompile = async() => {
    const intro = "I want you to add activities to my available free time."
    const availability = "Monday 1300 to Monday 1600, Monday 2200 to Tuesday 0200, Tuesday 1300 to Tuesday 1600";
    const motivation = "I want to live more proactively and be in charge of my time."


    const rule1 = "Keep start time for social activities before 2200";
    const rule2 = "keep start time for sports activities before 2200";
    const rule3 = "Just give me a concise summary";



    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful time-table scheduling assistant." },
            {
                role: "user",
                content: ` I am a night owl, ${intro} + ${motivation} \
                While alotting the number of hours to each activity, keep in mind the priority of the activity.\
                Also, keep in mind the following rules: ${rule1}, ${rule2}, ${rule3}.\
                Here is my activity priority list starting from higher priority to lower priority: {Study for Courses, Work on personal project, Spend time with friends}.\
                This is my available free time for the next week:
                ${availability}\
                

                I want to do these activities this is a ranked priority list. The more the priority the more time that activity should be given: \
                [Study for Courses, Work on personal project, Spend time with friends]. Tell me when and how much time I should allocate to each activity with decreasing time commitments to low priority activies.\
                Give me the output as a string as the example input \


                Example output: Activity1@Monday^1300@Monday^1600@Activity2@Monday^2200@Tuesday^0100Activity3@Tuesday^1300@Tuesday^1600 \
                [Example Ends here]Give me the output in this format WITHOUT UNEXPECTED CHANGES. NO NEW LINE CHARACTERS, QUOTES AND SPACE\
                `
            },
        ],
        store: true,
    });

    }


const getDayIndex = async(day) => {
    switch(day.toLowerCase()){
        case "monday":
            return 0;
        case "tuesday":
            return 1;
        case "wednesday":
            return 2;
        case "thursday":
            return 3;
        case "friday":
            return 4;
        case "saturday":
            return 5;
        case "sunday":
            return 6;
    }
}

const getDate = async(index) => {
    let date = (27 + index);
    let month = 1;

    if (date > 31){
        date = date%31;
        month = 2;
    }
    return [month, date];

}

const schedulePre = completion.choices[0].message.content;
console.log(schedulePre)

const schedule = schedulePre.split("@");
console.log(schedule);

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


let i = 0;
while (i < schedule.length){
    let activityName = schedule[i];
    let startDay = schedule[i + 1].split("^")[0];
    let startTime = schedule[i + 1].split("^")[1];
    let endDay = schedule[i + 2].split("^")[0];
    let endTime = schedule[i + 2].split("^")[1];
    i += 3;

    let startIndex = getDayIndex(startDay);

    let startDate = getDate(startIndex)[1];
    let startMonth = getDate(startIndex)[0];

    startDate = startDate.toString();
    startMonth = startMonth.toString();
    let targetStartTime = `20250${startMonth}${startDate}T${startTime}000`;
    console.log(targetStartTime);

    const endIndex = getDayIndex(endDay);
    console.log(endIndex);

    
    let endDate = getDate(endIndex)[1];             
    let endMonth = getDate(endIndex)[0];

    endDate = endDate.toString();
    endMonth = endMonth.toString();
    console.log(endMonth);
    let targetEndTime = `20250${endMonth}${endDate}T${endTime}000`;
    console.log(targetEndTime);

     const icalContent = 
     `BEGIN:VEVENT
DTSTART;TZID=America/Toronto:${targetStartTime}
DTEND;TZID=America/Toronto:${targetEndTime}
SUMMARY:${activityName}
DESCRIPTION:Discuss project progress and next steps.
LOCATION:Conference Room
END:VEVENT\n`;

     fs.appendFileSync('my-calendar.ics', icalContent);
     console.log('iCalendar file updated!');
 

}

fs.appendFileSync('my-calendar.ics', 'END:VCALENDAR');
