import { useSearchParams } from "react-router-dom"

import { SearchField } from "./components/search-field"
import { TrackerChangeStatus } from "./components/tracker-change-status"
import { TrackerGraph } from "./components/tracker-graph"
import { TrackerTable } from "./components/tracker-table"

export default function Tracker() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])

  const onSearchChange = (q: string | null) => {
    if (q) {
      setSearchParams({ ...params, q })
      return
    }

    searchParams.delete("q")
    setSearchParams(searchParams)
  }

  // if (!status) {
  //   return <TrackerLoading />
  // }

  return (
    <div className="flex flex-col p-4 md:p-6">
      <TrackerGraph
        date={new Date()}
        start={new Date(2024, 0, 31)}
        end={new Date(2024, 6, 31)}
        data={[]}
        weekStartsOn={0}
        numberOfMonths={6}
      />

      <div className="mt-14 mb-6 flex justify-between">
        <SearchField placeholder="Buscar" value={params?.q} onChange={onSearchChange} />
        <div className="w-60">
          <TrackerChangeStatus />
        </div>
      </div>

      <TrackerTable onRowClick={(id) => setSearchParams({ ...params, id })} />
    </div>
  )
}
