const toString = Object.prototype.toString

export function inArray(array, predict) {
    return array.indexOf(predict) !== -1
}

export function isArray(source) {
    return toString.call(source) === '[object Array]'
}

export function makeContainerId(id) {
    return `${id}-dropdown__container`
}

export function containsElement(id, child) {
    if (!isArray(id)) {
        id = [id]
    }

    let parent = child

    if (inArray(id, parent.id)) return true

    while(parent = parent.parentElement) {
        if (inArray(id, parent.id)) return true
    }

    return false
}

export function defaultFilter(suggestions, value) {
    return suggestions.filter(s => {
        const name = s.name.toLowerCase()
        value = value.toLowerCase()
        
        return name.indexOf(value) !== -1
    })
}
