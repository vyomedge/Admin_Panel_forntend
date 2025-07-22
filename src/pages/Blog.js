import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { apiClient } from '../lib/api-client';

import {
  Box,Button,TextField,
  Typography,
  Paper,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Avatar,
  Fade,
  Collapse,
  Alert,
  useTheme,
  useMediaQuery,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Article as ArticleIcon,
  Settings as SettingsIcon,
  Image as ImageIcon,
  Tag as TagIcon,
  Person as PersonIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from 'uuid'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentTag, setCurrentTag] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const methods = useForm({ 
    mode: 'onBlur',
    defaultValues: {
      title: '',
      authorName: '',
      description: '',
      category: '',
      tags: [],
      uid: '',
      featuredImage: { url: '', altText: '' },
      meta: { title: '', description: '', keywords: '', canonicalUrl: '' },
      ogTags: { title: '', description: '', image: '' }
    }
  });

  const { handleSubmit, control, setValue, watch, formState: { errors }, reset } = methods;
  const watchedTags = watch('tags') || [];
  const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
  const categories = [
    'Technology', 'Design', 'Business', 'Marketing', 'Development',
    'Lifestyle', 'Travel', 'Food', 'Health', 'Education'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setPreviewImage(base64);
        setValue('featuredImage.url', base64);
      };
      reader.readAsDataURL(file);
    }
  };    

  const addTag = () => {
    if (currentTag.trim() && !watchedTags.includes(currentTag.trim()) && watchedTags.length < 10) {
      setValue('tags', [...watchedTags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

 



const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("authorName", data.authorName);
    formData.append("uid", uuidv4());

    formData.append("category", data.category);
    formData.append("description", data.description);
    // Tags
    data.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    // Featured Image
    if (data.featuredImage?.url) {
      const imageFile = base64ToFile(data.featuredImage.url, 'featured-image.png');
      formData.append("featuredImage", imageFile);
    }
formData.append("featuredImageAlt", data.featuredImage?.altText || "");


    // Meta Fields
    formData.append("meta[title]", data.meta.title);
    formData.append("meta[description]", data.meta.description);
    formData.append("meta[keywords]", data.meta.keywords);
    formData.append("meta[canonicalUrl]", data.meta.canonicalUrl);

    // OG Tags
    formData.append("ogTags[title]", data.ogTags.title);
    formData.append("ogTags[description]", data.ogTags.description);
    formData.append("status", data.status);

    const res = await apiClient.post('/api/blogs', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(' Blog created:', res.data);
    
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
    toast.success('Blog submitted successfully!');
    reset(); // reset form fields
setPreviewImage(null); 

  } catch (error) {
     toast.error('Something went wrong while submitting!');
    console.error('Error creating blog:', error.response?.data || error.message);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: { xs: 2,sm: 3, md: 4, lg: 1 ,xl:1 }
      }}
    >
      <Box maxWidth="1200px" mx="auto" px={{ xs: 2, md: 3 , lg: 0 }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Header */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3,sm: 4, md: 4 , lg: 2 ,xl:3 }, 
                mb: 3, 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <ArticleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="700" color="primary">
                    {`Create New Blog Post`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                {`Share your thoughts with the world`}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {submitSuccess && (
              <Fade in={submitSuccess}>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  {`Blog post created successfully!`} 
                </Alert>
              </Fade>
            )}

            <Grid container spacing={3}>
              {/* Main Content */}
              <Grid item xs={12} lg={8}>
                <Stack spacing={3}>
                  {/* Basic Information */}
                  <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                        <PersonIcon color="primary" />
                        <Typography variant="h6" fontWeight="600">
                          Basic Information
                        </Typography>
                      </Stack>
                      
                      <Stack spacing={3}>
                        <Controller
                          name="title"
                          control={control}
                          rules={{ required: 'Title is required' }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Blog Title"
                              variant="outlined"
                              error={!!errors.title}
                              helperText={errors.title?.message}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  '&:hover fieldset': { borderColor: 'primary.main' }
                                }
                              }}
                            />
                          )}
                        />

                        <Controller
                          name="authorName"
                          control={control}
                          rules={{ required: 'Author name is required' }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Author Name"
                              variant="outlined"
                              error={!!errors.authorName}
                              helperText={errors.authorName?.message}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  '&:hover fieldset': { borderColor: 'primary.main' }
                                }
                              }}
                            />
                          )}
                        />
                        
                          <Typography variant="h6">Description</Typography>
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <ReactQuill
            className="custom-quill"
            theme="snow"
            {...field}
          />
        )}
      />
      {errors.description && (
        <Typography color="error">{errors.description.message}</Typography>
      )}
                {/* <Controller
                          name="description"
                          control={control}
                          rules={{ required: 'Description is required' }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Description"
                              multiline
                              rows={4}
                              variant="outlined"
                              error={!!errors.description}
                              helperText={errors.description?.message}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  '&:hover fieldset': { borderColor: 'primary.main' }
                                }
                              }}
                            />
                            
                          )}
                        />  */}
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Category and Tags */}
                  <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                        <CategoryIcon color="primary" />
                        <Typography variant="h6" fontWeight="600">
                          Category & Tags
                        </Typography>
                      </Stack>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Controller
                            name="category"
                            control={control}
                            rules={{ required: 'Category is required' }}
                            render={({ field }) => (
                              <FormControl  error={!!errors.category} fullWidth>
                                <InputLabel >Category</InputLabel>
                                <Select
                                  {...field}
                                  label="Category"
                                  sx={{ borderRadius: 10,  width:"170px"}}
                                >
                                  {categories.map((cat) => (
                                    <MenuItem sx={{ borderRadius: 10 }} key={cat} value={cat}>
                                      {cat}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Stack direction="row" spacing={1}>
                            <TextField
                              fullWidth
                              label="Add Tag"
                              value={currentTag}
                              onChange={(e) => setCurrentTag(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  
                                  '&:hover fieldset': { borderColor: 'primary.main' }
                                }
                              }}
                            />
                            <IconButton 
                              onClick={addTag} 
                              disabled={!currentTag.trim() || watchedTags.length >= 10}
                              sx={{ 
                                bgcolor: 'primary.main', 
                                color: 'white',
                                width: 40,
                                height: 40,
                                borderRadius: 50,
                                '&:hover': { bgcolor: 'primary.dark' }
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Stack>
                        </Grid>

                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                            {watchedTags.map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                onDelete={() => removeTag(tag)}
                                deleteIcon={<DeleteIcon />}
                                sx={{
                                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                  color: 'white',
                                  '& .MuiChip-deleteIcon': { color: 'rgba(255,255,255,0.8)' }
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* URL and Image */}
                  <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                        <ImageIcon color="primary" />
                        <Typography variant="h6" fontWeight="600">
                          URL & Featured Image
                        </Typography>
                      </Stack>

                      <Stack spacing={3}>
                      

                        <Box>
                          <input
                            accept="image/*"
                            style={{ display: 'none'}}
                            id="featured-image-upload"
                            type="file"
                            
                            onChange={handleImageUpload}
                          />
                          <label htmlFor="featured-image-upload">
                            <Button
                              variant="outlined"
                              component="span"
                              startIcon={<CloudUploadIcon />}
                              sx={{ 
                                borderRadius: 2, 
                                textTransform: 'none',
                                borderStyle: 'dashed',
                                py: 2,
                                px: 3
                              }}
                            >
                              Upload Featured Image
                            </Button>
                          </label>

                          {previewImage && (
                            <Box mt={2}>
                              <img 
                                src={previewImage} 
                                alt="Preview" 
                                style={{
                                  width: '250px',
                                  maxHeight: '300px',
                                  objectFit: 'centre',
                                  borderRadius: '12px'
                                }}
                              />
                              <Controller
                                name="featuredImage.altText"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    label="Image Alt Text"
                                    sx={{ 
                                      mt: 2,
                                      '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': { borderColor: 'primary.main' }
                                      }
                                    }}
                                  />
                                )}
                              />
                            </Box>
                          )}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              {/* SEO Sidebar */}
              <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                  {/* SEO Settings */}
                  <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', position: 'sticky', top: 20 }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                        <SettingsIcon color="primary" />
                        <Typography variant="h6" fontWeight="600">
                          SEO Settings
                        </Typography>
                      </Stack>

                      <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                          <Typography fontWeight="600">Meta Tags</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0 }}>
                          <Stack spacing={2}>
                            <Controller
                              name="meta.title"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Meta Title"
                                  size="small"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
                                      '&:hover fieldset': { borderColor: 'primary.main' }
                                    }
                                  }}
                                />
                              )}
                            />
                            <Controller
                              name="meta.description"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Meta Description"
                                  multiline
                                  rows={3}
                                  size="small"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
                                      '&:hover fieldset': { borderColor: 'primary.main' }
                                    }
                                  }}
                                />
                              )}
                            />
                            <Controller
                              name="meta.keywords"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Keywords"
                                  size="small"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
                                      '&:hover fieldset': { borderColor: 'primary.main' }
                                    }
                                  }}
                                />
                              )}
                            />
                            <Controller
                              name="meta.canonicalUrl"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="Canonical URL"
                                  size="small"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
                                      '&:hover fieldset': { borderColor: 'primary.main' }
                                    }
                                  }}
                                />
                              )}
                            />
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                   

                      <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                          <Typography fontWeight="600">Open Graph</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0 }}>
                          <Stack spacing={2}>
                            <Controller
                              name="ogTags.title"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="OG Title"
                                  size="small"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
                                      '&:hover fieldset': { borderColor: 'primary.main' }
                                    }
                                  }}
                                />
                              )}
                            />
                            <Controller
                              name="ogTags.description"
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  fullWidth
                                  label="OG Description"
                                  multiline
                                  rows={3}
                                  size="small"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
                                      '&:hover fieldset': { borderColor: 'primary.main' }
                                    }
                                  }}
                                />
                              )}
                            />
                            <Controller
  name="ogTags.image"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      fullWidth
      label="OG Image URL"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          '&:hover fieldset': { borderColor: 'primary.main' }
        }
      }}
    />
  )}
