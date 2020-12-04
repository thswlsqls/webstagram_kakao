import React, { useState, useEffect } from 'react';
import Post from './Post';
import { Content, Loading } from './ScrollList.styles';
import { getUsers } from '../API';
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
// }));


function ScrollList()  {


  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);
      setUsers((prev) => [...prev, ...newUsers]);
      setLoading(false);
    };

    loadUsers();
  }, [page]);

  //const classes  =  useStyles();

  return (
    <div className='ScrollList'>
      <Content onScroll={handleScroll}>
        { users.map((user) => <Post key={user.cell} user={user} />)}
      </Content>
      {loading && <Loading>Loading ...</Loading>}
    </div>
  );
}

export default ScrollList;
