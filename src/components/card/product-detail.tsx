import { useState, useEffect, useRef } from 'react';
import type { Product } from './card';
import ColorSelector from '../color/ColorSelector';

interface ProductDetailProps {
    product: Product | null;
    onClose: () => void;
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
    const [activePhoto, setActivePhoto] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        setActivePhoto(0);
    }, [product]);

    useEffect(() => {
        if (!product) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight')
                setActivePhoto((p) => (p + 1) % product.photos.length);
            if (e.key === 'ArrowLeft')
                setActivePhoto(
                    (p) =>
                        (p - 1 + product.photos.length) % product.photos.length
                );
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [product, onClose]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
        if (
            !product ||
            touchStartX.current === null ||
            touchEndX.current === null
        )
            return;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 40) {
            if (diff > 0)
                setActivePhoto((p) => (p + 1) % product.photos.length);
            else
                setActivePhoto(
                    (p) =>
                        (p - 1 + product.photos.length) % product.photos.length
                );
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    if (!product) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-zinc-900
                   border border-zinc-200 dark:border-zinc-800
                   rounded-3xl overflow-hidden w-full max-w-3xl
                   shadow-2xl
                   flex flex-col md:flex-row
                   max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20
                     w-9 h-9 rounded-full
                     bg-zinc-100 dark:bg-zinc-800
                     hover:bg-zinc-200 dark:hover:bg-zinc-700
                     flex items-center justify-center transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M3 3l10 10M13 3L3 13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {/* Chap — rasm qismi */}
                {/* Mobileda: kichik rasm (aspect-[4/3]), desktopda: to'liq balandlik */}
                <div className="md:w-[55%] flex flex-col bg-zinc-50 dark:bg-zinc-950 flex-shrink-0">
                    <div
                        className="relative aspect-[4/3] md:aspect-square overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <img
                            src={product.photos[activePhoto]}
                            alt={`${product.title} ${activePhoto + 1}`}
                            className="w-full h-full object-cover transition-all duration-300"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    `https://placehold.co/600x600/27272a/71717a?text=${encodeURIComponent(product.title)}`;
                            }}
                        />

                        {product.photos.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActivePhoto(
                                            (p) =>
                                                (p -
                                                    1 +
                                                    product.photos.length) %
                                                product.photos.length
                                        );
                                    }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2
                                     w-9 h-9 rounded-full z-10
                                     bg-black/30 backdrop-blur-sm
                                     hover:bg-black/50
                                     flex items-center justify-center
                                     border border-white/20 transition-colors"
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M9 11L5 7l4-4"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActivePhoto(
                                            (p) =>
                                                (p + 1) % product.photos.length
                                        );
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2
                                     w-9 h-9 rounded-full z-10
                                     bg-black/30 backdrop-blur-sm
                                     hover:bg-black/50
                                     flex items-center justify-center
                                     border border-white/20 transition-colors"
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 11l4-4-4-4"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </>
                        )}

                        <span className="absolute bottom-3 right-3 text-[11px] text-white bg-black/40 px-2 py-0.5 rounded-full z-10">
                            {activePhoto + 1} / {product.photos.length}
                        </span>
                    </div>

                    {/* Thumbnails */}
                    {product.photos.length > 1 && (
                        <div className="flex gap-2 p-3 overflow-x-auto">
                            {product.photos.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActivePhoto(i)}
                                    className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                        i === activePhoto
                                            ? 'border-zinc-900 dark:border-zinc-100 scale-105'
                                            : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                                >
                                    <img
                                        src={src}
                                        alt={`thumb ${i + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                `https://placehold.co/64x64/27272a/71717a?text=${i + 1}`;
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* O'ng — ma'lumotlar, mobileda scroll qilinadi */}
                <div className="md:w-[45%] flex flex-col p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-2">
                        {product.title}
                    </h2>

                    <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 mb-5" />

                    <h4 className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                        Mahsulot haqida
                    </h4>
                    <p className="whitespace-pre-line text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                        {product.description}
                    </p>

                    <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 mb-5" />

                    <h4 className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                        Mahsulot narxi
                    </h4>
                    <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-5">
                        {product.price.toLocaleString('uz-UZ')} so'm
                    </p>

                    <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 mb-5" />

                    <a
                        href={`https://t.me/Bekmirza_Ivanov?text=${encodeURIComponent(
                            `Assalomu alaykum! Men quyidagi mahsulotni buyurtma qilmoqchiman:\n\n🛍 ${product.title}\n💰 Narxi: ${product.price.toLocaleString('uz-UZ')} so'm\n`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full
                        bg-[#229ED9] hover:bg-[#1a8bbf]
                        text-white font-semibold text-sm
                        rounded-2xl px-4 py-3.5
                        transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
                        active:scale-[0.98]"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.56l-2.95-.924c-.64-.204-.654-.64.136-.954l11.5-4.433c.537-.194 1.006.131.396.999z" />
                        </svg>
                        Telegram orqali buyurtma berish
                    </a>

                    <p className="text-[11px] text-zinc-300 dark:text-zinc-600 text-center mt-6">
                        ← → tugmalar bilan rasmni almashtirish mumkin
                    </p>
                </div>
            </div>
        </div>
    );
}
