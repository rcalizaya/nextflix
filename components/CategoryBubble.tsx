type CategoryBubbleProps = {
  title: string;
  emoji: string;
};

export default function CategoryBubble({ title, emoji }: CategoryBubbleProps) {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white shadow-md text-2xl md:text-3xl group-hover:scale-110 transition">
        {emoji}
      </div>
      <p className="text-xs md:text-sm font-medium text-gray-700 text-center">
        {title}
      </p>
    </div>
  );
}
