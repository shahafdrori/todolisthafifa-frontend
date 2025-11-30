import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetchAllTasks } from "../../api/getAllTasks";
import { Task } from "../../atoms/atoms";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";
import FormComponent from "../Form";
import { useAtom } from "jotai";
import { openFormAtom } from "../../atoms/atoms";
import { StyledTableCell, StyledTableRow } from "./themesForTable";
import AddIcon from "@mui/icons-material/Add";

const columnHelper = createColumnHelper<Task>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("priority", {
    header: "Priority",
    cell: (info) => {
      const value = info.getValue();
      return (
        <Chip
          label={value}
          color={value >= 3 ? "error" : "success"}
          size="small"
        />
      );
    },
  }),
  columnHelper.accessor("subject", {
    header: "Subject",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY"),
  }),

  // ✅ New nested accessors
  columnHelper.accessor((row) => row.coordinates.longitude, {
    id: "longitude",
    header: "Longitude",
    cell: (info) => info.getValue()?.toFixed(5),
  }),
  columnHelper.accessor((row) => row.coordinates.latitude, {
    id: "latitude",
    header: "Latitude",
    cell: (info) => info.getValue()?.toFixed(5),
  }),
];

const TaskTable = () => {
  const [data, setData] = useState<Task[]>([]);
  const [formOpen, setFormOpen] = useAtom(openFormAtom);

  const handleClose = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const tasks = await fetchAllTasks();
        setData(tasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    loadData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          width: "100%",
          maxWidth: 1000,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Task List
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setFormOpen(true)}
          >
            Add Task
          </Button>
        </Box>
        <FormComponent
          open={formOpen}
          setFormOpen={setFormOpen}
          onClose={handleClose}
        />
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <StyledTableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <StyledTableCell key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <StyledTableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default TaskTable;
