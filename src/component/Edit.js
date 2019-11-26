import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            name: '',
            email: '',
            hobby: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('user').doc(this.state.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const user = doc.data();
                this.setState({
                    key: doc.id,
                    name: user.name,
                    email: user.email,
                    hobby: user.hobby
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({user:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, hobby } = this.state;

        const updateRef = firebase.firestore().collection('user').doc(this.state.key);
        updateRef.set({
            name,
            email,
            hobby
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                email: '',
                hobby: ''
            });
            this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-name">
                            Edit data
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={'/show/${this.state.key}'} class="btn btn-primary">List Data</Link></h4>
                        <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label for="name">Name : </label>
                            <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="input name"/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email : </label>
                            <input type="text" class="form-control" name="email" value={this.state.email} oncChange={this.onChange} placeholder="input email" />
                        </div>
                        <div class="form-group">
                            <label for="hobby">Hobby</label>
                            <input type="text" class="form-control" name="hobby" value={this.state.hobby} oncChange={this.onChange} placeholder="input hobby" />
                        </div>
                        <button type="submit" class="btn-success">submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;