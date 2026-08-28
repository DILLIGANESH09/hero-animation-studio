import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";
import HomeHeroLandingScrollAnimation from "@/components/ui/home-hero-landing-scroll-animation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dilli Ganesh — Product Engineer & Interface Designer" },
      {
        name: "description",
        content:
          "Portfolio of Dilli Ganesh: product engineering, interface design, and motion work for teams shipping software people actually enjoy using.",
      },
      { property: "og:title", content: "Dilli Ganesh — Product Engineer & Interface Designer" },
      {
        property: "og:description",
        content:
          "Selected work in product engineering, interface design, and motion for modern web products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const work = [
  {
    year: "2026",
    title: "Meridian",
    role: "Design + Frontend",
    note: "Analytics workspace rebuilt around a single keyboard-first command surface.",
  },
  {
    year: "2025",
    title: "Fieldnote",
    role: "Product Engineering",
    note: "Offline-first research app for teams doing interviews in the wild.",
  },
  {
    year: "2025",
    title: "Halva Studio",
    role: "Art Direction + Build",
    note: "Editorial site with scroll-driven typography and a very small JS budget.",
  },
  {
    year: "2024",
    title: "Ordinal",
    role: "Design System",
    note: "Tokenised component library adopted across four product teams.",
  },
];

const capabilities = [
  ["Interface design", "Layout, type, colour, and the small details that make a screen feel calm."],
  ["Frontend engineering", "React, TypeScript, Tailwind. Accessible, fast, maintainable."],
  ["Motion", "Scroll and state choreography that explains the product instead of decorating it."],
  ["Design systems", "Tokens, primitives, docs — so the tenth screen is as good as the first."],
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
        <span className="font-display text-sm font-medium tracking-tight text-background">
          Dilli Ganesh
        </span>
        <a
          href="#contact"
          className="text-sm text-background underline-offset-4 hover:underline"
        >
          Get in touch
        </a>
      </header>

      <HomeHeroLandingScrollAnimation />

      <section id="work" className="mx-auto w-full max-w-5xl px-5 py-24 md:px-10 md:py-36">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl md:text-5xl">Selected work</h2>
          <span className="text-sm text-muted-foreground">2024 — 2026</span>
        </div>

        <ul className="mt-12">
          {work.map((item) => (
            <li key={item.title} className="rule-line group py-7">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                <span className="w-14 shrink-0 text-sm text-muted-foreground">{item.year}</span>
                <div className="flex-1">
                  <h3 className="flex items-center gap-2 text-2xl md:text-3xl">
                    {item.title}
                    <ArrowUpRight className="size-5 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 max-w-xl text-muted-foreground">{item.note}</p>
                </div>
                <span className="text-sm text-muted-foreground md:w-44 md:text-right">
                  {item.role}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto w-full max-w-5xl px-5 py-24 md:px-10 md:py-36">
          <p className="max-w-3xl text-2xl leading-snug md:text-4xl">
            I&apos;ve spent the last eight years between design and engineering — close enough to
            both that nothing gets lost in the handoff. I like products with real constraints:
            dense data, tight deadlines, users who don&apos;t have time to be impressed.
          </p>

          <dl className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {capabilities.map(([title, body]) => (
              <div key={title}>
                <dt className="font-display text-lg">{title}</dt>
                <dd className="mt-2 text-sm leading-relaxed opacity-70">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-5xl px-5 py-24 md:px-10 md:py-40">
        <h2 className="text-4xl md:text-7xl">Have something worth building?</h2>
        <p className="mt-6 max-w-lg text-muted-foreground">
          Available for select freelance and contract work. Tell me about the problem, not the
          feature list.
        </p>
        <a
          href="mailto:hello@dilliganesh.com"
          className="mt-10 inline-flex items-center gap-3 border-b border-accent pb-1 text-xl text-accent transition-opacity hover:opacity-70 md:text-2xl"
        >
          <Mail className="size-5" />
          hello@dilliganesh.com
        </a>
      </section>

      <footer className="rule-line mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground md:flex-row md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} Dilli Ganesh</span>
        <span>Chennai, India — working worldwide</span>
      </footer>
    </main>
  );
}
