import React, {useMemo} from 'react';

import {Container, Content, Filters} from './styles'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

interface IRouteParams {
  match:{
    params:{
      type: string
    }
  }
}

const List: React.FC<IRouteParams> = ({match}) => {

  const {type} = match.params;

  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas' : 'Saídas'
  },[type]);

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
  },[type]);

  const months = [
    {value: 7,label: 'Julho'},
    {value: 8,label: 'Agosto'},
    {value: 9,label: 'Setembro'}
  ];

  const years = [
    {value: 2020,label: 2020},
    {value: 2019,label: 2019},
    {value: 2018,label: 2018}
  ];
  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor} >
        <SelectInput options={months}/>
        <SelectInput options={years}/>
      </ContentHeader>

      <Filters>
        <button type="button" className="tag-filter recurrent">Recorrentes</button>
        <button type="button" className="tag-filter eventual">Eventuais</button>
      </Filters>

      <Content>
        <HistoryFinanceCard

          tagColor="#E44C4E"
          title="Conta de luz"
          subtitle="25/02/2021"
          amount="R$ 130"
        />

      </Content>
    </Container>
  )
}

export default List;