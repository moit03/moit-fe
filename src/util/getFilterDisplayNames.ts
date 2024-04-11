export default function getFilterDisplayNames(
  filters: Array<{ name: string; id: number }>,
  selectedIds: number[]
): string {
  const currentFilters = filters.filter(({ id }) => selectedIds.includes(id))
  const currentNames = currentFilters.map(({ name }) => name)
  return currentNames.length > 1
    ? `${currentNames[0]} 외 ${currentNames.length - 1}`
    : `${currentNames[0]}`
}
