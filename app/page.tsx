// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
// import { button as buttonStyles } from "@heroui/theme";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center gap-4"
      style={{ textAlign: "center" }}
    >
      <h1 className="text-8xl font-extrabold">Pro<span className="text-blue-300">Active</span></h1>
      <Input multiple className="w-1/4" name="files" type="file" />
      <Button color="default">Submit</Button>
    </div>
  );
}
