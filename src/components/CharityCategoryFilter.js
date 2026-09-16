import Select from 'react-select'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCharityCategories } from '../utilities/BackEndClient'
import { CATEGORY_OPTIONS } from '../constants/categoryFilterOptions'

const ALL_CATEGORIES = { value: '', label: 'All Categories' }

function sortCharityCategories(categories) {
  const knownOrder = CATEGORY_OPTIONS
    .map((option) => option.label)
    .filter((label) => label && label !== 'All Categories')
  const remaining = new Set(categories)
  const ordered = []

  knownOrder.forEach((label) => {
    if (remaining.has(label)) {
      ordered.push(label)
      remaining.delete(label)
    }
  })

  return ordered.concat(Array.from(remaining).sort())
}

function CharityCategoryFilter({ charityId }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''
  const { data, isPending, isError } = useQuery({
    queryKey: ['charityCategories', charityId],
    queryFn: () => getCharityCategories(charityId),
    enabled: Boolean(charityId),
  })

  const categories = sortCharityCategories(data?.categories || [])
  const options = [ALL_CATEGORIES, ...categories.map((category) => ({
    value: category,
    label: category,
  }))]
  const selected = options.find((option) => option.value === selectedCategory) || ALL_CATEGORIES

  function selectCategory(category) {
    const params = new URLSearchParams(searchParams)
    params.delete('page')
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    setSearchParams(params)
  }

  if (isError || (!isPending && categories.length === 0)) {
    return null
  }

  return (
    <div className="charity-category-filter mb-4">
      <label className="form-label" htmlFor="charity-category-filter">
        Category
      </label>
      <Select
        inputId="charity-category-filter"
        classNamePrefix="charity-category-select"
        options={options}
        value={selected}
        onChange={(option) => selectCategory(option?.value || '')}
        placeholder="Search categories"
        isClearable
        isSearchable
        isLoading={isPending}
        isDisabled={isPending}
        aria-label="Filter items by category"
      />
    </div>
  )
}

export default CharityCategoryFilter
