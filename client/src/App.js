import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Main from './routes/Main';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import Potal from './routes/Potal';
import Auth from './hoc/auth'


// https://placeimg.com/64/64/any >> 아무 이미지나 가져와서 쓸 수 있음
// 리엑트에는 key 값이 필요함, 그래서 아무 키가 될 수 있는 것을 사용할 것
// callApi 랑 마운트 부분은 공부가 좀 더 필요할 듯

// API의 로딩 순서( 컴포넌트의 라이프 사이클)

//1) constructor()
//2) componentWillMount()
//3) render()
//4) componentDidMount() 

// props 나 state 의 변경이 있을경우) shouldComponentUpdate()

function App() {

  // 페이지 기본설정과 로딩
  // 페이지 폼

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
          <Route exact path="/Potal" component={Auth(Potal, null)} />
          <Route exact path="/Login" component={Auth(Login, false)} />
          <Route exact path="/SignUp" component={Auth(SignUp, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
