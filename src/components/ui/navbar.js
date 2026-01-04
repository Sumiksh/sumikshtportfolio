'use client';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faHouse,
  faMoon,
  faSun,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar({ className }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const navLinks = [
    { name: "Home", href: "/", icon: faHouse },
    { name: "About", href: "/aboutpage", icon: faUser },
    { name: "Experience", href: "/experiencepage", icon: faBriefcase },
  ];

  return (
    <>
      {/* TOP BAR: Desktop & Tablet
          Hidden on the very smallest screens if you want a clean look, 
          but usually kept for the Logo + Theme Toggle.
      */}
      <nav
        className={`w-full fixed top-0 left-0 z-40 border-b transition-all duration-300 backdrop-blur-md
          ${isDark ? "bg-[#121214]/80 border-zinc-800" : "bg-white/80 border-gray-200"}
          ${className || ""}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3 md:py-4">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
              <FontAwesomeIcon icon={faCode} className="text-lg md:text-xl" />
            </div>
            <span className={`font-bold text-lg md:text-xl tracking-tight
              ${isDark ? "text-white" : "text-zinc-900"}`}>
              Sumiksh
            </span>
          </Link>

          {/* Desktop Links (Tablet and up: 768px+) */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2 lg:gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <NavigationMenuItem key={link.href}>
                      <Link
                        href={link.href}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                          ${isActive 
                            ? "bg-purple-500/10 text-purple-500" 
                            : (isDark ? "text-zinc-400 hover:text-white" : "text-zinc-600 hover:text-purple-600")}`}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Area: Theme Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="rounded-full w-10 h-10 hover:bg-purple-500/10 transition-colors"
            >
              {mounted && (
                <FontAwesomeIcon
                  icon={isDark ? faSun : faMoon}
                  className={`h-5 w-5 transition-all duration-500 ${isDark ? "text-yellow-400 rotate-0" : "text-zinc-700 rotate-[360deg]"}`}
                />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* MOBILE FLOATING DOCK: Only visible below 768px
      */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6">
        <div className={`flex items-center justify-between w-full max-w-[400px] py-3 px-8 rounded-2xl border shadow-xl backdrop-blur-xl
          ${isDark ? "bg-zinc-900/90 border-zinc-700 shadow-black/40" : "bg-white/90 border-zinc-200 shadow-zinc-200/50"}`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className="flex flex-col items-center gap-1 group relative py-1"
              >
                <div className={`p-2 rounded-xl transition-all duration-300 
                  ${isActive ? "text-purple-500 scale-110" : "text-zinc-500 hover:text-purple-400"}`}>
                  <FontAwesomeIcon icon={link.icon} className="text-xl" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-purple-500" : "text-zinc-500"}`}>
                  {link.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 w-12 h-[2px] bg-purple-500 rounded-full blur-[1px]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Spacer to prevent content from going under the fixed top nav */}
      <div className="h-16 md:h-20" />
    </>
  );
}