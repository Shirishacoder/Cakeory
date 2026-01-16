import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// YOUR college as center
const center = {
  lat: 16.567317,
  lng: 81.522293,
};

const colleges = [
  {
    name: "Shri Vishnu Engineering College, Bhimavaram",
    lat: 16.567317,
    lng: 81.522293,
  },
  {
    name: "BVRIT Hyderabad",
    lat: 17.5449,
    lng: 78.3890,
  },
  {
    name: "BVRIT Narsapur",
    lat: 17.7256,
    lng: 77.8789,
  },
];

export default function Map() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}   // 👈 zoomed clearly on YOUR college
      >
        {colleges.map((college, index) => (
          <Marker
            key={index}
            position={{ lat: college.lat, lng: college.lng }}
            title={college.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
