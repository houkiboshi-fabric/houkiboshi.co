import styled from 'styled-components';

export const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const Item = styled.li`
  display: inline-block;
  &:before {
    content: '›';
    margin-left: 0.3em;
    margin-right: 0.3em;
  }
  &:first-child:before {
    content: '';
    margin: 0;
  }
`;

export const CurrentItem = styled.li`
  display: inline-block;
  &:before {
    content: '›';
    margin-left: 0.3em;
    margin-right: 0.3em;
  }
  background-color: transparent;
`;
