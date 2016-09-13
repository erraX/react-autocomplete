import React from 'react'
import ReactDOM from 'react-dom'
import AutoComplete from '../src/AutoComplete.jsx'

ReactDOM.render((
        <AutoComplete
            id='hahaha'
            suggestions={[
                {
                    name: '姓名',
                    value: '姓名',
                },
                {
                    name: '住址',
                    value: '住址',
                },
                {
                    name: '电话',
                    value: '电话',
                },
            ]}
        />
), document.getElementById('main'))
