/**
 * filename: index.js
 * Author: Adrian Velcich
 * context: Objection.js Model index file
 *
 * WARNING: This is a generated file, do *NOT* edit it, 
 *          you will lose your edits when it is next regenerated
 */


<% tables = schema.tables;
   tables.forEach(table => { %>
import {<%= table.pascalName %>Model} from './<%= table.pascalName %>Model.js';<% }) %>

<% tables = schema.tables; %>
module.exports = {
   <% tables.forEach(function (table, idx, array) {%><% if (idx > 0) { %>,<% } %>
    <%= table.pascalName %>Model : <%= table.pascalName %>Model<% }) %>
}