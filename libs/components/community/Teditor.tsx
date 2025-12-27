import React, { useMemo, useRef, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField } from '@mui/material';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { Editor } from '@toast-ui/react-editor';
import { getJwtToken } from '../../auth';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import axios from 'axios';
import { T } from '../../types/common';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../../sweetAlert';

const TuiEditor = () => {
	const editorRef = useRef<Editor>(null);
	const token = getJwtToken();
	const router = useRouter();
	const [articleCategory, setArticleCategory] = useState<BoardArticleCategory>(BoardArticleCategory.FREE);

	const [createBoardArticle] = useMutation(CREATE_BOARD_ARTICLE);

	const memoizedValues = useMemo(
		() => ({
			articleTitle: '',
			articleContent: '',
			articleImage: '',
		}),
		[],
	);

	/** UPLOAD IMAGE USING imagesUploader **/
	const uploadImage = async (image: File) => {
		try {
			const formData = new FormData();

			// GraphQL multipart request
			formData.append(
				'operations',
				JSON.stringify({
					query: `
						mutation ImagesUploader($files: [Upload!]!, $target: String!) {
							imagesUploader(files: $files, target: $target)
						}
					`,
					variables: { files: [null], target: 'article' }, // array of files
				}),
			);

			formData.append('map', JSON.stringify({ '0': ['variables.files.0'] }));

			formData.append('0', image);

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			// Get the uploaded image path
			const uploadedImageUrl = response.data.data.imagesUploader[0];
			memoizedValues.articleImage = uploadedImageUrl;

			return `${REACT_APP_API_URL}/${uploadedImageUrl}`;
		} catch (err) {
			console.error('Error uploading image:', err);
		}
	};

	const changeCategoryHandler = (e: any) => setArticleCategory(e.target.value);
	const articleTitleHandler = (e: T) => (memoizedValues.articleTitle = e.target.value);

	const handleRegisterButton = async () => {
		try {
			const editor = editorRef.current;
			const articleContent = editor?.getInstance().getHTML() as string;
			memoizedValues.articleContent = articleContent;

			if (!memoizedValues.articleContent || !memoizedValues.articleTitle) {
				throw new Error(Message.INSERT_ALL_INPUTS);
			}

			await createBoardArticle({
				variables: { input: { ...memoizedValues, articleCategory } },
			});

			await sweetTopSuccessAlert('Article is created successfully', 700);
			router.push({
				pathname: 'mypage',
				query: { category: 'myArticles' },
			});
		} catch (err) {
			sweetErrorHandling(err as Error);
		}
	};

	const doDisabledCheck = () => !memoizedValues.articleContent || !memoizedValues.articleTitle;

	return (
		<Stack>
			<Stack direction="row" style={{ margin: '40px' }} justifyContent="space-evenly">
				<Box style={{ width: '300px' }}>
					<Typography style={{ color: '#7f838d', margin: '10px' }} variant="h3">
						Category
					</Typography>
					<FormControl sx={{ width: '100%', background: 'white' }}>
						<Select value={articleCategory} onChange={changeCategoryHandler} displayEmpty>
							<MenuItem value={BoardArticleCategory.FREE}>Free</MenuItem>
							<MenuItem value={BoardArticleCategory.HUMOR}>Humor</MenuItem>
							<MenuItem value={BoardArticleCategory.NEWS}>News</MenuItem>
							<MenuItem value={BoardArticleCategory.RECOMMEND}>Recommendation</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box style={{ width: '300px' }}>
					<Typography style={{ color: '#7f838d', margin: '10px' }} variant="h3">
						Title
					</Typography>
					<TextField
						onChange={articleTitleHandler}
						label="Type Title"
						style={{ width: '300px', background: 'white' }}
					/>
				</Box>
			</Stack>

			<Editor
				initialValue="Type here"
				placeholder="Type here"
				previewStyle="vertical"
				height="640px"
				initialEditType="wysiwyg"
				toolbarItems={[
					['heading', 'bold', 'italic', 'strike'],
					['image', 'table', 'link'],
					['ul', 'ol', 'task'],
				]}
				ref={editorRef}
				hooks={{
					addImageBlobHook: async (image: any, callback: any) => {
						const uploadedImageURL = await uploadImage(image);
						callback(uploadedImageURL);
						return false;
					},
				}}
			/>

			<Stack direction="row" justifyContent="center">
				<Button
					variant="contained"
					color="primary"
					style={{ margin: '30px', width: '250px', height: '45px' }}
					onClick={handleRegisterButton}
					disabled={doDisabledCheck()}
				>
					Register
				</Button>
			</Stack>
		</Stack>
	);
};

export default TuiEditor;