/>

                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                      <FormControl fullWidth sx={{ mt: 3 }}>
  <InputLabel>Status</InputLabel>
  <Controller
    name="status"
    control={control}
    defaultValue="Draft"
    render={({ field }) => (
      <Select {...field} label="Status">
        <MenuItem value="Draft">Draft</MenuItem>
        <MenuItem value="Published">Published</MenuItem>
        <MenuItem value="Scheduled">Scheduled</MenuItem>
      </Select>
    )}
  />
</FormControl>

                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
              
            {/* Submit Button */}
            <Box mt={2}>
              <Card sx={{ width: { xs: '100%', md: '100%', lg: '25%', xl: '25%' }, borderRadius: 3, overflow: 'hidden' }}>
                <CardActions sx={{ p: { xs: 2, md: 2 , lg: 3, xl:3 },  }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '20px',
                      fontWeight: '600',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #5a67d8, #6b46c1)'
                      }
                    }}
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default BlogForm;




// import React from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { Button, Box } from '@mui/material';
// import BlogTitleInput from '../commen-component/BlogForm/BlogTitleInput';
// import CategorySelect from '../commen-component/BlogForm/CategorySelect';
// import TagsInput from '../commen-component/BlogForm/TagsInput';
// import UIDInput from '../commen-component/BlogForm/UIDInput';
// import FeaturedImageUpload from '../commen-component/BlogForm/FeaturedImageUpload';
// import FeaturedImageAltInput from '../commen-component/BlogForm/FeaturedImageAltInput';
// import MetaFields from '../commen-component/BlogForm/MetaFields';
// import OGFields from '../commen-component/BlogForm/OGFields';
// import AuthorNameInput from '../commen-component/BlogForm/AuthorNameInput';
// import { apiClient } from '../lib/api-client';
// import Description from '../commen-component/BlogForm/Description';


