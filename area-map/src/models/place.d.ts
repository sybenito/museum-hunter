type PlaceData = {
  id: string;
  displayName: string;
  location: google.maps.LatLngLiteral;
  addressComponents?: google.maps.GeocoderAddressComponent[];
  formattedAddress?: string;
  businessStatus?: google.maps.places.BusinessStatus;
  photos?: google.maps.places.PlacePhoto[];
  priceLevel?: google.maps.places.PriceLevel;
  rating?: number;
  googleMapsUri?: string;
  internationalPhoneNumber?: string;
  openingHours?: google.maps.places.OpeningHours;
  websiteUri?: string;
  detailsFetched: boolean;
};

export type { PlaceData };
