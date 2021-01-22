import React from 'react';
import {render} from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss'


const App: React.FC = ()  =>  {

        return <h1>React boilerplate</h1>

}

render(<App/>, document.getElementById('app'))