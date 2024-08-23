'use client'

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
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
      <StatCard
        title="Dues & Pending Orders"
        dateRange="22 - 29 October 2023 "
        primaryIcon={
          <CheckCircle className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        }
        details={[
          {
            title: 'Dues',
            amount: '250.00',
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: 'Pending Orders',
            amount: '147.00',
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        dateRange="22 - 29 October 2023 "
        primaryIcon={
          <Tag className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        }
        details={[
          {
            title: 'Sales',
            amount: '1000.00',
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: 'Discount',
            amount: '200.00',
            changePercentage: -10,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  )
}

export default Dashboard
