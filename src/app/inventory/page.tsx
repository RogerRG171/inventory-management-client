'use client'

import { useGetProductsQuery } from '@/state/api'
import Header from '@/app/(components)/Header'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import colors from 'tailwindcss/colors'
import { useAppSelector } from '../redux'

const columns: GridColDef[] = [
  {
    field: 'productId',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,

    type: 'number',
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 110,
    type: 'number',
    valueGetter: (value, row) => (row.rating ? row.rating : 'N/A'),
  },
  {
    field: 'stockQuantity',
    headerName: 'Stock Quantity',
    width: 150,
    type: 'number',
  },
]

const Inventory = () => {
  // redux
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  // media query
  const { data: products, isLoading, isError } = useGetProductsQuery()

  if (isLoading) return <div className="p-4">Loading...</div>
  if (isError || !products)
    return (
      <div className="p-4 text-center text-red-500">
        Failed to fetch products
      </div>
    )
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        scrollbarSize={16}
        className="bg-white shadow-md rounded-lg border border-gray-200 mt-5 !text-gray-700"
        sx={{
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-footerContainer, .MuiDataGrid-row--borderBottom .MuiDataGrid-filler':
            {
              backgroundColor: isDarkMode
                ? `${colors.blue[800]}`
                : `${colors.blue[100]}`,
            },
          '&  .MuiDataGrid-filler': {
            backgroundColor: isDarkMode
              ? `${colors.gray[800]}`
              : `${colors.gray[100]}`,
          },
          '& .MuiButtonBase-root, .MuiToolbar-root': {
            color: isDarkMode ? `${colors.white}` : `${colors.black}`,
          },
          '& .MuiTablePagination-actions button:disabled': {
            color: isDarkMode ? `${colors.gray[600]}` : `${colors.gray[300]}`,
          },
        }}
      />
    </div>
  )
}

export default Inventory
