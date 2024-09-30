"use client";
import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginForm from "../components/auth/login-form";
import { useState } from "react";
import { PopUpForm } from "@/app/components/dashboard/popUpForm";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [showForm, setShowForm] = useState(false);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handleFormModal = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {/* Popup form to create a new job */}
      {showForm && <PopUpForm handleFormModal={handleFormModal} />}
      <div className="w-[78%] h-[650px] flex flex-col justify-center ">
        {" "}
        {/* flex props */}
        <div className="rounded-md px-4">
          {/* Filter */}
          <div className="flex w-full">
            <div className=" relative flex items-center justify-center flex-1">
              <h1 className="font-extrabold text-3xl ">Dashboard</h1>
              <Button
                onClick={handleFormModal}
                className="absolute right-0 dark:bg-white bg-black dark:text-black text-white dark:hover:bg-white/90  hover:bg-black/90 hover:scale-110 transition-all mb-2"
              >
                + Create new job
              </Button>
              <div className="flex items-center py-4 absolute left-0 mb-2 ">
                <Input
                  placeholder="Filter by company  ..."
                  value={
                    (table.getColumn("company")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("company")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
            </div>
          </div>
          {/* Table */}
          <Table className="w-full ">
            <TableHeader className="bg-light-purple text-xl">
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <TableRow className=" " key={headerGroup.id}>
                  {headerGroup.headers?.map((header) => {
                    return (
                      <TableHead
                        className="bg-light-purple text-lg text-white"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel()?.rows?.length ? (
                table.getRowModel()?.rows.map((row) => (
                  <TableRow
                    className="hover:bg-gray-500 hover:text-light-purple transition "
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells()?.map((cell) => (
                      <TableCell
                        className="hover:text-white transition-all "
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-start space-x-2 py-4">
          <Button
            onClick={table?.previousPage}
            disabled={!table?.getCanPreviousPage()}
            variant="outline"
            size="lg"
            className="bg-light-purple text-white hover:bg-black hover:text-light-purple"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              table?.nextPage();
            }}
            disabled={!table?.getCanNextPage()}
            variant="outline"
            size="lg"
            className="bg-light-purple text-white hover:bg-black hover:text-light-purple"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

// "use client";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   console.log(rowSelection);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <div>
//       {/* table */}
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => {
//               return (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <TableHead key={header.id}>
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </TableHead>
//                     );
//                   })}
//                 </TableRow>
//               );
//             })}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell>No results</TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* pagination */}
//       <div className="flex items-center justify-start space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => {
//             table.previousPage();
//           }}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => {
//             table.nextPage();
//           }}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default DataTable;
