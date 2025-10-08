import { cn } from "@/lib/utils";

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  hasNewBadge?: boolean;
  className?: string;
  handleClick?:()=>void
}

export  const MenuItem: React.FC<MenuItemProps> = ({ title, icon, gradient, hasNewBadge, className,handleClick }) => {
  return (
    <div onClick={()=>handleClick?handleClick():''} className={cn('relative cursor-pointer', className)}>
      <div className="profile_btn_gradients rounded-xl p-2">
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              'w-[36px] h-[36px] rounded-lg flex text-white items-center justify-center',
              gradient
            )}
          >
            {icon}
          </div>
          <h3 className="text-white text-cn font-semibold flex-1">{title}</h3>
        </div>
      </div>

      {hasNewBadge && (
        <div className="absolute -top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow-md">
          নতুন
        </div>
      )}
    </div>
  );
};