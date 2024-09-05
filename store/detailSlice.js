const {createSlice} = require('@reduxjs/toolkit');

const api = 'http://10.0.2.2:8000';

const detailSlice = createSlice({
    name:'detail',
    initialState:{
        data:[]
    },
    reducers:{
        setDetails(state,action){
            state.data = action.payload
        }
    }
})

export const {setDetails} = detailSlice.actions;
export default detailSlice.reducer;



export function fetchDetails(){
    return async function fetchDetailThunk(dispatch){
        try {
            const res = await fetch(`${api}/products/${productId}`);
        const data = await res.json();

        // Fetch the "postedBy" user information
        const userRes = await fetch(`${api}/user/${data.postedBy._id}`);
        const userData = await userRes.json();

        setDetails({ ...data, postedBy: userData }); // Merge user data into the product data
        } catch (error) {
            console.log(error);
        }
    }
}