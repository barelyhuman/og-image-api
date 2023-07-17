package main

import (
	"net/http"
	handler "og-image-api/api"
)

func main() {
	http.Handle("/", http.HandlerFunc(handler.Handler))
	bail(http.ListenAndServe(":3003", nil))
}

func bail(err error) {
	if err != nil {
		panic(err)
	}
}
