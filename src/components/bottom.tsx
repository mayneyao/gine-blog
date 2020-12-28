import React from 'react';
import styled from 'styled-components';


const BottomWrapper = styled.div`
  margin: 1em auto;
  padding-bottom: 1em;
  max-width: 700px;
`;

const FlexSpan = styled.div`
  text-align: center;
`;

export const Bottom = () => {
  return (
    <BottomWrapper>
      {/* <Aphorisms /> */}
      <FlexSpan>
        {"Build with "}<a href="https://nextjs.org">nextjs</a>{" and ❤"}
      </FlexSpan>
      <FlexSpan>
        Copyright © Mayne
    </FlexSpan>
      <FlexSpan>
        Powered by <a href="https://github.com/mayneyao/gine-blog" > {" gine-blog "}</a>
      </FlexSpan>
    </BottomWrapper>
  );
}