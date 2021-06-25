# Запуск
Для запуска проекта необходимо:

Собрать образ приложения

`docker build -t app`

Запустить контейнеры приложения и базы данных

`docker-compose up`

# Запросы
1. Получить список всех котов в базе данных

`GET /cats`

Ответ в виде JSON массива с информацией о котах

Пример ответа: 

`[
    {
        "id": 1,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/ef6a710cc2e63d1010b36cd8c89b8ebecf5.jpg",
        "costForHour": 10,
        "isBooked": false
    },
    {
        "id": 3,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/7684d1c109ef7104414018f8b2de945683.jpg",
        "costForHour": 10,
        "isBooked": false
    },
    {
        "id": 4,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/cd59fcd10a48ab9f38062171e44d28172.jpg",
        "costForHour": 10,
        "isBooked": false
    },
    {
        "id": 5,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/ab2c7ec8adedf456010a308f8d8cbf20b.jpg",
        "costForHour": 10,
        "isBooked": false
    }
]`

2. Получить информацию о конкретном коте

  `GET /cats/id/?id=<ID>` 

Ответ в виде JSON объекта

Пример: 

  `GET /cats/id/?id=5`

Ответ: `{
    "id": 5,
    "name": "Kot",
    "color": "black",
    "breed": "streetcat",
    "age": 2,
    "photoPath": "uploads/ab2c7ec8adedf456010a308f8d8cbf20b.jpg",
    "costForHour": 10,
    "isBooked": false
}`

3. Получить список котов постранично

`GET /cats/page?page=<page_number>&limit=<limit_objects>`

Параметр limit опциональный, по умолчанию limit=5

Пример:

`GET /cats/page?page=1&limit=2`

Ответ: `[
    {
        "id": 4,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/cd59fcd10a48ab9f38062171e44d28172.jpg",
        "costForHour": 10,
        "isBooked": false
    },
    {
        "id": 5,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/ab2c7ec8adedf456010a308f8d8cbf20b.jpg",
        "costForHour": 10,
        "isBooked": false
    }
]`

4. Получить список забронированных котов

`GET /cats/booked`

Пример ответа: `[
    {
        "id": 4,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/cd59fcd10a48ab9f38062171e44d28172.jpg",
        "costForHour": 10,
        "isBooked": true
    }
]`

5. Получить список доступных для бронирования котов

`GET /cats/available`

Пример ответа: `[
    {
        "id": 1,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/ef6a710cc2e63d1010b36cd8c89b8ebecf5.jpg",
        "costForHour": 10,
        "isBooked": false
    },
    {
        "id": 3,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/7684d1c109ef7104414018f8b2de945683.jpg",
        "costForHour": 10,
        "isBooked": false
    },
    {
        "id": 5,
        "name": "Kot",
        "color": "black",
        "breed": "streetcat",
        "age": 2,
        "photoPath": "uploads/ab2c7ec8adedf456010a308f8d8cbf20b.jpg",
        "costForHour": 10,
        "isBooked": false
    }
]`

6. Забронировать кота

`PUT /cats/book?id=<ID>`

Пример:

`PUT /cats/book?id=3`

Ответ: `{
    "generatedMaps": [],
    "raw": [],
    "affected": 1
}`

7. Добавить нового кота

`POST /cats/add`

В body запроса в поле request указывается JSON объект с данными кота, в поле photo указывается картинка

Пример:

`curl --location --request POST 'localhost:3000/cats/add' \
--form 'photo=@"/home/mensch/Documents/photo_2021-03-04_12-45-08.jpg"' \
--form 'request="{\"name\":\"Kot\",\"color\":\"black\",\"breed\":\"streetcat\",\"age\":2,\"costForHour\":10}"'`

Ответ: `{
    "identifiers": [
        {
            "id": 6
        }
    ],
    "generatedMaps": [
        {
            "id": 6,
            "isBooked": false
        }
    ],
    "raw": [
        {
            "id": 6,
            "isBooked": false
        }
    ]
}`

8. Изменение данных о существующем коте

`PUT /cats/edit?id=<ID>`

В body запроса в поле request указывается JSON объект с данными кота(все поля опциональны), в поле photo указывается новая фотография(опционально)

Пример: 

`curl --location --request PUT 'localhost:3000/cats/edit?id=3' \
--form 'photo=@"/home/mensch/Documents/photo_2021-03-04_12-45-08.jpg"' \
--form 'request="{\"name\":\"Vasiliy\",\"age\":3}"'`

Ответ: `{
    "generatedMaps": [],
    "raw": [],
    "affected": 1
}`

9. Удаление кота из системы

`DELETE /cats?id=<ID>`

Запрос без ответа

10. Получение картинки

`GET /<image_name>`

image_name взять из поля photoPath




`


