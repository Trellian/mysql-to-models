# mysql-to-objection

A database to Objection.js models from an existing mysql database 

## Description

This app generates a full schema of a database with tables, columns, constraints and relationships from an existing database.

The objection.js object models/relations and the graphQL schema are implemented as base classes for each table, with a separate set of derived, empty classes in a parent folder. The derived classes are generated once, and can be modified to add features. Once the derived classes have been generated, they will not be overridden on the next generate, allowing for persistent added features.


## Installation

1. Install nodejs v6 or greater.

## Usage

1. Do `mysql-to-objection init` to create a database config file (only the first time).
2. Do `mysql-to-objection generate` to generate the models file of the database.

The Objection.js model files will be generated in the modelFolder configured in the 'init' step.

The objection models for use with Objection.js will be generated in subfolder './data/objection/base' as individual files for each table model.

The graphQL Schema files for use with graphQL will be generated in subfolders 'outputFolder/graphql/base and outputFolder/graphql' as individual files for each table, with graphql/schema.js to collate them. They can still be imported separately if required. Import the files directly from graphql


More info is provided using `mysql-to-objection --help`.

## License

Copyright 2017 Adrian Velcich
Derived from mysql-to-models by Martín Molina Álvarez <https://github.com/tomymolina/mysql-to-models> 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.