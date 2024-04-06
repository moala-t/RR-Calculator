import { Modal, TouchableOpacity, View, Text } from "react-native";
import { copyToClipboard } from "../utils/utils";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default CopyButton = ({
  textToCopy,
  buttonSize = 22,
  buttonColor = "white",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const _copyToClipboard = () => {
    copyToClipboard(textToCopy);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 800);
  };

  return (
    <View>
      <TouchableOpacity onPress={_copyToClipboard}>
        <FontAwesome name="copy" size={buttonSize} color={buttonColor} />
      </TouchableOpacity>
      <CopyModal visible={modalVisible} setVisible={setModalVisible} />
    </View>
  );
};

const CopyModal = ({ visible, setVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View className="bg-slate-800 p-3 justify-center items-center rounded-xl">
          <Text className="text-white text-sm">Copied!</Text>
        </View>
      </View>
    </Modal>
  );
};
