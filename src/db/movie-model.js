'use strict';

import { Model, STRING, DATE, INTEGER, Op } from "sequelize";

import Cast from './cast-model';

export default class Movie extends Model {
    static findAllMoviesName(substr, options = {}) {
        options.where = {title: { [Op.substring] : substr }};

        return this.findAll(options);
    }

    static getFullInformation(id) {
        return this.findAll(id, { where: { id }, include: [Cast]});
    }

    static init(sequelize) {
        super.init({
            title: STRING,
            release_date: DATE,
            duration: INTEGER
        }, {
            sequelize,
            modelName: "movie"
        });
    }
}