import jwt from 'jsonwebtoken'
import config from '../config.json'
export default function reducer(state, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case 'GET_EVENTCATEGORIES':
            return {
                ...state,
                eventCategories: [...payload.categories]
            }
            case 'ADD_ERROR':
                return {
                    ...state,
                    errors: [...state.errors, payload]
                }
                case 'REMOVE_ERRORS':
                    return {
                        ...state,
                        errors: []
                    }
                    case 'LOGOUT':
                        localStorage.removeItem('TPToken');
                        return {
                            ...state,
                            token: null,
                                isAuth: false,
                                user: null
                        }
                        case 'USER_LOGIN_SUCCESS':
                        case 'ONBOARDED':
                            localStorage.setItem('TPToken', payload.data.token);
                            const user = jwt.verify(payload.data.token, config.TOKEY)
                            console.log(user)
                            console.log("here")
                            return {
                                ...state,
                                isAuth: payload.success,
                                    token: payload.data.token,
                                    onBoard: user.onBoard,
                                    user
                            }

                            default:
                                return state;
    }
}