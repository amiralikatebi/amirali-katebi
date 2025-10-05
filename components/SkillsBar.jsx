import BlenderIcon from "@/public/icons/BlenderIcon";
import CSSIcon from "@/public/icons/CSSIcon";
import DjangoIcon from "@/public/icons/DjangoIcon";
import ExpressIcon from "@/public/icons/ExpressIcon";
import HtmlIcon from "@/public/icons/HtmlIcon";
import JavaIcon from "@/public/icons/JavaIcon";
import JSIcon from "@/public/icons/JSIcon";
import MongoIcon from "@/public/icons/MongoIcon";
import MybatisIcon from "@/public/icons/MybatisIcon";
import MySQLIcon from "@/public/icons/MySQLIcon";
import NextIcon from "@/public/icons/NextIcon";
import NodeIcon from "@/public/icons/NodeIcon";
import PrismaIcon from "@/public/icons/PrismaIcon";
import PythonIcon from "@/public/icons/PythonIcon";
import ReactIcon from "@/public/icons/ReactIcon";
import RedisIcon from "@/public/icons/RedisIcon";
import SpringIcon from "@/public/icons/SpringIcon";
import SupabaseIcon from "@/public/icons/SupabaseIcon";
import TailwindIcon from "@/public/icons/TailwindIcon";
import ThreeJSIcon from "@/public/icons/ThreeJSIcon";
import ViteIcon from "@/public/icons/ViteIcon";

export default function SkillsBar() {
  return (
    <div className="flex flex-col w-full gap-6 px-6 py-4 shadow-[0_0px_1.2px_rgb(140,140,140)] rounded-lg ">
      <h2 className="text-lg">
        ⚙️ <span className="text-green-200 opacity-60">Tech Stack</span>
      </h2>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex justify-between w-full">
          <HtmlIcon className="skillsIcon" />
          <CSSIcon className="skillsIcon" />
          <JSIcon className="skillsIcon" />
          <ReactIcon className="skillsIcon" />
          {/* <ViteIcon className="skillsIcon" /> */}
          <TailwindIcon className="skillsIcon" />
          <NodeIcon className="skillsIcon" />
          <NextIcon className="skillsIcon" />
        </div>
        <div className="flex justify-start gap-6 w-full">
          <ThreeJSIcon className="skillsIcon" />
          {/* <BlenderIcon className="skillsIcon" /> */}
          <PythonIcon className="skillsIcon" />
          <DjangoIcon className="skillsIcon" />
          {/* <JavaIcon className="skillsIcon" /> */}
          {/* <SpringIcon className="skillsIcon" /> */}
          <MySQLIcon className="skillsIcon" />
          {/* <PrismaIcon className="skillsIcon" />
          <ExpressIcon className="skillsIcon" /> */}
          {/* <MongoIcon className="skillsIcon" />
          <SupabaseIcon className="skillsIcon" />
          <RedisIcon className="skillsIcon" /> */}
        </div>
      </div>
    </div>
  );
}
