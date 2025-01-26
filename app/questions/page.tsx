"use client";

import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider";
import React from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { ReactNode } from "react";

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
          Which of the following describes your academic status the best?
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
          How much social time would you be able to allocate between classes?
        </h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Slider
            aria-label="Temperature"
            className="max-w-md"
            defaultValue={0.2}
            maxValue={1}
            minValue={0}
            size="sm"
            step={0.01}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">
          Rate your course load on the scale below
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
    </div>
  );
}

// export default function App() {
//   const placements = ["inside", "outside", "outside-left"];

//   return (
//     <div className="w-full flex flex-col gap-4">
//       <div className="flex flex-col gap-2"></div>
//       <div className="flex flex-col gap-2">
//         <h3 className="text-default-500 text-small">With placeholder</h3>
//         <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
//           {placements.map((placement) => (
//             <Select
//               key={placement}
//               className="max-w-xs"
//               label="Favorite Animal"
//               labelPlacement={placement}
//               placeholder="Select an animal"
//             >
//               {animals.map((animal) => (
//                 <SelectItem key={animal.key}>{animal.label}</SelectItem>
//               ))}
//             </Select>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
