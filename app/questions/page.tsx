"use client";

import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider";
import React from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";


type OverlayPlacement =
  | "top-start"
  | "top"
  | "top-end"

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

  const content = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-small font-bold">Popover Content</div>
        <div className="text-tiny">This is the popover content</div>
      </div>
    </PopoverContent>
  );

  const placements = [
    "chillin",
    "i need to lock in",
    "academic comeback",
  ];


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-large">
          Are you an early bird or a night owl?
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <ListboxWrapper>
              <Listbox
                disallowEmptySelection
                aria-label="Single selection example"
                selectedKeys={selectedKeys}
                selectionMode="single"
                variant="flat"
                onSelectionChange={(keys) =>
                  setSelectedKeys(keys as Set<string>)
                }
              >
                <ListboxItem key="early bird">Early Bird</ListboxItem>
                <ListboxItem key="night owl">Night Hedwig</ListboxItem>
              </Listbox>
            </ListboxWrapper>
          </div>
          <p className="text-small text-default-500">
            Selected value: {selectedValue}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">
          What are your personal goals?
        </h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            key={"outside"}
            // description={"outside"}
            label="Enter your response here"
            // labelPlacement={"outside"}
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">
          Which of the following describes your academic mindset the best?
        </h3>
        <div className="flex flex-wrap md:inline-grid md:grid-cols-3 gap-4">
          {placements.map((placement) => (
            <Popover
              key={placement}
              color="secondary"
              placement={placement as OverlayPlacement}
            >
              <PopoverTrigger>
                <Button className="capitalize" color="secondary" variant="flat">
                  {placement.replace("-", " ")}
                </Button>
              </PopoverTrigger>
              {content}
            </Popover>
          ))}
        </div>

      </div>
      

      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">
          Rate your course load on the scale below
        </h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Slider
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500",
            }}
            defaultValue={30}
            label="Rate out of 100"
            renderThumb={(props) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
              </div>
            )}
            size="sm"
          />
        </div>


      </div>
    </div>

  );
}






