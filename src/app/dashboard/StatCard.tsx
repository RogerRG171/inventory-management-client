import { LucideIcon } from 'lucide-react'
import React from 'react'

type StatDetail = {
  title: string
  amount: string
  changePercentage: number
  IconComponent: LucideIcon
}
type StatCardProps = {
  title: string
  primaryIcon: JSX.Element
  details: StatDetail[]
  dateRange: string
}

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? '+' : ''
    return `${signal}${value.toFixed(2)}%`
  }

  const getChangeColor = (value: number) =>
    value >= 0 ? 'text-green-500' : 'text-red-500'
  return (
    <div className="flex flex-col justify-between md:row-span-1 xl:row-span-2 col-span-1 bg-white shadow-md rounded-2xl pb-6">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-3">
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>
      {/* Body */}
      <div className="grid grid-cols-4 grid-rows-2 text-center gap-4 mt-4 md:pr-7 pr-2 h-full">
        <div className="row-span-2 flex items-center justify-center">
          <div className="relative h-6 w-6 rounded-full p-5  bg-blue-50 border-sky-300 border-[1px] transform translate-x-0">
            {primaryIcon}
          </div>
        </div>
        {details.map(
          ({ title, amount, changePercentage, IconComponent }, index) => (
            <React.Fragment key={title}>
              <span className="flex items-center justify-center text-gray-500">
                {title}
              </span>
              <span className="flex items-center justify-center font-bold text-gray-800">
                {amount}
              </span>
              <span
                className={`flex items-center justify-center  ${getChangeColor(changePercentage)}`}
              >
                <IconComponent
                  className={`w-4 h-4 mr-2 overflow-visible ${getChangeColor(changePercentage)}`}
                />
                {formatPercentage(changePercentage)}
              </span>
            </React.Fragment>
          ),
        )}
      </div>
    </div>
  )
}

export default StatCard
