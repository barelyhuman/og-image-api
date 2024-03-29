package main

import (
	"fmt"
	"net/http"
	handler "og-image-api/api"

	"github.com/barelyhuman/go/env"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	port := env.Get("PORT", "3003")
	http.Handle("/generate", http.HandlerFunc(handler.Handler))
	http.Handle("/", http.FileServer(http.Dir("public")))
	fmt.Printf("listening on port: %v\n", port)
	bail(http.ListenAndServe(":"+port, nil))
}

func bail(err error) {
	if err != nil {
		panic(err)
	}
}
