import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('user');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = (querySnapshot => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { name, email, hobby } = doc.data();
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        email,
        hobby
      });
    });
    this.setState({
      users
    });
  })
  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return(
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-nama">
              Data Kelas TI C
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Tambah Data</Link></h4>
            <table class="table table-stripe">
              <tread>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Hobby</td>
                </tr>
              </tread>
              <tbody>
                { this.state.users.map(board =>
                  <tr>
                    <td><Link to={'/show/${board.key}'}>{board.name}</Link></td>
                    <td>{board.email}</td>
                    <td>{board.hobby}</td>
                  </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
