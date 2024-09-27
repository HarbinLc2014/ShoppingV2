import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QuantityBox from "./QuantityBox";
import { Product } from "../types/Product";

interface OrderItemProps {
  item: Product;
  quantity: number;
  updateQuantity: (id: number, newQuantity: number) => void;
}

export const OrderItem = React.memo(
  ({ item, quantity, updateQuantity }: OrderItemProps) => {
    return (
      <View style={styles.container} testID={`order-item-${item.id}`}>
        <Text style={styles.productName} testID={`product-name-${item.id}`}>
          {item.name}
        </Text>
        <QuantityBox
          quantity={quantity}
          setQuantity={(quantity) => updateQuantity(item.id, quantity)}
          testID={`quantity-box-${item.id}`}
        />
        <Text style={styles.price} testID={`product-price-${item.id}`}>
          ${(Number(item.price) * quantity).toFixed(2)}
        </Text>
      </View>
    );
  },
  (prevProps, nextProps) => {
    // if id or quantity doesnt change, dont re-render unnecessarily
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.quantity === nextProps.quantity
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    width: "34%",
  },
  price: {
    fontSize: 16,
    width: "20%",
    textAlign: "right",
    fontWeight: "bold",
  },
});
