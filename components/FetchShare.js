import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const FetchShare = ({productId}) => {
     const [products,setProducts] = useState([]);
     const api ='http://10.0.2.2:8000';
    console.log(productId);

    useEffect(() => {

        const fetchProduct =async() => {
          
            const res = await fetch (`${api}/products/${productId}`);
            const data = await res.json();
            if(res.ok){
                setProducts(data);
            }else{
                console.log("Error Fetching the product");
            }
        }
        fetchProduct();
    },[productId]);
   
  return (
    <View>
  
  {products && (
    <View>
        {/* <Text>{products.name}</Text> */}
        <Image source = {{uri:`${api}/${products.image}`}} style = {{
            width:200,
            height:150,
            objectFit:'cover',
        }}/>
    </View>
  )}

    </View>
  )
}

export default FetchShare

const styles = StyleSheet.create({})