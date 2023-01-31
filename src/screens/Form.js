import {ScrollView} from 'react-native-gesture-handler';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  LogBox,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect, Component} from 'react';
import ImageLoad from 'react-native-image-placeholder';
import COLOR from './assets/color';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import CustomDropdown from './components/customDropdown';
import CustomInput from './components/CustomInput';
import CustomRadio from './components/customRadio';
import FONTS from './assets/fonts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MultiSelect from 'react-native-multiple-select';
import CustomSlider from './components/CustomSlider';
import CheckBox from '@react-native-community/checkbox';

function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  Platform.OS === 'android' ? StatusBar.setBackgroundColor('pink') : null;

  const [formData, setFormData] = useState({
    photo: '',
    fname: '',
    dob: '',
    gender: '',
    phone: '',
    country: '',
    highschool_board: '',
    intermidiate_board: '',
    highschool_percentage: '',
    intermidiate_percentage: '',
    bachlorecourse: '',
    masterscourse: '',
    hobby: [
      {
        name: '',
        isadded: false,
      },
    ],
    language: '',
  });

  const [lastdate, setLastdate] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [picture, setPicture] = useState({uri: ''});
  const [file, setFilePath] = useState('');
  const [shouldShow, setShouldShow] = useState(false);

  const submit = () => {
    setShouldShow(!shouldShow);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setLastdate(getDate(date));
    hideDatePicker();
    setFormData(Object.assign({}, formData, {dob: date}));
    console.log(lastdate);
  };

  useEffect(() => {
    setLastdate(getDate(date));
  }, [date]);

  const getDate = (date) => {
    let tempDate = date.toString().split(' ');
    return date !== '' ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}` : '';
  };

  const handlecamerapermission = () => {
    if (checkCameraPermission) {
      openCamera();
    }
  };

  const handleGalleryPermission = () => {
    if (checkGalleryPermission) {
      openGallery();
    }
  };

  const createThreeButtonAlert = () => {
    Alert.alert('Upload profile', 'using', [
      {
        text: 'Open Camera',
        onPress: () => handlecamerapermission(),
      },
      {
        text: 'Open Gallery',
        onPress: () => handleGalleryPermission(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const openCamera = () => {
    const options = {
      storageoptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchCamera(options, (res) => {
      if (res.didCancel) {
      } else if (res.errorCode) {
      } else if (res.assets[0].fileSize < 10000000) {
        setFilePath(res.assets[0]);
        setPicture({uri: res.assets[0].uri});
      } else {
        Alert.alert('Image size should be less than 10 MB');
      }
    });
  };

  const openGallery = () => {
    const options = {
      storageoptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
      } else if (res.errorCode) {
      } else if (res.assets[0].fileSize < 10000000) {
        setFilePath(res.assets[0]);
        setPicture({uri: res.assets[0].uri});
      } else {
        Alert.alert('Image size should be less than 10 MB');
      }
    });
  };

  const pictureData = (str) => {
    return str.slice(str.lastIndexOf('/') + 1);
  };
  const checkGalleryPermission = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    )
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ).then((result) => {
              switch (result) {
                case RESULTS.GRANTED:
                  return true;
                  break;
              }
            });
            break;
          case RESULTS.GRANTED:
            return true;
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkCameraPermission = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert('This feature is not available on this device');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA,
            ).then((result) => {
              switch (result) {
                case RESULTS.GRANTED:
                  return true;
                  break;
              }
            });
            break;
          case RESULTS.GRANTED:
            return true;
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [detail, setDetail] = useState([{hobby: '', isadded: false}]);

  const addData = (index, item) => {
    let temparray = formData.hobby;
    temparray[index].isadded = true;
    temparray.push({name: '', isadded: false});
    setFormData(Object.assign({}, formData, {hobby: temparray}));
  };
  const deleteData = (index, item) => {
    let temparray = formData.hobby;
    temparray = temparray.filter((varia, i) => i !== index);
    setFormData(Object.assign({}, formData, {hobby: temparray}));
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    setFormData(Object.assign({}, formData, {language: selectedItems}));
  };

  const onChangebachelors = (selectedItems) => {
    setSelectedItems(selectedItems);
    setFormData(Object.assign({}, formData, {bachlorecourse: selectedItems}));
  };

  const onchangemasters = (selectedItems) => {
    setSelectedItems(selectedItems);
    setFormData(Object.assign({}, formData, {masterscourse: selectedItems}));
  };

  const items = [
    {id: 5, name: 'React Native'},
    {id: 6, name: 'React'},
    {id: 7, name: 'Node JS'},
    {id: 8, name: 'Python'},
    {id: 9, name: 'AI-ML'},
    {id: 10, name: 'JAVA'},
  ];

  const Bachelors = [
    {id: 1, name: 'BSC IT'},
    {id: 2, name: 'BCA'},
    {id: 3, name: 'Btech'},
    {id: 4, name: 'Bcom'},
  ];

  const Masters = [
    {id: 1, name: 'MCA'},
    {id: 2, name: 'Mtech'},
    {id: 3, name: 'Mcom'},
    {id: 4, name: 'Msc'},
  ];

  return (
    <ScrollView style={{backgroundColor: 'pink'}}>
      {/* <View
        style={{
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          margin: 10,
        }}> */}
      {/* <Video
        width="560"
        height="315"
        src="https://www.youtube.com/embed/bdFJ4H3WL3Q"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></Video> */}
      {/* </View> */}

      <View>
        <View style={{flex: 1, backgroundColor: 'pink'}}>
          <Text style={{alignSelf: 'center', fontSize: 40, fontWeight: '500'}}>
            FORM
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#0490BF',
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
          }}>
          <View style={[styles.imageContainer]}>
            {pictureData(picture.uri) ? (
              <View>
                <TouchableOpacity onPress={createThreeButtonAlert}>
                  <ImageLoad style={styles.imageloadStyle} source={picture} />
                  <Image style={styles.profileiconimage} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.profileiconStyle}>
                <TouchableOpacity onPress={createThreeButtonAlert}>
                  <Icon
                    name="person-add-outline"
                    size={40}
                    color={'black'}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={{fontSize: 35, marginLeft: 20, marginTop: 10}}>
            Personal Details
          </Text>

          <Text style={styles.heading}>Name</Text>
          <CustomInput
            placeholder="Enter Your Name"
            value={formData.fname}
            onChangeText={(text) => {
              setFormData(Object.assign({}, formData, {fname: text}));
            }}
          />

          <Text style={styles.heading}>Date of Birth</Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 3,
              borderColor: 'black',
              height: 40,
              backgroundColor: 'white',
              borderRadius: 30,
              marginHorizontal: 20,
              fontSize: 16,
              marginTop: 5,
            }}>
            <Text style={styles.textStyle}>{lastdate}</Text>

            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                marginTop: 4,
                marginRight: 10,
                flex: 0.99,
              }}
              onPress={showDatePicker}>
              <Icon size={25} name="calendar-sharp" />

              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display={'inline'}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderRadius: 30,
              backgroundColor: 'white',
              paddingVertical: 10,
              marginTop: 30,
              marginHorizontal: 20,
            }}>
            <Text style={styles.heading}>Gender</Text>
            <CustomRadio
              label={'Gender'}
              selectedbtn={(text) => {
                console.log(text, 'text');
                setFormData(Object.assign({}, formData, {gender: text.label}));
              }}
            />
          </View>

          <Text style={styles.heading}>Phone</Text>
          <CustomInput
            keyboardType="numeric"
            placeholder="Enter Phone"
            value={formData.phone}
            onChangeText={(text) => {
              setFormData(Object.assign({}, formData, {phone: text}));
            }}
          />

          <Text style={styles.heading}>Country</Text>
          <CustomDropdown
            placeholder={'Select country'}
            name="country"
            onchange={(dropdownitem) => {
              console.log(dropdownitem, 'dropdown');
              setFormData(
                Object.assign({}, formData, {country: dropdownitem.value}),
              );
            }}
          />

          <Text style={{fontSize: 35, marginLeft: 20, marginTop: 50}}>
            Academic Details
          </Text>

          <Text style={styles.heading}>10th Board</Text>
          <CustomInput
            value={formData.highschool_board}
            onChangeText={(text) => {
              setFormData(
                Object.assign({}, formData, {highschool_board: text}),
              );
            }}
          />

          <Text style={styles.heading}>12th Board</Text>
          <CustomInput
            value={formData.intermidiate_board}
            onChangeText={(text) => {
              setFormData(
                Object.assign({}, formData, {intermidiate_board: text}),
              );
            }}
          />

          <Text style={styles.heading}>10th Aggregate Percentage</Text>
          <CustomInput
            placeholder="%"
            value={formData.highschool_percentage}
            onChangeText={(text) => {
              setFormData(
                Object.assign({}, formData, {highschool_percentage: text}),
              );
            }}
          />

          <Text style={styles.heading}>12th Aggregate Percentage</Text>
          <CustomInput
            placeholder="%"
            value={formData.intermidiate_percentage}
            onChangeText={(text) => {
              setFormData(
                Object.assign({}, formData, {intermidiate_percentage: text}),
              );
            }}
          />

          <View
            style={{
              marginHorizontal: 15,
              borderWidth: 3,
              borderRadius: 20,
              marginTop: 30,
              backgroundColor: 'white',
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 25,
                marginLeft: 10,
                fontWeight: '500',
                color: 'black',
              }}>
              Bachelors Course
            </Text>
            <MultiSelect
              hideTags
              items={Bachelors}
              uniqueKey="id"
              onSelectedItemsChange={onChangebachelors}
              selectedItems={selectedItems}
              selectText="Bachelors"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="black"
              tagBorderColor="red"
              tagTextColor="black"
              selectedItemTextColor="blue"
              selectedItemIconColor="blue"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: 'blue'}}
              submitButtonColor="green"
              submitButtonText="Submit"
            />
          </View>

          <View
            style={{
              marginHorizontal: 15,
              borderWidth: 3,
              borderRadius: 20,
              marginTop: 30,
              backgroundColor: 'white',
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 25,
                marginLeft: 10,
                fontWeight: '500',
                color: 'black',
              }}>
              Masters Course
            </Text>
            <MultiSelect
              hideTags
              items={Masters}
              uniqueKey="name"
              onSelectedItemsChange={onchangemasters}
              selectedItems={selectedItems}
              selectText="Masters"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="black"
              tagBorderColor="red"
              tagTextColor="black"
              selectedItemTextColor="blue"
              selectedItemIconColor="blue"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: 'blue'}}
              submitButtonColor="green"
              submitButtonText="SELECT"
            />
          </View>

          <View
            style={{
              marginHorizontal: 15,
              borderWidth: 3,
              borderRadius: 20,
              marginTop: 30,
              backgroundColor: 'white',
              padding: 15,
            }}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Do you like React Native?</Text>
          </View>

          <Text
            style={{
              fontSize: 25,
              marginLeft: 20,
              fontWeight: '500',
              color: 'black',
              marginTop: 30,
            }}>
            Custom Slider
          </Text>

          <View style={{marginVertical: 20, marginHorizontal: 20}}>
            <CustomSlider />
          </View>

          <View
            style={{
              marginHorizontal: 20,
              borderWidth: 3,
              borderRadius: 30,
              paddingVertical: 10,
              marginTop: 30,
              paddingHorizontal: 6,
              backgroundColor: 'white',
            }}>
            <FlatList
              data={formData.hobby}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.page}>
                    <View
                      style={{
                        flex: 0.8,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 0.7, backgroundColor: 'white'}}>
                        <Text style={styles.medi}>HOBBY {index + 1}</Text>
                        <TextInput
                          style={styles.textInput1}
                          placeholder="Enter hobby"
                          autoCapitalize="none"
                          value={item.name}
                          onChangeText={(text) => {
                            let custom = formData.hobby;
                            custom[index].name = text;
                            setFormData(
                              Object.assign({}, formData, {hobby: custom}),
                            );
                          }}></TextInput>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        paddingHorizontal: 10,
                        marginLeft: 100,
                        flex: 0.5,
                        alignItems: 'flex-end',
                      }}>
                      <View
                        style={{
                          flex: 0.5,
                          borderColor: 'black',
                          borderWidth: 3,
                          borderRadius: 30,
                          marginTop: 30,
                        }}>
                        {formData.hobby.length === index + 1 ? (
                          <TouchableOpacity
                            style={styles.button1}
                            onPress={() => addData(index, item)}>
                            <Text style={styles.medi1}>Add More</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.button2}
                            onPress={() => deleteData(index, item)}>
                            <Text style={styles.medi1}>Remove</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View
            style={{
              marginHorizontal: 15,
              borderWidth: 3,
              borderRadius: 20,
              marginTop: 20,
              backgroundColor: 'white',
              padding: 5,
            }}>
            <Text
              style={{
                fontSize: 25,
                marginLeft: 10,
                fontWeight: '500',
                color: 'black',
              }}>
              Choose Language
            </Text>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="name"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Choose Language"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="black"
              tagBorderColor="red"
              tagTextColor="black"
              selectedItemTextColor="blue"
              selectedItemIconColor="blue"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: 'blue'}}
              submitButtonColor="green"
              submitButtonText="SELECT"
            />
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => submit()}>
              <Text style={styles.buttonTitle}>Submit</Text>
            </TouchableOpacity>

            {shouldShow ? (
              <View style={{flex: 1, backgroundColor: 'white', marginTop: 20}}>
                <Text style={{fontSize: 20}}>{JSON.stringify(formData)}</Text>
              </View>
            ) : null}
          </View>
          {/* <Text>{JSON.stringify(formData)}</Text> */}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontWeight: '600',
    fontSize: 17,
    paddingLeft: 22,
    paddingTop: 18,
  },
  imageContainer: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: -20,
  },
  headings: {
    fontWeight: '500',
    fontSize: 17,
    paddingLeft: 22,
    paddingTop: 60,
  },
  textStyle: {
    flex: 0.95,
    fontSize: 17,
    fontWeight: '500',
    marginTop: 7,
    marginLeft: 8,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
  button: {
    backgroundColor: 'green',
    marginHorizontal: 20,
    borderRadius: 50,
    elevation: 10,
    marginTop: 50,
    height: 50,
    marginBottom: 30,
  },
  buttonTitle: {
    fontFamily: FONTS.NunitoBold,
    fontSize: 30,
    paddingTop: 5,
    alignSelf: 'center',
    borderRadius: 10,
    color: COLOR.WHITE,
  },
  imageloadStyle: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
    height: 100,
    width: 100,
    position: 'absolute',
  },
  profileiconStyle: {
    height: 100,
    width: 100,
    marginTop: 40,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
  },
  profileiconimage: {
    height: 30,
    width: 30,
    marginTop: 60,
    marginStart: 65,
  },
  textInput: {
    padding: 7,
    margin: '2%',
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 2,
    borderWidth: 1,
  },
  textInput1: {
    marginTop: 5,
    marginRight: 10,
    padding: 7,
    height: 40,
    borderRadius: 35,
    width: '220%',
    padding: 10,
    fontSize: 16,
    fontWeight: '400',
    borderWidth: 3,
  },
  view: {
    flex: 1,
  },
  main: {
    flex: 0.15,
    backgroundColor: '#0A4975',
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    borderRadius: 30,
    height: 40,
    width: 100,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 30,
    height: 40,
    width: 100,
  },

  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',

    alignSelf: 'center',
    marginTop: 15,
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  medi: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'black',
  },
  medi1: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'black',
  },
  buttonDisabled: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    width: '30%',
    marginTop: 20,
    marginLeft: 80,
  },

  buttonLabel: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
  },
});

export default App;
