import { useState, useRef } from 'react';

export interface Product {
    id: number;
    photos: string[];
    price: number;
    description: string;
    desc: string;
    title: string;
    color: string[];
}

interface ProductCardProps {
    product: Product;
    onViewDetail: (product: Product) => void;
}

export function ProductCard({ product, onViewDetail }: ProductCardProps) {
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentPhoto((p) => (p + 1) % product.photos.length);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentPhoto(
            (p) => (p - 1 + product.photos.length) % product.photos.length
        );
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                setCurrentPhoto((p) => (p + 1) % product.photos.length);
            } else {
                setCurrentPhoto(
                    (p) =>
                        (p - 1 + product.photos.length) % product.photos.length
                );
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            onClick={() => onViewDetail(product)}
            className="group relative bg-white dark:bg-zinc-900
                 border border-zinc-200 dark:border-zinc-800
                 rounded-2xl overflow-hidden cursor-pointer
                 hover:border-zinc-400 dark:hover:border-zinc-600
                 hover:shadow-lg dark:hover:shadow-zinc-950/50
                 transition-all duration-300 hover:-translate-y-0.5"
        >
            {/* Image area */}
            <div
                className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-800 select-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={product.photos[currentPhoto]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            `https://placehold.co/400x400/27272a/71717a?text=${encodeURIComponent(product.title)}`;
                    }}
                />

                {product.photos.length > 1 && (
                    <>
                        {/* Prev — har doim ko'rinadi, faqat desktop hover da opacity o'zgaradi */}
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2
                                 w-8 h-8 rounded-full
                                 bg-black/30 backdrop-blur-sm
                                 flex items-center justify-center
                                 md:opacity-0 md:group-hover:opacity-100
                                 opacity-100
                                 transition-opacity duration-200
                                 hover:bg-black/50
                                 shadow-sm border border-white/20"
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

                        {/* Next */}
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2
                                 w-8 h-8 rounded-full
                                 bg-black/30 backdrop-blur-sm
                                 flex items-center justify-center
                                 md:opacity-0 md:group-hover:opacity-100
                                 opacity-100
                                 transition-opacity duration-200
                                 hover:bg-black/50
                                 shadow-sm border border-white/20"
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

                        {/* Dots */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {product.photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentPhoto(i);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-200 ${
                                        i === currentPhoto
                                            ? 'w-4 bg-white'
                                            : 'w-1.5 bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                <span className="absolute top-3 right-3 text-[11px] font-medium text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {currentPhoto + 1}/{product.photos.length}
                </span>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px] leading-snug mb-1 truncate">
                    {product.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed line-clamp-2 mb-3">
                    {product.desc}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2">
                    
                        <a href={`https://t.me/Bekmirza_Ivanov?text=${encodeURIComponent(
                            `Assalomu alaykum! Men quyidagi mahsulotni buyurtma qilmoqchiman:\n\n🛍 ${product.title}\n💰 Narxi: ${product.price.toLocaleString('uz-UZ')} so'm`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5
                             bg-[#229ED9] hover:bg-[#1a8bbf]
                             text-white text-[12px] font-semibold
                             rounded-xl px-3 py-1.5
                             transition-all duration-200 active:scale-95"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.56l-2.95-.924c-.64-.204-.654-.64.136-.954l11.5-4.433c.537-.194 1.006.131.396.999z" />
                        </svg>
                        Buyurtma berish
                    </a>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail(product);
                        }}
                        className="text-[12px] text-zinc-400 dark:text-zinc-500 underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    >
                        Batafsil →
                    </button>
                </div>
            </div>
        </div>
    );
}
