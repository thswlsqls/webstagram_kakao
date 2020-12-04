import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER,
    POST
} from '../_actions/types';

export default function(state = {}, action) { //리듀서는 이전 스테이트와 액션을 갖고 다음 스테이트를 반환한다.
    switch (action.type) { //다양한 요창에 대한 다양한 응답을 전달하는 다양한 액션들이 있을 것이기 때문에 switch구문을 사용한다.
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload} //이전 스태이트와 액션을 사용한다. 서버에서 받은 응답을 사용한다.
            break;  
        case SIGNUP_USER:
            return {...state, register: action.payload} //이전 스태이트와 액션을 사용한다
            break;
        case AUTH_USER:
            return {...state, userData: action.payload} //이전 스태이트와 액션을 사용한다
            break;    
        case POST:
            return {...state, postData: action.payload} //이전 스태이트와 액션을 사용한다
            break;    
        default:
            return state;
    } 
}

