'use client'

import { Package, TrendingDown, TrendingUp } from 'lucide-react'
import CardExpenseSummary from './CardExpenseSummary'
import CardPopularProducts from './CardPopularProducts'
import CardPurchaseSummary from './CardPurchaseSummary'
import CardSalesSummary from './CardSalesSummary'
import StatCard from './StatCard'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        dateRange="22 - 29 October 2023 "
        primaryIcon={
          <Package className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        }
        details={[
          {
            title: 'Customers Growth',
            amount: '175.00',
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: 'Expenses',
            amount: '10.00',
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <div className="flex flex-col justify-between md:row-span-1 xl:row-span-2 col-span-1  shadow-md rounded-2xl pb-3 bg-gray-500"></div>
      <div className="flex flex-col justify-between md:row-span-1 xl:row-span-2 col-span-1  shadow-md rounded-2xl pb-3 bg-gray-500"></div>
    </div>
  )
}

export default Dashboard
