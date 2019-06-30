'use strict';

import { Model, INTEGER } from "sequelize";

export default class Cast extends Model {
    static init(sequelize) {
        super.init({
            movieId: {
                type: INTEGER,
                primaryKey: true
            },
            actorId: {
                type: INTEGER,
                primaryKey: true
            }
        }, {
            sequelize,
            modelName: "cast"
        });
    }
}