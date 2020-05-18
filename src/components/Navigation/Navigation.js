import React from 'react';

const Navigation = ({onRouteChange , isSignedIn}) =>{
    if(isSignedIn){
    return (
        <div style={{ display: 'flex', justifyContent : 'flex-end'}}>
            <p onClick={() => onRouteChange("signout")} className='f3 link dim black underline pa3 underline'>Sign Out</p>
        </div>
    )
}
    else{
        return(
            <div style={{ display: 'flex', justifyContent : 'flex-end'}}>
            <p onClick={() => onRouteChange("signin")} className='f3 pointer link dim black underline pa3 underline'>Sign In</p>
            <p onClick={() => onRouteChange("register")} className='f3 link pointer dim black underline pa3 underline'>Register</p>
        </div>
        )
    }
}

export default Navigation;