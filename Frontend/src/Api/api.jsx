import axios from "axios";

const BASE_URL = "http://31.97.63.245:3030/v1";


// ---- API ENDPOINTS ---- //
const BANNER_URL = `${BASE_URL}/user/banner`;
const SOLAR_IMAGES_URL = `${BASE_URL}/user/images`;
const PRODUCTS_URL = `${BASE_URL}/user/product`;
const GALLERY_IMAGES_URL= `${BASE_URL}/user/imagesgallary1`;
const RATING_URL = `${BASE_URL}/user/ratinglimit`;
const WORKER_IMAGES_URL = `${BASE_URL}/user/imagesgallary2`;
const PRODUCTHOME_URL =`${BASE_URL}/user/producthome`
const  FEATCHUSERRATING =  `${BASE_URL}/user/rating`;
const  SUBMITRATING =`${BASE_URL}/user/rating`
const SENDCONTECFROM =   `${BASE_URL}/user/contact`
const SENDVISIT =  `${BASE_URL}/user/visite`

// ---- API FUNCTIONS =---- //

export const fetchBanner = async () => {
  const response = await axios.get(BANNER_URL);
  return response.data; // Expected: { message, data: [...] }
};

export const fetchSolarImages = async () => {
  try {
    const response = await axios.get(SOLAR_IMAGES_URL);
    return response.data ;
  } catch (error) {
    console.error("Error fetching solar images:", error);
    return { data: [] };
  }
};



export const fetchGalleryImages = async () => {
  const res = await axios.get(GALLERY_IMAGES_URL);
  return res.data; // Only return the actual data
};



export const fetchRatings = async () => {
  try {
    const response = await axios.get(RATING_URL);

    // If the data is nested (like { data: [...] }), adjust accordingly
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      return []; // fallback
    }
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return [];
  }
};



export const fetchWorkerImages = async () => {
  try {
    const res = await axios.get(WORKER_IMAGES_URL);
    return res.data?.data || [];
  } catch (err) {
    console.error("Error fetching images:", err);
    return [];
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_URL);
    return response.data.data || []; // adjust based on your API structure
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export const getProductHome = async () => {
  try {
    const response = await axios.get(PRODUCTHOME_URL);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const fetchUserRating = async () => {
  try {
    const response = await fetch( FEATCHUSERRATING);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching rating:', error);
    return null;
  }
};

export const submitUserRating = async (payload) => {
  try {
    const response = await fetch(SUBMITRATING, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting rating:', error);
    return null;
  }
};

// contactApi.js
// src/api/contactApi.js

// src/api/contactApi.js
export const sendContactForm = async (formData) => {
    try {
        const res = await fetch(SENDCONTECFROM, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Failed to send");

        return await res.json();
    } catch (error) {
        throw error;
    }
};
export const sendVisit = async () => {
  try {
    const response = await axios.post(SENDVISIT );
    // console.log('Visit created:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating visit:', error);
    throw error;
  }
};
