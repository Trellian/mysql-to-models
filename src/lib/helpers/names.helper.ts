var pluralize = require('pluralize')
var pascalCase = require('pascal-case')

class NamesHelper {

    /**
     * Get the plural of a name
     * 
     * @static
     * @param {string} name The name to pluralize
     * @return {string} The plural name
     * @memberOf NamesHelper
     */
    static plural(name : string) {
        return pluralize(name);
    }

    /**
     * Make a string Pascal Cased 
     * 
     * @static
     * @param {string} name The name to pascalCase
     * @return {string} The pascalCase name
     * @memberOf NamesHelper
     */
    static pascalName(name : string) {
        return pascalCase(name);
    }
}

export = NamesHelper;