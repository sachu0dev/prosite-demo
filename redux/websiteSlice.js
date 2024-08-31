import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headerState: {
    name: 'John Doe',
    username: '@johndoe',
    navs: [],
    profileUrl : "https://cdn.lazyshop.com/files/9b0d8bde-34c0-460a-b131-e7a87b1e0543/product/8d70b37b103f0d0d50ea94f692ff3e43.jpeg"
  },
  aboutState: {
    mainText: 'Your One-Stop Shop for Gifting',
    subText: 'We offer a wide variety of gift and combo hampers perfect for any occasion. Join party Bag community today and unlock exclusive discounts!',
    buttonText: 'Order now',
  },
  serviceState: {
    heading : 'Our Services',
    serviceData: [
      { title: 'Web Development', description: 'We build modern and responsive web applications to meet your business needs.' },
      { title: 'UI/UX Design', description: 'Our design team creates intuitive and beautiful user interfaces.' },
      { title: 'SEO Optimization', description: 'Improve your website\'s visibility on search engines with our expert SEO services.' },
    ]
  },
  aboutState: {
    mainText: 'Your One-Stop Shop for Gifting',
    subText: 'We offer a wide variety of gift and combo hampers perfect for any occasion. Join party Bag community today and unlock exclusive discounts!',
    buttonText: 'Order now',
  },
  bgImg: null,
};

const websiteSlice = createSlice({
  name: 'website',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.bgImg = action.payload;
    },
    setName(state, action) {
      state.headerState.name = action.payload;
    },
    setUsername(state, action) {
      state.headerState.username = action.payload;
    },
    addNavItem(state, action) {
      state.headerState.navs = action.payload
    },
    setServices: (state, action) => {
      state.serviceState.serviceData = action.payload;
    },
    setServicesHeading: (state, action) => {
      state.serviceState.heading = action.payload;
    },
    addService: (state) => {
      state.serviceState.serviceData.push({ title: 'Demo', description: 'Demo' });
    },
    removeService: (state, action) => {
      state.serviceState.serviceData.splice(action.payload, 1);
    },
    setMainText: (state, action) => {
      state.aboutState.mainText = action.payload;
    },
    setSubText: (state, action) => {
      state.aboutState.subText = action.payload;
    },
    setButtonText: (state, action) => {
      state.aboutState.buttonText = action.payload;
    },
  },
});

export const {setName, setUsername, addNavItem, setImage, setServices, setServicesHeading, addService, removeService, setMainText, setSubText, setButtonText } = websiteSlice.actions;
export default websiteSlice.reducer;