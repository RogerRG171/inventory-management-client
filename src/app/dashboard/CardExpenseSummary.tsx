import {
  ExpenseByCategorySummary,
  useGetDashBoardMetricsQuery,
} from '@/state/api'
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useAppSelector } from '../redux'
import { TrendingUp } from 'lucide-react'

type ExpenseSums = {
  [category: string]: number
}

const colors = ['#00c49f', '#0088fe', '#ffbb28']

const CardExpenseSummary = () => {
  // redux
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  // media query
  const { data, isLoading } = useGetDashBoardMetricsQuery()

  const expenseSummary = data?.expensesSummary[0]

  const expenseByCategorySummary = data?.expensesByCategory || []

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, curr: ExpenseByCategorySummary) => {
      const category = curr.category + ' Expenses'
      const amount = parseInt(curr.amount, 10)
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += amount
      return acc
    },
    {},
  )

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    }),
  )

  const totalExpense = expenseCategories.reduce(
    (acc, curr: { value: number }) => acc + curr.value,
    0,
  )

  const formattedTotalExpense = totalExpense.toFixed(0)

  return (
    <div className="flex flex-col justify-between row-span-3 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-3">
              Expense Summary
            </h2>
            <hr />
          </div>
          {/* Body */}
          <div className="lg:flex  justify-between pr-7 ">
            {/* Chart */}
            <div className="relative basis-3/5 text-white">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={35}
                    outerRadius={65}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    label={(entry) => entry.name}
                    formatter={(value) => (
                      <p className="text-purple-500"> ${value}m</p>
                    )}
                    itemStyle={{
                      color: isDarkMode ? '#00aaee' : 'darkblue',
                    }}
                    contentStyle={{
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'white',
                      border: `1px solid ${isDarkMode ? 'white' : 'lightgray'}`,
                    }}
                    wrapperStyle={{ zIndex: 1000 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span
                  className={`font-bold text-xl ${isDarkMode ? 'text-slate-50' : 'text-gray-700'}`}
                >
                  ${formattedTotalExpense}m
                </span>
              </div>
            </div>
            {/* Labels */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Footer */}
          <div>
            <hr />
            <div className="my-2 flex justify-between px-7">
              <div className="pt-2">
                <p className="text-sm">
                  Average:{' '}
                  <span className="font-semibold">
                    ${(expenseSummary!.totalExpenses / 1000000).toFixed(2)}m
                  </span>
                </p>
              </div>
              <span className="flex items-center mt-2">
                <TrendingUp className="mr-2 text-green-500" />
                30%
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.1
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default CardExpenseSummary