// const BlogForm = () => {
//   const methods = useForm({ mode: 'onBlur' });
//   const { handleSubmit } = methods;

// const base64ToFile = (base64String, filename) => {
//   const arr = base64String.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);

//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }

//   return new File([u8arr], filename, { type: mime });
// };

// const onSubmit = async (data) => {
//   try {
//     const formData = new FormData();

//     // Basic fields
//     formData.append("title", data.title);
//     formData.append("authorName", data.authorName);
//     formData.append("uid", data.uid);
//     formData.append("category", data.category);

//     // Tags
//     data.tags.forEach((tag, index) => {
//       formData.append(`tags[${index}]`, tag);
//     });

//     // Featured Image (Base64 → File)
//     if (data.featuredImage?.url) {
//       const imageFile = base64ToFile(data.featuredImage.url, 'featured-image.png');
//       formData.append("featuredImage", imageFile);
//     }

//     // Alt Text
//     formData.append("featuredImageAlt", data.featuredImage?.altText || "");

//     // Meta
//     formData.append("meta[title]", data.meta.title);
//     formData.append("meta[description]", data.meta.description);
//     formData.append("meta[keywords]", data.meta.keywords);
//     formData.append("meta[canonicalUrl]", data.meta.canonicalUrl);

//     // OG Tags
//     formData.append("ogTags[title]", data.ogTags.title);
//     formData.append("ogTags[description]", data.ogTags.description);
//     // formData.append("ogTags[image]", data.ogTags.image);  

//     const res = await apiClient.post('/api/blogs', formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log('✅ Blog created:', res.data);

//   } catch (error) {
//     console.error('❌ Error creating blog:', error.response?.data || error.message);
//   }
// };



//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box display="grid" gap={3}>
//           <BlogTitleInput />
//           <AuthorNameInput />
//           <Description/>
//           <CategorySelect />
//           <TagsInput />
//           <UIDInput />
//           <FeaturedImageUpload />
//           <FeaturedImageAltInput />
//           <MetaFields />
//           <OGFields />
//         </Box>
//         <Box mt={3}>
//           <Button variant="contained" type="submit">Submit Blog</Button>
//         </Box>
//       </form>
//     </FormProvider>
//   );
// };

// export default BlogForm;