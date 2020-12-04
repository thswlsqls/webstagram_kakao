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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import RouterLink from 'react-router-dom/Link';
//const RouterLink = require('react-router-dom').Link;

import { loginUser } from '../_actions/user_action';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Kakao from '../components/Kakao'

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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    opacity: 0.9,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', //수직방향
  },
  avatar: { //자물쇠이미지
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2), //위, 좌우, 아래 마진
  },
  test: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function Login(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  
  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    console.log('Email', Email);
    console.log('Password', Password); 

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body)) //action을 취하기 위한 메서드이다.

      .then(response => {
        if (response.payload.loginSuccess) {
          props.history.push('/') //리액트에서 페이지를 이동하는 방법이다.
        } else {
          alert('Error')
        }
      })

    // Axios.post('api/users/login', body)
    //     .then(response => { //해당 주소로 서버에 요청을 보낸다.

    //     })
  }

  const oAuthLoginHandler = (resData) => {
    console.log(resData);
    const {id} = resData.profile;
    const {email} = resData.profile.kakao_account;
    let body = {
      oAuthId: id, 
      email,
    }
    dispatch(loginUser(body))
  }  

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid container component="main" className={classes.image}>
        <Container component="main" maxWidth="lg" maxheight="100%">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <form className={classes.form} onSubmit={onSubmitHandler} noValidate>
              <TextField
                variant="outlined" //창 윤곽
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                //autoComplete="email"
                autoFocus
                value={Email}
                onChange={onEmailHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                //autoComplete="current-password"
                value={Password}
                onChange={onPasswordHandler}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.test}
                onSubmit={onSubmitHandler}
              >
                Sign In
            </Button>
            <Kakao />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

export default withRouter(Login)
