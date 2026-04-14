import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, MessageCircle, Phone } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [contactsOpen, setContactsOpen] = useState(false);

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

                        {/* CTA - Bog'lanish */}
                        <div className="hidden sm:block relative">
                            <button
                                onClick={() => setContactsOpen(!contactsOpen)}
                                className="flex items-center px-4 py-1.5 rounded-lg
                             bg-gradient-to-b from-amber-300 to-amber-500
                             text-zinc-950 text-sm font-semibold
                             hover:from-amber-200 hover:to-amber-400
                             transition-all duration-200 shadow-sm"
                            >
                                Bog'lanish
                            </button>

                            {/* Desktop dropdown */}
                            {contactsOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50">
                                    {/* Instagram */}
                                    <a
                                        href="https://www.instagram.com/iqibla_watches?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setContactsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors border-b border-zinc-800"
                                    >
                                        <svg
                                            className="w-5 h-5 text-pink-500 flex-shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                Instagram
                                            </p>
                                            <p className="text-xs text-zinc-400">
                                                @iqibla_watches
                                            </p>
                                        </div>
                                    </a>

                                    {/* Telegram */}
                                    <a
                                        href="https://t.me/iqibla_soatlari"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setContactsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors border-b border-zinc-800"
                                    >
                                        <MessageCircle
                                            size={18}
                                            className="text-blue-500 flex-shrink-0"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                Telegram
                                            </p>
                                            <p className="text-xs text-zinc-400">
                                                @iqibla_soatlari
                                            </p>
                                        </div>
                                    </a>

                                    {/* Phone */}
                                    <a
                                        href="tel:+998901234567"
                                        onClick={() => setContactsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors"
                                    >
                                        <Phone
                                            size={18}
                                            className="text-green-500 flex-shrink-0"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-white">
                                                Telefon
                                            </p>
                                            <p className="text-xs text-zinc-400">
                                                +998 90 213-26-21
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>

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
                    <div className="space-y-2">
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/iqibla_watches?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                           bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800"
                        >
                            <svg
                                className="w-5 h-5 text-pink-500 flex-shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                            </svg>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">
                                    Instagram
                                </p>
                                <p className="text-xs text-zinc-400">
                                    @iqibla_watches
                                </p>
                            </div>
                        </a>

                        <a
                            href="https://t.me/iqibla_soatlari"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                           bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800"
                        >
                            <MessageCircle
                                size={18}
                                className="text-blue-500 flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">
                                    Telegram
                                </p>
                                <p className="text-xs text-zinc-400">
                                    @iqibla_soatlari
                                </p>
                            </div>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+998902132621"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                           bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800"
                        >
                            <Phone
                                size={18}
                                className="text-green-500 flex-shrink-0"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">
                                    Telefon
                                </p>
                                <p className="text-xs text-zinc-400">
                                    +998 90 213-26-21
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            )}

            {contactsOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setContactsOpen(false)}
                />
            )}
        </header>
    );
}
