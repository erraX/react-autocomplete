import React from 'react'
import ReactDOM from 'react-dom'
import AutoComplete from '../src/AutoComplete.jsx'

const AutoCompleteContainer = () => (
    <div>
        <AutoComplete />
        <AutoComplete id="complete2" />
    </div>
)

ReactDOM.render((
    <AutoCompleteContainer />
), document.getElementById('main'))
