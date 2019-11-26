import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('user');
        this.state = {
            name: '',
            email: '',
            hobby: ''
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, hobby } = this.state;

        this.ref.add({
            name,
            email,
            hobby
        }).then((docRef) => {
            this.setState({
                name: '',
                email: '',
                hobby: ''
            });
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error adding document: ", error)
        });
    }

    render() {
        const { name, email, hobby } = this.state;
        
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-name">
                            Tambah Data
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/" class="btn btn-primary">List Data</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">Name : </label>
                                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="input name"/>
                            </div>
                            <div class="form-group">
                                <label for="email">Email : </label>
                                <input type="text" class="form-control" name="email" value={email} oncChange={this.onChange} placeholder="input email" />
                            </div>
                            <div class="form-group">
                                <label for="hobby">Hobby</label>
                                <input type="text" class="form-control" name="hobby" value={hobby} oncChange={this.onChange} placeholder="input hobby" />
                            </div>
                            <button type="submit" class="btn-success">submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;