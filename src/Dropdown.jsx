import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import './Dropdown.less'

export default class Dropdown extends Component {
    static propTypes = {
        active: PropTypes.boolean,
        value: PropTypes.string,
    }

    static defaultProps = {
        active: false,
        value: ''
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
                {value}
            </div>
        )
    }
}
