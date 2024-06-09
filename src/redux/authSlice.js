import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { navigatePage, showErrorAlert, showSuccessAlert} from "../alerts";
const initialState={
    token: null,
    loading: false,
    success:false,
    error: null,
    data:[]
}
export const signupUser=createAsyncThunk("user/signupUser",async ({username,email,password,passwordConfirm},{rejectWithValue})=>{
    // https://lostcal.onrender.com/api/user/signup/signup
    return await axios.post("http://localhost:8000/api/user/signup",{
        username,
        email,
        password,
        passwordConfirm
    },{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return res.data
    })
    .catch((error)=>{
        console.log(rejectWithValue(error.response.data.errors))
        return rejectWithValue(error.response.data.errors);
    });
});
export const loginUser=createAsyncThunk("user/loginUser",async ({email,password},{rejectWithValue})=>{
    // https://lostcal.onrender.com/api/user/login
    return await axios.post("http://localhost:8000/api/user/login",{
        email,
        password
    },{
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
    }).then((res)=>{
        console.log(res.data)
        return res.data
    }).catch((error)=>{
        console.log(rejectWithValue(error.response.data.errors))
        return rejectWithValue(error.response.data.errors);
    });
} );


export const getUserInfo=createAsyncThunk("user/getUserInfo",async (token,{rejectWithValue})=>{
    // https://lostcal.onrender.com/api/user/profile
    return await axios.get("http://localhost:8000/api/user/profile",{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }).then((res)=>{
        // console.log(res.data);
        return res.data;
    }).catch((error)=>{
        console.log(rejectWithValue(error.response.data.errors))
        return rejectWithValue(error.response.data.errors);
    })
})


export const updatePassword=createAsyncThunk("user/updatePassword",async({passwordCurrent,password,passwordConfirm,token},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/user/updateMyPassword
        const response = await axios.patch("http://localhost:8000/api/user/updateMyPassword",{
            passwordCurrent,
            password,
            passwordConfirm
        },{
            headers:{
                Authorization : `Bearer ${token}`
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

export const resetPassword=createAsyncThunk("user/resetPassword",async({email,newPassword,passwordConfirm},{rejectWithValue})=>{
    try{
        // https://lostcal.onrender.com/api/user/resetPassword
        const response = await axios.put("http://localhost:8000/api/user/resetPassword",{
            email,
            newPassword,
            passwordConfirm
        });
        console.log(response.data);
        return response.data;
    }catch(error){
        const errorMessages = error.response.data.errors;
        console.log(rejectWithValue(errorMessages))
        return rejectWithValue(errorMessages);
    }
})
const setLoading = (loading) => ({ type: 'user/setLoading', payload: loading });

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
            state.token=action.payload.token;
            state.data=action.payload.data
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
            state.token=action.payload.token;
            state.data=action.payload.data.user;
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
        //////////////////////////////UpdatePassword///////////////////////////////////////////
        builder.addCase(updatePassword.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(updatePassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.token=action.payload.token;
            state.data=action.payload.data;
            state.error=null;
            showSuccessAlert("Your Lost Person's data Updated Successfully ");
        });
        builder.addCase(updatePassword.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.error.message;
            showErrorAlert(state.error);
        });
        ////////////////////////////resetPassword/////////////////////////////////////////////////
        builder.addCase(resetPassword.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.token=action.payload.token;
            state.data=action.payload.data;
            state.error=null;
        });
        builder.addCase(resetPassword.rejected,(state,action)=>{
            state.loading = false;
            state.success = false;
            state.error=action.error.message;
        });
    }
})


export default authSlice.reducer