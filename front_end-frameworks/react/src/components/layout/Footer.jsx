import Brand from "../ui/Brand.jsx";
import SocialLink from "../ui/SocialLink.jsx"
import LinkList from "../ui/LinkList.jsx"

export default function Footer() {
  const linkLists = [
    {
      title: "Navigation",
      links: [
        { text: "Hero section", link: "#hero-section" },
        { text: "About", link: "#about-section" },
        { text: "Features", link: "#features-section" },
        { text: "Insights", link: "#insights-section" },
        { text: "Contact", link: "#contact-section" },
      ],
    },
    {
      title: "Holberton School",
      links: [
        { text: "About", link: "https://www.holbertonschool.fr" },
        { text: "Methodology", link: "https://www.holbertonschool.fr/methodologie" },
        { text: "Story", link: "https://www.holbertonschool.fr/a-propos" },
        { text: "Agenda", link: "https://www.holbertonschool.fr" },
      ],
    },
    {
      title: "Curriculum",
      links: [
        { text: "Bachelor", link: "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering" },
        { text: "Program", link: "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering#programme" },
      ],
    },
  ];

  return (
    <footer className="bg-black px-8 pb-24">
      <div className="max-w-6xl mx-auto pt-24 pb-12 flex flex-col md:grid md:grid-cols-5 gap-8">
        <div className="flex flex-col col-span-2 gap-4">
          <Brand />
          <p className="text-xs text-slate-500">
            Explore the future of development with Agentic AI.
          </p>
          <div className="flex gap-2">
            <SocialLink href="https://www.instagram.com/holbertonfrance" label="Instagram">
              <i className="bi bi-instagram text-slate-300 text-base"></i>
            </SocialLink>
            <SocialLink href="https://www.tiktok.com/@holbertonfrance" label="TikTok">
              <i className="bi bi-tiktok text-slate-300 text-base"></i>
            </SocialLink>
            <SocialLink href="https://x.com/holbertonfra" label="X">
              <i className="bi bi-twitter-x text-slate-300 text-base"></i>
            </SocialLink>
            <SocialLink href="https://www.youtube.com/@HolbertonFrance" label="YouTube">
              <i className="bi bi-youtube text-slate-300 text-base"></i>
            </SocialLink>
          </div>
        </div>
        {linkLists.map((list, index) => (
          <LinkList key={index} title={list.title} links={list.links} />
        ))}
      </div>
      <hr className="my-6 text-slate-900"/>
      <div className="flex flex-col gap-4 sm:flex-row justify-between text-xs text-slate-500">
        <p>
          © 2026 Clément Callejon
        </p>

        <p>
          Built for the Holberton School Front-end Framework curriculum.
        </p>

      </div>
    </footer>
  );
}
