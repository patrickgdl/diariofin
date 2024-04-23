import { PlusIcon } from "lucide-react"
import * as React from "react"
import useMediaQuery from "~/hooks/use-media-query"
import { Button } from "@diariofin/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@diariofin/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@diariofin/ui/drawer"
import { Input } from "@diariofin/ui/input"
import { Label } from "@diariofin/ui/label"
import { cn } from "@diariofin/ui/utils"

export default function AccountDialogForm({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useMediaQuery()
  const [open, setOpen] = React.useState(false)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <PlusIcon className="h-4 w-4 mr-2" /> Adicionar Conta
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-full space-y-6">
            <DialogHeader>
              <DialogTitle className="text-sm">Nova Conta</DialogTitle>
            </DialogHeader>

            {children}

            <Button className="w-full" type="submit" form="account-form">
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full">
          <PlusIcon className="h-4 w-4 mr-2" /> Adicionar Conta
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Nova Conta</DrawerTitle>
        </DrawerHeader>

        <div className="w-full space-y-6  px-4">{children}</div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>

          <Button className="w-full" type="submit" onClick={() => setOpen(false)} form="account-form">
            Salvar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
