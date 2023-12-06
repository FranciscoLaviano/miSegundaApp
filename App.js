import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Modal,
} from "react-native";
//import { uuid } from "react-native-uuid";

const App = () => {
  const [nuevoTitulodeProducto, setNuevoTitulodeProducto] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [productos, setProductos] = useState([]);
  const [productoElejido, setProductoElejido] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handlerAddProduct = () => {
    const productoNuevo = {
      id: uuid.v4(),
      title: nuevoTitulodeProducto,
      price: nuevoPrecio,
    };
    setProductos((current) => [...current, productoNuevo]);
    setNuevoTitulodeProducto("");
    setNuevoPrecio("");
  };
  const handlerModal = (item) => {
    setProductoElejido(item);
    setModalVisible(true);
  };
  const handlerDeleteProduct = () => {
    setProductos((current) =>
      current.filter((producto) => producto.id !== productoElejido.id)
    );
    setModalVisible(false);
  };
  return;
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="producto"
        value={nuevoTitulodeProducto}
        onChangeText={(t) => setNuevoTitulodeProducto(t)}
      />
      <TextInput
        style={styles.input}
        placeholder="agregue su precio  $ "
        value={nuevoPrecio}
        onChangeText={(t) => setNuevoPrecio(t)}
      />
      <Button title="ADD" onPress={handlerAddProduct} />
    </View>
    <View style={styles.listContainer}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardProduct}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.price} $ </Text>
            <Button title="DEL" onPress={() => handlerModal(item)} />
          </View>
        )}
      />
    </View>
    <Modal visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            ¿esta seguro que quiere eliminar el producto?
          </Text>
          <Text style={styles.modatText}>{productoElejido.title}</Text>
          <Button title="Aceptar" onPress={handlerDeleteProduct} />
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  </View>;
};

//Sección de estilos de página

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  input: {
    borderWidth: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 150,
  },
  listContainer: {
    width: "100%",
  },
  cardProduct: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 4,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "80%",
    borderWidth: 2,
    padding: 10,
    gap: 10,
  },
  modalText: {
    textAlign: "center",
  },
});

export default App;
