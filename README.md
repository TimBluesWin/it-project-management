
# ITPM

In the repository, we develop the project for ITPM 2022-2023 for the University of Innsbruck.

## Installation

Guide used for configuration: https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
    
## Deployment of backend

Install required packages

You must have installed: python3, and pip. And it's supposed you are using an IDE (VS code)

(it can be pip3, it does not matter, just use pip3 instead of pip command)

Go to root folder (ITPM), then execute the following:

Next, execute the following:
```
pip install -r requirements.txt
cd backend
```
Next, execute the following on MAC/Linux:
```
export DJANGO_SETTINGS_MODULE=backend.settings
```
Windows:
```
set DJANGO_SETTINGS_MODULE=backend.settings
```

Run migrations


```
python3 manage.py makemigrations dashboardApi
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```
If it's working, you can access to http://127.0.0.1:8000/admin/

Setup all data into the DB, please wait until it ends:

```
export DJANGO_SETTINGS_MODULE=backend.settings
python3 setupData.py
```

There are scheduled tasks for updating the data once a week. These processes are also done in the last command, so don't run it, this is just for your information. You can use them using the following commands: (Control + C) to stop them

```
celery -A backend worker -l info
celery -A backend beat -l info
```

## (Possible) Future implementation

 - [Frontend React](https://github.com/coreui/coreui-free-react-admin-template)
 - [Django Back Office](https://github.com/MaferMazu/django-backoffice)


## Authors

- [@albertoge2021](https://www.github.com/albertoge2021)
- [@TimBluesWin](https://github.com/TimBluesWin)
- [@ChriHase](https://github.com/ChriHase)
- [@marcotoccoli](https://github.com/marcotoccoli)

