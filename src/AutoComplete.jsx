import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import {
    makeContainerId,
    containsElement,
    getAbsolutePosition,
    defaultFilter
} from './util'
import Dropdown from './Dropdown.jsx'
import './AutoComplete.less'

const KEY_DOWN = 40
const KEY_UP = 38
const KEY_ENTER = 13

/**
 * @extends Component
 */
export default class AutoComplete extends Component {

    /**
     * @memberof Dropdown
     *
     * @prop {String} value
     * @prop {Boolean} active
     * @prop {Array} suggestions
     * @prop {Function} filterSuggestions
     */
    static propTypes = {
        maxHeight         : PropTypes.number,
        suggestions       : PropTypes.array.isRequired,
        filterSuggestions : PropTypes.func
    }

    static defaultProps = {
        filterSuggestions : defaultFilter,
    }

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
        this.defaultId = (Math.random() * 1000).toString(32)

        this.state = {
            active: false,     // dropdown active
            value: '',         // input value
            selected: 0        // default selected item
        }
    }

    /**
     * create dropdown container
     */
    componentDidMount() {
        let { id = this.defaultId } = this.props
        id = makeContainerId(id)

        let container = document.getElementById(id)

        // container not exists, create a new container to body
        if (!container) {
            container = document.createElement('div')
            container.id = id
            document.body.appendChild(container)
        }

        // set current container and id
        this.container = container

        // Render dropdown to container
        this.componentDidUpdate()

        // hide dropdown when click outside
        document.addEventListener('click', ::this.cilckOutside)
    }

    /**
     * render dropdown
     */
    componentDidUpdate() {
        const { input } = this.refs
        const { top, left, width, height } = getAbsolutePosition(input)
        const { active, value, selected } = this.state

        const position = {
            top: top + height,
            left,
            width,
        }

        ReactDOM.render((
            <Dropdown
                active            = {active}
                value             = {value}
                selected          = {selected}
                suggestions       = {this.filterSuggestions()}
                clickSuggestion   = {::this.clickSuggestionHandler}
                {...position}
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
     * filter suggestions
     *
     * @return {Array}
     */
    filterSuggestions() {
        const { suggestions, filterSuggestions } = this.props
        const { value } = this.state

        return filterSuggestions(suggestions, value)
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
    cilckOutside(evt) {
        const { id = this.defaultId } = this.props
        const { target } = evt

        if (containsElement([id, this.container.id], target)) {
            return
        }

        this.closeDropdown()
    }

    /**
     * click suggestion
     * set value and hide dropdown
     *
     * @param {String} value suggestion value
     */
    clickSuggestionHandler(value) {
        this.setState({
            value,
            active: false,
        })
    }

    /**
     * navigation
     *
     * @param {Event} evt key event
     */
    navigationHandler(evt) {
        const { keyCode } = evt
        const { selected } = this.state
        const suggestions = this.filterSuggestions()

        // handler hash table
        const handlers = {
            [KEY_DOWN]: () => this.selectNextSuggestion(suggestions),
            [KEY_UP]: () => this.selectPreviousSuggestion(suggestions),
            [KEY_ENTER]: () => this.enterCurrentSuggestion(suggestions),
            default: () => {},
        };

        (handlers[keyCode] || handlers('default'))()
    }

    enterCurrentSuggestion(suggestions) {
        const { selected } = this.state

        this.setState({
            selected: 0,
            value: suggestions[selected].name,
        })
    }

    selectNextSuggestion(suggestions) {
        const { selected } = this.state
        let nextSelected = selected >= suggestions.length - 1 ? 0 : selected + 1
        this.setState({ selected: nextSelected })
    }

    selectPreviousSuggestion(suggestions) {
        const { selected } = this.state
        let nextSelected = selected <= 0 ? suggestions.length - 1 : selected - 1
        this.setState({ selected: nextSelected })
    }
    
    /**
     * input value changed
     *
     * @param {Event} evt click event
     */
    inputChangeHandler(evt) {
        const value = evt.target.value

        this.setState({ value })
    }

    /**
     * click input
     * open dropdown 
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
        const { id = this.defaultId } = this.props
        const { value } = this.state

        const classNames = cx({
            [PREFIX]: true,
        })

        return (
            <div
                id        = {id}
                className = {classNames}
            >
                <input
                    ref       = "input"
                    type      = "text"
                    value     = {value}
                    onKeyDown = {::this.navigationHandler}
                    onClick   = {::this.inputClickHandler}
                    onChange  = {::this.inputChangeHandler}
                />
            </div>
        )
    }
}
