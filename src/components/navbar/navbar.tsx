import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    return (
        <header className="sticky top-0 z-40 w-full bg-zinc-950 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <a href="/" className="flex-shrink-0">
                        <img
                            src="/logo.svg"
                            alt="Iqibla"
                            className="h-7 w-auto"
                        />
                    </a>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Dark / Light toggle */}
                        <button
                            onClick={() => setDark(!dark)}
                            aria-label="Mavzuni o'zgartirish"
                            className="relative w-14 h-7 rounded-full border border-zinc-700
                         bg-zinc-800 transition-colors duration-300
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                            {/* Track fill */}
                            <span
                                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                                    dark ? 'bg-zinc-700' : 'bg-zinc-800'
                                }`}
                            />
                            {/* Icons */}
                            <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                                <Moon size={13} className="text-zinc-400" />
                                <Sun size={13} className="text-amber-400" />
                            </span>
                            {/* Thumb */}
                            <span
                                className={`absolute top-0.5 w-6 h-6 rounded-full shadow
                             transition-all duration-300 flex items-center justify-center
                             ${
                                 dark
                                     ? 'left-0.5 bg-zinc-900'
                                     : 'left-[calc(100%-1.625rem)] bg-amber-400'
                             }`}
                            >
                                {dark ? (
                                    <Moon size={11} className="text-zinc-300" />
                                ) : (
                                    <Sun size={11} className="text-zinc-950" />
                                )}
                            </span>
                        </button>

                        {/* CTA */}
                        <a
                            href="#"
                            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-lg
                         bg-gradient-to-b from-amber-300 to-amber-500
                         text-zinc-950 text-sm font-semibold
                         hover:from-amber-200 hover:to-amber-400
                         transition-all duration-200 shadow-sm"
                        >
                            Bog'lanish
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="sm:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="sm:hidden bg-zinc-950 border-t border-zinc-800 px-4 pb-4 pt-3">
                    <a
                        href="#"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center px-4 py-2.5 rounded-lg
                       bg-gradient-to-b from-amber-300 to-amber-500
                       text-zinc-950 text-sm font-semibold
                       hover:from-amber-200 hover:to-amber-400 transition-all"
                    >
                        Bog'lanish
                    </a>
                </div>
            )}
        </header>
    );
}
