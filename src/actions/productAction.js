import axios from 'axios';
import Papa from 'papaparse';

//
export const getAllProducts = () => async dispatch => {
    dispatch({ type: 'GET_PRODUCTS_REQUEST' });

    try {
        const response = await axios.get('https://topinvapi.onrender.com/api/products/getallproducts'); // Update with your CSV file path
       
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_PRODUCTS_FAILED', payload: error.message });
    }
};





export const getAllImgProducts = () => async dispatch => {
    dispatch({ type: 'GET_IMGPRODUCTS_REQUEST' });

    try {
        const response = await axios.get('../product_2024-06-03_164500.csv'); // Update with your CSV file path
        const parsedData = Papa.parse(response.data, {
            header: true,
            skipEmptyLines: true,
        });
        dispatch({ type: 'GET_IMGPRODUCTS_SUCCESS', payload: parsedData.data });
    } catch (error) {
        dispatch({ type: 'GET_IMGPRODUCTS_FAILED', payload: error.message });
    }
};
