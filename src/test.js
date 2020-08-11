/* global gapi */
import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'

import axios from 'axios';
import './test.css';


const Test = ()=> {
   const [flag, setFlag] = useState(false);
   const [detail, setDetail] = useState({
       id:'',
       name: '',
       image: '',
       email: '',
       token: ''
   })
    
   useEffect(()=> {
      console.log('Hii')
      insertGapiScript();
   }, [])
  const insertGapiScript = ()=>{
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = ()=> {
       initializeGoogleSigIn();
    }
    document.body.appendChild(script);
  }
 const initializeGoogleSigIn = ()=>  {
    window.gapi.load('auth2', () => {
      let auth2 = gapi.auth2.init({
        client_id: '82492160876-2811u8kq6vihvm7c336qdtoebfe932l4.apps.googleusercontent.com',
      })
      console.log('api inited')
      window.gapi.load('signin2', function () {
        // render a sign in button
        // using this method will show Signed In if the user is already signed in
        var opts = {
            'width': 240,
            'height': 50,
            'longtitle': true,
          onsuccess: (googleUser) => {
            console.log('user has finished sigin');
            console.log(googleUser);
            var profile = googleUser.getBasicProfile();
            var id_token = googleUser.getAuthResponse().id_token;
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            if(profile){
                console.log('inside profile')
                setDetail({...detail,
                           id: profile.getId(),
                           name: profile.getName(),
                           image: profile.getImageUrl(),
                           email:profile.getEmail(),
                           token:id_token
                })
                setFlag(true);
            } 
          },
        }
        window.gapi.signin2.render('loginButton', opts)
      })
    })
  }
  
  const redirectHandle = ()=> {
      return flag && <Redirect to={{
        pathname: '/home',
        state:detail
    }}
></Redirect>
  }
   return( <React.Fragment>
       {redirectHandle()}
    <div className='container'>
    <div id='loginButton' className='btn'>Signin</div>
    </div>
    
  </React.Fragment>)
}
export default Test;
