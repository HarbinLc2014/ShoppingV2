import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

interface QuantityBoxProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  testID: string;
}

export default function QuantityBox({ quantity, setQuantity, testID }: QuantityBoxProps) {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableWithoutFeedback onPress={() => setQuantity(quantity - 1 > 0 ? quantity - 1 : 0)}>
        <View
          style={[
            styles.quickButton,
            {
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            },
          ]}
          testID={`${testID}-minus-button`}
        >
          <Text style={styles.quickButtonText}>-</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={quantity?.toString()}
          onChangeText={(text) => 
            setQuantity(parseInt(text) > 0 ? parseInt(text) : 0)}
          keyboardType="numeric"
          maxLength={2}
          testID={`${testID}-input`}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => setQuantity(quantity + 1)}>
        <View
          style={[
            styles.quickButton,
            { borderTopRightRadius: 20, borderBottomRightRadius: 20 },
          ]}
          testID={`${testID}-plus-button`}
        >
          <Text style={styles.quickButtonText}>+</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  quickButton: {
    width: 40,
    height: 40,
    borderWidth: 0,
    backgroundColor: "#d7dce1",
    alignItems: "center",
    justifyContent: "center",
  },
  quickButtonText: { fontSize: 24, fontWeight: "500" },
  inputContainer: {
    backgroundColor: "#d7dce1",
    paddingVertical: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 50,
    height: 35,
    borderWidth: 0,
    borderColor: "gray",
    textAlign: "center",
    backgroundColor: "white",
    fontWeight: "500",
  },
});
