'use client'

import { useGetUsersQuery } from '@/state/api'
import Header from '@/app/(components)/Header'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import colors from 'tailwindcss/colors'
import { useAppSelector } from '../redux'

const columns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
]

const Users = () => {
  // redux
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  // media query
  const { data: users, isLoading, isError } = useGetUsersQuery()

  if (isLoading) return <div className="p-4">Loading...</div>
  if (isError || !users)
    return (
      <div className="p-4 text-center text-red-500">Failed to fetch users</div>
    )
  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        scrollbarSize={16}
        className="bg-white shadow-md rounded-lg border border-gray-200 mt-5 !text-gray-700 lg:w-fit"
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

export default Users
