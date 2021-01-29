import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import {Container} from './style'

const Dashboard: React.FC = () => {

  const options = [
    {value: 'Igor',label: 'Igor'},
    {value: 'Arthur',label: 'Arthur'},
    {value: 'Thiago',label: 'Thiago'}
  ];

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B" >
        <SelectInput options={options} onChange={()=>{}}/>
      </ContentHeader>
    </Container>
  )
}

export default Dashboard;