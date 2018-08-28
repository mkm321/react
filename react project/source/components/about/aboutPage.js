"use strict";
var React = require('react');
var About = React.createClass({
    statics: {
        willTransitionTo: function(transition, params, query, callback){
            if(!confirm('Are you sure you want to read a page')){
                transition.about();
            } else{
                callback();
            }
        },
        willTransitionFrom: function(transition, component){
            if(!confirm('Are you sure you want to leave a page')){
                transition.about();
            }
        }
    },
    render: function(){
        return (
            <div>
                <h1>About</h1>
                <p>This application used the following technology
                    <ul>
                        <li>React</li>
                        <li>React router</li>
                        <li> React flux</li>
                        <li>node</li>
                        <li>Gulp</li>
                    </ul >
                </p>
            </div>
        );
    }
});
module.exports = About;