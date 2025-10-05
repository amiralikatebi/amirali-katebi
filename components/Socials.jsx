import { Github, Linkedin, Mail } from "lucide-react";
import SocialMediaLink from "./SocialMediaLink";

function Socials() {
  return (
    <div className="flex gap-6 ">
      <SocialMediaLink link="https://www.linkedin.com/in/amirali-katebi-39a794344">
        <Linkedin />
      </SocialMediaLink>
      <SocialMediaLink link="https://github.com/amiralikatebi/">
        <Github />
      </SocialMediaLink>
      <SocialMediaLink link="mailto:amirali.katebi5@gmail.com">
        <Mail />
      </SocialMediaLink>
    </div>
  );
}

export default Socials;
