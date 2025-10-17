
import Description from "@/components/Description";
import Github from "@/components/Github";
import MotionDivWrapper from "@/components/MotionDivWrapper";
import { getBlogs } from "@/lib/blog";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex flex-col gap-10 "
    >
      <Description page="Github" description="" />
      <Github blogs={blogs} />
    </MotionDivWrapper>
  );
}
