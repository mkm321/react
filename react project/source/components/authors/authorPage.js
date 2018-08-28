"use strict";
var React = require('react');
var Link = require('react-router').Link;
var Axios = require('axios');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
    getInitialState: function(){
        return {
            authors: []
        };
    },
    componentDidMount: function(){
        var currentComponent = this;
        /*Axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+pune&radius=10000&key=AIzaSyBOjs6ak3PinIYUN-ZbV-2YrZSrAyUk6ns').then(function(response) {
            this.setState({
                authors: JSON.parse(JSON.stringify(response.results))
            });
        }).catch(function(error){
            this.setState({authors: []});
        });*/
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+pune&radius=10000&key=AIzaSyC7ImN0BOyrpCGgeHbsPSyEKrms_BQ8ffo';
        console.log("hii111");        
        fetch(proxyUrl + BASE_URL)
        .then(blob => blob.json())
        .then(function(response) {
            console.log(response);
        currentComponent.setState({
            authors: response.results
        });
    }).catch(function(error){
        console.log(error);
        //this.setState({authors: []});
    });
    },
    /*
    componentDidMount: function(){
        if(this.isMounted()){
            this.setState({ authors: AuthorApi.getAllAuthors() });
        }    
    },*/
    render: function(){
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">ADD Author</Link>
                <AuthorList authors={this.state.authors}></AuthorList>
            </div>
        );
    }
});
module.exports = AuthorPage;