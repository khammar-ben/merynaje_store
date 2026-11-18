import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-start", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag id={id} className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-[2.6rem]">
        {title}
      </Tag>
      <div className={cn("gold-rule mt-4 w-24", align === "center" ? "mx-auto" : "")} />
      {subtitle && (
        <p className={cn("mt-4 max-w-xl text-muted", align === "center" && "mx-auto")}>{subtitle}</p>
      )}
    </div>
  );
}
