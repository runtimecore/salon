import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BookButton from "@/components/BookButton";
import Reveal from "@/components/Reveal";
import { Caliper, Waveform, Vial, Credential } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the licensed team behind ${site.name} — a medical spa built on written plans, unit pricing, and telling you exactly what was done.`,
};

const shell = "mx-auto w-full max-w-[84rem] px-6 lg:px-12";

// TODO: replace with real providers, photos, and license numbers before launch.
const team = [
  {
    name: "Elena Marchetti",
    role: "Founder & Medical Director",
    photo: "/images/team-founder.png",
  },
  {
    name: "Priya Nair",
    role: "Nurse Injector, RN",
    photo: "/images/team-nurse-injector.png",
  },
  {
    name: "Jordan Kim",
    role: "Licensed Esthetician",
    photo: "/images/team-esthetician.png",
  },
  {
    name: "Camila Torres",
    role: "Patient Care Coordinator",
    photo: "/images/team-care-coordinator.png",
  },
];

// TODO: the medical director should confirm each of these claims — they are
// promises to patients, and they appear on a live page.
const standards = [
  {
    title: "Mapped before we begin",
    body: "Every plan starts with a provider marking what is treatable and what is not. You leave the consultation with that written down, whether or not you book.",
    Icon: Caliper,
  },
  {
    title: "Medical-grade devices",
    body: "Our laser, RF, and IPL platforms are FDA-cleared for the treatments we offer and serviced on schedule. The settings used on you are recorded in your chart.",
    Icon: Waveform,
  },
  {
    title: "Priced by the unit",
    body: "Neurotoxin is charged per unit and filler per syringe. You pay for what actually went in, not for a package that assumed a number in advance.",
    Icon: Vial,
  },
  {
    title: "Licensed providers only",
    body: "Injections are performed by licensed medical professionals working under our medical director. Nobody treats you who is not credentialed to.",
    Icon: Credential,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A clinic that shows its work"
        subtitle={`Too many people leave a medical spa unable to name what was done to them. ${site.name} was built to be the opposite: a depth, a dose, and a price you can repeat back.`}
      />

      {/* Story */}
      <section className={`${shell} surface-bleed py-16 lg:py-24`}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-sage">
              <Image
                src="/images/about-interior.png"
                alt={`A private treatment room at ${site.name}`}
                fill
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              <p className="label flex items-center gap-3 text-jade">
                <span aria-hidden className="h-px w-8 bg-jade" />
                Why we opened
              </p>
              <h2 className="mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)]">
                Built around the consultation
              </h2>
              <p className="mt-6 leading-relaxed text-slate">
                Our founder spent a decade in dermatology watching patients
                arrive with a treatment name and no idea what it did. The fix
                was not a softer room. It was a longer first appointment, a
                written plan, and the discipline to say when a treatment is not
                worth your money.
              </p>
              <p className="mt-4 leading-relaxed text-slate">
                So that is what {site.name} is. One private room per client,
                providers who are credentialed for what they perform, and a
                menu organised by what each treatment physically does rather
                than by how it markets.
              </p>
              <div className="mt-9">
                <BookButton>Book a consultation</BookButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Standards */}
      <section className="border-y border-mist bg-surface-raised py-16 lg:py-24">
        <div className={shell}>
          <Reveal>
            <p className="label flex items-center gap-3 text-jade">
              <span aria-hidden className="h-px w-8 bg-jade" />
              What you can hold us to
            </p>
            <h2 className="mt-6 max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)]">
              Four standards, no exceptions
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-mist sm:grid-cols-2 lg:grid-cols-4">
            {standards.map((standard, i) => (
              <Reveal key={standard.title} delay={i * 80}>
                <div className="relative pt-7">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[3px] w-[3px] bg-jade"
                  />
                  <standard.Icon className="h-7 w-7 text-jade" />
                  <h3 className="mt-4 text-lg">{standard.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate">
                    {standard.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`${shell} surface-bleed py-16 lg:py-24`}>
        <Reveal>
          <div className="flex flex-col justify-between gap-4 border-b border-mist pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="label flex items-center gap-3 text-jade">
                <span aria-hidden className="h-px w-8 bg-jade" />
                The team
              </p>
              <h2 className="mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)]">
                Who will be treating you
              </h2>
            </div>
            <p className="num text-[0.6875rem] text-muted">
              {team.length} providers · {site.city}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 4) * 70}>
              <div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-sage">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 text-lg">{member.name}</h3>
                <p className="label-sm mt-2 text-jade">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
