import React from "react";
import { cva } from "class-variance-authority";

import { Separator } from "./separator";
import { cn } from "../utils";

interface StepperProps {
  steps: {
    id: string | number;
    label: string | React.ReactNode;
    description?: string | React.ReactNode;
    icon?: React.ReactNode;
    optional?: boolean;
  }[];
  initialStep: number;
  orientation?: "vertical" | "horizontal";
  labelOrientation?: "vertical" | "horizontal";
  scrollTracking?: boolean;
  variant?: "default" | "ghost" | "outline" | "secondary";
  status?: "default" | "success" | "error" | "loading";
  isClickable?: boolean;
}

interface ContextStepperProps extends StepperProps {
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  setStep: (step: number) => void;
  activeStep: number;
}

const StepperContext = React.createContext<ContextStepperProps>({
  steps: [],
  initialStep: 0,
  nextStep: () => {},
  prevStep: () => {},
  resetSteps: () => {},
  setStep: () => {},
  activeStep: 0,
});

const StepperProvider = ({
  value,
  children,
}: {
  value: StepperProps;
  children: React.ReactNode;
}) => {
  const [activeStep, setActiveStep] = React.useState(value.initialStep);
  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const resetSteps = () => {
    setActiveStep(value.initialStep);
  };

  const setStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <StepperContext.Provider
      value={{
        ...value,
        nextStep,
        prevStep,
        resetSteps,
        setStep,
        activeStep,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export function useStepper() {
  const context = React.useContext(StepperContext);

  if (context === undefined) {
    throw new Error("useStepper must be used within a StepperProvider");
  }

  const isDisabledStep = context.activeStep === 0;
  const isLastStep = context.activeStep === context.steps.length - 1;
  const isOptionalStep = context.steps[context.activeStep]?.optional;
  const isFinished = context.activeStep === context.steps.length;

  return {
    ...context,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
    isFinished,
  };
}

export const Stepper = React.forwardRef<
  HTMLDivElement,
  StepperProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      initialStep,
      steps,
      status = "default",
      orientation = "horizontal",
      labelOrientation = "horizontal",
      scrollTracking = false,
      children,
      variant = "default",
      isClickable = true,
      className,
      ...props
    },
    ref
  ) => {
    const footer = [] as React.ReactElement[];

    const items = React.Children.toArray(children).map((child, index) => {
      if (!React.isValidElement(child)) {
        throw new Error("Stepper children must be valid React elements.");
      }
      if (child.type === StepperFooter) {
        footer.push(child);
        return null;
      }
      const stepperItemProps = {
        ...child.props,
        step: index,
      };

      return React.cloneElement(child, stepperItemProps);
    });

    return (
      <StepperProvider
        value={{
          steps,
          initialStep,
          orientation,
          labelOrientation,
          scrollTracking,
          variant,
          isClickable,
          status,
        }}
      >
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          <div
            className={cn(
              "flex flex-1 gap-2 text-center p-5 md:w-[50%] mx-auto",
              orientation === "vertical" ? "flex-col" : "flex-row"
            )}
          >
            {items}
          </div>
          {orientation === "horizontal" && (
            <HorizontalContent>{children}</HorizontalContent>
          )}
          {footer}
        </div>
      </StepperProvider>
    );
  }
);

const HorizontalContent = ({ children }: { children?: React.ReactNode }) => {
  const { activeStep, isFinished } = useStepper();

  if (isFinished) {
    return null;
  }

  const activeStepperItem = React.Children.toArray(children)[
    activeStep
  ] as React.ReactElement;

  const content = activeStepperItem?.props?.children;

  return content;
};

const stepperItemVariants = cva("relative flex flex-row gap-2", {
  variants: {
    isLastStep: {
      true: "flex-[0_0_auto] justify-end",
      false: "flex-[1_0_auto] justify-start",
    },
    isVertical: {
      true: "flex-col",
      false: "items-center",
    },
  },
  compoundVariants: [
    {
      isVertical: true,
      isLastStep: true,
      class: "w-full flex-[1_0_auto] flex-col items-start justify-start",
    },
  ],
});

export const StepperItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onStepperItemClick?: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  }
  // @ts-ignore - step is a prop that is added from the Stepper through React.Children.
>(({ step, children, className, onStepperItemClick, ...props }, ref) => {
  const {
    activeStep,
    steps,
    orientation,
    labelOrientation,
    scrollTracking,
    status,
    isClickable,
  } = useStepper();

  const isActive = step === activeStep;
  const isCompleted = step < activeStep;
  const isDisabled = step > activeStep && !isClickable;

  const isLastStep = step === steps.length - 1;

  const isVertical = orientation === "vertical";
  const isVerticalLabel = labelOrientation === "vertical";

  const content = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type !== StepperFooter
  );

  const footer = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === StepperFooter
  )[0] as React.ReactElement;

  return (
    <div
      className={cn(
        "stepper-item",
        stepperItemVariants({
          isLastStep,
          isVertical,
        }),
        className
      )}
      ref={ref}
      {...props}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          isVerticalLabel && !isVertical && "flex-col gap-2"
        )}
        ref={(node) => {
          if (scrollTracking) {
            node?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }}
      >
        <div
          className={cn(
            "w-max text-start",
            isVerticalLabel && !isVertical && "text-center"
          )}
        >
          <p
            className={cn(
              "text-sm font-semibold text-slate-900 dark:text-slate-100",
              isClickable && "cursor-pointer",
              !isActive && !isDisabled && !isCompleted && "opacity-50",
              isCompleted && "text-primary"
            )}
          >
            {steps[step].label}
          </p>
          {steps[step].description && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {steps[step].description}
            </p>
          )}
        </div>
      </div>
      <div className="flex w-full gap-8">
        {!isLastStep && (
          <Separator
            className={cn(
              "stepper-item-separator",
              isVertical
                ? "ms-6 flex h-auto min-h-[2rem] w-[1px] border-l-2"
                : "h-[2px] flex-1",
              isCompleted && "bg-primary"
            )}
            orientation={orientation}
          />
        )}
        {isVertical && isActive && (
          <div className="w-full space-y-4">
            {content}
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

StepperItem.displayName = "StepperItem";

export const StepperFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

StepperFooter.displayName = "StepperFooter";
