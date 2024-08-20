import { useGetDashBoardMetricsQuery } from '@/state/api'
import { TrendingDown, TrendingUp } from 'lucide-react'
import numeral from 'numeral'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAppSelector } from '../redux'
import { useMediaQuery, useTheme } from '@mui/material'

const CardPurchaseSummary = () => {
  // material ui
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  // redux
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  // media query
  const { data, isLoading } = useGetDashBoardMetricsQuery()

  const purchaseData = data?.purchaseSummary || []

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null

  return (
    <div className="flex flex-col  row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-3">
              Purchase Summary
            </h2>
            <hr />
          </div>
          {/* Body */}
          <div>
            {/* Body Header */}
            <div className="mb-2 mt-7 px-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format('$0.00a')
                    : '0'}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm ${lastDataPoint.changePercentage! >= 0 ? 'text-green-500' : 'text-red-500'} flex ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            {/* Chart */}
            <ResponsiveContainer
              width="100%"
              height={isMediumScreen ? 200 : 160}
              className="p-2"
            >
              <AreaChart
                data={purchaseData}
                margin={{
                  top: 0,
                  right: 0,
                  left: -25,
                  bottom: isMediumScreen ? 0 : 30,
                }}
              >
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`
                  }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString('pt-BR')}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return date.toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  }}
                  contentStyle={{
                    backgroundColor: `${isDarkMode ? 'rgba(0,0,0,0.7)' : 'white'}`,
                  }}
                />
                <Area
                  type="linear"
                  dataKey="totalPurchased"
                  stroke="#8884d8"
                  fill="#8884d8"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}

export default CardPurchaseSummary
