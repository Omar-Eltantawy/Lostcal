import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorAlert, showSuccessAlert } from "../alerts";

const initialState={
    loading:false,
    success:false,
    error:null,
};

export const updateMyLost=createAsyncThunk("patch/updateMyLost",async({formData,id,token},{rejectWithValue})=>{
    try{
        const response = await axios.patch(`https://lostcal.onrender.com/api/mylost/${id}`,formData,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.errors;
        console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
});

export const updateAdd=createAsyncThunk("patch/updateAdd",async({formData,id,token},{rejectWithValue})=>{
    try{
        const response=await axios.patch(`https://lostcal.onrender.com/api/lost/${id}`,formData,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.errors;
        console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
});

export const updateUsername=createAsyncThunk("patch/updateUsername",async({username,token},{rejectWithValue})=>{
    try{
        const response = await axios.patch("https://lostcal.onrender.com/api/user/changename",{
            username
        },{
            headers:{
                Authorization : `Bearer ${token}`
            }
        });
        console.log(response.data.token);
        return response.data.token;
    }catch(error){
        const errorMessages = error.response.data.errors;
        console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
})


const patchSlice=createSlice({
    name:"patch",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        /////////////////////////////////updateMyLost///////////////////////////////////////
        builder.addCase(updateMyLost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(updateMyLost.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            showSuccessAlert("Your Lost Person's data Updated Successfully ");
        });
        builder.addCase(updateMyLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.error.message;
            showErrorAlert("Failed to Update Your Lost Person's Data ");
        });
        /////////////////////////////////updateAdd////////////////////////////////////////////
        builder.addCase(updateAdd.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(updateAdd.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            showSuccessAlert("Your Lost Person's data Updated Successfully ");
        });
        builder.addCase(updateAdd.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.error.message;
            showErrorAlert(state.error);
        });
        /////////////////////////////updateUsername/////////////////////////////////////////
        builder.addCase(updateUsername.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(updateUsername.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            showSuccessAlert("Your Lost Person's data Updated Successfully ");
        });
        builder.addCase(updateUsername.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.error.message;
            showErrorAlert(state.error);
        });
    },
});
export default patchSlice.reducer;