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
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { deleteJob, updateJob } from "@/state/slice";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  status: string;
  appliedDate: string;
  link: string;
}

const ActionCell = ({ jobItem }: { jobItem: Job }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/dashboard/delete/${jobItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // !! rate limiting
      if (response.status === 429) {
        toast.error('Too many requests. Please try again later.');
      }

      if (response.ok) {
        dispatch(deleteJob({ id: jobItem.id }));
        toast.success("Job deleted successfully");
      } else {
        // Error handling...
      }
    } catch (error) {
      toast.error("Failed to delete job");
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
        <DropdownMenuSeparator />
        <DropdownMenuItem className="bg-red-500 hover:bg-red-400" onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const StatusCell = ({ jobItem }: { jobItem: Job }) => {
  const dispatch = useDispatch<AppDispatch>();

  const updateStatus = async (status: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/dashboard/update/${jobItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.status === 429) {
        toast.error('Too many requests. Please try again later.');
      }
      if (response.ok) {
        const data = await response.json();
        dispatch(updateJob(data));
        toast.success("Job status updated successfully");
      } 
    } catch (error) {
      toast.error("Failed to update job status");
    }
  };

  return (
    <Select
      value={jobItem.status}
      onValueChange={(value) => {
        updateStatus(value);
      }}
    >
      <SelectTrigger>
        <SelectValue>{jobItem.status}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="text-green-400" value="Accepted">Accepted</SelectItem>
        <SelectItem className="text-red-500" value="Rejected">Rejected</SelectItem>
        <SelectItem className="text-yellow-600" value="Pending">Pending</SelectItem>
        <SelectItem className="text-gray-400" value="Ghosted">Ghosted</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const columns: ColumnDef<Job, any>[] = [
  {
    id: "actions",
    cell: ({ row }) => <ActionCell jobItem={row.original} />,
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

    cell: ({ row }) => {
      return <StatusCell jobItem={row.original} />;
    },
  },
  {
    header: () => (
      <div className="hover:text-white transition-all inline cursor-pointer">
        Link
      </div>
    ),
    accessorKey: "link",
    cell: ({ row }) => {
      const link = row.getValue("link");
      return (
        link && (
          <a
            href={link as string}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            View job
          </a>
        )
      );
    },
  },
  {
    header: () => (
      <div className="hover:text-white transition-all  cursor-pointer flex flex-col items-center">
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
