import React, { useEffect, useState } from "react";
import styled from "styled-components";

const GridTable = styled.div`
  width: 100%;
  margin: 50px auto;
`;
const Head = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  margin-bottom: 30px;
  font-weight: 500;
`;
const Body = styled.div``;
const EachItem = styled.div`
  margin-bottom: 50px;
`;
const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  border: 1px solid #333;
  position: relative;
  height: 70px;
  align-items: center;
`;
const Arrow = styled.div`
  border: solid #45d09e;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  position: absolute;
  right: 40px;
  width: 10px;
  height: 10px;
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  border: 1px solid #333;
  border-top: none;
  height: 400px;
  padding: 5vh;
  display: none;
`;
const Intro = styled.div`
  grid-column: 1/5;
  grid-row: 1/2;
`;
const Issuer = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
`;
const IssuerWeb = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
`;
const StartDate = styled.div`
  grid-column: 1/2;
  grid-row: 3/4;
`;
const Value = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
`;
const Address = styled.div`
  grid-column: 3/4;
  grid-row: 3/4;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Risk = styled.div`
  grid-column: 4/5;
  grid-row: 3/4;
`;
const Title = styled.div`
  font-weight: bold;
  margin: 10px;
  margin-bottom: 20px;
`;
const Content = styled.div`
  margin: 10px;
  color: #2e8b69;
  line-height: 24px;
`;

function Table() {
  const [apiData, SetApiData] = useState();
  let toggle = false;

  function getApiData() {
    fetch(
      "https://us-central1-dapp-pocket.cloudfunctions.net/cappuuApp/projects",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer c46da20b-f2cc-4e69-85c4-20d83c532abe`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("Success:", response);
        SetApiData(response.data.en);
      });
  }

  useEffect(() => {
    getApiData();
  }, []);

  function showInfo(element) {
    if (toggle === false) {
      document.getElementById(`arrow${element}`).classList.add("ArrowUp");
      document.getElementById(`wrapper${element}`).classList.add("SpreadTable");
      toggle = true;
    } else {
      document.getElementById(`arrow${element}`).classList.remove("ArrowUp");
      document
        .getElementById(`wrapper${element}`)
        .classList.remove("SpreadTable");
      toggle = false;
    }
  }

  return (
    <>
      <GridTable>
        <Head>
          <div>Name</div>
          <div>Type</div>
          <div>Flexible</div>
          <div>Minimum</div>
          <div>APY</div>
        </Head>
        <Body>
          {apiData &&
            apiData.map((element) => {
              console.log(element);
              return (
                <EachItem>
                  <Item key={element.name}>
                    <div>{element.name}</div>
                    <div>{element.type}</div>
                    <div>{element.period ? element.period : "Flexible"}</div>
                    <div>100 USDC</div>
                    <div>{element.apr}%</div>
                    <Arrow
                      onClick={() => showInfo(element.name)}
                      id={`arrow${element.name}`}
                    ></Arrow>
                  </Item>

                  <Wrapper id={`wrapper${element.name}`}>
                    <Intro>
                      <Title>Introduction</Title>
                      <Content>{element.introduction}</Content>
                    </Intro>
                    <Issuer>
                      <Title>Issuer</Title>
                      <Content>{element.issuer}</Content>
                    </Issuer>
                    <IssuerWeb>
                      <Title>Issuer Website</Title>
                      <Content>{element.websiteUrl}</Content>
                    </IssuerWeb>
                    <StartDate>
                      <Title>Start Date</Title>
                      <Content>
                        {element.startDate ? element.startDate : "-"}
                      </Content>
                    </StartDate>
                    <Value>
                      <Title>Total Value Locked</Title>
                      <Content>{element.volumn}</Content>
                    </Value>
                    <Address>
                      <Title>Contract Address</Title>
                      <Content>
                        {element.contractAddress
                          ? element.contractAddress
                          : "-"}
                      </Content>
                    </Address>
                    <Risk>
                      <Title>Risk Level</Title>
                      <Content>{element.riskLevel}</Content>
                    </Risk>
                  </Wrapper>
                </EachItem>
              );
            })}
        </Body>
      </GridTable>
    </>
  );
}
export default Table;
