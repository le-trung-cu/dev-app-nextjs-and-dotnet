import { parseAsString, useQueryStates } from "nuqs"

export const useTaskFilters = () => {
  const [filter, setFilter] = useQueryStates({
    projectId: parseAsString,
    assigneeId: parseAsString,
    status: parseAsString,
    endDate: parseAsString,
  })

  return {
    filter,
    setFilter,
  }
}