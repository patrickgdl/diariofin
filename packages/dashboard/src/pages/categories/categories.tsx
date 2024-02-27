import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/ui/resizable"

import { CategoriesTable } from "./components/allocation-table"
import { CategoriesDisplay } from "./components/categories-display"
import { SpentSoFarCard } from "./components/spent-so-far-card"
import { TopCategoriesTable } from "./components/top-categories-table"

interface MailProps {
  defaultLayout?: number[]
}

export const mails = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "American Express",
    available: 7665,
    change: 12,
    subject: "placehioderlahrure",
    date: "2024-01-01T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Credit Card",
    paymentIds: ["m5gr84i9"],
    income: 10400,
    limit: 25000,
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Chase Credit Card",
    available: 4566,
    change: -3,
    date: "2023-12-12T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Credit Card",
    paymentIds: ["3u1reuv4"],
    income: 14405,
    limit: 25000,
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Cash Rewards",
    available: 4568,
    change: 1,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Credit Card",
    income: 9400,
    limit: 25000,
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Regular Savings",
    available: 4568,
    change: 14,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Savings",
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-17112333",
    name: "Checkings Account",
    available: 8574,
    change: -2,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Savings",
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-17131231231",
    name: "Robinhood",
    available: 5010,
    change: -26,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Investments",
  },
  {
    id: "3e7c3f6d-bdf5-4sdae-8d90-17131231231",
    name: "Wealthfront",
    available: 10708,
    change: 19,
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
    date: "2023-12-31T09:00:00",
    read: true,
    labels: ["Reccuring"],
    category: "Investments",
  },
]

export default function CategoriesDashboard({ defaultLayout = [20, 40, 40] }: MailProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[1200px] items-stretch">
      <ResizablePanel minSize={30} defaultSize={defaultLayout[1]}>
        <div className="!overflow-y-scroll">
          <SpentSoFarCard />

          <CategoriesTable />

          <TopCategoriesTable />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={defaultLayout[2]}>
        <CategoriesDisplay mail={mails[0] || null} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}