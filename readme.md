----



TO run the go server, 

first do
```
 make postgres
```
then create a db gobackend, by just running 

```
make createdb
```

then do migration, 
to do so run 
```
migrateup
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

