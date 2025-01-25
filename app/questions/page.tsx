import { title } from "@/components/primitives";
import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider";
import { Select, SelectItem } from "@heroui/select";


export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

export default function PricingPage() {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">What are your personal goals?</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">What are your personal goals?</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            key={"outside"}
            // description={"outside"}
            label="Email"
            // labelPlacement={"outside"}
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">Which of the following describes your academic status the best?</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">

          <Input
            key={"outside"}
            // description={"outside"}
            label="Email"
            // labelPlacement={"outside"}
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-default-500 text-small">How much social time would you be able to allocate between classes?</h3>
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
        <h3 className="text-default-500 text-small">Rate your course load on the scale below</h3>
        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">

          <Input
            key={"outside"}
            // description={"outside"}
            label="Email"
            // labelPlacement={"outside"}
            type="text"
          />
        </div>
      </div>



    </div>
  );
}
