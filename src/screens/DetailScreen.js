// src/screens/DetailScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DataContext } from '../context/DataContext';

const DetailScreen = ({ route }) => {
  const { productId } = route.params;
  const { products, favorites, toggleFavorite } = useContext(DataContext);
  const product = products.find((item) => item.id === productId);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{product.title}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Image source={{uri:product.images[0]}} style={styles.img}/>
      <TouchableOpacity style={[styles.btns,(favorites.length >= 5 && !product.isFavorite) && styles.bgChange]} onPress={() => toggleFavorite(productId)} disabled={favorites.length >= 5 && !product.isFavorite}>
        <Text style={styles.btnText}>{product.isFavorite ? 'Remove Favorite' : 'Add Favorite'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img:{
    height:"50%",
    width:"100%",
    resizeMode:"contain",
    marginVertical:5
  },
  titleText:{
    textAlign:'center',
    fontWeight:"bold",
    margin:5,
    fontSize:20,
    opacity:.7
  },

  btns:{
    backgroundColor:"#000",
    width:150,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:2,
    marginVertical:5
  },

  btnText:{
    textAlign:"center",
    color:"#fff",
    fontWeight:"600",
    paddingVertical:5
  },
  bgChange:{
    backgroundColor:"lightgray"
  },

  desc:{
    opacity:.5
  },
});

export default DetailScreen;
