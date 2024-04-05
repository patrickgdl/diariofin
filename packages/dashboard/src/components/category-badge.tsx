import { QueryData } from "@supabase/supabase-js"
import { getCategoriesAndGroups } from "~/queries/get-categories-and-groups"
import { Badge } from "~/ui/badge"
import { hexToRgb } from "~/utils/hexToRgb"

export type CategoriesQuery = {
  id: string
  name: string
  icon: string
  category_groups: {
    id: string
    name: string
    color?: string | null
  } | null
}

const CategoryBadge = ({ category }: { category: CategoriesQuery | null }) => {
  if (!category) {
    return null
  }

  return (
    <Badge
      className="px-1.5"
      style={{ backgroundColor: hexToRgb(category.category_groups?.color || "#3b82f6", "0.2") }}
    >
      <span className="mr-1">{category.icon}</span>
      <span className="font-medium" style={{ color: category.category_groups?.color || "#3b82f6" }}>
        {category.category_groups?.name}
      </span>
    </Badge>
  )
}

export default CategoryBadge
