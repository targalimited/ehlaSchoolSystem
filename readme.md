Requirements:
1, Mysql 5.7

for development
please stick to branch "orgin/dev"
when you want to deploy, follow the commands:
1. git checkout master
2. git merge dev
3. git push
4. git checkout dev

run in development:

First time:
run 'npm init'
modify .env file

1. `cd backend`
2. `npm start`

1. `cd fuse`
2. `npm install`
3. `bower install`
4. `gulp serve`