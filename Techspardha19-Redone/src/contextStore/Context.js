import {
    createContext
} from 'react';
import jwt from 'jsonwebtoken';
import config from '../config';

const ltoken = (localStorage.getItem('TPToken') !== null) ? true : false;
var user;
if (ltoken) {
    user = jwt.verify(localStorage.getItem('TPToken'), config.TOKEY)
}


const Context = createContext({
    user: (user !== null) ? user : null,
    isAuth: (ltoken && user !== null) ? true : false,
    eventCategoreis: [],
    errors: [],
    token: localStorage.getItem('TPToken'),
    onBoard: false,

})

export default Context;