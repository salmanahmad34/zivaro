import { cn } from '@/lib/utils'

interface CategoryFiltersProps {
  categories: string[]
  activeCategory: string
  onSelect: (category: string) => void
}

export const CategoryFilters = ({ categories, activeCategory, onSelect }: CategoryFiltersProps) => {
  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-3 flex items-center space-x-3">
      {categories.map((cat) => {
        const isActive = activeCategory === cat
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
              isActive 
                ? "bg-foreground text-background shadow-md shadow-foreground/10 scale-105" 
                : "bg-card border border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground hover:bg-muted/30"
            )}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
