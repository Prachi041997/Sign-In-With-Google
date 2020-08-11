/* global gapi */
import React, {useEffect, useState} from 'react';
import './Home.css';
import {Link, Redirect} from 'react-router-dom';
import welcome from './welcome2.png';
const Home = ({location})=> {
    const [detail, setDetail] = useState({
        id:'',
        name: '',
        image: '',
        email: ''
    })
    const [isSignOut, setIsSignOut] = useState(false)
    useEffect(()=> {
      console.log(location.state)
      let profile = location.state;
       console.log(profile)
       setDetail({...detail,
        id: profile.id,
        name: profile.name,
        image: profile.image,
        email:profile.email
})
    }, []) 

    const signOut = ()=> {
        console.log('signout')
        console.log(window.gapi.auth2.getAuthInstance().signOut());
        var auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
          setIsSignOut(true)
        });
      }
      const redirectHandle = ()=> {
        return isSignOut && <Redirect to='/'
  ></Redirect>
    }
  return (
      <React.Fragment>
          {redirectHandle()}
          <div className='nav'>
              <div className='profile'>
                  <div className='image'>
                     <img src={detail.image}></img>
                  </div>
                  <div className='name'>{detail.name}</div>
              </div>
              <div className='signout'>
                 <p className='link' onClick={signOut}>Sign out</p>                  
              </div>
          </div>
          <div className='body'>
             <img src={welcome}></img>
          </div>  
      </React.Fragment>
  )
}
export default Home