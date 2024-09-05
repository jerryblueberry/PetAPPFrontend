// import { ScrollView, StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native';

// const Items = () => {
//     const [products, setProducts] = useState([]);
//     // const route = useRoute();
//     const navigation  = useNavigation();
//     // const {productId} = route.params;
   

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const response = await fetch("https://fakestoreapi.com/products");
//             const data = await response.json();
//             if (response.ok) {
//                 setProducts(data);
//             } else {
//                 console.log("Error occurred while fetching products");
//             }
//         }
//         fetchProducts();

//     }, []);

//     return (
//         <View style = {{
//             display:'flex',
//                 justifyContent:'center',
//                 alignItems:'center'
//         }}>
//             <Text style = {{
//                 // flex:1,
//                 color:'#ff8000',
//                 fontSize:21,
//                 fontFamily:'sans-serif-condensed',
//                 fontWeight:'bold',
                
                
//             }}>Explore the Variety of  Categories</Text>
//             <ScrollView
//                 horizontal={true} // Make it horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollViewContainer}
//             >
//                 {products.map((product, index) => (
//                     <Pressable onPress={() => navigation.navigate("Detail",{productId  : product.id})}>
//                     <View key={index} style={styles.card}>
//                         <Image
//                             source={{ uri: product.image }}
//                             style={styles.image}
//                         />
//                     </View>

//                     </Pressable>
                    
//                 ))}
//             </ScrollView>
//         </View>
//     )
// }

// export default Items

// const styles = StyleSheet.create({
//     scrollViewContainer: {
//         flexDirection: 'row', // Horizontal arrangement
//         alignItems: 'center', // Center items vertically
//     },
//     card: {
//         backgroundColor: '#99ccff',
//         borderRadius: 20,
//         margin: 10,
//         padding: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 20,
//     },
// })

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Items = () => {
  return (
    <View>
      <Text>Items</Text>
    </View>
  )
}

export default Items

const styles = StyleSheet.create({})