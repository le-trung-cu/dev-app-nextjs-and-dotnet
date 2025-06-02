import { parseAsString, useQueryStates } from "nuqs"

export const useTaskFilters = () => {
  const [filter, setFilter] = useQueryStates({
    projectId: parseAsString.withDefault(""),
    assigneeId: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
    endDate: parseAsString.withDefault(""),
  })

  return {
    filter,
    setFilter,
  }
}