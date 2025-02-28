import { useGetDashBoardMetricsQuery } from '@/state/api'
import { TrendingUp } from 'lucide-react'
import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAppSelector } from '../redux'

const CardSalesSummary = () => {
  // redux
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  // media query
  const { data, isLoading, isError } = useGetDashBoardMetricsQuery()
  const salesData = data?.salesSummary || []

  const [timeFrame, setTimeFrame] = useState('weekly')

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + curr.changePercentage! / array.length
    }, 0) || 0

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr
  }, salesData[0] || {})

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString('pt-BR', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      })
    : 'N/A'

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>
  }
  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between ">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* Header */}
          <div className="">
            <h2 className="text-lg font-semibold mb-2 px-7 pt-3">
              Sales Summary
            </h2>
            <hr />
          </div>
          {/* Body */}
          <div>
            {/* Body Header */}
            <div className="flex justify-between items-center mb-6 px-7">
              <div className="text-lg font-medium">
                <p className="text-sm text-gray-400">Value</p>
                <span className="text-2xl font-extrabold">
                  {(totalValueSum / 1000000).toLocaleString('pt-BR', {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/*  Chart */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getMonth() + 1}/${date.getDate()}`
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString('pt-BR')}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return date.toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }}
                  cursor={{
                    fill: `${isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.1)'}`,
                  }}
                  contentStyle={{
                    backgroundColor: `${isDarkMode ? 'rgba(0,0,0,0.7)' : 'white'}`,
                  }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Footer */}
          <div>
            <hr />
            <div className="flex justify-between items-center text-sm px-7 my-4">
              <p>{salesData.length || 0} days</p>
              <p className="text-sm">
                Highest Sales Date:{' '}
                <span className="font-bold">{highestValueDate}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CardSalesSummary
