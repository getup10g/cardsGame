import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app.jsx'

require('../sass/_base.scss');

document.addEventListener("DOMContentLoaded",()=>{
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
