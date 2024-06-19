import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { FONTS, MAIN_STYLE, TYPOGRAPHY, UI } from '../../stylesheets/theme';
import { useFocusEffect } from '@react-navigation/native';
import { GoBackTop } from '../components/molecules';
import ActivitiesListView from '../components/molecules/ActivitiesListView';
import Loader from '../components/atoms/Loader'
import { CLOUD } from '../../services/cloud/dataService';

const ActivitiesList = ({ navigation, route }) => {
  const { token } = route.params;
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsisLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setActivities(await CLOUD.getUserFromToken(token));
        setIsisLoading(false);
      } catch (error) {
        setError(error);
        setIsisLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <GoBackTop action={() => navigation.goBack()} />
        <ScrollView>
          <View style={[UI.distances, {marginBottom:300}]}>
            <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl }}>Ecco la lista di tutte le attività! 🕹️</Text>
            <Text style={{ fontFamily: FONTS.regular, marginTop: 20, fontSize: TYPOGRAPHY.text.l }}>Puoi decidere da qua quale tra le attività già create vuoi <Text style={MAIN_STYLE.textBlueHighlight}>assegnare</Text> ai tuoi pazienti. Inoltre, Se ti va, potresti anche <Text style={MAIN_STYLE.textBlueHighlight}>testare</Text> il loro funzionamento. Saremo lieti di adattare l'attività in modo che tu possa <Text style={MAIN_STYLE.textBlueHighlight}>provarla senza problemi</Text></Text>
            {isLoading 
              ? <Loader/> 
              : 
                <ActivitiesListView
                  activitiesList={activities.games}
                  token={token}
                  onStartGame={(game) => navigation.navigate('GameMain', { activity: game, token: token })}
                  onOpenDoc={(doc) => navigation.navigate('Documentations', { doc })} />
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ActivitiesList;
