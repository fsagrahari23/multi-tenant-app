'use client';

import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { createBlog, deleteBlog, getlistOfBlog } from "./action";
import { useOrganization } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SelectBlogType } from "@/db/schema";

export default function OrgLandingPage() {
  const [blogContent, setBlogContent] = useState<string>("");
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogs, setBlogs] = useState<SelectBlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { organization } = useOrganization();
  const router = useRouter();

  const handleCreateBlog = async () => {
    if (!organization) {
      toast.error("Organization not found");
      return;
    }

    const res = await createBlog({
      title: blogTitle.trim(),
      content: blogContent.trim(),
      orgId: organization.id,
    });

    if (res) {
      toast.success("Blog created successfully");
      setBlogTitle("");
      setBlogContent("");
      fetchBlogs(); // refresh blog list
    }
  };

  const fetchBlogs = async () => {
    if (!organization?.id) return;
    setLoading(true);
    const res = await getlistOfBlog(organization.id);
    setBlogs(res);
    setLoading(false);
  };

  const handleView = (id: string) => {
    router.push(`/org/${organization?.id}/blog/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    const res = await deleteBlog(id);
    if (res?.success) {
      toast.success("Blog deleted");
      fetchBlogs(); // Refresh the list
    } else {
      toast.error("Failed to delete blog");
    }
  };

  useEffect(() => {
    if (organization?.id) {
      fetchBlogs();
    }
  }, [organization?.id]);

  return (
    <main>
      <Navbar />
      <h3 className="font-bold text-2xl text-center mt-4">Create a Blog</h3>

      <div className="p-10">
        <Input
          className="mb-2"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Enter your blog title here..."
        />
        <Textarea
          className="mb-2"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          placeholder="Write your blog content here..."
        />
        <Button className="mt-2" onClick={handleCreateBlog}>
          Create a Blog
        </Button>
      </div>

      <div className="p-10">
        <h4 className="font-bold mb-4 text-xl">All Blogs</h4>
        {loading ? (
          <p className="text-sm text-muted-foreground text-center">Loading blogs...</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="mb-4 p-4 border rounded-md shadow-sm"
            >
              <h5 className="text-lg font-semibold">{blog.title}</h5>
              <p className="text-sm text-gray-700 mb-2">{blog.content}</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleView(blog.id)}>
                  View
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            No blogs found.
          </p>
        )}
      </div>
    </main>
  );
}
