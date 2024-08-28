'use client'

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from '@/state/api'
import { useMemo, useState } from 'react'
import Header from '@/app/(components)/Header'
import { useAppSelector } from '../redux'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type aggregatedDataItem = {
  name: string
  color?: string
  amount: number
}

type aggregatedData = {
  [category: string]: aggregatedDataItem
}

const colors = ['red', 'green', 'orange', 'pink', 'yellow']

const Expenses = () => {
  // redux
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  // states
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // media query
  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery()
  const expenses = useMemo(() => expensesData ?? [], [expensesData])

  const parseDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  const aggregatedData: aggregatedDataItem[] = useMemo(() => {
    const filtered: aggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === 'All' || data.category === selectedCategory
        const dataDate = parseDate(data.date)
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate)
        return matchesCategory && matchesDate
      })
      .reduce((acc: aggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount)
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 }
          acc[data.category].color = colors[Math.floor(Math.random() * 4)]
          acc[data.category].amount += amount
        }
        return acc
      }, {})
    return Object.values(filtered)
  }, [expenses, selectedCategory, startDate, endDate])

  const classNames = {
    label: 'block text-sm font-medium text-gray-700',
    selectInput: `mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${isDarkMode && 'text-white'}`,
  }

  if (isLoading) return <div className="p-4">Loading...</div>
  if (isError || !expensesData)
    return (
      <div className="p-4 text-center text-red-500">
        Failed to fetch expenses
      </div>
    )
  return (
    <div>
      {/* Header */}
      <div className="mb-5 ">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          {/* Category */}
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* Start date */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* End date */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6 mt-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={130}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: aggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? 'rgb(29,78,216)' : entry.color
                      }
                    />
                  ),
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Expenses
