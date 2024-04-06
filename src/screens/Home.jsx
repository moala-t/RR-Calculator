import React, { useState } from "react";
import { View, Text } from "react-native";
import { MainScrollView } from "../components/MainView";
import TextInput_1 from "../components/TextInput_1";
import NumericInput from "../components/NumericalInput";
import LabeledInput from "../components/LabeledInput";
import _ from "lodash";
import RRCalculator from "../components/RRCalculator";

const Home = () => {
  return (
    <MainScrollView>
      <RRCalculator />
    </MainScrollView>
  );
};

export default Home;
