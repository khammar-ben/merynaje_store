"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { settings } from "@/data/settings";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { mainNav, samePath } from "@/lib/nav";
import { LangToggle } from "@/components/ui/LangToggle";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

const iconBtn =
  "relative h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-current/10 md:h-11 md:w-11";

export function Header() {
  const pathname = usePathname();
  const isHome = samePath(pathname, "/");
  const { t, l } = useI18n();
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over the home hero, cream everywhere else and once scrolled.
  const transparent = isHome && !scrolled;
  const showCount = cart.hydrated && cart.count > 0;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-(--ease-soft)",
          scrolled && "-translate-y-8",
        )}
      >
        <p className="flex h-8 items-center justify-center bg-wood-dark px-4 text-center text-[0.7rem] tracking-wide text-cream md:text-xs">
          {l(settings.topBar)}
        </p>
        <div
          className={cn(
            "transition-[background-color,color,box-shadow] duration-300",
            transparent
              ? "bg-transparent text-cream"
              : "bg-cream/95 text-ink shadow-[0_1px_0_rgb(201_164_92/0.35)] backdrop-blur-md",
          )}
        >
          <div className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-1 md:h-20 md:gap-2 lg:flex lg:justify-between">
            <div className="flex items-center lg:hidden">
              <button type="button" className={cn(iconBtn, "inline-flex")} onClick={() => setMenuOpen(true)} aria-label={t("nav.openMenu")}>
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              </button>
              <button type="button" className={cn(iconBtn, "inline-flex")} onClick={() => setSearchOpen(true)} aria-label={t("nav.search")}>
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>

            <Link href="/" className="justify-self-center rounded-full">
              <Logo onDark={transparent} />
            </Link>

            <nav aria-label={t("nav.menu")} className="hidden lg:block">
              <ul className="flex items-center gap-8 text-[0.95rem]">
                {mainNav.map((item) => {
                  const active = samePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative py-2 tracking-wide transition-opacity after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100",
                          active && "after:scale-x-100",
                        )}
                      >
                        {l(item.label)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center justify-self-end">
              <LangToggle className="me-2 hidden lg:flex" />
              <button
                type="button"
                className={cn(iconBtn, "hidden lg:inline-flex")}
                onClick={() => setSearchOpen(true)}
                aria-label={t("nav.search")}
              >
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                className={cn(iconBtn, "inline-flex")}
                onClick={cart.open}
                aria-label={t("nav.cartCount", { n: cart.hydrated ? cart.count : 0 })}
              >
                <ShoppingBag className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.5} />
                {showCount && (
                  <span
                    key={cart.count}
                    className="absolute end-1 top-1 inline-flex h-[1.15rem] min-w-[1.15rem] animate-fade-up items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-semibold text-ink tabular-nums"
                  >
                    {cart.count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
