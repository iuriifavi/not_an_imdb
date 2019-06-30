'use strict';

import Sequelize, { Model } from "sequelize";

import Actor from './actor-model';
import Movie from './movie-model';
import Cast from './cast-model';

/**
 * @description Based on Sequilize manual for sustainable connection and
 * all values hardcoded for simpliifcation
 */
const sequelize = new Sequelize("hubhaus", "root", "hubhaus", {
    host: "db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

/**
 * @param id record id to be updated
 * @param values new values for selected record
 * @description workaround to return updated element
 */
Model.prototype.updateAndReturn = async function(id, values) {
    const [affectedRows] = await this.update(values, { where: { id } });
    if (affectedRows === 0)
        throw new Error('Not Found');
    return this.findByPk(id);
};

// init models first before any relations would be declared
Actor.init(sequelize);
Movie.init(sequelize);
Cast.init(sequelize);

//JOINS
Actor.hasMany(Cast);
Movie.hasMany(Cast);

Cast.belongsTo(Actor);
Cast.belongsTo(Movie);

sequelize
.authenticate()
.then(() => {
    console.log("Connection has been established successfully.");
})
.catch(err => {
    console.error("Unable to connect to the database:", err);
});

sequelize
.sync()
.then(() => {
    console.log("Database schemas synched");
})
.catch(err => {
    console.error("Database schemas didn't match\n", err);
});

export { Actor, Movie, Cast };