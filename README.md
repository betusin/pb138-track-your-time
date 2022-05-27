# PB138 - TrackYourTime

## Design and Analysis

[ScreenModel](https://miro.com/app/board/o9J_lP_jhDs=/?share_link_id=309861064621)

## Running the application

Once the application is started using either of the two available methods, use http://localhost/ to access the
frontend; the backend is accessible on http://localhost:3000/.

### Using Docker Compose

Install Docker Compose and invoke the following command in the root of this repository to start TrackYourTime.

```shell
docker-compose up -d
```

To stop TrackYourTime, invoke the following command in the root of this repository.

```shell
docker-compose down
```

### Manually

#### Frontend

The frontend does not include a webserver; therefore, the files generated in `frontend/dist/` after the frontend is
built have to be deployed to the static directory of an existing webserver like NGINX or Apache.

This README does not provide the instructions for the setup of a webserver.

##### Initial setup

```shell
cd frontend/
npm install
```

##### Building

```shell
cd frontend/
npm run build
```

#### Backend

The backend does not include a database; therefore, a database needs to be configured before the backend is launched.
The backend is configured to work with a PostgreSQL database, which needs to be set up manually.

This README does not provide the instructions for setting up a PostgreSQL database.

##### Initial setup

```shell
cd backend/
npm install
```

##### Building

```shell
cd backend/
npx prisma generate
npm run build
```

##### Database setup

In the following command, replace `<user>` and `<password>` with your database credentials, and replace `<dbname>` with
the name of the database you have created in PostgreSQL.

Additionally, replace `localhost` and `5432` with your own host and port if non-default are to be used.

```shell
export DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"
cd backend/
npx prisma db push
```

##### Running

Modify the `DATABASE_URL` environment variable the same way as in [Database setup](#database-setup).

```shell
export DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"
cd backend/
npm run start:prod
```
