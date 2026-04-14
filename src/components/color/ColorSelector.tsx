import { cn } from '@/lib/utils';

export default function ColorSelector({ colors }: { colors: string[] }) {
    // # belgisini normallashtirish
    const normalizeColor = (color: string) =>
        color.startsWith('#') ? color : `#${color}`;

    return (
        <div className="grid grid-cols-8 gap-1">
            {colors.map((color) => {
                const hex = normalizeColor(color);
                return (
                    <button
                        key={color}
                        className={cn(
                            'h-8 w-8 rounded-md border transition-all hover:scale-110 hover:shadow-md'
                        )}
                        style={{ backgroundColor: hex }}
                        title={hex}
                    />
                );
            })}
        </div>
    );
}
