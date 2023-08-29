import { Fragment, useState } from "react"
import { Button, Card, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from "@tremor/react"
import { Dialog, Transition } from "@headlessui/react"
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
import formatDate from "~/utils/format-date"
import formatCurrency from "~/utils/format-currency"

interface Transaction {
  date: string
  incoming: number
  outgoing: number
}

const transactions: Transaction[] = [
  {
    date: "2023-01-01T14:48:00",
    incoming: 732.65,
    outgoing: 800.4,
  },
  {
    date: "2023-02-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-03-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-04-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-05-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-06-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-07-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-08-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-09-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-10-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-11-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
  {
    date: "2023-12-01T14:48:00",
    incoming: 820.8,
    outgoing: 550.55,
  },
]

const ConsolidatedTable = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Mês</TableHeaderCell>
        <TableHeaderCell className="text-right text-teal-500">Entradas</TableHeaderCell>
        <TableHeaderCell className="text-right text-red-600">Saídas</TableHeaderCell>
        <TableHeaderCell className="text-right">Liquidez</TableHeaderCell>
      </TableRow>
    </TableHead>

    <TableBody>
      {transactions.map((item) => (
        <TableRow key={item.date}>
          <TableCell>{formatDate(new Date(item.date), "MM")}</TableCell>
          <TableCell className="text-right">
            <Text>{formatCurrency(item.incoming)}</Text>
          </TableCell>
          <TableCell className="text-right">
            <Text>{formatCurrency(item.outgoing)}</Text>
          </TableCell>
          <TableCell className="text-right">
            <Text>{formatCurrency(item.incoming - item.outgoing)}</Text>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export function Consolidated() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (): any => setIsOpen(true)
  const closeModal = (): any => setIsOpen(false)

  return (
    <div className="relative max-w-xl mx-auto h-96 overflow-hidden">
      <ConsolidatedTable />

      <div className="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-12 pb-8 absolute rounded-b-lg">
        <Button
          icon={ArrowsPointingOutIcon}
          className="bg-white shadow-md border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
          onClick={openModal}
        >
          Expandir
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
                >
                  <div className="relative h-[70vh] overflow-auto mt-3">
                    <ConsolidatedTable />
                  </div>
                  <Button
                    className="mt-5 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    onClick={closeModal}
                  >
                    Voltar
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
