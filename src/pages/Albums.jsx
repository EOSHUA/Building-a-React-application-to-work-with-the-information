import React from 'react';
import { Link } from "react-router-dom";



function UserInfo (){

    

    return(
        <section>
        <h1 >this is the Albums components</h1>
        <div className=' butLinkToHome'>
        <Link to ='/User/Home'> Home</Link>
        </div>

         
        </section>
    )
}
export default UserInfo