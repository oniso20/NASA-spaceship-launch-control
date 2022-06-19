const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = []

function isHabitable(planet) {
    if (planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6) {
        return planet
    };
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        //the fs.createReadStream has to parse the read data through a pipe. We specify that comments use "#" at the start of the line and 'true' which signifies key: value pairs rather than just values.
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitable(data)){
                    habitablePlanets.push(data)
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`The number of habitable planets found is: ${habitablePlanets.length}`);
                resolve();
            });
    });
};

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
};