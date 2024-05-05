import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorAlert } from "../alerts";


const initialState={
    loading:false,
    forgetPasswordSuccess:false,
    secretCodeSuccess:false,
    error:null
}

export const forgetPassword=createAsyncThunk("user/forgetPassword",async({email},{rejectWithValue})=>{
    try{
        const response = await axios.post("https://lostcal.onrender.com/api/user/forgetPassword",{email});
        console.log(response.data);
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.errors;
        console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
})

export const resetSecretCode=createAsyncThunk("user/resetSecretCode",async({resetCode},{rejectWithValue})=>{
    try{
        const response =await axios.post("https://lostcal.onrender.com/api/user/verifyResetCode",{resetCode});
        console.log(response.data);
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.errors;
        console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
})

const forgetSlice=createSlice({
    name:"forget",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        ////////////////////////////forgetPassword///////////////////////////////////////
        builder.addCase(forgetPassword.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(forgetPassword.fulfilled,(state)=>{
            state.loading=false;
            state.forgetPasswordSuccess=true;
            state.error=null;
        });
        builder.addCase(forgetPassword.rejected,(state,action)=>{
            state.loading=false;
            state.forgetPasswordSuccess=false;
            state.error=action.error.message;
            showErrorAlert(state.error);
        })
        //////////////////////////////resetSecretCode//////////////////////////////////////////
        builder.addCase(resetSecretCode.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(resetSecretCode.fulfilled,(state)=>{
            state.loading=false;
            state.secretCodeSuccess=true;
            state.error=null;
        });
        builder.addCase(resetSecretCode.rejected,(state,action)=>{
            state.loading=false;
            state.secretCodeSuccess=false;
            state.error=action.error.message
            showErrorAlert(state.error)
        });
    }
});

export default forgetSlice.reducer