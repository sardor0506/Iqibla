import { useState, useEffect } from 'react';
import type { Product } from './card';
import ColorSelector from '../color/ColorSelector';

interface ProductDetailProps {
    product: Product | null;
    onClose: () => void;
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
    const [activePhoto, setActivePhoto] = useState(0);

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
                   shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10
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
                            className="text-zinc-600 dark:text-zinc-300"
                        />
                    </svg>
                </button>

                {/* LEFT — rasmlar */}
                <div className="md:w-[55%] flex flex-col bg-zinc-50 dark:bg-zinc-950 flex-shrink-0">
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={product.photos[activePhoto]}
                            alt={`${product.title} ${activePhoto + 1}`}
                            className="w-full h-full object-cover transition-all duration-400"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    `https://placehold.co/600x600/27272a/71717a?text=${encodeURIComponent(product.title)}`;
                            }}
                        />

                        {product.photos.length > 1 && (
                            <>
                                <button
                                    onClick={() =>
                                        setActivePhoto(
                                            (p) =>
                                                (p -
                                                    1 +
                                                    product.photos.length) %
                                                product.photos.length
                                        )
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2
                             w-9 h-9 rounded-full
                             bg-white/90 dark:bg-zinc-800/90
                             hover:bg-white dark:hover:bg-zinc-700
                             flex items-center justify-center
                             shadow-sm border border-zinc-100 dark:border-zinc-700 transition-colors"
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
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() =>
                                        setActivePhoto(
                                            (p) =>
                                                (p + 1) % product.photos.length
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2
                             w-9 h-9 rounded-full
                             bg-white/90 dark:bg-zinc-800/90
                             hover:bg-white dark:hover:bg-zinc-700
                             flex items-center justify-center
                             shadow-sm border border-zinc-100 dark:border-zinc-700 transition-colors"
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
                                        />
                                    </svg>
                                </button>
                            </>
                        )}

                        <span
                            className="absolute bottom-3 right-3 text-[11px] text-white
                             bg-black/40 px-2 py-0.5 rounded-full"
                        >
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
                                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
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

                <div className="md:w-[45%] flex flex-col p-6 overflow-y-auto">
                    <span
                        className="inline-block text-[11px] font-medium
                           text-zinc-400 dark:text-zinc-500
                           border border-zinc-200 dark:border-zinc-700
                           rounded-full px-2.5 py-0.5 w-fit mb-3"
                    >
                        #{product.id}
                    </span>

                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-2">
                        {product.title}
                    </h2>

                    {/* <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-5">
                        {product.price.toLocaleString('uz-UZ')} so'm
                    </p> */}

                    <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 mb-5" />

                    <h4 className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                        Mahsulot haqida
                    </h4>
                    <p className="whitespace-pre-line text-[14px] text-zinc-600 leading-relaxed mb-6">
                        {product.description}
                    </p>

                    <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800 mb-5" />

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-0.5">
                                Rasmlar soni
                            </p>
                            <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                                {product.photos.length} ta
                            </p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-0.5">
                                Mahsulot ID
                            </p>
                            <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                                #{product.id}
                            </p>
                        </div>
                    </div>
                    <h4 className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                        Mavjud ranglar
                        <ColorSelector />
                    </h4>
                    <h4 className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                        Mahsulot narxi
                    </h4>

                    <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
                        {product.price.toLocaleString('uz-UZ')} so'm
                    </p>
                    <p className="text-[11px] text-zinc-300 dark:text-zinc-600 text-center mt-auto pt-2">
                        ← → tugmalar bilan rasmni almashtirish mumkin · Esc
                        yopish
                    </p>
                </div>
            </div>
        </div>
    );
}
