import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, CardMedia, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { apiClient } from "../../lib/api-client";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiClient.get("/api/category");
      setCategories(res.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await apiClient.delete(`/api/category/${id}`);
    setCategories(prev => prev.filter(cat => cat._id !== id));
  };

  return (
    <Grid container spacing={2}>
      {categories.map((cat) => (
        <Grid item xs={12} sm={6} md={4} key={cat._id}>
          <Card>
            {cat.image && (
              <CardMedia
                component="img"
                height="140"
                image={cat.image}
                alt={cat.name}
              />
            )}
            <CardContent>
              <Typography variant="h6">{cat.name}</Typography>
              <Typography variant="body2">{cat.description}</Typography>
              <IconButton color="primary" onClick={() => console.log("Edit", cat._id)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                <Delete />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;
