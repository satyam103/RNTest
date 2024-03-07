import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
export const SelectProfileModal = props => {
  // ======================= choose image from gallery =========================
  const selectImage = () => {
    let options = {
      storageOptions: {
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        props.setImage({uri: response.assets?.[0]?.uri});
        console.log(response.assets?.[0]?.uri);
      }
    });
  };

  // =========================== capture using camera ===========================
  const selectCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        props.setImage({uri: response.assets?.[0]?.uri});
        console.log(response.assets?.[0]?.uri);
      }
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={props.handleModal}>
      <TouchableWithoutFeedback onPress={props.handleModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Pressable
                onPress={() => {
                  selectCamera();
                  props.handleChange('image');
                  props.handleModal();
                }}>
                <Image
                  style={styles.modalImage}
                  source={require('../../Images/camera.png')}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  selectImage();
                  props.handleChange('image');
                  props.handleModal();
                }}>
                <Image
                  style={styles.modalImage}
                  source={require('../../Images/gallery.png')}
                />
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'rgb(255,255,255)',
    height: 200,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 10,
    borderRadius: 10,
  },
  modalImage: {
    height: 100,
    width: 100,
    backgroundColor: 'rgb(235,235,235)',
  },
});
