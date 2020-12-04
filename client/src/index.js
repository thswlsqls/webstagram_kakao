import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import { Provider } from 'react-redux'; //리덕스와 어플리케이션을 연동시키기 위해 사용한다.
import 'antd/dist/antd.css';
import promiseMiddleware from 'redux-promise'; //스토어에서 프로미스 형태의 액션을 받을 때 사용한다. 디스패치에게 프로미스 형태의 데이터가 왔을 때 대처하는 방법을 알려준다.
import ReduxThunk from 'redux-thunk'; //스토어에서 펑션 형태의 액션을 받을 때 사용한다. 디스패치에게 펑션 형태의 데이터가 왔을 대 대처하는 방법을 알려준다.
import { applyMiddleware, createStore } from 'redux';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore) 

const theme = createMuiTheme({
  
      typography : {
          fontFamily : '"Noto Sans KR" , serif',

      }
})

ReactDOM.render(
  <Provider
      store={createStoreWithMiddleware(Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__&&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  > 
   <MuiThemeProvider theme = {theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MuiThemeProvider>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
