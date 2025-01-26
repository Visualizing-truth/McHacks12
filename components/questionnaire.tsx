/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client";

import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider";
import React, { useState } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { ReactNode } from "react";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { ListboxWrapper } from "@/app/questions/page";
import OpenAI from "openai";
import { writeFileSync } from 'fs';
import { createEvents } from 'ics';
import { start } from "repl";
import fs from 'fs';
import { stringify } from "querystring";

console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export default function QuestionsPage() {
    const [fileInput, setFileInput] = useState("");

    const [selectedKeys, setSelectedKeys] = React.useState(
        new Set(["early bird"]),
    );

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys],
    );

    const [data, setData] = React.useState<string[]>([]);

    const [selectedMindset, setSelectedMindset] = React.useState(
        new Set(["text"]),
    );

    const AcadMindset = React.useMemo(
        () => Array.from(selectedMindset).join(", "),
        [selectedMindset],
    );
    const [sliderValue, setSliderValue] = React.useState(0);
    const [goals, setGoals] = React.useState<string[]>([]);
    const [message, setMessage] = React.useState<string>("");

    const handleCompile = async () => {
        const intro = "I want you to add activities to my available free time."
        const availability = "Monday 1300 to Monday 1600, Monday 2200 to Tuesday 0200, Tuesday 1300 to Tuesday 1600";
        const motivation = "I want to live more proactively and be in charge of my time."


        const rule1 = "Keep start time for social activities before 2200";
        const rule2 = "keep start time for sports activities before 2200";
        const rule3 = "Just give me a concise summary";

        const mood = data[0]; // early bird or night owl
        const personal_goals = data[1]; // goals
        const academic_mindset = data[2]; // academic mindset
        const course_load = data[3]; // course load-slider value


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

    return (
        <div className="flex flex-col items-center gap-8">
            <div
                className="w-full h-screen flex flex-col justify-center items-center gap-4"
                style={{ textAlign: "center" }}
            >
                <h1 className="text-8xl font-extrabold">
                    Pro<span className="text-amber-200">Active</span>
                </h1>
                <Input multiple className="w-1/4" name="files" type="file" onChange={(e) => setFileInput(e.target.value)} />
                <Button color="default">Submit</Button>
            </div>
            <div className="flex flex-col items-center gap-2">
                {/* <h3 className="text-default-500 text-large text-warning font-bold">
          Which of the following best describes you best?
        </h3> */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex justify-center">
                        <ListboxWrapper>
                            <Listbox
                                disallowEmptySelection
                                aria-label="Single selection example"
                                selectedKeys={selectedKeys}
                                selectionMode="single"
                                variant="flat"
                                onSelectionChange={(keys) => {
                                    setSelectedKeys(keys as Set<string>);
                                }}
                            >
                                <ListboxItem key="early bird" className="text-white">
                                    Early Bird 🕊️
                                </ListboxItem>
                                <ListboxItem key="night owl" className="text-white">
                                    Night Owl 🦉
                                </ListboxItem>
                            </Listbox>
                        </ListboxWrapper>
                    </div>
                    <p className="text-small text-default-500">
                        Selected value: {selectedValue}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <h3 className="text-default-500 text-large text-warning font-bold">
                    What are your personal goals?
                </h3>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Input
                            key={"outside"}
                            size="lg"
                            label="Enter your response as a semi-colon separated list" 
                            type="text" 
                            onChange={(e) => setMessage(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <h3 className="text-default-500 text-large text-warning font-bold">
                    What&apos;s your academic mindset?
                </h3>
                <div className="flex flex-col gap-2">
                    <ListboxWrapper>
                        <Listbox
                            disallowEmptySelection
                            aria-label="Single selection example"
                            selectedKeys={selectedMindset}
                            selectionMode="single"
                            variant="flat"
                            onSelectionChange={(keys) =>
                                setSelectedMindset(keys as Set<string>)
                            }
                        >
                            <ListboxItem key="chillin" className="text-white">
                                chillin
                            </ListboxItem>
                            <ListboxItem key="lock-in" className="text-white">
                                i need to lock in
                            </ListboxItem>
                            <ListboxItem key="comeback" className="text-white">
                                academic comeback
                            </ListboxItem>
                        </Listbox>
                    </ListboxWrapper>
                    <p className="text-small text-default-500">
                        Selected value: {AcadMindset}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <h3 className="text-default-500 text-large text-warning font-bold">
                    Rate your course load on the scale below
                </h3>
                <div className="flex w-full flex-wrap items-center justify-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Slider
                        classNames={{
                            base: "max-w-md gap-3",
                            track: "border-s-secondary-100",
                            filler: "bg-gradient-to-r from-secondary-100 to-secondary-500",
                        }}
                        label="Rate out of 100"
                        renderThumb={(props) => (
                            <div
                                {...props}
                                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                            >
                                <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                            </div>
                        )}
                        size="md"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Array.isArray(e) ? e[0] : e)}
                    />
                </div>
            </div>
            <Button
                color="primary"
                onPress={() => {
                    data.push(Array.from(selectedKeys).join(", "));
                    data.push(message);
                    data.push(Array.from(selectedMindset).join(", "));
                    data.push(sliderValue.toString());
                    console.log("Goals: " + goals);
                    console.log("Other Data: " + data);
                }}
            >
                Enhance my Calendar
            </Button>
        </div>
    );
}