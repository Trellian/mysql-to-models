<% 
// Parent Relations
const relationsManyToOne = table.oneToManyRelationships.filter(rel => { 
    return rel.manySideTable === table; // && rel.oneSideTable !== table; 
    });
    
// Child relations     
const relationsOneToMany = table.oneToManyRelationships.filter(rel => { 
    return rel.oneSideTable === table; // && rel.manySideTable != table; 
    });

// Many To Many relations
const relationsManyToMany = table.manyToManyRelationships.filter(rel => {
    return rel.relationship1.oneSideTable === table;  
});
%>    

/**
 * filename: <%=table.pascalName %>BaseModel.js
 * Author: Adrian Velcich
 * context: Objection.js Model file
 *
 * WARNING: This is a generated file, do *NOT* edit it, 
 *          you will lose your edits when it is next regenerated
 */

import {Model} from 'objection';
// const Model = require('objection').Model;


export class <%= table.pascalName %>BaseModel extends Model {

  // Table name is the only required property.
  static get tableName() {
    return '<%= table.tableName %>';
  }

  
  // Optional JSON schema. This is not the database schema!
  // Nothing is generated based on this. This is only used
  // for validation. Whenever a model instance is created
  // it is checked against this schema.
  // http://json-schema.org/.

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
<% const requiredCols = table.columns.filter(function (col) { 
      return !col.isPrimaryKey && col.isRequired; })
      requiredCols.forEach(function (col, idx, array) {%><% if (idx > 0) { %>,<% } %>
         '<%= col.columnName %>'<% }) %>
      ],

      properties: {
<% table.columns.forEach(function (col, idx, array) { 
    //const colProps           
%><% if (idx > 0) { %>,<% } %>            
        <%=col.columnName%>: {type: '<%=col.jsonDataType%>'}<% }) %>
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {

    return {

        // Parent Relations    
<% relationsManyToOne.forEach(function (relation, idx, array) { 
    var relatedTableName = relation.oneSideTable.tableName;
    var relatedModelName = relation.oneSideTable.camelName; 
    var relatedModelClass = relation.oneSideTable.pascalName; 
%><% if (idx > 0) { %>,
<% } %>            
        <%= relatedModelName %>: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + '/<%= relatedModelClass %>BaseModel',
                join: {
                    from: '<%= table.tableName %>.<%= relation.foreignKeys[0].columnName %>',
                    to: '<%= relatedTableName %>.<%= relation.foreignKeys[0].referencedColumnName %>'
                }
        }<% if (idx == array.length - 1 && relationsOneToMany.length > 0) {%>,<% } %><% }) %>
        
        // Child Relations    
<% relationsOneToMany.forEach(function (relation, idx, array) { 
    var relatedTableName = relation.manySideTable.tableName;
    var relatedModelNamePlural = relation.manySideTable.pluralCamelName;
    var relatedModelClass = relation.manySideTable.pascalName;
%><% if (idx > 0) { %>,
<% } %>  
        <%= relatedModelNamePlural %>: {
            relation: Model.HasManyRelation,
            modelClass: __dirname + '/<%= relatedModelClass %>BaseModel',
            join: {<% if (table === relation.manySideTable) { %>
                // recursive same-table relationship
                to: '<%= relatedTableName %>.<%= relation.foreignKeys[0].columnName %>',
                from: '<%= table.tableName %>.<%= relation.foreignKeys[0].referencedColumnName %>'<% } else { %>
                from: '<%= relatedTableName %>.<%= relation.foreignKeys[0].columnName %>',
                to: '<%= table.tableName %>.<%= relation.foreignKeys[0].referencedColumnName %>'<% } %>                
            }    
        }<% if (idx == array.length - 1 && relationsManyToMany.length > 0) {%>,<% } %><% }) %>

        //  Many-to-Many Relations
<% 
relationsManyToMany.forEach(function (relation, idx, array) {
    var innerTable = relation.innerTable;
    var relatedTable = relation.manySide2Table;
    var relatedModelClass = relatedTable.pascalName;
%><% if (idx > 0) { %>,
<% } %>  
        <%= relatedTable.pluralCamelName %>: {
            relation: Model.ManyToManyRelation,
            modelClass: __dirname + '/<%= relatedModelClass %>BaseModel',
            join: {
                from: '<%= table.tableName %>.<%= relation.relationship1.foreignKeys[0].referencedColumnName %>', 
                through: {
                    from: '<%= innerTable.tableName %>.<%= relation.relationship1.foreignKeys[0].columnName %>',
                    to: '<%= innerTable.tableName %>.<%= relation.relationship2.foreignKeys[0].columnName %>'
                },
                to: '<%= relatedTable.tableName %>.<%= relation.relationship2.foreignKeys[0].referencedColumnName %>'
            }
        }<% }) %>
    };
  }
}

// module.exports = <%= table.pascalName %>BaseModel;