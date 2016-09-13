import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import Dropdown from './Dropdown.jsx'
import './AutoComplete.less'

export default class AutoComplete extends Component {
    PREFIX = 'react-autocomplete'

    /**
     * @constructor
     *
     *  @param {Object} props props
     */
    constructor(props) {
        super(props)

        // dropdown container
        this.container = null

        // defualt container id
        this.containerId = (Math.random() * 1000).toString(32)

        this.state = {
            active: false,     // dropdown active
            value: ''          // input value
        }
    }

    /**
     * create dropdown container
     */
    componentDidMount() {
        let { id = this.containerId } = this.props
        id = `${id}-dropdown__container`

        let container = document.getElementById(id)

        // container not exists, create a new container to body
        if (!container) {
            container = document.createElement('div')
            container.id = id
            document.body.appendChild(container)
        }

        // set current container and id
        this.container = container
        this.containerId = id

        // Render dropdown to container
        this.componentDidUpdate()
    }

    /**
     * render dropdown
     */
    componentDidUpdate() {
        ReactDOM.render((
            <Dropdown
                {...this.props}
                {...this.state}
            />
        ), this.container)
    }

    /**
     * unmount node
     */
    componentWillUnmount() {
        // unmount React component
        ReactDOM.unmountComponentAtNode(this.container)

        // remove from body
        document.body.removeChild(this.container)
    }

    /**
     * open dropdown suggestions
     */
    openDropdown() {
        this.setState({ active: true })
    }

    /**
     * close dropdown suggestions
     */
    closeDropdown() {
        this.setState({ active: false })
    }

    /**
     * toggle dropdown suggestions
     */
    toogleDropdown() {
        const { active } = this.state

        this.setState({ 
            active: !active
        })
    }
    
    /**
     * input value changed
     *
     * @param {Event} evt click event
     */
    inputChangeHandler(evt) {
        const value = evt.target.value

        this.setState({value})
    }

    /**
     * click input
     *
     * @param {Event} evt click event
     */
    inputClickHandler(evt) {
        this.openDropdown()
    }

    /**
     * render
     *
     * @return {React.Component}
     */
    render() {
        const PREFIX = this.PREFIX
        const { id } = this.props
        const { value } = this.state

        const classNames = cx({
            [PREFIX]: true,
        })

        return (
            <div id={id} className={classNames}>
                <input
                    type="text"
                    value={value}
                    onClick={::this.inputClickHandler}
                    onChange={::this.inputChangeHandler}
                />
            </div>
        )
    }
}
