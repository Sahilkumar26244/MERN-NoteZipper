import axios from "axios";
import { NOTES_CREATE_FAIL, NOTES_CREATE_REQUEST, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQUEST, NOTES_DELETE_SUCCESS, NOTES_UPDATE_FAIL, NOTES_UPDATE_REQUEST, NOTES_UPDATE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS } from "../constants/noteConstants";

export const listNotes = () => async (dispatch , getState) => {
    try {
        dispatch({type:NOTE_LIST_REQUEST});

        const {
            userLogin :{userInfo},
        } = getState();

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const {data} = await axios.get(`https://mern-notezipper.onrender.com/api/notes` , config);

        dispatch({
            type : NOTE_LIST_SUCCESS,
            payload:data,
        });

    } catch (error) {
        const message = 
            error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type:NOTE_LIST_FAIL,
            payload:message,
        });
    }
};

export const createNoteAction = (title,content,category) => async (dispatch,getState) => {
    try {
        dispatch({type:NOTES_CREATE_REQUEST});

        const {
            userLogin : {userInfo},
        } = getState();

        const config = {
            headers : {
                "Content-Type":"application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const {data} = await axios.post(`https://mern-notezipper.onrender.com/api/notes/create` , {title,content,category}, config);

        dispatch({type:NOTES_CREATE_SUCCESS , payload:data})
    } catch (error) {
        const message = 
            error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type:NOTES_CREATE_FAIL,
            payload:message,
        });
    }
}

export const updateNoteAction = (id,title,content,category) => async(dispatch,getState) => {
    try {
        dispatch({
            type:NOTES_UPDATE_REQUEST,
        });

        const {
            userLogin:{userInfo},
        } = getState();

        const config = {
            headers : {
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        };

        const {data} = await axios.put(`https://mern-notezipper.onrender.com/api/notes/${id}` , {title , content,category} , config);

        dispatch({
            type:NOTES_UPDATE_SUCCESS,
            payload:data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type:NOTES_UPDATE_FAIL,
            payload:message,
        });
    }
};

export const deleteNoteAction = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type:NOTES_DELETE_REQUEST,
        });

        const {
            userLogin : {userInfo}
        } = getState();

        const config = {
            headers : {
                Authorization:`Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.delete(`https://mern-notezipper.onrender.com/api/notes/${id}` , config);

        dispatch({
            type:NOTES_DELETE_SUCCESS,
            payload:data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type:NOTES_DELETE_FAIL,
            payload:message,
        });
    }
}