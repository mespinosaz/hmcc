import React from 'react';
import Board from './Board'
import uuid from "uuid";

class App extends React.Component {
  constructor(props) {
    super(props)

    var participants = []

    var path = window.location.pathname.substring(1)
    
    if (path.length > 0) {
      try {
        participants = JSON.parse(atob(path))
      } catch (e) {
        alert('Oops wrong parameters')
      }
    }

    this.state = {
      count: 0,
      "participants": participants,
      add: {}
    }
    
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.reset = this.reset.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  next() {
      this.state.participants.forEach(participant => {
        if (this.state.count === participant.count) {
          participant.count += participant.speed
        }
      });

      this.setState({count : this.state.count+1}) 
  }

  previous() { 
    this.setState({count : this.state.count-1}) 
  }

  reset() { 
    this.setState({count :  0, participants: []})
  }

  update(ev) {
    var add = this.state.add
    add[ev.target.id] = ev.target.value
    this.setState({add: add})
  }

  add() {
    if (this.state.add.count < this.state.count) {
      alert('The count of a new combatant should be bigger thant the current one')
      return
    }
    var participants = this.state.participants
    let participant = {
      "id": uuid.v4(),
      "name": this.state.add.name,
      "speed": parseInt(this.state.add.speed, 10),
      "count": parseInt(this.state.add.count, 10),
      "modified": false
    }
    participants.push(participant)

    this.setState({participants: participants})
    console.log(this.state.participants)
  }

  render() {
    return (
      <div id="main">
        <div id="title">
          <h1>Hackmaster Combat Counter</h1>
        </div>
        <div id="controls">
          <button type="button" className="btn btn-primary" onClick={this.previous}>Previous</button>
          <button type="button" className="btn btn-danger" onClick={this.reset}>Reset</button>
          <button type="button" className="btn btn-primary" onClick={this.next}>Next</button>
        </div>
        <div id="add-form">
          <h3>Add participant</h3>
          <input id="name" type="text" placeholder="Name" className="form-control" onChange={this.update}/>
          <input id="speed" type="text" placeholder="Speed" className="form-control" onChange={this.update}/>
          <br/>
          <input id="count" type="text" placeholder="Count" className="form-control" onChange={this.update}/>
          <button type="button" className="btn btn-success" onClick={this.add}>Add</button>
        </div>
        <Board participants={this.state.participants} count={this.state.count}/>
      </div>
    );
  }
}

export default App;
