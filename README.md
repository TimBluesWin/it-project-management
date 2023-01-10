
# ITPM

In the repository, we develop the project for ITPM 2022-2023 for the University of Innsbruck.

Guide used for initial configuration: https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

For installation of the application only the following guide is necessary!

## Installation of software & packages

You must have installed: 
- python 3.x (best the latest verision) and pip: https://www.python.org/downloads/
- node.js (latest version): https://nodejs.org/en/download/
- suggestion: use an IDE (e.g. VisualStudio Code): https://code.visualstudio.com/download

Note: When you install Python the first time, make sure you have the option "Add Python to environment variables" ticked in the advanced install options.
This allows us to use the command "python" and "pip" directly from the command line, instead of having to specify the full path.

If you haven't ticked that option, follow these steps:
1. Run the installer that you used to install Python
2. On the "Optional Features" page, make sure "pip" is ticked. Click "Next"
3. On the "Advanced Options" page, make sure the option "Add Python to environment variables" ticked.
4. Click "Install"

## Deployment of backend

Note: Default is the pip command. It does not matter in case you have pip3. Just use pip3 instead of pip.

Get the repository files to the local device (e.g. using VS Code "Source Control" or direct download from GitHub)

Use the Windows Terminal or the Terminal in Visual Studio Code for the following commands.

Install the virtual environment
```
pip install pipenv
```

Start virtual environment: Navigate to the repository root folder (ITPM), then execute the following:
```
pipenv shell
```

Initialize DJANGO settings: execute the following
```
cd backend
pip install -r requirements.txt
```

Run migrations
(Note: Run line by line)

Windows commands:
```
set DJANGO_SETTINGS_MODULE=backend.settings
python manage.py makemigrations dashboardApi
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
MAC/Linux commands:
```
export DJANGO_SETTINGS_MODULE=backend.settings
python3 manage.py makemigrations dashboardApi
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

If it's working you can access  http://127.0.0.1:8000/admin/


Stop the server to run the data migration (CTRL+C)


Setup all data into the DB, please wait until it ends:

Windows commands:
```
set DJANGO_SETTINGS_MODULE=backend.settings
python setupData.py
```
MAC/Linux commands:
```
export DJANGO_SETTINGS_MODULE=backend.settings
python3 setupData.py
```

There are scheduled tasks for updating the data once a week. These processes are also done in the last command, so don't run it, this is just for your information. You can use them using the following commands: (Control + C) to stop them

```
celery -A backend worker -l info
celery -A backend beat -l info
```

## Deployment of frontend

From ITPM/backend, execute the following
```
cd ../frontend
npm install
npm start
```

## (Possible) Future implementation

 - [Frontend React](https://github.com/coreui/coreui-free-react-admin-template)
 - [Django Back Office](https://github.com/MaferMazu/django-backoffice)


## Authors

- [@albertoge2021](https://www.github.com/albertoge2021)
- [@TimBluesWin](https://github.com/TimBluesWin)
- [@ChriHase](https://github.com/ChriHase)
- [@marcotoccoli](https://github.com/marcotoccoli)

