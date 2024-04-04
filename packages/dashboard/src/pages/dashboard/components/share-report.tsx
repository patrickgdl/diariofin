import { zodResolver } from "@hookform/resolvers/zod"
import { useLogSnag } from "@logsnag/react"
import { CalendarIcon, Loader2 } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { Link, useSearchParams } from "react-router-dom"
import { z } from "zod"
import { CopyInput } from "~/components/copy-input"
import { useAuthUser } from "~/contexts/SessionContext"
import { LogEvents } from "~/events/events"
import { Button } from "~/ui/button"
import { Calendar } from "~/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "~/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover"
import { useToast } from "~/ui/use-toast"

import { useNewReport } from "../hooks/use-new-report"
import { useUpdateReport } from "../hooks/use-update-report"
import { ReportFormType } from "../schema/create-report-schema"
import formatDate from "~/utils/format-date"

const FormSchema = z.object({
  expireAt: z.date().optional(),
})

export function ShareReport({ defaultValue, type }: { defaultValue: { from: string; to: string }; type: string }) {
  const user = useAuthUser()
  const logsnag = useLogSnag()
  const newReport = useNewReport()
  const { toast, dismiss } = useToast()
  const updateReport = useUpdateReport()

  const [isOpen, setOpen] = React.useState(false)

  const [searchParams] = useSearchParams()
  const from = searchParams.get("from") ?? defaultValue.from
  const to = searchParams.get("to") ?? defaultValue.to

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const createReport = async (params: ReportFormType) => {
    if (!user?.id) {
      const { expiresAt, baseUrl, ...rest } = params

      const data = await newReport.mutateAsync({
        ...rest,
        expire_at: expiresAt || null,
        user_id: user?.id!,
        link_id: null,
        short_link: null,
        created_at: new Date().toLocaleString(),
      })

      if (data) {
        // const link = await dub.links.create({
        //   url: `${baseUrl}/reports/${data.id}`,
        //   rewrite: true,
        //   expiresAt: expiresAt,
        // })

        const linkData = await updateReport.mutateAsync(
          {
            report: {
              // link_id: link.id,
              // TODO: implement with dub.co API or other shortner service
              short_link: `${baseUrl}/reports/${data.id}`,
            },
            id: data?.id,
          },
          {
            onError: () => {
              toast({
                duration: 2500,
                variant: "destructive",
                title: "Algo deu errado. Tente novamente.",
              })
            },
            onSuccess: (data) => {
              setOpen(false)

              const { id } = toast({
                title: "Relatório publicado!",
                description: "Seu relatório está pronto para ser compartilhado.",
                footer: (
                  <div className="mt-4 space-x-2 flex w-full">
                    <CopyInput value={data?.short_link ?? ""} className="border-[#2C2C2C] w-full" />

                    <Link to={data?.short_link ?? ""} onClick={() => dismiss(id)}>
                      <Button>Visualizar</Button>
                    </Link>
                  </div>
                ),
              })
            },
          }
        )

        logsnag.track({
          event: LogEvents.OverviewReport.name,
          icon: LogEvents.OverviewReport.icon,
          user_id: user?.email ?? "",
          channel: LogEvents.OverviewReport.channel,
        })
      }
    }

    const { id } = toast({
      title: "Relatório publicado!",
      description: "Seu relatório está pronto para ser compartilhado.",
      footer: (
        <div className="mt-4 space-x-2 flex w-full">
          <CopyInput value={"https://reports.reports.com/reports/" ?? ""} className="border-[#2C2C2C] w-full" />

          <Link to={"https://reports.reports.com/reports/" ?? ""} onClick={() => dismiss(id)}>
            <Button>Visualizar</Button>
          </Link>
        </div>
      ),
    })
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createReport({
      baseUrl: window.location.origin,
      from,
      to,
      type,
      expiresAt: data.expireAt && new Date(data.expireAt).toISOString(),
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Compartilhar
      </Button>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-8">
            <DialogHeader>
              <DialogTitle>Compartilhar relatório de gráficos</DialogTitle>
              <DialogDescription>Compartilhe um relatório com um link exclusivo.</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="expireAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline">
                          {field.value ? formatDate(field.value) : <span>Expira em</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Uma data de expiração opcional para o link do relatório.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={newReport.isPending} className="w-full">
                {newReport.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Publicar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
