
# ITPM

In the repository, we develop the project for ITPM 2022-2023 for the University of Innsbruck.

## Installation

Guide used for configuration: https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
    
## Deployment

Install required packages

First, run the following:
```
pip install pipenv
```

Go to root folder (ITPM), then execute the following:

```
pipenv shell
```

Next, execute the following:
```
cd backend
export DJANGO_SETTINGS_MODULE=backend.settings
pip install -r requirements.txt
```

Run migrations


```
python manage.py makemigrations dashboardApi
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Setup the data into the DB

```
python setupData.py
```

## (Possible) Future implementation

 - [Frontend React](https://github.com/coreui/coreui-free-react-admin-template)
 - [Django Back Office](https://github.com/MaferMazu/django-backoffice)


## Authors

- [@albertoge2021](https://www.github.com/albertoge2021)
- [@TimBluesWin](https://github.com/TimBluesWin)
- [@ChriHase](https://github.com/ChriHase)
- [@marcotoccoli](https://github.com/marcotoccoli)

