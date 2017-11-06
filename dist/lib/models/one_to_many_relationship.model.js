"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OneToXRelationship = require("./one_to_x_relationship.model");
var xserializer_1 = require("xserializer");
var OneToManyRelationship = /** @class */ (function (_super) {
    __extends(OneToManyRelationship, _super);
    /**
     * Creates an instance of OneToManyRelationship.
     *
     * @param {string} name The name of the fk involved
     *
     */
    function OneToManyRelationship(name, index) {
        return _super.call(this, name, index) || this;
    }
    OneToManyRelationship_1 = OneToManyRelationship;
    Object.defineProperty(OneToManyRelationship.prototype, "manySideTable", {
        /**
         * Gets the "many side" table
         *
         * @readonly
         * @type {Table}
         */
        get: function () {
            return this.foreignKeys[0].table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToManyRelationship.prototype, "oneSideTable", {
        /**
         * Gets the "one side" table
         *
         * @readonly
         * @type {Table}
         */
        get: function () {
            return this.foreignKeys[0].referencedTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToManyRelationship.prototype, "relationshipNameFromManySide", {
        /**
         * Name of the relationship from the "many side"
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            var sufix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                sufix = this.indexInSameTablesRelationships.toString();
            }
            return this.oneSideTable.instanceName + sufix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToManyRelationship.prototype, "relationshipNameFromOneSide", {
        /**
         * Name of the relationship from the "one side"
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            var sufix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                sufix = this.indexInSameTablesRelationships.toString();
            }
            return this.manySideTable.instanceName + sufix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToManyRelationship.prototype, "pluralRelationshipNameFromManySide", {
        /**
         * Plural name of the relationship from the "many side"
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            var sufix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                sufix = this.indexInSameTablesRelationships.toString();
            }
            return this.oneSideTable.pluralInstanceName + sufix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToManyRelationship.prototype, "pluralRelationshipNameFromOneSide", {
        /**
         * Plural name of the relationship from the "one side"
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            var sufix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                sufix = this.indexInSameTablesRelationships.toString();
            }
            return this.manySideTable.pluralInstanceName + sufix;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check if two relationships involves the same tables
     *
     * @param {OneToManyRelationship} rel The relationship to compare
     * @return {boolean} Wether it involves the same tables or not
     */
    OneToManyRelationship.prototype.involvesSameTables = function (rel) {
        return (this.oneSideTable === rel.oneSideTable
            &&
                this.manySideTable === rel.manySideTable)
            || (this.oneSideTable === rel.manySideTable
                &&
                    this.manySideTable === rel.oneSideTable);
    };
    Object.defineProperty(OneToManyRelationship.prototype, "isBetweenEntities", {
        get: function () {
            return this.oneSideTable.isEntity &&
                this.manySideTable.isEntity;
        },
        enumerable: true,
        configurable: true
    });
    OneToManyRelationship.prototype.getNameFromSide = function (side) {
        if (side === this.manySideTable) {
            return this.relationshipNameFromManySide;
        }
        else {
            return this.relationshipNameFromOneSide;
        }
    };
    OneToManyRelationship.prototype.getPluralNameFromSide = function (side) {
        if (side === this.manySideTable) {
            return this.pluralRelationshipNameFromManySide;
        }
        else {
            return this.pluralRelationshipNameFromOneSide;
        }
    };
    /**
     * Creates a OneToManyRelationship from a OneToXRelationship
     *
     * @static
     * @param {OneToXRelationship} rel The one-to-x relationship
     * @returns {OneToManyRelationship} The one-to-many relationship
     *
     * @memberOf OneToManyRelationship
     */
    OneToManyRelationship.createFromOneToXRelationship = function (rel, index) {
        var toret = new OneToManyRelationship_1(rel.name, index);
        toret.foreignKeys = rel.foreignKeys.slice();
        return toret;
    };
    __decorate([
        xserializer_1.Serialize()
    ], OneToManyRelationship.prototype, "manySideTable", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToManyRelationship.prototype, "oneSideTable", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToManyRelationship.prototype, "relationshipNameFromManySide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToManyRelationship.prototype, "relationshipNameFromOneSide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToManyRelationship.prototype, "pluralRelationshipNameFromManySide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToManyRelationship.prototype, "pluralRelationshipNameFromOneSide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToManyRelationship.prototype, "isBetweenEntities", null);
    OneToManyRelationship = OneToManyRelationship_1 = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], OneToManyRelationship);
    return OneToManyRelationship;
    var OneToManyRelationship_1;
}(OneToXRelationship));
module.exports = OneToManyRelationship;
//# sourceMappingURL=one_to_many_relationship.model.js.map