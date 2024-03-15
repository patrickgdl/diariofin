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
    color: string
  } | null
}

const CategoryBadge = ({ category }: { category: CategoriesQuery | null }) => {
  if (!category) {
    return null
  }

  return (
    <Badge style={{ backgroundColor: hexToRgb(category.category_groups?.color || "#000000", "0.5") }}>
      <span className="mr-1">{category.icon}</span>
      <span className="font-medium" style={{ color: category.category_groups?.color }}>
        {category.name}
      </span>
    </Badge>
  )
}

export default CategoryBadge
