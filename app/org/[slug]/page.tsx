'use client';

import Navbar from "@/app/components/Navbar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function OrgLandingPage({ params }: Props) {
     const [blogcontent, setBlogContent] = useState<string>("");
     const [blogtitle, setBlogTitle] = useState<string>("");

    return (
    <main>
        <Navbar/>
        <h3>Inside Org page </h3>
        <div className="p-10">
            <Input className="mb-2"  onChange={(e) => {setBlogTitle(e.target.value)}} placeholder="Enter your blog title here..."/>
            <Textarea className="mb-2" onChange={(e) => {setBlogContent(e.target.value)}} placeholder="Write your blog content here..."/>
            <Button className="mt-2">Create a blog</Button>
        </div>
    </main>
  );
}
