import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="px-5 pb-28 sm:px-10 md:pb-32">
      <div className="flex flex-col gap-4 border-t pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.15em]">Designed &amp; built in Pune</span>
        <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-foreground">
          Back to top
          <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
