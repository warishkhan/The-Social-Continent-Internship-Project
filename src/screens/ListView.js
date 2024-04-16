import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DataContext } from '../context/DataContext';

const ListView = ({ navigation }) => {
  const { products, favorites, toggleFavorite } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, item.isFavorite && styles.favoriteItem]}>
      
      <Image source={{uri:item.images[0]}} style={styles.imgStyle}/>
      <Text style={styles.textStyle}>{item.title}</Text>
      <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('DetailScreen', { productId: item.id })}>
        <Text style={styles.btnText}>DETAILS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btns,(favorites.length >= 5 && !item.isFavorite) && styles.bgChange]} onPress={() => toggleFavorite(item.id)} disabled={favorites.length >= 5 && !item.isFavorite}>
        <Text style={styles.btnText}>{item.isFavorite ? 'Remove Favorite' : 'Add Favorite'}</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchInput}
      />
     <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    justifyContent:"center",
    padding:10
  },
  searchInput:{
    backgroundColor:"#fff",
    width:"100%",
    paddingVertical:5,
    borderRadius:3,
    paddingLeft:5,
    elevation:5,
    marginVertical:5
  },
  itemContainer: {
   alignItems:"center",
   justifyContent:"center",
   width:"100%",
   height:300,
   borderWidth:1,
   borderColor:"gray",
   marginVertical:5,
   backgroundColor:"#fff"
    
  },
  imgStyle:{
    width:"100%",
    height:"40%",
    resizeMode:"contain"
  },
  textStyle:{
    textAlign:'center',
    fontWeight:"bold",
    margin:5,
    fontSize:20
  },
  btnContainer:{
    flexDirection:'row',
    justifyContent:"space-around",
    width:"100%",
    marginTop:10
  },

  btns:{
    backgroundColor:"#000",
    width:150,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:2
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
  
  favoriteItem: {
    backgroundColor: 'orange', // Change to your desired color for favorite items
  },
});

export default ListView;




