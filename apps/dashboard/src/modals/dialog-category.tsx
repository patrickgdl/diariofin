import { DialogContent, DialogHeader, DialogTitle } from "@fluxozen/ui/dialog"
import { CategoriesForm } from "~/pages/categories/components/categories-form"

export default function DialogCategory() {
  return (
    <DialogContent>
      <div className="mx-auto w-full max-w-sm space-y-6">
        <DialogHeader>
          <DialogTitle className="text-sm">Nova categoria</DialogTitle>
        </DialogHeader>

        <CategoriesForm />
      </div>
    </DialogContent>
  )
}
