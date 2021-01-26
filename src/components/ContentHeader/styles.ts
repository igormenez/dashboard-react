import styled from 'styled-components';

interface IContainerProps {
    lineColor: string;
}

export const Container = styled.div`
    width:100%;
    dispaly:flex;
    justify-content: space-between;
    margin-bottom:25px;

`;

export const Title = styled.div<IContainerProps>`
    >h1{
        color: ${props=>props.theme.colors.white}
    }
    &::after{
        content:'';
        display: block;
        width: 55px;
        border-bottom: 10px solid ${props=>props.lineColor}
    }
`;

export const Controllers = styled.div`
    float:right;
    display:flex;
    position: relative;
    bottom:45px;
`;