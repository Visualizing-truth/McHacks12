import {Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/button";
import FileInput from "@/components/file_input";
import Questionnaire from "@/components/questionnaire";

export default function Page() {
  return (
    <div>
      <FileInput />
      <Questionnaire />
    </div>
  );
}

// type OverlayPlacement = 
//   | "top-start"
//   | "top"
//   | "top-end"

// export default function App() {
//   const content = (
//     <PopoverContent>
//       <div className="px-1 py-2">
//         <div className="text-small font-bold">Popover Content</div>
//         <div className="text-tiny">This is the popover content</div>
//       </div>
//     </PopoverContent>
//   );

//   const placements = [
//     "top-start",
//     "top",
//     "top-end",
//   ];

//   return (
//     <div className="flex flex-wrap md:inline-grid md:grid-cols-3 gap-4">
//       {placements.map((placement) => (
//         <Popover
//           key={placement}
//           color="secondary"
//           placement={placement as OverlayPlacement}
//         >
//           <PopoverTrigger>
//             <Button className="capitalize" color="secondary" variant="flat">
//               {placement.replace("-", " ")}
//             </Button>
//           </PopoverTrigger>
//           {content}
//         </Popover>
//       ))}
//     </div>
//   );
// } 