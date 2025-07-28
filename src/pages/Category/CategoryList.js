import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { apiClient } from "../../lib/api-client";

const CategoryDataGrid = ({ onEdit }) => {
  const [rows, setRows] = useState([]);

  const fetchCategories = async () => {
    const res = await apiClient.get("/api/category");
    const formatted = res.data.map((item, index) => ({
      id: item._id,
      sr: index + 1,
      name: item.name,
      description: item.description,
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
      image: item.image,
    }));
    setRows(formatted);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    await apiClient.delete(`/api/category/${id}`);
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "sr", headerName: "Sr", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    { field: "metaTitle", headerName: "Meta Title", flex: 1 },
    { field: "metaDescription", headerName: "Meta Description", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit && onEdit(params.row)}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default CategoryDataGrid;
