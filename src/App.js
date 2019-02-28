import React, { Component} from 'react';
import './App.css'

// comment for local dev
const SERVER_HOST = 'https://eventonica-backend.herokuapp.com';
// uncomment for local dev
// const SERVER_HOST = 'http://localhost:5000';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          events: []
      };
  }

  _addEvent() {
      const title = document.getElementById('add-event').value;
      document.getElementById('add-event').value = '';

      fetch(`${SERVER_HOST}/events`, {
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ title })
      });
  }

  _getEvents() {
      fetch(`${SERVER_HOST}/events`).then((res) => res.json()).then((data) => {
          this.setState({ events: data });
      });
  }

  render() {
    return (
      <div>
        <div>
            <input id="add-event" type="text"/><button className="button" onClick={() => this._addEvent()}>Add event</button> 
        </div>
        <button className="button" onClick={() => this._getEvents()}>Get events</button>
        <div>
            {this.state.events.map((event) => <div key={event.id}>id: {event.id}, title: {event.title}</div>)}
        </div>
      </div>
    );
  }
}

export default App;
