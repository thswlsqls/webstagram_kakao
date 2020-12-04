import React from 'react';
import { Wrapper } from './User.styles';
import Pid from '../components/PidTest';



const User = ({ user }) => 
<Wrapper>
<Pid>
{user.email}
</Pid>
</Wrapper>;

export default User;