const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "moviesData.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    MovieId: dbObject.movie_id,
    DirectorId: dbObject.director_id,
    MovieName: dbObject.movie_name,
    LeadActor: lead_actor,
  };
};

const convertDbObjectToResponseObject_directors = (dbObject) => {
  return {
    DirectorName: dbObject.director_name,
    DirectorId: dbObject.director_id,
  };
};

app.get("/movies/", async (request, response) => {
  const allMoviesName = `
                           select
                              movie_name
                           from
                               movie
    `;
  resultMovies = await db.all(MoviesName);

  response.send(
    map((resultMovies) => convertDbObjectToResponseObject(resultMovies))
  );
});

app.post("/movies/movie_id/", async (request, response) => {
  const { DirectorId, MovieName, LeadActor } = request.body;

  const { MovieId } = request.params;

  const updateMovietable = `
              
          INSERT INTO Movie(
         director_id , movie_name ,lead_actor

        ) 
        VALUES
        (
            ${DirectorId} , ${MovieName} , ${LeadActor}
        )
           `;

  const re_update_movie_table = await db.run(updateMovietable);

  Response.send("Movie Successfully Added");
});

app.get("/movies/:movieId/", async (request, response) => {
  const { MovieId } = request.params;

  const allMoviesName = `
                           select
                              movie_name
                           from
                               movie
                            where movie_id= ${MovieId}
    `;
  resultMovies = await db.get(MoviesName);

  response.send(convertDbObjectToResponseObject(resultMovies));
});

app.put("/movies/:movieId/", async (request, response) => {
  const { directorId, movieName, leadActo } = request.body;

  const { MovieId } = request.params;
  const updatePlayerQuery = `
  UPDATE
    cricket_team
  SET
    movie_name = ${MovieName},
    director_id = ${DirectorId},
    lead_actor=        ${LeadActor}

  WHERE
    movie_id = ${MovieId};`;

  await database.run(updatePlayerQuery);
  response.send("Movie Details Updated");
});

app.delete("/movies/:movieId/", async (request, response) => {
  const { MovieId } = request.params;
  const deletePlayerQuery = `
  DELETE FROM
    movie
  WHERE
    movie_id = ${movieId};`;
  await database.run(deletePlayerQuery);
  response.send("movie Removed");
});

app.get("/directors/", async (request, response) => {
  const allMoviesName = `
                           select
                              director_name
                           from
                               director
    `;
  resultMovies = await db.all(allMoviesName);

  response.send(convertDbObjectToResponseObject_directors(resultMovies));
});

app.get("/directors/:directorId/movies/", async (request, response) => {
  const allMoviesName = `
                           select
                              director_name
                           from
                               director

                            
    `;
  resultMovies = await db.all(allMoviesName);

  response.send(convertDbObjectToResponseObject_directors(resultMovies));
});

module.exports = app;
