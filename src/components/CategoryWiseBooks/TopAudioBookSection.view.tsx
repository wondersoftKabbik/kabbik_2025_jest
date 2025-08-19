import { container } from '../ui/static/tailwind.classes';
import { AudiobookCard } from './AudioBookCard.view';
import { TCategoryWiseTopBooksSection } from './static/category.types';

export default function TopAudioBookSection(props:TCategoryWiseTopBooksSection) {
  const {category,data}=props;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">      

      {/* Main content */}
      <div className="relative z-10">

        {/* Audiobooks Grid */}
        <div className={container('1209px')}>
          <div className="grid grid-cols-2  lg:grid-cols-4  gap-6 md:gap-8">
            {data ? data.slice(0,8).map((audiobook) => (
              <AudiobookCard 
                key={audiobook.id} 
                category={category}
                audiobook={audiobook}
                className="max-w-sm mx-auto"
              />
            )):''}
          </div>
        </div>
      </div>
    </div>
  );
}
