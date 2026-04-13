import { cn } from '@/lib/utils';

export const colors = [
    { name: 'black', class: 'bg-black' },
    { name: 'white', class: 'bg-white border' },

    // Metall ranglar
    { name: 'silver', class: 'bg-gray-300' },
    { name: 'steel', class: 'bg-gray-400' },
    { name: 'gunmetal', class: 'bg-gray-600' },

    // Gold turlari
    { name: 'gold', class: 'bg-yellow-400' },
    { name: 'rose gold', class: 'bg-rose-400' },
    { name: 'champagne', class: 'bg-yellow-200' },

    // Classic leather vibes
    { name: 'brown', class: 'bg-amber-800' },
    { name: 'dark brown', class: 'bg-amber-900' },

    // Elegant ranglar
    { name: 'navy', class: 'bg-blue-900' },
    { name: 'blue', class: 'bg-blue-600' },
    { name: 'green', class: 'bg-green-700' },

    // Sport / modern
    { name: 'red', class: 'bg-red-600' },
    { name: 'orange', class: 'bg-orange-500' },

    // Premium dark tones
    { name: 'matte black', class: 'bg-zinc-900' },
    { name: 'carbon', class: 'bg-neutral-800' },
];

export default function ColorSelector() {
    return (
        <div className="grid grid-cols-10 gap-1">
            {colors.map((color) => (
                <button
                    key={color.name}
                    className={cn(
                        'h-10 w-10 rounded-md border transition-all hover:scale-110 hover:shadow-md',
                        color.class
                    )}
                    title={color.name}
                />
            ))}
        </div>
    );
}
