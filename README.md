Office Alerts

## setup

*create config directory and specify configuration options per environment*
```
mkdir config
vim config/development.json
```

## run
*the front end*
```
node app.js
```

*run the amqp listener*
```
node lib/amqp/listener.js
```
