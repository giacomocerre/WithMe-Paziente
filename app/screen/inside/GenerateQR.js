import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView } from "react-native";
import { LOCAL } from "../../../services/disk/dataService";
import QRCode from "react-native-qrcode-svg";
import { BUTTON, COLORS, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from "../../../stylesheets/theme";
import { shareAsync } from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import { ButtonComponent } from "../../components/atoms";
import { GoBackTop } from "../../components/molecules";

const GenerateQR = ({ navigation, route }) => {
  const { token } = route.params;
  const [userData, setUserData] = useState(null);
  const [qrCodeData, setQRCodeData] = useState(null);
  const [isReady, setIsReady] = useState(false); // Nuovo stato per tracciare se il componente è pronto
  const viewRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await LOCAL.readLocalData(token);
      setUserData(data);
    };

    getUserData();
  }, [token]);

  useEffect(() => {
    if (userData) {
      setIsReady(true);
    }
  }, [userData]);

  const generateQRCode = () => {
    if (userData) {
      const qrData = JSON.stringify(userData);
      setQRCodeData(qrData);
    }
  };

  const shareQRCode = async () => {
    try {
      if (!qrCodeData) {
        throw new Error("Nessun codice QR generato");
      }
      // Assicurati che il componente sia stato renderizzato prima di catturareRef
      if (isReady) {
        const uri = await captureRef(viewRef.current, {
          format: "jpg",
          quality: 0.9,
        });
        await shareAsync(uri)
        // Codice rimasto invariato
      } else {
        console.warn("Il componente non è ancora pronto per essere catturato.");
      }

    } catch (error) {
      console.error("Errore durante la condivisione del codice QR:", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GoBackTop action={() => navigation.goBack()} />
      <ScrollView style={UI.distances}>
        {
          userData ? 
          <View>
            {!qrCodeData &&
            <View>
              <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl,marginTop:20, marginBottom:20}}><Text style={MAIN_STYLE.textHighlight}>Condividi</Text> il tuo profilo con la clinica!</Text>
              <Text style={{marginBottom:20, fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.text.l}}>Ehi! Se premi il bottone qui sotto, puoi creare un'immagine di un <Text style={MAIN_STYLE.textHighlight}>QR Code</Text>.</Text>
              <Text style={{marginBottom:10, fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.text.l}}>Prima di venirci a trovare, puoi decidere se:</Text>
              <Text style={{marginBottom:0, fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.text.l}}>
                <Text style={MAIN_STYLE.textHighlight}>1. Mostrarla</Text> direttamente quando arrivi{"\n"}
                <Text style={MAIN_STYLE.textHighlight}>2. Inviarla </Text> prima tramite email o altro.{"\n"}
              </Text>
              <Text style={{marginBottom:20, fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.l}}>Scegli tu!</Text>
              <ButtonComponent text="Genera QR Code" action={generateQRCode} buttonStyle={BUTTON.buttonFullMain} textStyle={TEXT.light1} icon={{name:"qr-code", size:20, color:COLORS.light.first}}/>
            </View>}
            {qrCodeData && (
              <View>
                <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl,marginTop:0, marginBottom:0}}>Ecco! Hai generato il tuo <Text style={MAIN_STYLE.textHighlight}>QR Code</Text></Text>
                <View style={{ alignItems: "center", marginTop: 0, padding:20, backgroundColor:"#f6f6f6" }} ref={viewRef} >
                  <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.xl}}>Codice QR dei dati del paziente:</Text>
                  <Text style={[MAIN_STYLE.textHighlight, {fontSize:TYPOGRAPHY.text.xl, marginBottom:10}]}>{userData.name} {userData.surname}</Text>
                  <QRCode value={qrCodeData} size={300} />
                  <View style={{backgroundColor: COLORS.main.first, paddingHorizontal:10, paddingVertical:5, marginTop:5, borderRadius:100}}>
                    <Text style={{fontSize:TYPOGRAPHY.text.xl, color:COLORS.light.first}}>{userData.token}</Text>
                  </View>
                </View>
                <ButtonComponent text="Condividi QR CODE" icon={{name:"share-social", size:20, color:COLORS.light.first}}action={shareQRCode} buttonStyle={BUTTON.buttonFullMain} textStyle={TEXT.light1} />
              </View>
    
             )} 
          </View>
        : null} 
      </ScrollView>
    </View>
  );
};

export default GenerateQR;
