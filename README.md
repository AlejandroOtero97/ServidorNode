# ServidoresNode

nodemon:
    nodemon server.js -p 3000 -m FORK
    nodemon server.js -p 3000 -m CLUSTER


nginx:
    node server.js -p 8080
    node server.js -p 8081 -m CLUSTER
    node server.js -p 8082
    node server.js -p 8083


pm2:
    pm2 start server.js --name=server8080 --watch -- -p 8080
    pm2 start server.js --name=server8081 --watch -- -p 8081
    pm2 start server.js --name=server8082 --watch -- -p 8082


forever:
    forever list
    forever start --watch server.js -p 8080
    forever start --watch server.js -p 8081
    forever start --watch server.js -p 8082