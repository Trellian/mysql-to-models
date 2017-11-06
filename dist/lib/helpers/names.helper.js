"use strict";
var pluralize = require('pluralize');
var pascalCase = require('pascal-case');
var NamesHelper = /** @class */ (function () {
    function NamesHelper() {
    }
    /**
     * Get the plural of a name
     *
     * @static
     * @param {string} name The name to pluralize
     * @return {string} The plural name
     * @memberOf NamesHelper
     */
    NamesHelper.plural = function (name) {
        return pluralize(name);
    };
    /**
     * Make a string Pascal Cased
     *
     * @static
     * @param {string} name The name to pascalCase
     * @return {string} The pascalCase name
     * @memberOf NamesHelper
     */
    NamesHelper.pascalName = function (name) {
        return pascalCase(name);
    };
    return NamesHelper;
}());
module.exports = NamesHelper;
//# sourceMappingURL=names.helper.js.map