import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { fetchProducts } from "../services/api";
import { OrderItem } from "../components/OrderItem";

const { width } = Dimensions.get("window");

const ITEM_HEIGHT = 72;

export default function OrderScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [pageState, setPageState] = useState<PageState>("loading");
  const [errMsg, setErrMsg] = useState<string>("");
  useEffect(() => {
    newOrder();
  }, []);

  const newOrder = async () => {
    setPageState("loading");
    try {
      const products = await fetchProducts();
      setProducts(products);
      const initialQuantities = products.reduce((acc, product) => {
        acc[product.id] = 1;
        return acc;
      }, {} as { [key: number]: number });
      setQuantities(initialQuantities);
      setPageState("loaded");
    } catch (error) {
      setPageState("error");
      setErrMsg(error?.message || "Oops, something is wrong.");
    }
  };

  const calculateTotal = () => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * quantities[product.id];
    }, 0);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));
    }
  };

  const renderPageContent = () => {
    if(pageState === 'loaded')
    return (
      <>
        <FlatList
          data={products}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          renderItem={({ item }) => {
            return (
              <OrderItem
                item={item}
                quantity={quantities[item.id]}
                updateQuantity={updateQuantity}
              />
            );
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Total</Text>
          <Text
            style={[styles.footerText, { textAlign: "right" }]}
            testID="total-price"
          >
            ${calculateTotal().toFixed(2)}
          </Text>
        </View>
      </>
    );
    return (
      <View
        style={styles.stateContainer}
      >
        {pageState === 'error'? <Text style={styles.errorText}>
          {errMsg}
        </Text>: <ActivityIndicator size="large" />}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderModal}>
        <TouchableWithoutFeedback onPress={newOrder} disabled={pageState === 'loading'}>
          <View style={[styles.newOrderButton, {backgroundColor: pageState === 'loading'? 'grey': '#2e61de'}]}>
            <Text style={styles.newOrderButtonText}>New order</Text>
          </View>
        </TouchableWithoutFeedback>
        {renderPageContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  orderModal: {
    width: width - 32,
    height: 540,
    backgroundColor: "white",
    marginBottom: 24,
    borderRadius: 10,
  },
  newOrderButton: {
    width: width - 64,
    height: 56,
    margin: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  newOrderButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 16,
    paddingVertical: 28,
    alignItems: "center",
    borderTopColor: "#d3d3d3",
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  stateContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  errorText: { fontSize: 18, fontWeight: "400", lineHeight: 27 }
});
