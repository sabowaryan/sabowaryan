import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ToastProps } from "@/components/ui/use-toast";

type ToastWithRequiredProps = ToastProps & {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactElement;
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex flex-col items-end gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse md:gap-3">
      {toasts.map(function ({ id, title, description, action, ...props }: ToastWithRequiredProps) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
    </div>
  );
} 