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
var OneToOneRelationship = /** @class */ (function (_super) {
    __extends(OneToOneRelationship, _super);
    /**
     * Creates an instance of OneToOneRelationship.
     *
     * @param {string} name The name of the foreign key constraint involved
     * @param {number} index The index to serialize
     */
    function OneToOneRelationship(name, index) {
        return _super.call(this, name, index) || this;
    }
    OneToOneRelationship_1 = OneToOneRelationship;
    Object.defineProperty(OneToOneRelationship.prototype, "anotherSideTable", {
        get: function () {
            return this.foreignKeys[0].table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToOneRelationship.prototype, "oneSideTable", {
        get: function () {
            return this.foreignKeys[0].referencedTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToOneRelationship.prototype, "relationshipNameFromAnotherSide", {
        /**
         * Name of the relationship from the "another side"
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
    Object.defineProperty(OneToOneRelationship.prototype, "relationshipNameFromOneSide", {
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
            return this.anotherSideTable.instanceName + sufix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneToOneRelationship.prototype, "pluralRelationshipNameFromAnotherSide", {
        /**
         * Plural name of the relationship from the "another side"
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
    Object.defineProperty(OneToOneRelationship.prototype, "pluralRelationshipNameFromOneSide", {
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
            return this.anotherSideTable.pluralInstanceName + sufix;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check if two relationships involves the same tables
     *
     * @param {OneToOneRelationship} rel The relationship to compare
     * @return {boolean} Wether it involves the same tables or not
     */
    OneToOneRelationship.prototype.involvesSameTables = function (rel) {
        return (this.oneSideTable === rel.oneSideTable
            &&
                this.anotherSideTable === rel.anotherSideTable)
            || (this.oneSideTable === rel.anotherSideTable
                &&
                    this.anotherSideTable === rel.anotherSideTable);
    };
    Object.defineProperty(OneToOneRelationship.prototype, "isBetweenEntities", {
        get: function () {
            return this.oneSideTable.isEntity &&
                this.anotherSideTable.isEntity;
        },
        enumerable: true,
        configurable: true
    });
    OneToOneRelationship.prototype.getNameFromSide = function (side) {
        if (side === this.anotherSideTable) {
            return this.relationshipNameFromAnotherSide;
        }
        else {
            return this.relationshipNameFromOneSide;
        }
    };
    OneToOneRelationship.prototype.getPluralNameFromSide = function (side) {
        if (side === this.anotherSideTable) {
            return this.pluralRelationshipNameFromAnotherSide;
        }
        else {
            return this.pluralRelationshipNameFromOneSide;
        }
    };
    /**
     * Creates a OneToOneRelationship from a One
     *
     * @static
     * @param {OneToXRelationship} rel The OneToXRelationship instance
     * @returns {OneToOneRelationship} The relationship
     */
    OneToOneRelationship.createFromOneToXRelationship = function (rel, index) {
        var toret = new OneToOneRelationship_1(rel.name, index);
        toret.foreignKeys = rel.foreignKeys.slice();
        return toret;
    };
    __decorate([
        xserializer_1.Serialize()
    ], OneToOneRelationship.prototype, "anotherSideTable", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToOneRelationship.prototype, "oneSideTable", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToOneRelationship.prototype, "relationshipNameFromAnotherSide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToOneRelationship.prototype, "relationshipNameFromOneSide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToOneRelationship.prototype, "pluralRelationshipNameFromAnotherSide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToOneRelationship.prototype, "pluralRelationshipNameFromOneSide", null);
    __decorate([
        xserializer_1.Serialize()
    ], OneToOneRelationship.prototype, "isBetweenEntities", null);
    OneToOneRelationship = OneToOneRelationship_1 = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], OneToOneRelationship);
    return OneToOneRelationship;
    var OneToOneRelationship_1;
}(OneToXRelationship));
module.exports = OneToOneRelationship;
//# sourceMappingURL=one_to_one_relationship.model.js.map