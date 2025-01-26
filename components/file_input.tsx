import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export default function FileInput() {
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center gap-4"
      style={{ textAlign: "center" }}
    >
      <h1 className="text-8xl font-extrabold">Pro<span className="text-amber-200">Active</span></h1>
      <Input multiple className="w-1/4" name="files" type="file" />
      <Button color="default">Submit</Button>
    </div>
  );
}