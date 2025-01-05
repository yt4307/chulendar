"use client";
import styled from "styled-components";

export default function Home() {
  return <Container></Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
  /* 그라디언트 방향: 위에서 아래로 */
  background: linear-gradient(to bottom, #fac03d 80%, #996633 20%);
`;
