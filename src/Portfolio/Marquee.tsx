import { marquee } from "@/data/portfolio";

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {marquee.map((tech) => (
        <span key={tech} className="flex items-center gap-10">
          <span className="whitespace-nowrap">{tech}</span>
          <svg viewBox="0 0 24 24" className="size-4 text-accent" aria-hidden>
            <path d="M12 2 C 15 8, 16 9, 22 12 C 16 15, 15 16, 12 22 C 9 16, 8 15, 2 12 C 8 9, 9 8, 12 2 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="mask-fade-x group overflow-hidden border-y py-6 text-2xl font-medium tracking-tight text-muted md:py-8 md:text-4xl">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
    </div>
  );
}
