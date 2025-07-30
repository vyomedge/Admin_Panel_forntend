import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";
import CommonDropdown from "../../commen-component/CommonDropdown/CommonDropdown";
import { apiClient } from "../../lib/api-client";

const PortfolioPage = () => {
  const methods = useForm({ defaultValues: { category: "all" } });
  const { watch } = methods;

   const navigate = useNavigate();
  
  const selectedCategory = watch("category");

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [allPortfolioData, setAllPortfolioData] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await apiClient.get("/api/category");
      const formatted = res.data.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      setCategoryOptions([{ value: "all", label: "All" }, ...formatted]);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Fetch portfolio data
  const fetchPortfolio = async () => {
    try {
      const res = await apiClient.get("/api/portfolio");
      setAllPortfolioData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching portfolio", error);
      setLoading(false);
    }
  };

  // Filter images on category change
  useEffect(() => {
    if (selectedCategory === "all") {
      // Flatten all images from all items
      const allImgs = allPortfolioData.flatMap((item) => item.images || []);
      setFilteredImages(allImgs);
    } else {
      const matchedItems = allPortfolioData.filter(
        (item) => item.category === selectedCategory
      );
      const imgs = matchedItems.flatMap((item) => item.images || []);
      setFilteredImages(imgs);
    }
  }, [selectedCategory, allPortfolioData]);

  useEffect(() => {
    fetchCategories();
    fetchPortfolio();
  }, []);

  const handlePhoto = () =>{
navigate('/addportfolio')
  }
  return (
    <FormProvider {...methods}>
      <Box p={3}>
        <Typography variant="h5" mb={3}>
          Portfolio Gallery
        </Typography>

        {/* Dropdown Filter */}
        <Paper elevation={3} sx={{ maxWidth: 400, p: 2, mb: 4 }}>
          <CommonDropdown
            name="category"
            label="Filter by Category"
            options={categoryOptions}
          />
        </Paper>
            <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handlePhoto}
                >
                Add Photos
                </Button>

        {/* Images Grid */}
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredImages.length > 0 ? (
              filteredImages.map((img) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={img._id}>
                  <Card sx={{ height: 250 }}>
                    <CardMedia
                      component="img"
                      image={img.url}
                      alt="portfolio"
                      sx={{ height: "100%", objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No images found for this category.</Typography>
            )}
          </Grid>
        )}
      </Box>
    </FormProvider>
  );
};

export default PortfolioPage;
