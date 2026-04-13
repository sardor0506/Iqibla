import { useState } from 'react';

export interface Product {
    id: number;
    photos: string[];
    price: number;
    description: string;
    desc: string;
    title: string;
}

interface ProductCardProps {
    product: Product;
    onViewDetail: (product: Product) => void;
}

export function ProductCard({ product, onViewDetail }: ProductCardProps) {
    const [currentPhoto, setCurrentPhoto] = useState(0);

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
            <div className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-800 select-none">
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
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2
                         w-8 h-8 rounded-full
                         bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
                         flex items-center justify-center
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-white dark:hover:bg-zinc-800
                         shadow-sm border border-zinc-100 dark:border-zinc-700"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path
                                    d="M9 11L5 7l4-4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-zinc-700 dark:text-zinc-300"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2
                         w-8 h-8 rounded-full
                         bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
                         flex items-center justify-center
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-white dark:hover:bg-zinc-800
                         shadow-sm border border-zinc-100 dark:border-zinc-700"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path
                                    d="M5 11l4-4-4-4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-zinc-700 dark:text-zinc-300"
                                />
                            </svg>
                        </button>

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

                <span
                    className="absolute top-3 right-3 text-[11px] font-medium text-white
                         bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full"
                >
                    {currentPhoto + 1}/{product.photos.length}
                </span>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-[15px] leading-snug mb-1 truncate">
                    {product.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed line-clamp-2 mb-3">
                    {product.desc}
                </p>
                <div className="flex items-center justify-between">
                    {/* <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {product.price.toLocaleString('uz-UZ')} so'm
                    </span> */}
                    <span className="text-[12px] text-zinc-400 dark:text-zinc-500 underline underline-offset-2">
                        Batafsil →
                    </span>
                </div>
            </div>
        </div>
    );
}
