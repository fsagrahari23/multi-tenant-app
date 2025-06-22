import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { blogTable } from "@/db/schema";
import {clerkClient} from "@clerk/nextjs/server"
import { eq } from "drizzle-orm";

interface Params{
  subdomain:string
}

export default async function Page({params}:{params:Promise<Params>}) {
  const {subdomain} = await params;
  const client = await clerkClient();
  const org = await client.organizations.getOrganization({slug:subdomain});
  const orgId = org.id;
  console.log(subdomain);
 const getlistOfBlog = async () => {
     const res = await db
       .select()
       .from(blogTable)
       .where(eq(blogTable.orgId, orgId));
   
     return res;
   };
  const blogs =await getlistOfBlog();

  // const handleView = (id: string) => {
  //   router.push(`/org/${organization?.id}/blog/${id}`);
  // };

  // const handleDelete = async (id: string) => {
  //   const confirmed = confirm("Are you sure you want to delete this blog?");
  //   if (!confirmed) return;

  //   const res = await deleteBlog(id);
  //   if (res?.success) {
  //     toast.success("Blog deleted");
  //     fetchBlogs(); // Refresh the list
  //   } else {
  //     toast.error("Failed to delete blog");
  //   }
  // };

 return (
    <div className="p-10">
      <h4 className="font-bold mb-4 text-xl">All Blogs</h4>

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="mb-4 p-4 border rounded-md shadow-sm">
            <h5 className="text-lg font-semibold">{blog.title}</h5>
            <p className="text-sm text-gray-700 mb-2">{blog.content}</p>
            <div className="flex gap-2">
              <Button variant="outline">View</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground text-center">
          No blogs found.
        </p>
      )}
    </div>
  );
}