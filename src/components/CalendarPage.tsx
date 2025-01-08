"use client";
import styled from "styled-components";
import Image from "next/image";
import Character from "@/../public/인사춘식.svg"; // 캐릭터 이미지 추가
import CalendarTitle from "./CalendarTitle";

type MonthData = Record<
  number,
  { daysInMonth: number; firstDayOfWeek: number }
>;

// 2025년 데이터
const calendarData2025: MonthData = {
  1: { daysInMonth: 31, firstDayOfWeek: 3 },
  2: { daysInMonth: 28, firstDayOfWeek: 6 },
  3: { daysInMonth: 31, firstDayOfWeek: 6 },
  4: { daysInMonth: 30, firstDayOfWeek: 2 },
  5: { daysInMonth: 31, firstDayOfWeek: 4 },
  6: { daysInMonth: 30, firstDayOfWeek: 0 },
  7: { daysInMonth: 31, firstDayOfWeek: 2 },
  8: { daysInMonth: 31, firstDayOfWeek: 5 },
  9: { daysInMonth: 30, firstDayOfWeek: 1 },
  10: { daysInMonth: 31, firstDayOfWeek: 3 },
  11: { daysInMonth: 30, firstDayOfWeek: 6 },
  12: { daysInMonth: 31, firstDayOfWeek: 1 },
};

interface CalendarPageProps {
  monthNumber: number; // 월 번호 (1 ~ 12)
}

export default function CalendarPage({ monthNumber }: CalendarPageProps) {
  const monthData = calendarData2025[monthNumber];
  const daysArray = Array.from(
    { length: monthData.daysInMonth },
    (_, i) => i + 1
  );

  return (
    <Container>
      <BottomBackground />

      {/* 캘린더 */}
      <CalendarContainer>
        <CalendarTitle text={`${monthNumber}월`} />

        {/* 요일 헤더 */}
        <WeekHeader>
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <Weekday key={index}>{day}</Weekday>
          ))}
        </WeekHeader>

        {/* 날짜 그리드 */}
        <DaysGrid>
          {/* 빈 칸 추가 (첫 번째 날 전의 요일 수) */}
          {Array.from({ length: monthData.firstDayOfWeek }).map((_, i) => (
            <EmptyDay key={`empty-${i}`} />
          ))}

          {/* 날짜 표시 */}
          {daysArray.map((day) => (
            <Day key={day}>{day}</Day>
          ))}
        </DaysGrid>
      </CalendarContainer>

      {/* 캐릭터 이미지 */}
      <CharacterContainer>
        <Image src={Character} alt="인사춘식" layout="responsive" />
      </CharacterContainer>
    </Container>
  );
}

// 스타일 정의 (반응형 적용)
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 40px;
  background-color: #fac03d;
`;

const BottomBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #996633;
  clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
`;

const CalendarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #ffe9a9;
  border-radius: 10px;
  padding: 30px 300px 30px 30px;
  width: calc(100% - 80px);
  height: calc(100% - 80px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px 10px;
  }

  @media (max-width: 480px) {
    padding: 15px 5px;
  }
`;

const WeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #a97443;
`;

const Weekday = styled.div`
  padding: 10px 0;
  font-family: var(--font-gumi-romance);
  font-size: 2.4rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const EmptyDay = styled.div`
  background: transparent;
`;

const Day = styled.div`
  border-radius: 5px;
  padding: 15px 0;
  text-align: center;
  color: #a97443;
  font-family: var(--font-gumi-romance);
  font-size: 2.4rem;
  font-weight: bold;

  &:hover {
    background: #fff;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const CharacterContainer = styled.div`
  position: absolute;
  bottom: 40px;
  right: 80px;
  width: 200px;
  height: auto;

  @media (max-width: 768px) {
    width: 130px;
  }
`;
