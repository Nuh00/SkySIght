import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Job {
  _id: string;
  title: string;
  location: string;
  salary: number;
  status: string;
  appliedDate: string;
}

export const columns: ColumnDef<Job>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const jobItem = row.original;
      const router = useRouter();

      const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this job?");
        if (confirmed) {
          try {
            const response = await fetch(`/api/deleteJob/${jobItem._id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              toast.success("Job deleted successfully");
            } else {
              const data = await response.json();
              alert(`Failed to delete job: ${data.message}`); //Catch block will not handle this error
              // as it is not a network error
            }
          } catch (error) {
            toast.error("Failed to delete job");
          }
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    // header: () => (
    //   <div className="hover:text-white transition-all inline cursor-pointer">
    //     Role
    //   </div>
    // ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "title",
    cell: ({ row }) => {
      const title = row.getValue("title");
      return <div className="font-bold ">{title as string}</div>;
    },
  },

  {
    header: () => (
      <div className="hover:text-white transition-all inline cursor-pointer">
        Company
      </div>
    ),
    accessorKey: "company",
    cell: ({ row }) => {
      const company = row.getValue("company");
      return <div className="font-bold">{company as string}</div>;
    },
  },
  {
    header: () => (
      <div className="hover:text-white transition-all inline cursor-pointer">
        Location
      </div>
    ),
    accessorKey: "location",
    cell: ({ row }) => {
      const location = row.getValue("location");
      return <div className=" opacity-[80%]">{location as string}</div>;
    },
  },
  {
    header: () => (
      <div className="hover:text-white transition-all inline cursor-pointer">
        Salary
      </div>
    ),
    accessorKey: "salary",
    cell: ({ row }) => {
      const salary = row.getValue("salary");
      return (
        <div className="font-bold">
          {salary as number}
          <span>K</span>{" "}
        </div>
      );
    },
  },
  {
    header: () => (
      <div className="hover:text-white transition-all inline cursor-pointer">
        Status
      </div>
    ),
    accessorKey: "status",
  },
  {
    header: () => (
      <div className=" flex justify-center hover:text-white transition-all cursor-pointer">
        Applied Date
      </div>
    ),
    accessorKey: "appliedDate",
    cell: ({ row }) => {
      const appliedDate = row.getValue("appliedDate") as string;
      const dateWithoutSuffix = appliedDate.replace(/(st|nd|rd|th),/, ",");
      const date = new Date(dateWithoutSuffix);

      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString(undefined);
      return (
        <div className="flex justify-center text-right p-4 border-none">
          {formattedDate}
        </div>
      );
    },
  },
];
