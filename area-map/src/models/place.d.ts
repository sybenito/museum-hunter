type PlaceData = {
  id: string;
  displayName: string;
  location: google.maps.LatLngLiteral;
  addressComponents?: google.maps.GeocoderAddressComponent[];
  businessStatus?: google.maps.places.BusinessStatus;
  photos?: google.maps.places.PlacePhoto[];
  priceLevel?: google.maps.places.PriceLevel;
  rating?: number;
};

export type { PlaceData };
