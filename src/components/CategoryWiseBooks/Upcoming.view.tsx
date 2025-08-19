import Link from "next/link";

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export function BookCard({ title, author, description, imageUrl, slug }: BookCardProps) {
  return (
    <div className="w-full max-w-[588px] p-4 flex flex-col gap-4 lg:gap-6 rounded-[16px] border border-card-border bg-navy-dark">
      <div className="text-white">
        <h3 className="font-bengali font-bold text-2xl lg:text-[32px] leading-tight mb-1">
          {title}
        </h3>
        <p className="font-bengali text-lg lg:text-xl font-normal text-white/90">
          {author}
        </p>
      </div>
      
      <div className="w-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[250px] lg:h-[312px] object-cover rounded-[16px] border border-image-border shadow-lg"
        />
      </div>
      
      <p className="text-white font-bengali text-xs lg:text-[13px] leading-relaxed">
        {description}
      </p>
      
      <Link href={`/book/${slug}`} className="block">
        <button className="w-full btn-gradient-3 text-white rounded-[8px] p-3 text-lg">
          বিস্তারিত দেখুন
        </button>
      </Link>
    </div>
  );
}
