import django, os, csv
from datetime import datetime
django.setup()
from dashboardApi.models import Computer
from time import sleep
from dashboardApi.models import Laptop
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from money_parser import price_dec, price_str
from django.db import IntegrityError
import requests, os, pdfplumber, shutil, ssl
import random

def generate_random():
    # for random energy consumption
    number = round(random.uniform(30.00, 300.00), 2)
    return number

def firstSetup():    
    with open("computers.csv", "r") as f:
        reader = csv.reader(f, delimiter=";")
        for row in reader:
            if row[8]:
                old_date=row[8]
                new_date=datetime.strptime(old_date, '%d/%m/%Y').strftime('%Y-%m-%d')
            else:
                new_date=None
            if row[9]:
                old_install=row[9]
                new_install=datetime.strptime(old_install, '%d/%m/%Y').strftime('%Y-%m-%d')
            else:
                new_install=None
            try:
                Computer.objects.create(
                        name = row[0], deployment_state = row[1],
                        incident_state = row[2],
                        vendor = row[3],
                        model = row[4],
                        type = row[5],
                        property = row[6],
                        site = row[7],
                        warranty = new_date,
                        install = new_install,
                        asignment = row[10],
                        cpu = row[11])
            except:
                continue

def secondSetup():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(options=options)
    n = 1
    url = f"https://www.dell.com/en-us/shop/dell-laptops/sr/laptops?page={n}"
    driver.get(url)
    while driver.find_element(By.XPATH, '//*[@id="pagination"]/button[6]').get_attribute('data-disabled') == "False":
        articles = driver.find_elements(By.TAG_NAME, "article")
        for article in articles:
            specs = article.find_elements(By.CLASS_NAME, 'ps-iconography-specs-label')
            try:
                Laptop.objects.create(
                    vendor = "DELL", 
                    name = article.find_element(By.CLASS_NAME, 'ps-title').text, 
                    price =  price_dec(price_str( article.find_element(By.CLASS_NAME, 'ps-dell-price').text)),
                    processor = specs[0].text,
                    operating_system = specs[1].text,
                    graphics = specs[2].text,
                    memory = specs[3].text,
                    storage = specs[4].text,
                    display = specs[5].text,
                    )
            except IntegrityError:
                continue
            except Exception:
                Laptop.objects.create(
                    vendor = "DELL", 
                    name = article.find_element(By.CLASS_NAME, 'ps-title').text, 
                    price =  price_dec(price_str(article.find_element(By.CLASS_NAME, 'ps-dell-price').text)),
                    processor = specs[0].text,
                    memory = specs[1].text,
                    storage = specs[2].text,
                    display = specs[3].text,
                    )
        n += 1
        url = f"https://www.dell.com/en-us/shop/dell-laptops/sr/laptops?page={n}"
        driver.get(url)
    driver.close()

def thirdSetup():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(options=options)
    url = "https://www.dell.com/en-us/dt/corporate/social-impact/advancing-sustainability/climate-action/product-carbon-footprints.htm#scroll=off&tab0=1"
    driver.get(url)
    sleep(1)
    elements = driver.find_elements(By.CLASS_NAME, 'cta-wrapper')
    MYDIR = ("PDFfile")
    CHECK_FOLDER = os.path.isdir(MYDIR)
    if not CHECK_FOLDER:
        os.makedirs(MYDIR)
    ssl._create_default_https_context = ssl._create_stdlib_context
    for element in elements:
        name = element.find_element(By.CLASS_NAME, 'cta-text').text
        if name == "" or name is None:
            continue
        try:
            r = requests.get(element.find_element(By.TAG_NAME, 'a').get_attribute('href'), stream=True)
            if r.status_code == 200:
                with open(MYDIR + "/" + name + ".pdf", 'wb') as f:
                    r.raw.decode_content = True
                    shutil.copyfileobj(r.raw, f)
        except Exception as e:
            continue
        try:
            with pdfplumber.open(MYDIR + "/" + name + ".pdf") as pdf:
                first_page = pdf.pages[0].extract_text()
            try:
                filter1 = first_page.split("This product’s estimated carbon footprint: ")[1]
                filter2 = filter1.split("kgCO2e ")[0]
                try:
                    co2 = filter2.split("  ")[0]
                    Laptop.objects.filter(name__icontains = name).update(carbon_footprint = co2)
                except:
                    co2 = filter2.split(" ")[0]
                    Laptop.objects.filter(name__icontains = name).update(carbon_footprint = co2)
            except:
                continue
        except FileNotFoundError:
            continue
    shutil.rmtree(MYDIR)
    driver.close()

def fourthSetup():
    # We want to at least populate the average lifetime and energy consumption.
    # The average lifetime for all Dell objects are 4, while the energy consumption, we just make a dummy data first.
    Laptop.objects.all().update(average_lifetime=4)
    laptops = Laptop.objects.all()
    for laptop in laptops:
        Laptop.objects.filter(id=laptop.id).update(energy_consumption=generate_random())
    return None

if __name__ == "__main__":    
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")    
    firstSetup()
    secondSetup()
    thirdSetup()
    fourthSetup()