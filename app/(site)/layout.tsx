// Every page except the home page starts below the fixed header.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="pt-(--header-h)">{children}</div>;
}
