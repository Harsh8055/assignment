----

https://github.com/Harsh8055/assignment/assets/91266702/326d5aba-5bd2-4eb6-82a2-70794112f40d

TO run the go server, 

first do
```
 make postgres
```
then create a db gobackend, by running 

```
make createdb
```

then do migration, 
to do so run 
```
make migrateup
```

and we need to run 
```
make go
```

and the server is running on port 8080

here's and example http request
```
http://localhost:8080/spots?latitude=71.3189&longitude=-7.7562&radius=1000000&shape=circle
```



