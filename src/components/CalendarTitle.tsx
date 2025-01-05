"use client";
import styled from "styled-components";

interface CalendarTitleProps {
  text: string; // 타이틀에 표시할 텍스트
}

export default function CalendarTitle({ text }: CalendarTitleProps) {
  return (
    <TitleContainer>
      <TitleBorder>{text}</TitleBorder>
      <TitleBase>{text}</TitleBase>
      <TitleBottom>{text}</TitleBottom>
    </TitleContainer>
  );
}

// 스타일 정의
const TitleContainer = styled.div`
  position: relative;
  height: 7vw;
  margin-bottom: 40px;
`;

const TitleBorder = styled.h1`
  position: absolute;
  font-size: 7vw;
  font-family: var(--font-gumi-romance);
  -webkit-text-stroke: 8px white;
`;

const TitleBase = styled.h1`
  position: absolute;
  color: #fac03d;
  font-size: 7vw;
  font-family: var(--font-gumi-romance);
`;

const TitleBottom = styled.h1`
  position: absolute;
  color: #a97443;
  font-size: 7vw;
  font-family: var(--font-gumi-romance);
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
`;
