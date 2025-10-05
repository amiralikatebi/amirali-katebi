import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projectsdata } from "@/data/data_project";

export default function Projects() {
  return (
    <section>
      <ul className="grid w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-2 xl:grid-cols-3">
        {projectsdata.map((project) => {
          const host = new URL(project.link).host;
          const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${host}`;

          return (
            <li key={project._id}>
              <div className="relative flex flex-col items-start justify-center gap-6 p-5 border-dashed border-[0.8px] border-transparent rounded-2xl hover:border-muted-foreground hover:bg-muted">
                <div className="relative flex items-center justify-center w-12 h-12 shadow-[0_0px_3px_rgb(180,180,180)] rounded-full">
                  <Image
                    src={project.imageUrl}
                    alt="logo"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>

                <div>
                  <h2 className="mb-4 font-semibold">{project.title}</h2>
                  <p className="text-sm font-light text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <Link
                  href={project.link}
                  target="_blank"
                  className="flex items-center justify-center gap-2 text-sm"
                >
                  <p>{host}</p>
                  <ExternalLink className="size-4" />
                </Link>

                {/* <div className="w-full mt-4 overflow-hidden rounded-md border border-muted">
                  <iframe
                    src={project.link}
                    className="w-full h-40"
                    loading="lazy"
                  />
                </div> */}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
