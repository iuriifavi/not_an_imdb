'use strict';

import { Model, STRING, DATE } from "sequelize";

import Cast from './cast-model';

export default class Actor extends Model {
    static getFullInformation(id) {
        return this.findAll(id, { where: { id }, include: [Cast]});
    }

    static init(sequelize) {
        super.init({
            first_name: STRING,
            last_name: STRING,
            birthday: DATE,
        }, {
            sequelize,
            modelName: "actor"
        });
    }
}