import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import NumericInput from "../components/NumericalInput";
import LabeledInput from "../components/LabeledInput";
import _ from "lodash";
import { Slider } from "@miblanchard/react-native-slider";
import CopyButton from "./CopyButton";

const CalculateButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full h-10 rounded-lg bg-emerald-600 justify-center items-center mt-3"
    >
      <Text className="text-white">Calculate</Text>
    </TouchableOpacity>
  );
};

const ResultItem = ({
  label,
  value,
  value_label,
  extraParentClassName = "",
}) => {
  return (
    <View
      className={
        "bg-slate-800 p-3 rounded-lg w-full flex-row justify-between items-center " +
        extraParentClassName
      }
    >
      <Text className="text-white">
        {label} {"=>"} {value_label}
      </Text>
      <CopyButton textToCopy={value.toString()} />
    </View>
  );
};

const AllFieldRequiredModal = ({ visible, setVisible }) => {

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer); // Cleanup function to clear the timer
    }
  }, [visible, setVisible]); // Include visible and setVisible in the dependency array

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View className="bg-slate-800 p-3 justify-center items-center rounded-xl">
          <Text className="text-white text-sm">All Fields are Required</Text>
        </View>
      </View>
    </Modal>
  );
};

const ResultModal = ({
  modalShow,
  setModalShow,
  rr,
  position_size,
  is_liquidity_before_sl,
  max_leverage,
  RRData,
  updateStateFields,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalShow}
      onRequestClose={() => {
        setModalShow(!modalShow);
      }}
    >
      <TouchableWithoutFeedback onPress={() => {}}>
        <View className="flex-1 justify-center items-center">
          <TouchableWithoutFeedback>
            <View
              className="m-5 p-4 rounded-3xl bg-white shadow-md flex w-96 max-w-[80%]"
              style={{ rowGap: 15 }}
            >
              {/* Show Results */}
              <View className="" style={{ rowGap: 12 }}>
                <ResultItem label="R/R" value={rr} value_label={rr} />
                <ResultItem
                  label="Position Size"
                  value_label={`${position_size} USD`}
                  value={position_size}
                />
                <View>
                  <ResultItem
                    label="Leverage"
                    value_label={`${RRData.leverage}x`}
                    value={RRData.leverage}
                  />
                  <Slider
                    value={RRData.leverage}
                    onValueChange={(value) =>
                      updateStateFields([["leverage", value]])
                    }
                    animationType="timing"
                    step={1}
                    maximumValue={max_leverage}
                    minimumValue={1}
                    thumbTintColor={"#1e293b"}
                  />
                </View>
                {/* <View>
                  <ResultItem label="Loss" value_label={`${RRData.loss_usd} USD`} value={RRData.loss_usd}/>
                  <Slider
                    value={RRData.loss_usd}
                    onValueChange={(value) =>
                      updateStateFields([["loss_usd", value]])
                    }
                    animationType="timing"
                    step={1}
                    maximumValue={100}
                    minimumValue={1}
                    thumbTintColor="#1e293b"
                  />
                </View> */}
                {is_liquidity_before_sl ? (
                  <View>
                    <Text className="text-red-600">
                      ! Liquidity Raise Before SL
                    </Text>
                  </View>
                ) : null}
              </View>
              {/* Buttons */}
              <View className="flex" style={{ rowGap: 5 }}>
                <TouchableOpacity
                  className="bg-slate-200 w-full p-2 justify-center items-center rounded-3xl flex-row"
                  style={{ columnGap: 5 }}
                  onPress={() => {
                    setModalShow(false);
                  }}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default function RRCalculator() {
  const [RRData, setRRData] = useState({
    ep: null,
    sl: null,
    tp: null,
    leverage: 1,
    loss_usd: null,
  });

  const [position_size, setPosition_size] = useState(0);
  const [rr, setRr] = useState(0);
  const [is_liquidity_before_sl, setIs_liquidity_before_sl] = useState(false);
  const [max_leverage, setMax_leverage] = useState(0);

  const [resultModalShow, setResultModalShow] = useState(false);
  const [allFieldsRequiredModalShow, setAllFieldsRequiredModalShow] =
    useState(false);

  const updateStateFields = (fieldUpdates) => {
    const updatedData = _.cloneDeep(RRData);

    fieldUpdates.forEach(([field, value]) => {
      _.set(updatedData, field, value);
    });

    setRRData(updatedData);
  };

  useEffect(() => {
    calculate_all_data();
  }, [RRData]);

  const check_fields = () => {
    return RRData.ep && RRData.sl && RRData.tp && RRData.loss_usd && RRData.leverage;
  };

  const calculate_rr = (ep, sl, tp) => {
    if (ep && sl && tp) {
      const sl_diff = Math.abs(ep - sl);
      const tp_diff = Math.abs(ep - tp);
      const rr = tp_diff / sl_diff;
      return rr.toFixed(2);
    }
  };

  const calculate_position_size = (ep, sl, tp, leverage, loss_usd) => {
    const sl_diff = Math.abs(ep - sl);
    const sl_percent = (sl_diff * 100) / ep;
    const position_size = (loss_usd * 100) / sl_percent / leverage;
    return position_size.toFixed(2);
  };

  const check_liquidity_befor_sl = (ep, sl, leverage) => {
    const sl_diff = Math.abs(ep - sl);
    const sl_percent = (sl_diff * 100) / ep;
    const liquidity_percent = 100 / leverage;
    const res = liquidity_percent < sl_percent;
    return res;
  };

  const find_max_leverage = (ep, sl) => {
    let leverage = 1;
    while (!check_liquidity_befor_sl(ep, sl, leverage)) {
      leverage++;
    }
    return leverage - 1;
  };

  const calculate_all_data = () => {
    if (check_fields()) {
      const position_size = calculate_position_size(
        RRData.ep,
        RRData.sl,
        RRData.tp,
        RRData.leverage,
        RRData.loss_usd
      );
      const rr = calculate_rr(RRData.ep, RRData.sl, RRData.tp);
      const is_liquidity_before_sl = check_liquidity_befor_sl(
        RRData.ep,
        RRData.sl,
        RRData.leverage
      );
      const max_leverage = find_max_leverage(RRData.ep, RRData.sl);
      setPosition_size(position_size);
      setRr(rr);
      setIs_liquidity_before_sl(is_liquidity_before_sl);
      setMax_leverage(max_leverage);
      return {
        rr: rr,
        position_size: position_size,
        is_liquidity_before_sl: is_liquidity_before_sl,
        max_leverage: max_leverage,
      };
    }
  };

  return (
    <View
      style={{ rowGap: 10 }}
      className="flex-1 w-full justify-start items-start max-w-screen-lg"
    >
      <LabeledInput label={"Entry Point"}>
        <NumericInput
          placeholder="EP"
          onChange={(num) => updateStateFields([["ep", num]])}
          value={RRData.ep}
        />
      </LabeledInput>
      <LabeledInput label={"Stop Loss"}>
        <NumericInput
          placeholder="SL"
          onChange={(num) => updateStateFields([["sl", num]])}
          value={RRData.sl}
        />
      </LabeledInput>
      <LabeledInput label={"Take Profit"}>
        <NumericInput
          placeholder="TP"
          onChange={(num) => updateStateFields([["tp", num]])}
          value={RRData.tp}
        />
      </LabeledInput>
      <LabeledInput label={"Leverage"}>
        <NumericInput
          placeholder="Leverage"
          float={false}
          onChange={(num) => updateStateFields([["leverage", num]])}
          value={RRData.leverage}
        />
      </LabeledInput>
      <LabeledInput label={"Loss (USD)"}>
        <NumericInput
          placeholder="Loss (USD)"
          onChange={(num) => updateStateFields([["loss_usd", num]])}
          value={RRData.loss_usd}
        />
      </LabeledInput>

      <CalculateButton
        onPress={() => {
          if (check_fields()) {
            setResultModalShow(true);
          } else {
            setAllFieldsRequiredModalShow(true);
          }
        }}
      />
      <ResultModal
        modalShow={resultModalShow}
        setModalShow={setResultModalShow}
        rr={rr}
        position_size={position_size}
        is_liquidity_before_sl={is_liquidity_before_sl}
        max_leverage={max_leverage}
        RRData={RRData}
        updateStateFields={updateStateFields}
      />
      <AllFieldRequiredModal
        visible={allFieldsRequiredModalShow}
        setVisible={setAllFieldsRequiredModalShow}
      />
    </View>
  );
}
