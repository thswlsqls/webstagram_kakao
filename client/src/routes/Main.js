import React, {useState} from 'react';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useDispatch } from 'react-redux';   
import { post } from '../_actions/user_action';

import { withRouter } from 'react-router-dom';
import AppBar from '../components/Appbar';
import ScrollList from '../components/ScrollList';
import { set } from 'mongoose';


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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    padding: theme.spacing(6),
  },
  test: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function onClickHandler(props) {
  Axios.get('/api/users/logout')
    .then(response => {
      if (response.data.success) {
        props.history.push("/login")
      } else {
        alert('로그아웃 하는데 실패 했습니다.')
      }
    })
}

function Main(props) {
  const classes = useStyles();

  const dispatch = useDispatch()
  const [comment, setComment] = useState("")    


  const onCommentHandler = (event) => {
    setComment(event.currentTarget.value)
}

  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.
        
    let body = {
        comment: comment,
    }


    dispatch(post(body))
    .then(response => {
        if (response.payload.loginSuccess) {
        props.history.push('/') //리액트에서 페이지를 이동 방법
        } else {
        alert('Error')
        }
    })
  }


  return (
     <React.Fragment>
      <CssBaseline />
        <AppBar position="relative">
        
        </AppBar>
        {/* Hero unit */}


        <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="comment"
                  label="comment"
                  name="comment"
                  autoComplete="comment"
                  value={comment}
                  onChange = {onCommentHandler}
                />
              </Grid>
            </Grid>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.test}
            >
              comment!
            </Button>

          </form>


        <Container className={classes.cardGrid} maxWidth="md">
          <ScrollList/>
          {/* End hero unit */}
        </Container>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withRouter(Main);
