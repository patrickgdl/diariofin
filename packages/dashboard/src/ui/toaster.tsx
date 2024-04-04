import { CheckIcon, Loader2, SparklesIcon, XIcon } from "lucide-react"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, footer, ...props }) => {
        return (
          <Toast key={id} {...props} className="flex flex-col">
            <div className="flex w-full">
              <div className="space-y-2 w-full justify-center">
                <div className="flex space-x-2 justify-between">
                  <div className="flex space-x-2 items-center">
                    <div className="w-[20px] h-[20px]">
                      {props?.variant ? (
                        <>
                          {props.variant === "ai" && <SparklesIcon size={18} className="text-[#0064D9]" />}
                          {props?.variant === "success" && <CheckIcon size={18} />}
                          {props?.variant === "error" && <XIcon size={18} className="text-[#FF3638]" />}
                          {props?.variant === "progress" && <Loader2 size={18} className="h-4 w-4 animate-spin" />}
                        </>
                      ) : (
                        <CheckIcon size={18} />
                      )}
                    </div>
                    <div>{title && <ToastTitle>{title}</ToastTitle>}</div>
                  </div>
                </div>

                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose />
            </div>

            <div className="w-full flex justify-end">{footer}</div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
