# How to run

It is advised to create a virtual environment before install packages ([eg. venv](https://docs.python.org/3/library/venv.html)).

Install packages:
`pip install -r requirements.txt`

It is required to migrate the DB before running the server the first time:

`python3 manage.py makemigrations`
`python3 manage.py migrate`

# Development server

To start the development server, run `python3 manage.py runserver` and open `http://localhost:8000/`.

# Admin

The admin panel can be reached at `http://localhost:8000/admin`.
Run `python3 manage.py createsuperuser` to create an admin account.
