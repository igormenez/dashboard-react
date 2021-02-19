import React, {useMemo, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {Container, Content, Filters} from './styles'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import {gains} from '../../repositories/gains';
import {expenses} from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import listOfMonths from '../../utils/months'

interface IRouteParams {
  match:{
    params:{
      type: string
    }
  }
}

interface IData {
  id: string,
  description: string,
  amountFormatted: string,
  frequency: string,
  dateFormated: string,
  tagColor: string,
}

const List: React.FC<IRouteParams> = ({match}) => {

  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente','eventual'])
  const [data, setData] = useState<IData[]>([])
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() +1 )
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear()-1)

  const {type} = match.params;

  const pageData = useMemo(() =>{
    return type === 'entry-balance'?
       {
        title:'Entradas',
        lineColor: '#4E41F0',
        data: gains
      }
    :
      {
          title:'Saida',
          lineColor: '#E44C4E',
          data: expenses
      }
  },[type])

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    const {data} = pageData

    data.forEach(item => {
        const date = new Date(item.date);
        const year = date.getFullYear();

        if(!uniqueYears.includes(year)){
            uniqueYears.push(year)
       }
    });

    return uniqueYears.map(year => {
        return {
            value: year,
            label: year,
        }
    });
},[pageData]);


const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
        return {
            value: index + 1,
            label: month,
        }
    });
},[]);

const handleFrequencyClick = (frequency: string) => {
  const alreadySelected = selectedFrequency.findIndex(item => item === frequency)

  if(alreadySelected >= 0){
    const filtered = selectedFrequency.filter(item=> item !== frequency)
    setSelectedFrequency(filtered)
  }else{
    setSelectedFrequency((prev)=>[...prev,frequency])
  }
}

  useEffect(() =>{
    const{ data } = pageData
    const filteredData = data.filter(item=>{
      const date = new Date(item.date);
      const month = date.getMonth() +1;
      const year = date.getFullYear();

      return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
    });

    const formattedData = filteredData.map(item=>{
      return {
        id: uuidv4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormated: formatDate(item.date),
        tagColor: item.frequency === 'recorrente'? '#4E41F0':'#E44C4E',
      }
    })

    setData(formattedData);
  },[pageData, monthSelected, yearSelected, data.length, selectedFrequency]);

  const handleMonthSelected = (month: string) => {
      try {
          const parseMonth = Number(month);
          setMonthSelected(parseMonth);
      }
      catch{
          throw new Error('invalid month value. Is accept 0 - 24.')
      }
  }

  const handleYearSelected = (year: string) => {
      try {
          const parseYear = Number(year);
          setYearSelected(parseYear);
      }
      catch{
          throw new Error('invalid year value. Is accept integer numbers.')
      }
  }

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor} >
        <SelectInput options={months} onChange={(e)=> handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
        <SelectInput options={years} onChange={(e)=> handleYearSelected(e.target.value)}  defaultValue={yearSelected}/>
      </ContentHeader>

      <Filters>
        <button type="button" className={`tag-filter recurrent 
        ${selectedFrequency.includes('recorrente') && 'tag-actived'}`} onClick={()=>handleFrequencyClick('recorrente')}>Recorrentes</button>
        <button type="button" className={`tag-filter recurrent eventual
        ${selectedFrequency.includes('eventual') && 'tag-actived'}`} onClick={()=>handleFrequencyClick('eventual')}>Eventuais</button>
      </Filters>

      <Content>
        {
          data.map(item=>(
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dateFormated}
              amount={item.amountFormatted}
            />
          ))
        }

      </Content>
    </Container>
  )
}

export default List;