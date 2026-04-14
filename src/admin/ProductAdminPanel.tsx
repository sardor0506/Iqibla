'use client';

import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Check, Trash2, Plus, Save, RefreshCw, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ColorVariant {
    id: string; // e.g. "abc123_black"
    colorName: string;
    hex: string;
    photos: string[]; // image URLs/links
}

interface Product {
    id: string;
    title: string;
    price: string;
    desc: string;
    description: string;
    variants: ColorVariant[];
}

// ─── Color palette ────────────────────────────────────────────────────────────
const COLORS = [
    { name: 'black', hex: '#000000' },
    { name: 'white', hex: '#FFFFFF' },
    { name: 'silver', hex: '#D1D5DB' },
    { name: 'steel', hex: '#9CA3AF' },
    { name: 'gunmetal', hex: '#4B5563' },
    { name: 'gold', hex: '#FBBF24' },
    { name: 'rose gold', hex: '#FB7185' },
    { name: 'champagne', hex: '#FEF08A' },
    { name: 'brown', hex: '#92400E' },
    { name: 'dark brown', hex: '#78350F' },
    { name: 'navy', hex: '#1E3A8A' },
    { name: 'blue', hex: '#2563EB' },
    { name: 'green', hex: '#15803D' },
    { name: 'red', hex: '#DC2626' },
    { name: 'orange', hex: '#F97316' },
    { name: 'matte black', hex: '#18181B' },
    { name: 'carbon', hex: '#262626' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function genId(len = 6) {
    return Math.random()
        .toString(36)
        .slice(2, 2 + len);
}

function makeVariantId(productId: string, colorName: string) {
    return `${productId}_${colorName.replace(/\s+/g, '-')}`;
}

function isLight(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductAdminPanel() {
    const baseId = useRef(genId());

    const emptyProduct = (): Product => ({
        id: baseId.current,
        title: '',
        price: '',
        desc: '',
        description: '',
        variants: [],
    });

    const [product, setProduct] = useState<Product>(emptyProduct);
    const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
    const [newLink, setNewLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);

    // ── Field helpers ──────────────────────────────────────────────────────────
    function setField<K extends keyof Omit<Product, 'variants'>>(
        k: K,
        v: Product[K]
    ) {
        setProduct((p) => ({ ...p, [k]: v }));
    }

    function updateVariants(fn: (vs: ColorVariant[]) => ColorVariant[]) {
        setProduct((p) => ({ ...p, variants: fn(p.variants) }));
    }

    // ── Color variants ─────────────────────────────────────────────────────────
    function addVariant(colorName: string, hex: string) {
        if (product.variants.find((v) => v.colorName === colorName)) return;
        const vid = makeVariantId(product.id, colorName);
        updateVariants((vs) => [
            ...vs,
            { id: vid, colorName, hex, photos: [] },
        ]);
        setActiveVariantId(vid);
    }

    function removeVariant(vid: string) {
        updateVariants((vs) => vs.filter((v) => v.id !== vid));
        setActiveVariantId((p) => (p === vid ? null : p));
    }

    // ── Photo links ────────────────────────────────────────────────────────────
    function addLink() {
        const link = newLink.trim();
        if (!link || !activeVariantId) return;
        updateVariants((vs) =>
            vs.map((v) =>
                v.id !== activeVariantId
                    ? v
                    : { ...v, photos: [...v.photos, link] }
            )
        );
        setNewLink('');
    }

    function removePhoto(vid: string, idx: number) {
        updateVariants((vs) =>
            vs.map((v) =>
                v.id !== vid
                    ? v
                    : { ...v, photos: v.photos.filter((_, i) => i !== idx) }
            )
        );
    }

    // ── JSON build ─────────────────────────────────────────────────────────────
    const buildJSON = () => [
        {
            id: product.id,
            title: product.title,
            price: Number(product.price) || 0,
            desc: product.desc,
            description: product.description,
            variants: product.variants.map((v) => ({
                colorId: v.id,
                colorName: v.colorName,
                hex: v.hex,
                photos: v.photos,
            })),
        },
    ];

    const jsonString = JSON.stringify(buildJSON(), null, 2);

    function copyJSON() {
        navigator.clipboard.writeText(jsonString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    // JSON faylni yuklab olish
    function saveToFile() {
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `product_${product.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function resetAll() {
        baseId.current = genId();
        setProduct(emptyProduct());
        setActiveVariantId(null);
        setNewLink('');
    }

    const activeVariant = product.variants.find(
        (v) => v.id === activeVariantId
    );
    const selectedColors = new Set(product.variants.map((v) => v.colorName));

    return (
        <div className="min-h-screen bg-muted/30 p-4 md:p-6">
            <div className="max-w-6xl mx-auto space-y-5">
                {/* ── Header ── */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-mono text-muted-foreground">
                            ID:{' '}
                            <span className="text-foreground font-semibold">
                                {product.id}
                            </span>
                        </p>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Mahsulot qo'shish
                        </h1>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                        <Button variant="outline" size="sm" onClick={resetAll}>
                            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                            Tozalash
                        </Button>
                        <Button variant="outline" size="sm" onClick={copyJSON}>
                            {copied ? (
                                <Check className="w-3.5 h-3.5 mr-1.5" />
                            ) : (
                                <Copy className="w-3.5 h-3.5 mr-1.5" />
                            )}
                            {copied ? 'Nusxalandi' : 'Nusxalash'}
                        </Button>
                        <Button size="sm" onClick={saveToFile}>
                            {saved ? (
                                <Check className="w-3.5 h-3.5 mr-1.5" />
                            ) : (
                                <Save className="w-3.5 h-3.5 mr-1.5" />
                            )}
                            {saved ? 'Saqlandi!' : 'JSON saqlash'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                    {/* ── LEFT: base info + color picker ── */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                    Asosiy ma'lumotlar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Sarlavha
                                    </Label>
                                    <Input
                                        value={product.title}
                                        onChange={(e) =>
                                            setField('title', e.target.value)
                                        }
                                        placeholder="Mahsulot nomi"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Narx (so'm)
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={product.price}
                                            onChange={(e) =>
                                                setField(
                                                    'price',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0"
                                            className="pr-20"
                                        />
                                        {product.price && (
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                                                {Number(
                                                    product.price
                                                ).toLocaleString('uz-UZ')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Qisqa tavsif (desc)
                                    </Label>
                                    <Textarea
                                        value={product.desc}
                                        onChange={(e) =>
                                            setField('desc', e.target.value)
                                        }
                                        placeholder="Qisqa tavsif..."
                                        rows={2}
                                        className="resize-none text-sm"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        To'liq tavsif (description)
                                    </Label>
                                    <Textarea
                                        value={product.description}
                                        onChange={(e) =>
                                            setField(
                                                'description',
                                                e.target.value
                                            )
                                        }
                                        placeholder="Funksiyalar, xususiyatlar..."
                                        rows={6}
                                        className="resize-none font-mono text-xs"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Color picker */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                    Rang tanlash
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {COLORS.map((c) => {
                                        const sel = selectedColors.has(c.name);
                                        return (
                                            <button
                                                key={c.name}
                                                title={c.name}
                                                onClick={() =>
                                                    addVariant(c.name, c.hex)
                                                }
                                                disabled={sel}
                                                className={cn(
                                                    'relative w-8 h-8 rounded-full border-2 transition-all duration-150 shrink-0',
                                                    sel
                                                        ? 'border-primary ring-2 ring-primary/30 scale-110 cursor-default'
                                                        : 'border-border hover:border-primary/60 hover:scale-110 cursor-pointer'
                                                )}
                                                style={{
                                                    backgroundColor: c.hex,
                                                }}
                                            >
                                                {sel && (
                                                    <Check
                                                        className="absolute inset-0 m-auto w-3.5 h-3.5"
                                                        style={{
                                                            color: isLight(
                                                                c.hex
                                                            )
                                                                ? '#000'
                                                                : '#fff',
                                                        }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {product.variants.length > 0 && (
                                    <>
                                        <Separator className="my-3" />
                                        <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-widest">
                                            Tanlangan — rangni bosib rasmlar
                                            bo'limiga o'ting
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {product.variants.map((v) => (
                                                <button
                                                    key={v.id}
                                                    onClick={() =>
                                                        setActiveVariantId(v.id)
                                                    }
                                                    className={cn(
                                                        'flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all',
                                                        activeVariantId === v.id
                                                            ? 'border-primary bg-primary/10 text-primary'
                                                            : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                                                    )}
                                                >
                                                    <span
                                                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                                                        style={{
                                                            backgroundColor:
                                                                v.hex,
                                                        }}
                                                    />
                                                    {v.colorName}
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-[10px] px-1 py-0 h-4 ml-0.5 font-mono"
                                                    >
                                                        {v.photos.length}
                                                    </Badge>
                                                    <X
                                                        className="w-3 h-3 ml-0.5 hover:text-destructive transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeVariant(v.id);
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                        Rasm linklari
                                    </CardTitle>
                                    {activeVariant && (
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                                                style={{
                                                    backgroundColor:
                                                        activeVariant.hex,
                                                }}
                                            />
                                            <span className="text-sm font-medium">
                                                {activeVariant.colorName}
                                            </span>
                                            <code className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                                {activeVariant.id}
                                            </code>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {!activeVariant ? (
                                    <div className="flex flex-col items-center justify-center h-36 border-2 border-dashed rounded-lg">
                                        <p className="text-sm text-muted-foreground/50">
                                            Chap tomondagi rangdan birini
                                            tanlang
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <Input
                                                value={newLink}
                                                onChange={(e) =>
                                                    setNewLink(e.target.value)
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === 'Enter' &&
                                                    addLink()
                                                }
                                                placeholder="https://cdn.example.com/photo.jpg"
                                                className="flex-1 font-mono text-xs"
                                            />
                                            <Button
                                                size="sm"
                                                onClick={addLink}
                                                disabled={!newLink.trim()}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {activeVariant.photos.length === 0 ? (
                                            <p className="text-center text-xs text-muted-foreground/40 py-6">
                                                Hali link qo'shilmagan. URL
                                                kiriting va Enter bosing.
                                            </p>
                                        ) : (
                                            <div className="space-y-1.5">
                                                {activeVariant.photos.map(
                                                    (url, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center gap-2 px-3 py-2 bg-muted/40 rounded-lg border group"
                                                        >
                                                            <img
                                                                src={url}
                                                                alt=""
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    (
                                                                        e.target as HTMLImageElement
                                                                    ).style.display =
                                                                        'none';
                                                                }}
                                                                className="w-9 h-9 rounded object-cover border shrink-0 bg-muted"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-[10px] text-muted-foreground font-mono mb-0.5">
                                                                    {`${activeVariant.id}_${idx + 1}`}
                                                                </p>
                                                                <p className="text-xs font-mono truncate text-foreground">
                                                                    {url}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    removePhoto(
                                                                        activeVariant.id,
                                                                        idx
                                                                    )
                                                                }
                                                                className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 shrink-0 ml-1"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                                        JSON ko'rinishi
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs gap-1"
                                            onClick={copyJSON}
                                        >
                                            {copied ? (
                                                <Check className="w-3 h-3" />
                                            ) : (
                                                <Copy className="w-3 h-3" />
                                            )}
                                            {copied
                                                ? 'Nusxalandi'
                                                : 'Nusxalash'}
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="h-7 text-xs gap-1"
                                            onClick={saveToFile}
                                        >
                                            {saved ? (
                                                <Check className="w-3 h-3" />
                                            ) : (
                                                <Save className="w-3 h-3" />
                                            )}
                                            {saved
                                                ? 'Saqlandi!'
                                                : 'Yuklab olish'}
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-72 w-full rounded-md border bg-muted/30 p-3">
                                    <pre className="font-mono text-[11px] leading-relaxed text-foreground whitespace-pre-wrap break-all">
                                        {jsonString}
                                    </pre>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
