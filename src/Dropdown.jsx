import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import { findDOMNode } from 'react-dom'
import { defaultFilter } from './util'
import './Dropdown.less'

/**
 * @extends Component
 */
export default class Dropdown extends Component {

    /**
     * @memberof Dropdown
     *
     * @prop {String} value
     * @prop {Boolean} active
     * @prop {Array} suggestions
     * @prop {Number} top
     * @prop {Number} left
     * @prop {Number} width
     */
    static propTypes = {
        value             : PropTypes.string,
        active            : PropTypes.bool,
        selected          : PropTypes.number,
        maxHeight         : PropTypes.number,
        suggestions       : PropTypes.array.isRequired,
        top               : PropTypes.number.isRequired,
        left              : PropTypes.number.isRequired,
        width             : PropTypes.number.isRequired,
    }

    static defaultProps = {
        value             : '',
        active            : false,
        maxHeight         : 200,
    }

    /**
     * class prefix
     */
    PREFIX = 'react-autocomplete-dropdown'

    componentDidUpdate() {
        const selectedItems = findDOMNode(this).getElementsByClassName(`${this.PREFIX}__item--selected`)
        selectedItems.length && this.scrollIntoView(selectedItems[0])
    }

    scrollIntoView(element) {
        const { maxHeight } = this.props
        const parent = element.parentElement
        const offset = element.offsetTop - parent.scrollTop

        if ((offset > maxHeight - element.offsetHeight) || offset < 0) {
            parent.scrollTop = element.offsetTop
        }
    }

    /**
     * click suggestion
     * set value and hide dropdown
     *
     * @param {String} value suggestion value
     */
    clickSuggestionHandler(value) {
        this.props.clickSuggestion(value)
    }

    /**
     * render suggestions
     *
     * @return {React.Element}
     */
    renderSuggestions() {
        const PREFIX = this.PREFIX
        const { width, maxHeight, selected, suggestions } = this.props

        // Nothing can suggest
        if (!suggestions.length) {
            return null
        }

        const style = {
            width,
            maxHeight,
        }

        return (
                <ul
                    className = {`${PREFIX}__list`}
                    style     = {style}
                >
                    {
                        suggestions.map((s, idx) => 
                            <li
                                className = {
                                    cx({
                                        [`${PREFIX}__item`]: true,
                                        [`${PREFIX}__item--selected`]: selected === idx,
                                    })
                                }
                                key       = {s.name}
                                onClick   = {() => this.clickSuggestionHandler(s.name)}
                            >
                                {s.name}
                            </li>
                        )
                    }
                </ul>
        )
    }

    /**
     * render
     *
     * @return {React.Element}
     */
    render() {
        const PREFIX = this.PREFIX

        const {
            active,
            top,
            left,
            width,
            maxHeight,
        } = this.props
        
        const classNames = cx({
            [PREFIX] : true,
            [`${PREFIX}--active`]: active,
        })
        
        const style = {
            top,
            left,
        }

        return (
            <div
                className = {classNames}
                style     = {style}
            >
                {this.renderSuggestions()}
            </div>
        )
    }
}
