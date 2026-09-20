import type { Metadata } from "next";
import { CTASection, EventCard, Footer, HeroSection, ImpactCard, InvolvementCard, Navbar, ProgramCard, SectionHeader, StoryCard } from "@/components/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Building Legacies. Impacting Lives.", "AAN Legacy Foundation creates opportunities through education, scholarships, youth empowerment, humanitarian support, and community development.", "/");

const programs = [
  ["01", "Education & Scholarships", "Creating pathways to learning and opportunity. Program details and eligibility will be published when confirmed."],
  ["02", "Humanitarian & Community Support", "Responding to human need with dignity, care, and practical support shaped by community priorities."],
  ["03", "Youth Empowerment & Mentorship", "Equipping young people with guidance, confidence, and the relationships to shape their future."],
  ["04", "Community Development", "Supporting stronger communities through locally informed initiatives and shared responsibility."],
] as const;

const involvement = [
  ["01", "Donate", "Help create opportunities when the foundation's giving channels are ready to receive support."],
  ["02", "Volunteer", "Bring your time, skills, and care to the work as volunteer opportunities are confirmed."],
  ["03", "Become a Mentor", "Share perspective and encouragement with young people through a future mentorship program."],
  ["04", "Partner With Us", "Explore thoughtful partnership when AAN's collaboration process and priorities are published."],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--ivory)]">
      <Navbar />
      <HeroSection />
      <section id="main-content" className="relative overflow-hidden bg-[var(--gold-500)] py-20 lg:py-28">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-[rgba(13,45,34,0.12)] lg:block" aria-hidden="true" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeader eyebrow="The ripple of change" title="Change starts with one." />
          <div className="border-l-2 border-[var(--forest-950)] pl-6 sm:pl-10">
            <p className="display-text text-3xl leading-tight text-[var(--forest-950)] sm:text-5xl">One person can change a family.</p>
            <p className="display-text mt-5 text-3xl leading-tight text-[var(--forest-950)] sm:ml-12 sm:text-5xl">One family can change a generation.</p>
            <p className="display-text mt-5 text-3xl leading-tight text-[var(--forest-950)] sm:ml-24 sm:text-5xl">One generation can change the world.</p>
          </div>
        </div>
      </section>
      <section id="about" className="section-shell grid gap-14 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
        <div><SectionHeader eyebrow="Why AAN?" title="A name held by many." description="AAN is not only a name. It represents people, gratitude, purpose, and a commitment to impact lives." /></div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="group border-t-2 border-[var(--forest-950)] bg-[var(--paper)] p-6 shadow-[var(--shadow-sm)] transition-transform hover:-translate-y-1 sm:p-8"><span className="display-text text-7xl text-[var(--forest-800)]">A</span><h3 className="mt-12 text-xl font-bold text-[var(--forest-950)]">Amoako</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">A family whose positive role helped shape the founder&apos;s academic and personal journey.</p></div>
          <div className="group border-t-2 border-[var(--gold-500)] bg-[var(--paper)] p-6 shadow-[var(--shadow-sm)] transition-transform hover:-translate-y-1 sm:mt-8 sm:p-8"><span className="display-text text-7xl text-[var(--gold-500)]">A</span><h3 className="mt-12 text-xl font-bold text-[var(--forest-950)]">Anson</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">A family remembered with gratitude and carried forward in a wider purpose.</p></div>
          <div className="group border-t-2 border-[var(--forest-600)] bg-[var(--paper)] p-6 shadow-[var(--shadow-sm)] transition-transform hover:-translate-y-1 sm:mt-16 sm:p-8"><span className="display-text text-7xl text-[var(--forest-600)]">N</span><h3 className="mt-12 text-xl font-bold text-[var(--forest-950)]">Nyarko</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">A family connected to the story of opportunity that inspired AAN&apos;s mission.</p></div>
        </div>
      </section>
      <section id="mission" className="bg-[var(--paper)] py-20 lg:py-28"><div className="section-shell grid gap-12 lg:grid-cols-2"><div className="border-l-2 border-[var(--gold-500)] pl-6 lg:pl-10"><p className="eyebrow">Our mission</p><h2 className="display-text mt-4 text-4xl leading-tight text-[var(--forest-950)] sm:text-5xl">Transforming lives by creating opportunities.</h2><p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">AAN Legacy Foundation is committed to transforming lives through education, scholarships, youth empowerment, mentorship, humanitarian support, and community development.</p></div><div className="bg-[var(--forest-950)] p-8 sm:p-12"><p className="eyebrow text-[var(--gold-300)]">Our vision</p><p className="display-text mt-4 text-3xl leading-tight text-white sm:text-4xl">A world where every young person and vulnerable individual can reach their full potential.</p><p className="mt-6 text-sm leading-7 text-white/65">A world where opportunity, support, and resources help people create a lasting impact.</p></div></div></section>
      <section id="programs" className="bg-[var(--ivory)] py-20 lg:py-28"><div className="section-shell"><SectionHeader eyebrow="Core areas of impact" title="Opportunity takes many forms." description="Our work is organized around four connected areas. Specific initiatives, locations, and outcomes will be added as they are confirmed by the foundation." /><div className="mt-12 grid gap-4 sm:grid-cols-2">{programs.map(([number, title, description]) => <ProgramCard key={number} number={number} title={title} description={description} />)}</div></div></section>
      <section id="impact" className="bg-[var(--forest-950)] py-20 lg:py-24"><div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"><SectionHeader eyebrow="Impact" title="Measure what matters." description="These are database-backed display slots for verified reporting. No figures are shown until the foundation has confirmed them." /><div className="grid gap-8 sm:grid-cols-3"><ImpactCard label="People reached" /><ImpactCard label="Scholarships awarded" /><ImpactCard label="Communities supported" /></div></div></section>
      <section id="stories" className="section-shell grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28"><SectionHeader eyebrow="Latest impact stories" title="Let people be seen, not counted." description="Stories will be added with consent, context, and care. This space is intentionally free of invented testimonials or outcomes." /><div><StoryCard label="Featured story" title="A place for a verified story of opportunity." description="A published story will appear here once the foundation has approved the details and permissions." /><StoryCard label="Community voice" title="A place for the people behind the work." description="Future stories can show the human meaning behind AAN&apos;s programs without reducing people to statistics." /></div></section>
      <section id="events" className="bg-[var(--paper)] py-20 lg:py-28"><div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]"><SectionHeader eyebrow="Upcoming events" title="Gathering with purpose." description="Upcoming events will appear here once dates, locations, and registration details are confirmed." /><EventCard /></div></section>
      <section id="involved" className="section-shell py-20 lg:py-28"><SectionHeader eyebrow="Get involved" title="Your next step can open a door." description="Choose the way you want to contribute. Public forms and payment flows will be added after the foundation confirms their operating details." /><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{involvement.map(([number, title, description]) => <InvolvementCard key={number} number={number} title={title} description={description} />)}</div></section>
      <CTASection />
      <Footer />
    </main>
  );
}
