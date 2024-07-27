// Abdulaziz Bro MIT 11, [2024/07/28 7:27 AM]
// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { Box, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import { styled } from '@mui/material/styles';
// import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
// import CloseIcon from '@mui/icons-material/Close';
// import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
// import { GET_FAQS } from '../../../apollo/user/query';

// interface Faq {
//     _id: string;
//     faqCategory: string;
//     faqStatus: string;
//     faqTitle: string;
//     faqContent: string;
//     faqViews: number;
//     memberId: string;
//     createdAt: string;
//     updatedAt: string;
// }

// const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
//     ({ theme }) => ({
//         border: 1px solid ${theme.palette.divider},
//         '&:not(:last-child)': {
//             borderBottom: 0,
//         },
//         '&:before': {
//             display: 'none',
//         },
//     }),
// );

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//     <MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
// ))(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
//     '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//         transform: 'rotate(180deg)',
//     },
//     '& .MuiAccordionSummary-content': {
//         marginLeft: theme.spacing(1),
//     },
// }));

// const Faq: React.FC = () => {
//     const [open, setOpen] = useState(false);
//     const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
//     const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//     const [filteredFaqs, setFilteredFaqs] = useState<Faq[]>([]);
//     const [categories, setCategories] = useState<string[]>([]);

//     const { loading, error, data } = useQuery(GET_FAQS, {
//         variables: { input: { page: 1, limit: 500, sort: 'faqViews' } },
//     });

//     useEffect(() => {
//         if (data && data.getFaqs) {
//             const fetchedFaqs: Faq[] = data.getFaqs.list;
//             const uniqueCategories: string[] = Array.from(new Set(fetchedFaqs.map((faq: Faq) => faq.faqCategory)));
//             setCategories(uniqueCategories);
//         }
//     }, [data]);

//     const filterFaqsByCategory = (category: string) => {
//         if (data && data.getFaqs) {
//             const fetchedFaqs: Faq[] = data.getFaqs.list;
//             const filtered: Faq[] = fetchedFaqs.filter((faq: Faq) => faq.faqCategory === category);
//             setFilteredFaqs(filtered);
//             setSelectedCategory(category);
//         }
//     };

//     const handleQuestionClick = (faq: Faq) => {
//         setSelectedFaq(faq);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedFaq(null);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <Stack className="faq-content">

//             <Stack direction="row" spacing={2} mb={4} className="categories">
//                 {categories.map((category) => (
//                     <Typography
//                         key={category}
//                         component="button"
//                         onClick={() => filterFaqsByCategory(category)}
//                         className={selectedCategory === category ? 'active' : ''}
//                         sx={{
//                             padding: '10px 20px',
//                             borderRadius: '4px',
//                             border: '1px solid',
//                             borderColor: selectedCategory === category ? '#b30d9d' : '#BDBDBD',
//                             backgroundColor: selectedCategory === category ? '#f5e5f7' : '#ffffff',
//                             color: selectedCategory === category ? '#b30d9d' : '#BDBDBD',
//                             cursor: 'pointer',

// '&:hover': {
//                                 borderColor: '#b30d9d',
//                                 backgroundColor: '#f5e5f7',
//                                 color: '#b30d9d',
//                             },
//                         }}
//                     >
//                         {category}
//                     </Typography>
//                 ))}
//             </Stack>
//             <Box component={'div'}>
//                 {filteredFaqs.length > 0 && (
//                     <List>
//                         {filteredFaqs.map((faq, index) => (
//                             <ListItem button key={faq._id} onClick={() => handleQuestionClick(faq)}>
//                                 <ListItemText primary={`${index + 1}. ${faq.faqTitle}`} />
//                             </ListItem>
//                         ))}
//                     </List>
//                 )}
//             </Box>
//             <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//                 <DialogTitle>
//                     FAQ Answer
//                     <IconButton
//                         aria-label="close"
//                         onClick={handleClose}
//                         sx={{
//                             position: 'absolute',
//                             right: 8,
//                             top: 8,
//                             color: (theme:any) => theme.palette.grey[500],
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent dividers className="modalContent">
//                     {selectedFaq && (
//                         <Box component={'div'}>
//                             <Typography variant="h6" className="question">Q: {selectedFaq.faqTitle}</Typography>
//                             <Typography variant="body2" className="answer">A: {selectedFaq.faqContent}</Typography>
//                         </Box>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </Stack>
//     );
// };

// export default Faq;