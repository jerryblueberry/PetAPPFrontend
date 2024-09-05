const {createSlice} = require('@reduxjs/toolkit');
const api = 'http://10.0.2.2:8000';

const likeSlice = createSlice({
    name:'like',
    initialState: {
        data:[] //or can be {};
    },
    reducers:{
        setLikes(state,action){
            state.data = action.payload;
        },


    }
})

export const {setLikes} = likeSlice.actions;
export default likeSlice.reducer;


export function fetchLikes(productId){
    return async function fetchLikeThunk(dispatch){
        try {
            const res = await fetch(`${api}/like/products/${productId}`);
            const data = await res.json();
            dispatch(setLikes(data));
        } catch (error) {
            console.log(error);
        }
    }
}