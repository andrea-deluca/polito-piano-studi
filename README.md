# Exam #1: "Piano degli studi"

## Student: s303906 DELUCA ANDREA

## React Client Application Routes

### `/`

_This is the index route_

Homepage for guest users (not logged in users).

_This route is unprotected from the user authentication. Moreover, it is unreachable when the user is logged in._

### `/login`

Page that contains the login form to perform authentication.

_This route is unprotected from the user authentication. Moreover, it is unreachable when the user is logged in._

### `/esplora`

Page that contains the list of all courses offered

_This route is unprotected from the user authentication._

### `/dashboard`

Homepage for authenticated and logged in users.

_This route is protected. The user must be authenticated to navigate here._

### `/study-plan`

Page that contains info about the study plan associated with the logged in user and its correlated list of courses, if they exist.

_This route is protected. The user must be authenticated to navigate here._

### `/study-plan/edit`

Page where the logged in user can edit the list of courses associated with its study-plan, if they exist.

_This route is protected. The user must be authenticated to navigate here._

## API Server

### Session routes

#### `POST /api/sessions/password`

Performs user authentication and create a new session for the user.

##### **Request header:**

`Content-Type: application/json`

##### **Request body:**

A JSON object containing username and password.

```json
{
	"username": "testuser@polito.it",
	"password": "password"
}
```

##### **Response body**

`HTTP status code 200 OK`

