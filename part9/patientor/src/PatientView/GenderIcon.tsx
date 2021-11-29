import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';

const GenderIcon = ({ gender }: {gender: Gender}): JSX.Element => {
    switch (gender) {
      case "female":
    return (
      <Icon name="venus" />
    );
  case "male":
    return (
      <Icon name="mars" />
    );
  case "other":
    return (
      <Icon name="genderless" />
    );
  default:
    return (
      <Icon name="question" />
    );
  }
};

export default GenderIcon;