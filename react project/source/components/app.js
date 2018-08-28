/*eslint-disable strict */
var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jquery');
var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header></Header>
                <div className="container-fluid">
                    <RouteHandler></RouteHandler>
                </div>
            </div>
        );
    }
});
module.exports = App;