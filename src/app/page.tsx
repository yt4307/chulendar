"use client";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import CoverPage from "@/components/CoverPage";
import CalendarPage from "@/components/CalendarPage";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지 상태
  const totalPages: number = 13; // 전체 페이지 수
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  // 스크롤 이벤트 핸들러 (쓰로틀링 적용)
  const handleScroll = useMemo(
    () =>
      throttle((e: WheelEvent) => {
        if (e.deltaY > 0 && currentPage < totalPages - 1) {
          setCurrentPage((prev) => prev + 1);
        } else if (e.deltaY < 0 && currentPage > 0) {
          setCurrentPage((prev) => prev - 1);
        }
      }, 1000),
    [currentPage, totalPages]
  );

  // 키보드 방향키 이벤트 핸들러
  const handleKeydown = useMemo(
    () => (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentPage < totalPages - 1) {
          setCurrentPage((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentPage > 0) {
          setCurrentPage((prev) => prev - 1);
        }
      }
    },
    [currentPage, totalPages]
  );

  // 모바일 스와이프 이벤트 핸들러
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const deltaX = touchStartX - touchEndX;

      if (deltaX > 50 && currentPage < totalPages - 1) {
        // 왼쪽으로 스와이프 → 다음 페이지
        setCurrentPage((prev) => prev + 1);
      } else if (deltaX < -50 && currentPage > 0) {
        // 오른쪽으로 스와이프 → 이전 페이지
        setCurrentPage((prev) => prev - 1);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleScroll, handleKeydown]);

  return (
    <Wrapper
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <PagesContainer $currentPage={currentPage}>
        <PageWrapper>
          <CoverPage />
        </PageWrapper>
        {months.map((month) => (
          <PageWrapper key={month}>
            <CalendarPage monthNumber={month} />
          </PageWrapper>
        ))}
      </PagesContainer>
    </Wrapper>
  );
}

// Wrapper 스타일
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

interface PagesContainerProps {
  $currentPage: number; // "$"를 붙여 DOM으로 전달되지 않도록 설정
}

const PagesContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$currentPage", // DOM에 전달 방지
})<PagesContainerProps>`
  display: flex;
  flex-direction: row;
  width: 1300vw; /* 페이지 수에 맞게 설정 (13 페이지) */
  height: 100vh;
  transition: transform 0.8s ease-in-out; /* 부드러운 전환 효과 */

  /* $currentPage 값에 따라 페이지 이동 */
  transform: ${({ $currentPage }) => `translateX(-${$currentPage * 100}vw)`};
`;

// 페이지 래퍼 스타일
const PageWrapper = styled.div`
  flex: 0 0 100vw;
  height: 100vh;
`;
