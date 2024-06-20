import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showErrorAlert, showSuccessAlert } from "../Components/alert&loader/alerts";
import axios from "axios";


const initialState={
    loading:false,
    success:false,
    error:null,
    data:[],
};

export const addTheLost=createAsyncThunk("add/addTheLost",async ({formData,token},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/lost
        const response = await axios.post("http://localhost:8000/api/lost",formData,
        {
            headers:{
                'Content-Type': 'multipart/form-data',
                Authorization:`Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
        
    }
}
);

export const getAdds=createAsyncThunk("add/getAdd",async(token,{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/lost
        const response =await axios.get("http://localhost:8000/api/lost",{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
});

export const deleteAdds=createAsyncThunk("add/deleteAdds",async({id,token},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/lost/${id}
        const response=await axios.delete(`http://localhost:8000/api/lost/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.message;
        return rejectWithValue(errorMessages);
    }
})

const addSlice=createSlice({
    name:"add",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addTheLost.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success=false
        });
        builder.addCase(addTheLost.fulfilled, (state) => {
            state.loading=false;
            state.success=true;
            state.error=null;
            showSuccessAlert("Add A Lost's Person Data Successfully ");
        });
        builder.addCase(addTheLost.rejected, (state, action) => {
            state.loading=false;
            state.success=false
            state.error=action.payload;
            showErrorAlert(state.error);
        });
        ///////////////////////////////getAdds////////////////////////////////////////
        builder.addCase(getAdds.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(getAdds.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            state.data=action.payload;
        });
        builder.addCase(getAdds.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
            state.data=[];
        });
        //////////////////////////////deleteAdds///////////////////////////////////////////
        builder.addCase(deleteAdds.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(deleteAdds.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            state.data=state.data.filter(card=> card.id !== action.payload);
        });
        builder.addCase(deleteAdds.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        });
    }
})
export default addSlice.reducer;