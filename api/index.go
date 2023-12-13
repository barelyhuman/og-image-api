package handler

import (
	"bytes"
	"image/png"
	"log"
	"net/http"
	"strconv"

	OGImageLib "github.com/barelyhuman/og-image/lib"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	title := r.FormValue("title")
	subtitle := r.FormValue("subtitle")
	fontSize := r.FormValue("fontSize")
	fontSizeTwo := r.FormValue("fontSizeTwo")
	color := r.FormValue("color")
	backgroundImageURL := r.FormValue("backgroundImageURL")
	backgroundColor := r.FormValue("backgroundColor")

	fontSizeAsInt, _ := strconv.Atoi(fontSize)
	fontSizeTwoAsInt, _ := strconv.Atoi(fontSizeTwo)

	img := OGImageLib.DrawImage(title, subtitle, fontSizeAsInt, fontSizeTwoAsInt, color, backgroundImageURL, backgroundColor)
	buffer := new(bytes.Buffer)
	if err := png.Encode(buffer, img); err != nil {
		log.Println("unable to encode image.")
	}
	w.Header().Set("Content-Type", "image/jpeg")
	w.Header().Set("Content-Length", strconv.Itoa(len(buffer.Bytes())))
	if _, err := w.Write(buffer.Bytes()); err != nil {
		log.Println("unable to write image.")
	}

}
