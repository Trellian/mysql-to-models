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
var Relationship = require("./relationship.model");
var _ = require("lodash");
var xserializer_1 = require("xserializer");
var ManyToManyRelationship = /** @class */ (function (_super) {
    __extends(ManyToManyRelationship, _super);
    function ManyToManyRelationship(relationship1, relationship2, index) {
        var _this = _super.call(this, index) || this;
        _this._relationship1 = relationship1;
        _this._relationship2 = relationship2;
        return _this;
    }
    Object.defineProperty(ManyToManyRelationship.prototype, "relationship1", {
        get: function () {
            return this._relationship1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "relationship2", {
        get: function () {
            return this._relationship2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "manySide1Table", {
        /**
         * First "many side" table
         *
         * @readonly
         * @type {Table}
         */
        get: function () {
            return this._relationship1.oneSideTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "manySide2Table", {
        /**
         * Second "many side" table
         *
         * @readonly
         * @type {Table}
         */
        get: function () {
            return this._relationship2.oneSideTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "innerTable", {
        /**
         * Inner table
         *
         * @readonly
         * @description The table create to join the many-to-many relationship
         * @type {Table}
         */
        get: function () {
            return this._relationship1.manySideTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "relationshipNameFromManySide2", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.manySide1Table.instanceName + "In" + _.upperFirst(this.innerTable.instanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "relationshipNameFromManySide1", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.manySide2Table.instanceName + "In" + _.upperFirst(this.innerTable.instanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "pluralRelationshipNameFromManySide2", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.manySide1Table.pluralInstanceName + "In" + _.upperFirst(this.innerTable.instanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "pluralRelationshipNameFromManySide1", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.manySide2Table.pluralInstanceName + "In" + _.upperFirst(this.innerTable.instanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "innerRelationshipNameFromManySide2", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.innerTable.instanceName + "With" + _.upperFirst(this.manySide1Table.instanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "innerRelationshipNameFromManySide1", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.innerTable.instanceName + "With" + _.upperFirst(this.manySide2Table.instanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "pluralInnerRelationshipNameFromManySide2", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.innerTable.pluralInstanceName + "With" + _.upperFirst(this.manySide1Table.pluralInstanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManyToManyRelationship.prototype, "pluralInnerRelationshipNameFromManySide1", {
        get: function () {
            var suffix = '';
            if (this.numberOfRelationshipsWithSameTables > 1) {
                suffix = this.indexInSameTablesRelationships.toString();
            }
            return this.innerTable.pluralInstanceName + "With" + _.upperFirst(this.manySide2Table.pluralInstanceName) + suffix;
        },
        enumerable: true,
        configurable: true
    });
    ManyToManyRelationship.prototype.getNameFromSide = function (side) {
        if (side === this.manySide1Table) {
            return this.relationshipNameFromManySide1;
        }
        else {
            return this.relationshipNameFromManySide2;
        }
    };
    ManyToManyRelationship.prototype.getPluralNameFromSide = function (side) {
        if (side === this.manySide1Table) {
            return this.pluralRelationshipNameFromManySide1;
        }
        else {
            return this.pluralRelationshipNameFromManySide2;
        }
    };
    ManyToManyRelationship.prototype.getInnerNameFromSide = function (side) {
        if (side === this.manySide1Table) {
            return this.innerRelationshipNameFromManySide1;
        }
        else {
            return this.innerRelationshipNameFromManySide2;
        }
    };
    ManyToManyRelationship.prototype.getPluralInnerNameFromSide = function (side) {
        if (side === this.manySide1Table) {
            return this.pluralInnerRelationshipNameFromManySide1;
        }
        else {
            return this.pluralInnerRelationshipNameFromManySide2;
        }
    };
    Object.defineProperty(ManyToManyRelationship.prototype, "isBetweenEntities", {
        get: function () {
            return this.manySide1Table.isEntity &&
                this.manySide2Table.isEntity;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check if two relationships involves the same tables
     *
     * @param {ManyToManyRelationship} rel The relationship to compare
     * @return {boolean} Wether it involves the same tables or not
     */
    ManyToManyRelationship.prototype.involvesSameTables = function (rel) {
        return this.innerTable === rel.innerTable
            && ((this.manySide1Table === rel.manySide1Table
                &&
                    this.manySide2Table === rel.manySide2Table)
                || (this.manySide1Table === rel.manySide2Table
                    &&
                        this.manySide2Table === rel.manySide1Table));
    };
    __decorate([
        xserializer_1.Deserialize()
    ], ManyToManyRelationship.prototype, "_relationship1", void 0);
    __decorate([
        xserializer_1.Deserialize()
    ], ManyToManyRelationship.prototype, "_relationship2", void 0);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "relationship1", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "relationship2", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "manySide1Table", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "manySide2Table", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "innerTable", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "relationshipNameFromManySide2", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "relationshipNameFromManySide1", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "pluralRelationshipNameFromManySide2", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "pluralRelationshipNameFromManySide1", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "innerRelationshipNameFromManySide2", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "innerRelationshipNameFromManySide1", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "pluralInnerRelationshipNameFromManySide2", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "pluralInnerRelationshipNameFromManySide1", null);
    __decorate([
        xserializer_1.Serialize()
    ], ManyToManyRelationship.prototype, "isBetweenEntities", null);
    ManyToManyRelationship = __decorate([
        xserializer_1.Serializable(),
        xserializer_1.Deserializable()
    ], ManyToManyRelationship);
    return ManyToManyRelationship;
}(Relationship));
module.exports = ManyToManyRelationship;
//# sourceMappingURL=many_to_many_relationship.model.js.map