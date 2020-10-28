import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) =>{
    if(isSignedIn){
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={()=>onRouteChange('signin')} className='f4 link dim black underline pa3 pointer white'>Sign Out</p>
            </nav>
        );
    }else{
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p></p>
            </nav>
        );
    } 
}

export default Navigation;