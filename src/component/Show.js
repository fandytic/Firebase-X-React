import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('user').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exits) {
                this.setState({
                    user: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }
    delete(id){
        firebase.firestore().collection('user').doc(id).delete().then(() => {
            console.log("Document succesfully deleted!");
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error remocing document: ", error);
        });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4><Link to="/">List Data TIC</Link></h4>
                        <h3 class="panel-title">
                            {this.state.user.title}
                        </h3>
                    </div>
                    <div class="panel-body">
                        <dl>
                            <dt>Name : </dt>
                            <dd>{this.state.user.name}</dd>
                            <dt>Email : </dt>
                            <dd>{this.state.user.email}</dd>
                            <dt>Hobby : </dt>
                            <dd>{this.state.user.hobby}</dd>
                        </dl>
                        <Link to={'/edit/${this.state.key}'} class="btn-succes">Edit</Link>&bnsp;
                        <button oncClick={this.delete.bind(this,this.state.key)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;