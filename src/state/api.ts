import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// types
export interface Product {
  productId: string
  name: string
  price: number
  stockQuantity: number
  rating?: number
}

export interface SalesSummary {
  salesSummaryId: string
  totalValue: number
  changePercentage?: number
  date: string
}

export interface PurchaseSummary {
  purchaseSummaryId: string
  totalPurchased: number
  changePercentage?: number
  date: string
}

export interface ExpenseSummary {
  expenseSummaryId: string
  totalPurchased: number
  changePercentage?: number
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string
  category: string
  amount: string
  date: string
}

export interface DashboardMetrics {
  popularProducts: Product[]
  salesSummary: SalesSummary[]
  purchaseSummary: PurchaseSummary[]
  expenseSummary: ExpenseSummary[]
  expenseByCategorySummary: ExpenseByCategorySummary[]
}
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics'],
  endpoints: (build) => ({
    getDashBoardMetrics: build.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),
  }),
})

export const { useGetDashBoardMetricsQuery } = api
