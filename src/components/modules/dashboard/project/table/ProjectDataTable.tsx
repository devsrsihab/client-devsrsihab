"use client";

import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { renderCell } from "./TableColumn";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/src/components/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/src/context/user.provider";
import { useGetProjects } from "@/src/hooks/project.hook";
import { IProject } from "@/src/types";

const ProjectDataTable = () => {
  const { user: currentUser } = useUser();
  const { data, isLoading } = useGetProjects();
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");

  const projects = data?.data;
  const rowsPerPage = 5;

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const statusOptions = useMemo(
    () => [
      { name: "Pending", id: "pending" },
      { name: "Published", id: "published" },
      { name: "Unpublished", id: "unpublished" },
      { name: "Private", id: "private" },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    let filteredProjects = [...(projects || [])];

    if (hasSearchFilter) {
      filteredProjects = filteredProjects.filter((project: IProject) =>
        project.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProjects;
  }, [projects, filterValue, hasSearchFilter]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by title..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat" className="capitalize">
                  Status
                  <ChevronDownIcon className="w-4 h-4 ml-2" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.id} className="capitalize">
                    <span>{status.name}</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex justify-end">
            {currentUser?.role === "admin" && (
              <Button>
                <Link href="/admin/projects/create">Add Project</Link>
              </Button>
            )}

            {currentUser?.role === "user" && (
              <Button>
                <Link href="/user/project/create">Add Project</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, currentUser?.role, statusOptions]);

  return (
    <div className="relative">
      <Table
        aria-label="Project table with pagination"
        topContent={topContent}
        bottomContent={
          filteredItems.length > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(filteredItems.length / rowsPerPage)}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="image">Image</TableColumn>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn className="capitalize" key="technologies">
            Technologies
          </TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={filteredItems.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
          )}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={"No projects found"}
        >
          {(project: IProject) => (
            <TableRow className="capitalize" key={project._id}>
              {(columnKey) => (
                <TableCell>{renderCell(project, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectDataTable;
