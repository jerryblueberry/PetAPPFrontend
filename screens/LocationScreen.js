// // MapScreen.js
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const LocationScreen = () => {
//   const pokharaCoordinates = {
//     latitude: 28.2639, // Latitude of Pokhara
//     longitude: 83.9701, // Longitude of Pokhara
//     latitudeDelta: 0.1,
//     longitudeDelta: 0.1,
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={pokharaCoordinates}
//       >
//         {/* Marker for Pokhara */}
//         <Marker
//           coordinate={pokharaCoordinates}
//           title="Pokhara"
//           description="City of Lakes"
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default LocationScreen;



// MapScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationScreen = () => {
  const [petShops, setPetShops] = useState([]);
  const [pokharaCoordinates, setPokharaCoordinates] = useState({
    latitude: 28.2639, // Latitude of Pokhara
    longitude: 83.9701, // Longitude of Pokhara
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    // Fetch pet shop data from your API
    fetch('http://10.0.2.2:8000/api/petshops') // Update with your server's address
      .then(response => response.json())
      .then(data => setPetShops(data))
      .catch(error => console.error('Error fetching pet shops:', error));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={pokharaCoordinates}
      >
        {/* Marker for Pokhara */}
        <Marker
          coordinate={pokharaCoordinates}
          title="Pokhara"
          description="City of Lakes"
        />

        {/* Markers for pet shops */}
        {petShops.map(petShop => (
          <Marker
            key={petShop.id}
            coordinate={{
              latitude: petShop.latitude,
              longitude: petShop.longitude,
            }}
            title={petShop.name}
            description={petShop.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default LocationScreen;
