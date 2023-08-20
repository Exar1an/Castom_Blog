1. Скачайте репозиторий (git clone;).
2. Cкачайте зависимости через терминал (npm i).
3. У вас должен быть запущен сервер с postgreSQL.
4. Создайте базу внутри pgSQL и назовите её custom-blog.
5. Создайте файл ".development.env".
Поместите переменные окружения из списка ниже в ".development.env" файл:
```
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=custom-blog
POSTGRES_PASSWORD=yourpassword
POSTGRES_PORT=5432
PRIVATE_KEY=secret_key_abcde
```
6. Запустите сервер с помощью "npm run start:dev".
7. Сервер graphql доступен по адресу -> http://localhost:5000/graphql.
8. Первым делом вам нужно сделать запрос для того, чтобы заполнить базу данных дефолтными ролями и первым модератором (Если они уже существуют, то ничего не произойдет лишнего, запрос просто пройдет и вернет true). Для этого для GraphhQL сделайте вот такой запрос -> query {
    createDefaultSeeds
} (База данных не очищается, это разовая акция для первого запуска)
9. Сервер rest api доступен по адресу -> http://localhost:5000 + роуты.
10. Для того чтобы узнать список query и mutation откройте в браузере http://localhost:5000/graphql -> docs || schema.

## Публичный api
1. Апи доступен по ссылке https://custom-blog.fly.dev/graphql или https://custom-blog.fly.dev для rest api.
2. Чтобы отправить запрос откройте postman и вставьте ссылку из предыдущего пункта в строку адреса.
3. Нажмите на вкладку Body и выбирите GraphQL, а так же выберете метод post, если он не выбран. Для rest api выберете нужный метод для запроса и вместо GraphQL выберете raw и введите тело запроса в формате json (т.е. так -> {
    "email": "moderator@gmail.com",
    "password": "qwerty123"
})
4. Отправьте запрос кнопкой "Send".
5. После этого вам нужно пройти аутентификацию, для этого введите такок тело для graphQL: 
mutation {
    login(loginUserData: {email: "moderator@gmail.com", password: "qwerty123"}) {
        token
    }
} (Этот юзер первый модератор и создан сидами)
6. После этого вам придет токен и вам нужно перейти вкладку Authorization в постмане, в type выставить Bearer Token и Token вставить полученый из ответа токен.
7. После этого вы можете взаимодействовать со всеми остальными запросами в зависимости от роли.
8. Все rest api эндпоинты работают точно так же как и на GraphQL, но так как они не входили в задание я не включаю их в документацию. Смотрите роуты в .controller файлах.

## ТЕСТЫ.
1. Тесты доступны в локальном репозитории в папках users и posts в файлах с окончанием *.spec.ts
2. Нажмите run над discribe, чтобы запустить тесты или введите в консоль команду "npm run test".
3. Результаты выполнения тестов будут доступныы в терминале.



# Setup Instructions

1. Download the repository using the command `git clone;`.
2. Download the required dependencies by executing `npm i` in the terminal.
3. Ensure that your PostgreSQL server is up and running.
4. Create a database inside pgSQL and name it `custom-blog`.
5. Create a file named `.development.env` and place the following environment variables in it:
```
PORT=5000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=custom-blog
POSTGRES_PASSWORD=yourpassword
POSTGRES_PORT=5432
PRIVATE_KEY=secret_key_abcde
```

6. Launch the server using the command `npm run start:dev`.
7. Access the GraphQL server at -> [http://localhost:5000/graphql](http://localhost:5000/graphql).
8. As the first step, make a GraphQL query to populate the database with default roles and the initial moderator. Use the following query:

query {
createDefaultSeeds
}
   This query is a one-time action for the first launch and won't clear the existing database.

9. The REST API server is accessible at -> [http://localhost:5000](http://localhost:5000) + routes.
10. To explore the list of available queries and mutations, open [http://localhost:5000/graphql](http://localhost:5000/graphql) in your browser -> docs || schema.

# Public API

1. The API is available at the following links:
   - GraphQL API: [https://custom-blog.fly.dev/graphql](https://custom-blog.fly.dev/graphql)
   - REST API: [https://custom-blog.fly.dev](https://custom-blog.fly.dev)
   
2. To send requests, you can use Postman. Paste the link from the previous point into the address bar.

3. In Postman, navigate to the Body tab, select GraphQL, and choose the post method if not selected. For REST API, choose the appropriate request method, select raw, and enter the request body in JSON format:

{
"email": "moderator@gmail.com",
"password": "qwerty123"
}

4. Send the request using the "Send" button.

5. After sending the request, proceed with authentication. For GraphQL, execute the following mutation:

mutation {
login(loginUserData: {email: "moderator@gmail.com", password: "qwerty123"}) {
token
  }
}

   This user is the first moderator and is created using seeds.

6. You will receive a token. Go to the Authorization tab in Postman, choose Bearer Token for the type, and insert the received token.

7. You can now interact with various requests based on your role.

8. Note that all REST API endpoints work similarly to GraphQL. However, as they are not part of the assignment, they are not included in this documentation. Refer to the routes in the `.controller` files.

# Testing

1. Tests are available in the local repository within the `users` and `posts` folders in files with the `.spec.ts` extension.

2. To run the tests, click "run" above the `describe` section or execute the command `npm run test` in the console.

3. The results of the tests will be displayed in the terminal.