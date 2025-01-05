"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Logo from "@/../public/2025_calendar.svg";
import 엎은춘식 from "@/../public/엎은춘식.svg";
import 고구미 from "@/../public/고구미.svg";

// 고구미 개수
const GOGUMI_COUNT = 10;

// 고구미 스타일 컴포넌트
interface GogumiProps {
  bottom: string;
  left: string;
  size: string;
  angle: string;
}

export default function CoverPage() {
  const [positions, setPositions] = useState<GogumiProps[]>([]);

  // 클라이언트 사이드에서 랜덤 위치, 크기, 각도 생성
  useEffect(() => {
    const generateRandomPositions = () => {
      return Array.from({ length: GOGUMI_COUNT }).map(() => ({
        bottom: `${Math.random() * 60}vh`, // 화면 아래쪽에서 60% 이내
        left: `${Math.random() * 90}vw`, // 화면 왼쪽에서 90% 이내
        size: `${Math.random() * 50 + 50}px`, // 최소 50px ~ 최대 100px
        angle: `${Math.random() * 360}deg`, // 0 ~ 360도 랜덤 회전
      }));
    };
    setPositions(generateRandomPositions());
  }, []);

  return (
    <Container>
      {/* 로고 */}
      <LogoContainer>
        <Image src={Logo} layout="responsive" alt={"Logo"} />
      </LogoContainer>

      {/* 춘식 */}
      <ChunsikContainer>
        <Image
          src={엎은춘식}
          layout="responsive"
          alt={"엎어진 춘식이 이미지"}
        />
      </ChunsikContainer>

      {/* 고구미 여러 개 */}
      {positions.map((pos, index) => (
        <Gogumi
          key={index}
          bottom={pos.bottom}
          left={pos.left}
          size={pos.size}
          angle={pos.angle}
        />
      ))}
    </Container>
  );
}

const Gogumi = styled.div<GogumiProps>`
  position: absolute;
  bottom: ${({ bottom }) => bottom}; /* 랜덤 bottom 값 적용 */
  left: ${({ left }) => left}; /* 랜덤 left 값 적용 */
  width: ${({ size }) => size}; /* 랜덤 크기 적용 */
  height: ${({ size }) => size}; /* 정사각형으로 설정 */
  transform: rotate(${({ angle }) => angle}); /* 랜덤 각도 적용 */

  /* 고구미 이미지 */
  background-image: url(${고구미.src});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #fac03d 80%, #996633 20%);
`;

const LogoContainer = styled.div`
  width: 95%;
  margin-top: 5vh;
`;

const ChunsikContainer = styled.div`
  position: absolute;
  right: 50%;
  bottom: 10%;
  transform: translate(70%, 10%);
  width: clamp(100px, 50vw, 700px);
`;
