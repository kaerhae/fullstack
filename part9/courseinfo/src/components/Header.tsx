import React from 'react';
import { IHeader } from '../types';

const Header = (props: IHeader): JSX.Element => (
  <div>
    <h1>{props.name}</h1>
  </div>
)

export default Header