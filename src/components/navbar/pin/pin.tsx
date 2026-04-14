function Pin() {
    return (
        <div>
            <a
                href={`https://t.me/Bekmirza_Ivanov?text=${encodeURIComponent(
                    `Assalomu alaykum! Men Zikr ring mahsulotini buyurtma qilmoqchiman.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-5
                bg-[#229ED9] hover:bg-[#1a8bbf]
                text-white font-semibold text-sm
                 px-4 py-3.5
                transition-all duration-200 active:scale-[0.98]"
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
        </div>
    );
}

export default Pin;
