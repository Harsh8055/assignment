package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"sort"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Spot struct {
	ID          string  `gorm:"type:uuid;primary_key"`
	Name        string  `gorm:"type:varchar"`
	Website     string  `gorm:"type:varchar"`
	Latitude    float64 `gorm:"type:double precision"`
	Longitude   float64 `gorm:"type:double precision"`
	Description string  `gorm:"type:varchar"`
	Rating      float64 `gorm:"type:float8"`
}

func main() {
	r := mux.NewRouter()

	// Define the endpoint handler
	r.HandleFunc("/spots", handleSpot).Methods("GET")

	fmt.Println("Server started on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func handleSpot(w http.ResponseWriter, r *http.Request) {
	db, err := gorm.Open("postgres", "host=localhost port=5433 user=root dbname=gobackend password=mysecretpassword sslmode=disable")
	if err != nil {
		panic("failed to connect to database")
	}
	defer db.Close()
	latitudeStr := r.URL.Query().Get("latitude")
	longitudeStr := r.URL.Query().Get("longitude")
	radiusStr := r.URL.Query().Get("radius")
	shape := r.URL.Query().Get("shape")

	latitude, err := strconv.ParseFloat(latitudeStr, 64)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Invalid latitude", http.StatusBadRequest)
		return
	}

	longitude, err := strconv.ParseFloat(longitudeStr, 64)
	if err != nil {
		http.Error(w, "Invalid longitude", http.StatusBadRequest)
		return
	}

	radius, err := strconv.ParseFloat(radiusStr, 64)
	if err != nil {
		http.Error(w, "Invalid radius", http.StatusBadRequest)
		return
	}

	var spots []Spot
	if shape == "circle" {
		// Perform the spatial query to fetch spots within the specified circle area
		db.Raw("SELECT * FROM \"MY_TABLE\" WHERE ST_DWithin(coordinates, ST_MakePoint(?, ?)::geography, ?)", longitude, latitude, radius).Scan(&spots)
	} else if shape == "square" {
		// Perform the spatial query to fetch spots within the specified square area
		
		minLat := latitude - (radius / 111000)
		maxLat := latitude + (radius / 111000)
		minLon := longitude - (radius / 111000)
		maxLon := longitude + (radius / 111000)

		db.Raw("SELECT * FROM \"MY_TABLE\" WHERE latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?", minLat, maxLat, minLon, maxLon).Scan(&spots)
	} else {
		http.Error(w, "Invalid shape", http.StatusBadRequest)
		return
	}

	// Additional sorting
	sort.Slice(spots, func(i, j int) bool {
		distanceI := calculateDistance(latitude, longitude, spots[i].Latitude, spots[i].Longitude)
		distanceJ := calculateDistance(latitude, longitude, spots[j].Latitude, spots[j].Longitude)

		// calculate distance between spots
		distanceBetweenSpots := calculateDistance(spots[i].Latitude, spots[i].Longitude, spots[j].Latitude, spots[j].Longitude)

		if(distanceBetweenSpots < 50) {
			return spots[i].Rating > spots[j].Rating
		}
		return distanceI < distanceJ
	})

	// Return the spots as JSON response
	jsonData, err := json.Marshal(spots)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}



// Helper function to calculate the distance between two spots using the Pythagorean theorem (found formula on stackoverflow)
func calculateDistance(lat1, lon1, lat2, lon2 float64) float64 {
	// Convert latitude and longitude values to radians
	lat1Rad := degreesToRadians(lat1)
	lon1Rad := degreesToRadians(lon1)
	lat2Rad := degreesToRadians(lat2)
	lon2Rad := degreesToRadians(lon2)

	// Approximate the distance using the Pythagorean theorem
	x := (lon2Rad - lon1Rad) * math.Cos((lat1Rad+lat2Rad)/2)
	y := lat2Rad - lat1Rad
	distance := math.Sqrt(math.Pow(x, 2)+math.Pow(y, 2)) * earthRadius

	return distance
}

// Earth radius in meters
const earthRadius = 6371000.0

// Helper function to convert degrees to radians
func degreesToRadians(degrees float64) float64 {
	return degrees * math.Pi / 180
}
