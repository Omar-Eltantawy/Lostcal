import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorAlert, showSuccessAlert} from "../alerts";
const initialState={
    loading:false,
    token:null,
    error:null,
    data:[],
}
export const signupUser=createAsyncThunk("user/signupUser",async ({username,email,password},{rejectWithValue})=>{
    return await axios.post("https://lostcal.onrender.com/user/signup",{
        username,
        email,
        password
    },{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>res.data)
    .catch((error)=>{
        console.log(rejectWithValue(error.response.data.errors))
        return rejectWithValue(error.response.data.errors);
    });
});
export const loginUser=createAsyncThunk("user/loginUser",async ({email,password},{rejectWithValue})=>{
    return await axios.post("https://lostcal.onrender.com/user/login",{
        email,
        password
    },{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        // console.log(res.data.token)
        return res.data.token
    }).catch((error)=>{
        console.log(rejectWithValue(error.response.data.errors))
        return rejectWithValue(error.response.data.errors);
    });
} );

export const getUserInfo=createAsyncThunk("user/getUserInfo",async (token,{rejectWithValue})=>{
    return await axios.get("https://lostcal.onrender.com/user/profile",{
        headers:{
            Authorization:token,
        }
    }).then((res)=>{
        // console.log(res.data);
        return res.data;
    }).catch((error)=>{
        console.log(rejectWithValue(error.response.data.errors))
        return rejectWithValue(error.response.data.errors);
    })
})

const setLoading = (loading) => ({ type: 'auth/setLoading', payload: loading });

const authSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(signupUser.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token=action.payload;
            // showSuccessAlert('Signup successful!');
        });
        builder.addCase(signupUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
            showErrorAlert(action.error.message);
        });

        //////////////////////////login////////////////////////////
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.token=action.payload;
            // showSuccessAlert('Login successful!');
        });
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload ? action.payload.message : action.error.message;
            showErrorAlert(state.error);
        })
        /////////////////////////////getUserInfo///////////////////////////////
        builder.addCase(getUserInfo.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(getUserInfo.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.data=action.payload;
        });
        builder.addCase(getUserInfo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
            state.data=[];
        })
    }
})


export default authSlice.reducer