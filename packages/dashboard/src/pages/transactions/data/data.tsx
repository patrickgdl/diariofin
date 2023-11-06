import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const accounts = [
  {
    value: "backlog",
    label: "C6 Bank",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Itaú",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "Nubank",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "PicPay",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Santander",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
