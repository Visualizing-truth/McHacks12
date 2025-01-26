"use client";

import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider";
import React from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";

type OverlayPlacement = "top-start" | "top" | "top-end";

export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function QuestionsPage() {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["early bird"]),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  const data: string[] = [];

  const [selectedMindset, setSelectedMindset] = React.useState(
    new Set(["text"]),
  );

  const AcadMindset = React.useMemo(
    () => Array.from(selectedMindset).join(", "),
    [selectedMindset],
  );

//   const [message, setMessage] = React.useState("");

  const [sliderValue, setSliderValue] = React.useState(0);

//   const content = (
//     <PopoverContent>
//       <div className="px-1 py-2">
//         <div className="text-small font-bold">Popover Content</div>
//         <div className="text-tiny">This is the popover content</div>
//       </div>
//     </PopoverContent>
//   );

//   const placements = ["chillin", "i need to lock in", "academic comeback"];
  const [goals, setGoals] = React.useState<string[]>([]);

  return (
    <div className="flex flex-col items-center gap-8">
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
                <ListboxItem className="text-white" key="early bird">
                  Early Bird 🕊️
                </ListboxItem>
                <ListboxItem className="text-white" key="night owl">
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
            <Checkbox
              color="default"
              onChange={() => setGoals((prevGoals) => [...prevGoals, "Physical Health"])}
            >
              Physical Health
            </Checkbox>
            <Checkbox
              color="primary"
              onChange={() => setGoals((prevGoals) => [...prevGoals, "Mental Health"])}
            >
              Mental Health
            </Checkbox>
          </div>
          <div className="flex gap-4">
            <Checkbox
              color="success"
              onChange={() => setGoals((prevGoals) => [...prevGoals, "Academics"])}
            >
              Academics
            </Checkbox>
            <Checkbox
              color="warning"
              onChange={() => setGoals((prevGoals) => [...prevGoals, "Social Life"])}
            >
              Social Life
            </Checkbox>
            <Checkbox
              color="danger"
              onChange={() => setGoals((prevGoals) => [...prevGoals, "Career"])}
            >
              Career
            </Checkbox>
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
              <ListboxItem className="text-white" key="chillin">
                chillin
              </ListboxItem>
              <ListboxItem className="text-white" key="lock-in">
                i need to lock in
              </ListboxItem>
              <ListboxItem className="text-white" key="comeback">
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
            value={sliderValue}
            onChange={(e) => setSliderValue(Array.isArray(e) ? e[0] : e)}
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
          />
        </div>
      </div>
      <Button
        color="primary"
        onPress={() => {
          data.push(Array.from(selectedKeys).join(", "));
        //   data.push(message);
          data.push(Array.from(selectedMindset).join(", "));
          data.push(sliderValue.toString());
          console.log("Goals: "+goals);
          console.log("Other Data: "+data);
        }}
      >
        Enhance my Calendar
      </Button>
    </div>
  );
}
