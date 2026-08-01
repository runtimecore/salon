import type { Service } from "@/lib/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-sand bg-white/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg hover:shadow-gold/5">
      {service.popular && (
        <span className="absolute right-5 top-5 rounded-full bg-blush/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-rose">
          Popular
        </span>
      )}
      <h3 className="pr-16 text-xl text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-sand pt-4">
        <span className="text-xs uppercase tracking-wider text-muted">
          {service.duration}
        </span>
        <span className="font-serif text-lg text-gold-dark">{service.price}</span>
      </div>
    </div>
  );
}
