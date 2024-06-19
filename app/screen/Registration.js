import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  BUTTON,
  COLORS,
  FONTS,
  MAIN_STYLE,
  TEXT,
  TYPOGRAPHY,
} from "../../stylesheets/theme";
import { ButtonComponent } from "../components/atoms";
import { GoBackTop, TextInputComponent } from "../components/molecules";
import { generateToken } from "../../utils/utils";
import DatePicker from "../components/molecules/DatePIcker";
import { CLOUD } from "../../services/cloud/dataService";
import { LOCAL } from "../../services/disk/dataService";


const Registration = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  // patient data
  const token = generateToken();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cf, setCf] = useState(null);
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState(null);
  const [interests, setInterests] = useState([]);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const allStep = 3;
  
  const handleNameChange = useCallback((name) => {
    setName(name);
  }, []);

  const handleCfChange = useCallback((cf) => {
    setCf(cf);
  }, []);

  const handleDateChange = useCallback((date) => {
    setDate(date);
  }, []);

  const handleDescriptionChange = useCallback((description) => {
    setDescription(description);
  }, []);

  const handleInterestChange = useCallback((interest) => {
    setInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        return prevInterests.filter(item => item !== interest); // Deseleziona l'interesse
      } else {
        return [...prevInterests, interest]; // Seleziona l'interesse
      }
    });
  }, []);

  const handleSurnameChange = useCallback((surname) => {
    setSurname(surname);
  }, []);


  const signIn = async () => {
    const cloudUser = {
      token,
      interests,
      games: [],
    }
    const localUser = {
      token,
      name,
      surname,
      cf,
      birthdate: date ? date.toISOString().split('T')[0] : null,
      info: {
        description,
        interests,
      },
      games: [],
    };
    await CLOUD.newDoc("patients", token,  cloudUser);
    await LOCAL.writeLocalData(token, localUser)
    navigation.navigate("Inside");

  };

  const renderNameSurname = () => {
    return (
      <View>
        <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>Ciao io sono <Text style={MAIN_STYLE.textHighlight}>WithMe</Text>? 🙂</Text>
          <Text style={{ fontFamily: FONTS.regular, marginTop: 10, fontSize: 16 }}>Che ne dici se iniziamo a conoscerci meglio? <Text style={MAIN_STYLE.textHighlight}>Prentiamoci</Text>, tu sei...</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInputComponent
            icon={{ name: "person-circle-outline", size: 24 }}
            placeholder={name || "Nome"}
            secureText={false}
            fontSize={TYPOGRAPHY.text.l}
            onTextChange={handleNameChange}
            color={{
              normal: COLORS.light.third,
              focus: COLORS.main.first,
            }}
          />
          <TextInputComponent
            icon={{ name: "person-circle-outline", size: 24 }}
            placeholder={surname || "Cognome"}
            onTextChange={handleSurnameChange}
            secureText={false}
            fontSize={TYPOGRAPHY.text.l}
            color={{ normal: COLORS.light.third, focus: COLORS.main.first }}
          />
          <TextInputComponent
            icon={{ name: "barcode-sharp", size: 24 }}
            placeholder={cf || "Codice Fiscale (facoltativo)"}
            onTextChange={handleCfChange}
            secureText={false}
            fontSize={TYPOGRAPHY.text.l}
            color={{ normal: COLORS.light.third, focus: COLORS.main.first }}
          />
          <DatePicker onDateSelect={handleDateChange} currentDate={date || null} label="Quando sei nato?" placeholder="Clicca per scelgiere la data di nascita"/>
        </View>
      </View>
    );
  };

  const renderInfo = () => {
    return (
      <View>
        <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>Ciao <Text style={MAIN_STYLE.textHighlight}>{name}</Text>! {"\n"}Dicci qualcosa in più su di te...🖋️</Text>
          <Text style={{ fontFamily: FONTS.regular, marginTop: 10, fontSize: 16 }}>Tranquillo, queste informazioni saranno presenti <Text style={MAIN_STYLE.textHighlight}>solo sul tuo dispositivo</Text> e <Text style={MAIN_STYLE.textHighlight}>non saranno condivise</Text> in nessun'altro posto.</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInputComponent
            icon={{ name: "person-circle-outline", size: 24 }}
            placeholder={description || "Descrizione"}
            onTextChange={handleDescriptionChange}
            secureText={false}
            fontSize={TYPOGRAPHY.text.l}
            color={{ normal: COLORS.light.third, focus: COLORS.main.first }}
          />
        </View>
      </View>
    );
  };

  const renderInterests = () => {
    const listInterests = ["Musica", "Giochi", "Supereroi", "Matite"];
  
    const filteredInterests = listInterests.filter(interest =>
      interest.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <View>
        <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>A noi piace la <Text style={MAIN_STYLE.textHighlight}>montagna</Text>! ⛰️ {"\n"}A te che cosa piace?</Text>
          <Text style={{ fontFamily: FONTS.regular, marginTop: 10, fontSize: 16 }}>Scegli <Text style={MAIN_STYLE.textHighlight}>alcuni interessi</Text> tra quelli elencati sotto. Se non trovi quello adatto al tuo caso puoi sempre <Text style={MAIN_STYLE.textHighlight}>aggiungerne uno nuovo</Text> a tuo piacimento.</Text>
        </View>
        <View style={{padding:20}}>
          <TextInputComponent
              icon={{ name: "search", size: 24 }}
              placeholder={searchText || "Cerca Interessi..."}
              onTextChange={(text) => setSearchText(text)}
              secureText={false}
              fontSize={TYPOGRAPHY.text.l}
              color={{ normal: COLORS.light.third, focus: COLORS.main.first }}
            />
        </View>
        <View style={{paddingHorizontal:20, flex:1, width:"100%"}}>
          <Text style={{fontFamily:FONTS.bold}}>Selezionati:</Text>
          <View style={{flexDirection:"row", flexWrap: "wrap",borderBottomWidth:1, borderColor:COLORS.light.third}}>
          {
            interests.length > 0 ?
            interests.map((interest,index) => (
            <TouchableOpacity
            key={index}
                  style={{
                    backgroundColor: interests.includes(interest) ? COLORS.main.first : COLORS.light.first,
                    padding: 10,
                    margin: 5,
                    marginBottom: 20,
                    borderRadius: 10,
                  }}
                  onPress={() => handleInterestChange(interest)}
                >
                <Text style={{ color: interests.includes(interest) ? COLORS.light.first : COLORS.dark.first}}>{interest}</Text>
              </TouchableOpacity>)) : <Text style={{backgroundColor:COLORS.light.second, width:"100%", paddingVertical:5, paddingHorizontal:10, opacity:0.4, marginTop:5}}>Nessun Interesse Selezionato</Text>
          }
         </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={{flexDirection:"row"}}>
            {filteredInterests.length === 0 
              ? <TouchableOpacity
                  style={{
                    backgroundColor: interests.includes(searchText) ? COLORS.main.first : COLORS.light.first,
                    padding: 10,
                    margin: 5,
                    borderRadius: 100,
                  }}
                  onPress={() => handleInterestChange(searchText)}
                >
                <Text style={{ color: interests.includes(searchText) ? COLORS.light.first : COLORS.dark.first}}>{searchText}</Text>
              </TouchableOpacity>
            : filteredInterests.map((interest, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: interests.includes(interest) ? COLORS.main.first : COLORS.light.first,
                shadowColor: "#212121",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                padding: 10,
                margin: 5,
                borderRadius: 100,

              }}
              onPress={() => handleInterestChange(interest)}
            >
              <Text style={{ color: interests.includes(interest) ? COLORS.light.first : COLORS.dark.first}}>{interest}</Text>
            </TouchableOpacity>
          ))}
           </View>
        </View>
      </View>
    );
  };

  const renderGenCode = () => {
    return (
      <View>
        <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>Un'ultima cosa molto <Text style={MAIN_STYLE.textHighlight}>IMPORTANTE</Text> ☝️</Text>
          <Text style={{ fontFamily: FONTS.regular, marginTop: 10, fontSize: 16 }}>Abbiamo generato un <Text style={MAIN_STYLE.textHighlight}>codice identificativo</Text> solo per te!</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.code}>
            <Text
              style={{ fontFamily: FONTS.bold, fontSize: 50, letterSpacing: 10 }}
            >
              {token}
            </Text>
          </View>
          <Text style={{textAlign:"center", fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.xl}}>Non perdere quesro codice perchè potrebbe essereti utile in futuro.</Text>
        </View>
      </View>
    );
  };

  const areInputsFilled = () => {
    switch (step) {
      case 0:
        return name !== "" && surname !== "";
      case 1:
        return description;
      case 2:
        return interests.length > 0;
      case 3:
        return token; // Controlla se il token è stato generato
      default:
        return true;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GoBackTop
        action={() =>
          step === 0 ? navigation.goBack() : setStep(step - 1)
        }
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="never"
      >
          {step === 0 ? renderNameSurname() : null}
          {step === 1 ? renderInfo() : null}
          {step === 2 ? renderInterests() : null}
          {step === 3 ? renderGenCode() : null}


          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.main.second}
              style={{ marginTop: 10 }}
            />
          ) : (
            <View style={{ marginTop: 20, marginBottom: 20, padding: 20 }}>
              <ButtonComponent
                text={step < allStep ? "Avanti" : "Registrati"}
                buttonStyle={BUTTON.buttonFullMain}
                textStyle={TEXT.light1}
                icon={{
                  name:
                    step < allStep
                      ? "arrow-forward-circle-outline"
                      : "checkmark-circle-sharp",
                  color: COLORS.light.first,
                  size: 25,
                }}
                disabled={!areInputsFilled()}
                action={() => (step < allStep ? setStep(step + 1) : signIn())}
              />
              {step > 0 ? (
                <ButtonComponent
                  text="Indietro"
                  buttonStyle={BUTTON.buttonOutlineMain}
                  textStyle={TEXT.main1}
                  icon={{
                    name: "arrow-back-circle-outline",
                    color: COLORS.main.first,
                    size: 25,
                  }}
                  action={() => setStep(step - 1)}
                />
              ) : null}
            </View>
          )}
      </ScrollView>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
  },
  code: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    backgroundColor: "#eee",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
});
