import { initialStateSetup } from "@/types/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : initialStateSetup = {
    isSidebarCollapsed : false,
    isDarkModeOn : false
}

export const globalSlice = createSlice({
    name : 'global',
    initialState,
    reducers : {
        setIsSidebarcollapsed : (state , action : PayloadAction<boolean>)=>{
            state.isSidebarCollapsed = action.payload
        },
        setIsDarkMode : (state , action : PayloadAction<boolean>)=>{
            state.isDarkModeOn = action.payload
        }
    }
})

export const {setIsSidebarcollapsed , setIsDarkMode} = globalSlice.actions;
export default globalSlice.reducer;