for development
please stick to branch "orgin/dev"
when you want to deploy, follow the commands:
1. git checkout master
2. git merge dev
3. git push
4. git checkout dev

run in development:
1. `cd backend`
2. `php artisan serve`
3. `cd fuse`
4. `gulp serve`