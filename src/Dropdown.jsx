import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import './Dropdown.less'

export default class Dropdown extends Component {

    static propTypes = {
    }

    static defaultProps = {
    }

    PREFIX = 'react-autocomplete-dropdown'

    render() {
        const PREFIX = this.PREFIX
        const { value, active } = this.props
        
        const classNames = cx({
            [PREFIX] : true,
            [`${PREFIX}--active`]: active,
        })

        return (
            <div className={classNames}>
                <ui>
                    <li>1111111111</li>
                    <li>2222222222</li>
                    <li>33333333333</li>
                </ui>
            </div>
        )
    }
}
