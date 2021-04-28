import { RouteProp } from '@react-navigation/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BamerProfile } from '../../types';

type RootStackParamList = {
  Profile: BamerProfile;
};

type Props = {
  route: RouteProp<RootStackParamList, 'Profile'>;
};

export const Profile = ({ route: { params } }: Props) => {
  const { name, email, phoneNumber, githubHandle } = params;

  const [repos, setRepos] = useState<
    { link: string; nbStars: number; name: string }[]
  >();

  useEffect(() => {
    // fetch the github repositories of the candidate
    axios
      .get('https://github/api/' + githubHandle + '/repos/')
      .then(res => setRepos(res.data.repos));
  }, []);

  return (
    <View>
      <Text>Detailed Profile</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone Number: {phoneNumber}</Text>

      <Text>Github handle: {githubHandle}</Text>
      <Text>Number of repositories: {repos?.length}</Text>
    </View>
  );
};