```json
{
	"id": "3",
	"firstname": "Testuser",
	"lastname": "Testuser",
	"email": "testuser@polito.it"
}
```

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 401 Unauthorized` (credentials error)

#### `DELETE /api/sessions/current`

Performs user logout and delete the current user session.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### **Response body**

`HTTP status code 200 OK`

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)

#### `GET /api/sessions/current`

Gets information about the user, if he is logged in.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### **Response body**

`HTTP status code 200 OK`

```json
{
	"id": "3",
	"firstname": "Testuser",
	"lastname": "Testuser",
	"email": "testuser@polito.it"
}
```

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (user not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

### Courses routes

#### `GET /api/courses/all`

Gets information about courses offered, including incompatibilities info, ordered by name.

##### **Response body**

`HTTP status code 200 OK`

Here some examples of course objects returned as response body, with and not preparatory course, incompatible courses and maximum number of enrolled students.

```json
[
    {
        "code": "01UDFOV",
        "name": "Applicazioni Web I",
        "credits": 6,
        "maxStudents": null,
        "enrolledStudents": 0,
        "preparatoryCourse": null,
        "incompatibleCourses": [
            {
                "code": "01TXYOV",
                "name": "Web Applications I"
            }
        ]
    },
    {
        "code": "02GOLOV",
        "name": "Architetture dei sistemi di elaborazione",
        "credits": 12,
        "maxStudents": null,
        "enrolledStudents": 0,
        "preparatoryCourse": null,
        "incompatibleCourses": [
            {
                "code": "02LSEOV",
                "name": "Computer architectures"
            }
        ]
    },
    {
        "code": "03UEWOV",
        "name": "Challenge",
        "credits": 5,
        "maxStudents": null,
        "enrolledStudents": 0,
        "preparatoryCourse": null
    },

    ...

    {
        "code": "05BIDOV",
        "name": "Ingegneria del software",
        "credits": 6,
        "maxStudents": null,
        "enrolledStudents": 0,
        "preparatoryCourse": {
            "code": "02GOLOV",
            "name": "Architetture dei sistemi di elaborazione"
        },
        "incompatibleCourses": [
            {
                "code": "04GSPOV",
                "name": "Software engineering"
            }
        ]
    },
    {
      "code": "01URSPD",
      "name": "Internet Video Streaming",
      "credits": 6,
      "maxStudents": 2,
      "enrolledStudents": 0,
      "preparatoryCourse": null
    },

    ...

]
```

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (courses not found error)

### Study plan types routes

#### `GET /api/study-plans/types`

Gets information about types that a study plan can take.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### **Response body**

`HTTP status code 200 OK`

```json
[
	{
		"id": 1,
		"name": "Full-time",
		"min_credits": 60,
		"max_credits": 80
	},
	{
		"id": 2,
		"name": "Part-time",
		"min_credits": 20,
		"max_credits": 40
	}
]
```

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (study plan types not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

### Study plan routes

#### `GET /api/study-plans`

Gets information about the study plan associated with the logged in user, including info about the list of courses correlated to it and info about the study plan type.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### **Response body**

`HTTP status code 200 OK`

```json
{
	"id": 2,
	"totCredits": 23,
	"type": {
		"id": 2,
		"name": "Part-time",
		"min": 20,
		"max": 40
	},
	"createDate": "2022-06-21T18:44:00.837Z",
	"updateDate": "2022-06-21T18:44:07.302Z",
	"courses": ["01UDFOV", "02GOLOV", "03UEWOV"]
}
```

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` (study plan not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `POST /api/study-plans`

Creates a new study plan entry, that has to be associated with the logged in user, and fills its correlated list of courses.
It also updates the number of enrolled students for the courses inserted into the study plan.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

##### **Request body:**

A JSON object containing info about the study plan and a list of courses to insert into the correlated list.

```json
{
    "updates": {
      "inserts": ["01UDFOV", "02GOLOV", "03UEWOV"],
      "deletes": []
    }
    "plan": {
      "type": 2,
      "credits": 23,
      "createDate": "2022-06-21T09:19:11.091Z",
      "updateDate": "2022-06-21T09:25:03.091Z"
    }
}
```

##### **Response body**

`HTTP status code 200 OK`

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `PUT /api/study-plans/:id`

Updates info about the study plan associated with the logged in user and the list of courses correlated to it, given the study plan id.
It also updates the number of enrolled students for the courses inserted and removed from the study plan.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

`Params: req.params.id to retrieve study plan id`

##### **Request body:**

A JSON object containing info about the updates for the study plan.

```json
{
    "updates": {
      "inserts": ["01SQMOV", "01UDUOV"],
      "deletes": ["03UEWOV"]
    }
    "plan": {
      "type": 2,
      "credits": 38,
      "updateDate": "2022-06-23T11:28:03.091Z"
    }
}
```

##### **Response body**

`HTTP status code 200 OK`

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 404 Not Found` (study plan not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

#### `DELETE /api/study-plans/:id`

Deletes the study plan associated with the logged in user and the list of courses correlated to it, given the study plan id.
It also updates the number of enrolled students for the courses removed from the study plan.

##### **Request header:**

`Session: req.user to retrieve the logged in user id`

`Params: req.params.id to retrieve study plan id`

##### **Response body**

`HTTP status code 200 OK`

##### **Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 404 Not Found` (study plan not found error)
- `HTTP status code 401 Unauthorized` (authentication error)

## Database Tables

- Table `users` - contains info about users, including authentication info

```
id (PRIMARY KEY)
firstname
lastname
email (UNIQUE NOT NULL) - used as username during authentication
password
salt
```

- Table `courses` - contains info about courses offered, including propedeuticity info

```
id (PRIMARY KEY)
code (UNIQUE NOT NULL)
name
credits
max_students - it can be null
enrolled_students
preparatory_course (FOREIGN KEY REFERENCES courses(code)) - it can be null
```

- Table `incompatible_courses` - contains info about incompatible courses

```
id (PRIMARY KEY)
course_code (FOREIGN KEY REFERENCES courses(code))
incompatible_course (FOREIGN KEY REFERENCES courses(code))
```

- Table `study_plan_types` - contains info about types that a study plan can take, e.g. Full-time or Part-time

```
id (PRIMARY KEY)
name
min_credits
max_credits
```

- Table `courses_lists` - contains info about the list of courses associated with a study plan

```
id (PRIMARY KEY)
course_code (FOREIGN KEY REFERENCES courses(code))
```

- Table `study_plans` - contains info about the list of courses associated with a study plan

```
id (PRIMARY KEY)
user_id (FOREIGN KEY REFERENCES users(id))
list_id (FOREIGN KEY REFERENCES courses_lists(id))
type_id (FOREIGN KEY REFERENCES study_plan_types(id))
tot_credits
create_timestamp
last_update_timestamp
```

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
