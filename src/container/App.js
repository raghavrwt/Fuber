import React, { Component } from 'react';
import CabList from './CabList';
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
        const url = `http://localhost:4000/`;
        axios.get(url).then(response => {
          if (response.status !== 200) {
              return {
                  isSuccess: false
              }
          }
          this.setState({ cabs: response.data.cabs });
          return response.data;
        });
      });
    }
  }

  render() {
    const { cabs } = this.state;
    return (
      <div style ={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        {cabs.map((cab, index) => {
          return (
            <CabList 
              key={index}
              cab={cab}
              bookNow={this.bookNow} 
            />
          )
        })}
      </div>
    )
  }
}

export default App;
