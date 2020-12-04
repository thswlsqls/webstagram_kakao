import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
//import { withStyles } from '@material-ui/core/styles'; //로그인페이지에서 스타일을 적용하는 방식과 같도록 업데이트 하였습니다.
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import axios from 'axios'; // 전송하기 위한 모듈 //리액트 훅을 사용하고 리덕스를 사용하여 요청을 보내도록 업데이트 하였습니다.
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';   
import { SignUpUser } from '../_actions/user_action';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})); //로그인 페이지에서 스타일을 적용하는 방식과 같도록 업데이트 하였습니다.

function SignUp(props) { // 리액트 훅을 사용하기 위해 함수형으로 변환했습니다.
                         // 리액트 훅은 클래스형 컴포넌트에서만 사용할 수 있었던 기능을 함수형 컴포넌트에서도 사용할 수 있게 해줍니다. 클래스형 켬포넌트보다 함수형 컴포넌트를 사용하는 것이 성능상 이점이 있습니다. 그래서 리액트 훅을 사용하면 함수형 컴포넌트의 단점은 보완하고 장점만을 취할 수 있습니다. 
//   constructor(props) {
//     super(props);
//     this.state = {
//         username: '',
//         email: '',
//         password: ''
//     }
//   }

    const dispatch = useDispatch()  //state값을 상하위 컴포넌트간 공유할 수 있게 하기 위하여 리덕스를 사용했습니다. dispatch로 액션을 취한 후에 요청 및 응답을 리듀서로 반환하고 리듀서가 반환하는 nextstate를 store에 저장합니다. store에 저장된 state는 다른 state와 달리 상하위 컴포넌트간 공유가 가능합니다.
                                    //dispatch는 action을 취하기 위하여 리덕스에서 제공하는 메서드입니다.
    const [UserName, setUserName] = useState("") 
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("") //함수형 컴포넌트에서 state를 부여하는 방식입니다. 리액트 16.8부터 리액트 훅이 도입되어 함수형 컴포넌트에서도 클래스형 컴포넌트처럼 라이프사이클을 사용하는 기능을 사용할 수 있게 되었습니다.

//     const handleValueChange = (e) => {
//         let nextState = {};
//         nextState[e.target.name] = e.target.value;
//         this.setState(nextState);
//     }

    const onUserNameHandler = (event) => {
        setUserName(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }  
    
//     const  handleFormSubmit = (e) => {
//         e.preventDefault()
//         this.callApi()
//             .then(( response ) => {
//                 console.log(response.data);
//             }) 
//     }

//     callApi = async(e) =>{
//       const formData = 
//           {
//           'nick': this.state.username,
//           'email':this.state.email,
//           'password': this.state.password
//           }

//       console.log(await axios( '/api/user', {
//           method : 'POST',
//           data : formData ,
//           headers: new Headers() 
//       })) 
//   }

//리덕스를 사용하여 액션에서 위 callApi 처리를 하도록 업데이트 하였습니다.

const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.
        
    let body = {
        name: UserName,
        email: Email,
        password: Password
    }

    dispatch(SignUpUser(body)) //action을 취하기 위한 메서드이다.
        .then(response => {
            if(response.payload.success) {
                props.history.push("/login") //회원가입을 성공하면 로그인 페이지로 이동한다.
            } else {
                alert("Failed to sign up")
            }
        })
}
    const classes  =  useStyles();

    return (      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  value={UserName}
                  onChange = {onUserNameHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={Email}
                  onChange = {onEmailHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password" //타입을 text와 함께 중복 적용한 것을 수정하였습니다.
                  id="password"
                  autoComplete="current-password"
                  value={Password}
                  onChange = {onPasswordHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

export default withRouter(SignUp);