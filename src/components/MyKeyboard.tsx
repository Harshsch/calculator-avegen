import * as React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Animated } from "react-native";
import Button from "./Button";  // Ensure your Button component is updated accordingly
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
  const [firstNumber, setFirstNumber] = React.useState("");
  const [secondNumber, setSecondNumber] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [result, setResult] = React.useState<Number | null>(null);
  const [buttonScale] = React.useState(new Animated.Value(1));

  // Prevent entering multiple decimals in the number
  const handleNumberPress = (buttonValue: string) => {
    if (buttonValue === "." && firstNumber.includes(".")) {
      return;  // Prevent multiple decimals
    }

    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    // Handle operation like +, -, *, /
    if (buttonValue === "％") {
      setResult(parseFloat(firstNumber) / 100);
      setFirstNumber("");  // Clear the first number after calculation
      return;
    }

    if (buttonValue === "+/-") {
      setFirstNumber((parseFloat(firstNumber) * -1).toString());
      return;
    }

    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  };

  const clear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return <Text style={styles.resultText}>{result?.toString()}</Text>;
    }
    if (firstNumber === "") {
      return <Text style={styles.numberText}>0</Text>;
    }
    return <Text style={styles.numberText}>{firstNumber}</Text>;
  };

  const getResult = () => {
    if (operation && secondNumber !== "") {
      switch (operation) {
        case "+":
          setResult(parseFloat(secondNumber) + parseFloat(firstNumber));
          break;
        case "-":
          setResult(parseFloat(secondNumber) - parseFloat(firstNumber));
          break;
        case "*":
          setResult(parseFloat(secondNumber) * parseFloat(firstNumber));
          break;
        case "/":
          if (firstNumber === "0") {
            setResult("Error"); // Handle division by zero
          } else {
            setResult(parseFloat(secondNumber) / parseFloat(firstNumber));
          }
          break;
        default:
          setResult(0);
          break;
      }
      setFirstNumber(""); // Clear the number after result is calculated
    }
  };

  // Button press animation effect
  const animateButtonPress = () => {
    Animated.sequence([ 
      Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }), 
      Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }), 
    ]).start();
  };

  // Handling the backspace functionality
  const handleBackspace = () => {
    setFirstNumber(firstNumber.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.operationText}>
          {secondNumber} {operation}
        </Text>
        {firstNumberDisplay()}
      </View>

      {/* Rows of Buttons */}
      <View style={styles.row}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="C" isGray onPress={() => { animateButtonPress(); clear(); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="+/-" isGray onPress={() => { animateButtonPress(); handleOperationPress("+/-"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="％" isGray onPress={() => { animateButtonPress(); handleOperationPress("％"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="÷" isBlue onPress={() => { animateButtonPress(); handleOperationPress("/"); }} />
        </Animated.View>
      </View>

      <View style={styles.row}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="7" onPress={() => { animateButtonPress(); handleNumberPress("7"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="8" onPress={() => { animateButtonPress(); handleNumberPress("8"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="9" onPress={() => { animateButtonPress(); handleNumberPress("9"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="×" isBlue onPress={() => { animateButtonPress(); handleOperationPress("*"); }} />
        </Animated.View>
      </View>

      <View style={styles.row}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="4" onPress={() => { animateButtonPress(); handleNumberPress("4"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="5" onPress={() => { animateButtonPress(); handleNumberPress("5"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="6" onPress={() => { animateButtonPress(); handleNumberPress("6"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="-" isBlue onPress={() => { animateButtonPress(); handleOperationPress("-"); }} />
        </Animated.View>
      </View>

      <View style={styles.row}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="1" onPress={() => { animateButtonPress(); handleNumberPress("1"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="2" onPress={() => { animateButtonPress(); handleNumberPress("2"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="3" onPress={() => { animateButtonPress(); handleNumberPress("3"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="+" isBlue onPress={() => { animateButtonPress(); handleOperationPress("+"); }} />
        </Animated.View>
      </View>

      <View style={styles.row}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="." onPress={() => { animateButtonPress(); handleNumberPress("."); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="0" onPress={() => { animateButtonPress(); handleNumberPress("0"); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="⌫" onPress={() => { animateButtonPress(); handleBackspace(); }} />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button title="=" isBlue onPress={() => { animateButtonPress(); getResult(); }} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.dark,
    justifyContent: "flex-end",
    paddingTop: 50,
  },
  displayContainer: {
    height: 150,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  operationText: {
    color: myColors.blue,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "right",
  },
  resultText: {
    fontSize: 70,
    color: myColors.result,
    fontWeight: "bold",
    textAlign: "right",
  },
  numberText: {
    fontSize: 50,
    color: myColors.white,
    fontWeight: "bold",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

