import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cabs: [],
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // const latitude = position.coords.latitude;
        // const longitude = position.coords.longitude;
        // const color = 'pink'
        // const url = `http://localhost:4000/bookCab?latitude=${latitude}&longitude=${longitude}&color=${color}`;
        const url = `http://localhost:4000/completeRide`;
        // axios.get(url).then(response => {
        //   console.log("Response", response);
        //   if (response.status !== 200) {
        //       return {
        //           isSuccess: false
        //       }
        //   }
        //   this.setState({ cabs: response.data.cabs });
        //   return response.data;
        // });
        axios.post(url, {
          id: 6,
          locationFrom: { latitude: 105, longitude: 105},
          locationTo: { latitude: 25, longitude: 25}
        }).then(response => {
          console.log("Response", response);
        })
      });
    }
  }

  render() {
    console.log("Cabs", this.state.cabs);
    return (
      <div>
        <h4>Using geolocation JavaScript API in React</h4>
      </div>
    );
  }
}

export default App;
