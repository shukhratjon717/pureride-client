export const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}`;

export const availableOptions = ['prductBarter', 'productRent'];

const thisYear = new Date().getFullYear();

export const propertyYears: any = [];

for (let i = 2014; i <= thisYear; i++) {
	propertyYears.push(String(i));
}

export const engineSize = ['BASE', 'LIGHTWEIGHT', 'ENTRYLEVEL', 'INTERMEDIATE', 'ADVANCED', 'HEAVY'];

export const availableNotices = ['createdAt', 'updatedAt', 'noticeLikes', 'noticeViews'];

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Please login first!',
	error3: 'Please fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
};

export const topPropertyRank = 2;
