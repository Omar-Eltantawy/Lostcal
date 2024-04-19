import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorAlert, showSuccessAlert } from "../alerts";

const initialState={
    loading:false,
    success:false,
    error:null,
    data:[],
};
export const findTheLost = createAsyncThunk("lost/findTheLost",async ({ formData, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://lostcal.onrender.com/mylost",formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data"
                    }
                }
        );
        console.log(response.data);
        return response.data;
        } catch (error) {
            const errorMessages = error.response.data.errors;
            console.log(rejectWithValue(errorMessages))
            return rejectWithValue(errorMessages);
        }
    }
);


export const searchForLost=createAsyncThunk("lost/searchForLost",async({nameToSearch,token},{rejectWithValue})=>{
    try{
        const response=await axios.get(`https://lostcal.onrender.com/mylost/search?name=${nameToSearch}`,{
            headers:{
                Authorization:token,
            }
        });
        
        // console.log(response.data.result);
        return response.data.result;
    }catch(error){
        const errorMessages = error.response.data.errors;
        // console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
})

export const getLost=createAsyncThunk("lost/getLost",async(token,{rejectWithValue})=>{
    try{
        const response=await axios.get("https://lostcal.onrender.com/mylost",{
            headers:{
                Authorization:token,
            }
        });
        // console.log(response.data);
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.errors;
        // console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
})

export const deleteLost=createAsyncThunk("lost/deleteLost",async({id,token},{rejectWithValue})=>{
    try{
        const response=await axios.delete(`https://lostcal.onrender.com/mylost/${id}`,{
            headers:{
                Authorization:token,
            }
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.errors;
        console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
})

const lostSlice=createSlice({
    name:"lost",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(findTheLost.pending,(state)=>{
            state.loading=true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(findTheLost.fulfilled,(state)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            showSuccessAlert("Add Your Lost's Person Data Successfully ");
        });
        builder.addCase(findTheLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false
            state.error=action.error.message;
            showErrorAlert("failed to Add Your Lost's Person Data ");
        });
        ///////////////////////////////Search////////////////////////////////////
        builder.addCase(searchForLost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(searchForLost.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true
            state.error=null;
            state.data=action.payload;
        });
        builder.addCase(searchForLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.error.message;
            state.data=[];
        });
        ///////////////////////////////getLost///////////////////////////////////
        builder.addCase(getLost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(getLost.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            state.data=action.payload;
        });
        builder.addCase(getLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.error.message;
            state.data=[];
        });
        ///////////////////////////////deleteLost////////////////////////////////////////
        builder.addCase(deleteLost.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(deleteLost.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.error=null;
            state.data=state.data.filter(card=> card.id !== action.payload);
        });
        builder.addCase(deleteLost.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.error.message;
        })
        
    }
});

export default lostSlice.reducer;