import React, {useEffect} from 'react';
import Axios from 'axios';

function LandingPage() {

  useEffect(() => {
    Axios.get('/api/hello')
      .then(response => {
        if(response.data)
        console.log(response.data);
      })
  }, [])
  
  return (
    <div>LandingPage geng</div>
  )
}

export default LandingPage