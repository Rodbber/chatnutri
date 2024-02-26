import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'

import Layout from '../../layout'
import TextHeader from '../../../components/TextHeader'
import logo from '../../../assets/images/ChatNutri_logo.png';
import Theme from '../../../constants/Theme';
import { ApiManager } from '../../api/ApiManager';

import * as SecureStore from 'expo-secure-store';

import Meansures from './Measures';
import NameEmail from './NameEmail';

const HeaderContent = () => {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={logo} />
      <TextHeader text={'Meu perfil'} />
    </View>
  )
}

const PlanContent = ({ props }) => {
  return (
    <View style={styles.containerPlan}>
      <Text style={styles.textPlan}>Plano</Text>
      <View>
        <TextInput
          style={styles.planInput}
          placeholder={''}
          placeholderTextColor={'#fff'}
          onChangeText={(val) => props.setPlan({ ...props.plan, planName: val })}
          editable={false}
        />
      </View>
    </View>
  )
}

const Content = () => {
  const [form, setForm] = useState({
    id: null,
    name: null,
    email: null,
  })

  const [plan, setPlan] = useState({ userID: null, planID: null, planName: '' })
  useEffect(() => {
    const token = SecureStore.getItemAsync('token');
    token.then((token) => {
      ApiManager.get('users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(r => {
          setForm({ id: r.data.id, email: r.data.email, name: r.data.name })
        })
    })
  }, []);


  return (
    <View style={styles.container}>
      <NameEmail showform={form} />
      <View>
        {/* Edit Plan */}
        <PlanContent props={{ plan, setPlan }} />
      </View>
      <View style={{marginTop: '5%'}}>
        <Meansures />
      </View>
    </View>
  )
}

const EditProfile = () => {
  return (
    <Layout content={Content()} headerContent={HeaderContent()} />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '2%',
  },
  logo: {
    width: 82,
    height: 94.5,
  },
  headerContainer: {
    alignItems: 'center',
  },
  constainerText: {
    marginTop: '10%',
    alignItems: 'center',
  },
  textName: {
    color: Theme.colors.lightBrown,
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  textEmail: {
    color: 'white',
    fontSize: 16,
  },
  containerPlan: {
    marginTop: '10%',
    borderRadius: 20,
    backgroundColor: Theme.colors.secondary,
    width: '100%',
    height: 120,
    alignItems: 'center',
    paddingVertical: '5%',
  },
  textPlan: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: '2%',
  },
  planInput: {
    width: 200,
    height: 40,
    borderRadius: 30,
    paddingHorizontal: '5%',
    backgroundColor: '#B51A32',
  }
})

export default EditProfile


