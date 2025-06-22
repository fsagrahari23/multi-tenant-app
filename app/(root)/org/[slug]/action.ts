'use server'

import { blogTable, CreateBlogType, } from "@/db/schema"
import {db} from "@/db"
import { eq } from "drizzle-orm";

export const createBlog = async (payload: CreateBlogType) => {
  const res = await db
    .insert(blogTable)
    .values(payload)
    .returning({ id: blogTable.id, title: blogTable.title }); 

  return res[0]; 
};


export const getlistOfBlog = async (orgId: string) => {
  const res = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.orgId, orgId));

  return res;
};



export const deleteBlog = async (id: string) => {
  try {
    await db.delete(blogTable).where(eq(blogTable.id, id));
    return { success: true };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false };
  }
};