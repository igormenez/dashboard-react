import React from 'react';

import {Container} from './styles'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

const List: React.FC = () => {

  const options = [
    {value: 'Igor',label: 'Igor'},
    {value: 'Arthur',label: 'Arthur'},
    {value: 'Thiago',label: 'Thiago'}
  ];
  return (
    <Container>
      <ContentHeader title="Lista" lineColor="#E44C4E" >
        <SelectInput options={options}/>
      </ContentHeader>
    </Container>
  )
}

export default List;