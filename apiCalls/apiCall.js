import OpenAI from "openai";
const openai = new OpenAI();

const priority = ["sports", "cooking", "cycling"];

{priority} 
const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful time-table scheduling assistant." },
        {
            role: "user",
            content: "I have free time slots for these days of the week: \
            Monday: {1:00-4:00, 6:00-9:00}, Tuesday: {3:00-5:00, 10:00-12:00} \
            I want to do these activities this is a ranked priority list: \
            [Study for Courses, Work on personal project, Spend time with friends]. tell me when and how much time I should allocate to each activity. Just give me a concise summary\
            Give me the output in this format (its a dictionary of dictionaries where the first key is the name of the day and the nested dictionary \
            key is the name of the activity and value is the time slots. \
            Example output: {'Monday': {'Activity1': 1:00-4:00}, 'Tuesday': {'Activity2': 3:00-5:00}} Give me the output in this format WITHOUT UNEXPECTED CHANGES. NO NEW LINE CHARACTERS"
            ,
        },
    ],
    store: true,
});

console.log(completion.choices[0].message.content);




