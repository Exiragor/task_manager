# README #

# Start server #

### For develop ###
npm run dev
### For production ###
npm start
### default url ###
http://localhost:4800

# API DOCS #

### url ###
http://api.exiragor.info  (= main)

### Registration ###
Send post request to main/auth/registration/

with fields:
   email, password, name, last_name -this fields is required, phone

success response:
{
  status: true
}

### Login ###
Send post request to main/auth/login/

with fields: email, password.

success response:
{
  status: true,
  id: temp_id,
  token: temp_token,
  refreshToken: temp_token,
  key: temp_key
}

id - your user id,
token - for user requests to server,
refreshToken - for update your token,
key - it's create_at of refreshToken, need to update token.

### Update tokens ###
Send post request to main/auth/update_tokens/

with fields:
id, refreshToken, key

success response:
{
  status: true,
  token: new_token,
  refreshToken: new_token,
  key: new_key
}

### Get User info ###
Send get request to main/api/user/:your_id/

with params:
token

Example: http://api.exiragor.info/api/user/1/?token=eyJhbGciOiJ

success response: 
{
  status: true,
  user: object(with info)
}

### Get list of user's tasks ###
Send get request to main/api/user/:id/tasks/

with params:
token

success response: array of objects. If list is empty, then server will return one object with fields equal null.

### Add new task ###
Send post request to main/api/task/

with fields:
token, id, name, description, status, date.

id - id of user, name and desc of task, date - deadline, status - status of task(example: work)

### Update task ###
Send put request to main/api/task/:id/

with fields: id, token and fields to update(for example: name, date)

success response: {status: true}

### Delete task ###
Send delete request to main/api/task/:id/

with fields: id, token.