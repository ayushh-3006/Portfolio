import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow, Section, SectionLede, SectionTitle } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n";


export function Projects({ d }: { d: Dictionary["projects"] }) {
  return (
    <Section id="projects">
      <Reveal>
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">{d.title}</SectionTitle>
        <SectionLede className="mt-6">{d.lede}</SectionLede>
      </Reveal>

      <RevealGroup as="ul" gap={0.1} className="mt-14 grid gap-6 md:grid-cols-2">
        {d.items.map((project) => (
          <RevealItem
            as="li"
            key={project.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/5 bg-[#121212] transition-colors hover:bg-[#161616]"
          >
            {/* Top part: Image container */}
            <div className="relative w-full overflow-hidden bg-white/5 border-b border-white/5">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex aspect-[16/9] h-[300px] w-full flex-col items-center justify-center bg-surface/30">
                  <span className="text-faint font-mono text-[13px] font-bold uppercase tracking-widest">
                    {project.liveUrl ? "Image Coming Soon" : "BUILDING"}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom part: Content */}
            <div className="flex flex-1 flex-col p-8 md:p-10">
              <h3 className="text-ink text-[1.75rem] font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="text-muted mt-4 text-[1.0625rem] leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[12.5px] font-medium text-[#38bdf8]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Links */}
              <div className="mt-10 flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
                    aria-label={`View live ${project.title}`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:bg-white/5 hover:text-ink"
                    aria-label={`View ${project.title} source on GitHub`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
