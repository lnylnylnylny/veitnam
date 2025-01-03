import React, { useState } from "react";
import { useDarkMode } from "./DarkModeContext"; // 다크모드 컨텍스트 가져오기

const Sidebar = ({ selectedInput }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null); // Hover 상태 관리
  const { isDarkTheme } = useDarkMode(); // 다크모드 상태 가져오기

  const pdfLinks = {
    "시나리오 시뮬레이션의 유사 특허들을 보여줘": [
      {
        name: "시나리오를 이용한 시뮬레이션 방법 및 시스템.pdf",
        url: "/pdf/시나리오를 이용한 시뮬레이션 방법 및 시스템.pdf",
        image: "/floor_plan/s1.png",
      },
      {
        name: "주행 시나리오 시뮬레이션 생성 방법 및 장치.pdf",
        url: "/pdf/주행 시나리오 시뮬레이션 생성 방법 및 장치.pdf",
        image: "/floor_plan/s2.png",
      },
      {
        name: "VR 시나리오에서의 롤 플레이 시뮬레이션 방법 및 단말 기기.pdf",
        url: "/pdf/VR 시나리오에서의 롤 플레이 시뮬레이션 방법 및 단말 기기.pdf",
        image: "/floor_plan/s3.jpg",
      },
    ],
    "우울증 진단 게임의 유사 특허들을 보여줘": [
      {
        name: "게임 분석 요소를 활용한 중증 정신 장애 진단 장치 및 방법.pdf",
        url: "/pdf/게임 분석 요소를 활용한 중증 정신 장애 진단 장치 및 방법.pdf",
        image: "/floor_plan/d1.png",
      },
      {
        name: "인지 게임을 자동 추천하는 인지 상태 진단 장치.pdf",
        url: "/pdf/인지 게임을 자동 추천하는 인지 상태 진단 장치.pdf",
        image: "/floor_plan/d2.png",
      },
      {
        name: "인지 진단 게임을 이용한 인지 진단 평가를 위한 컴퓨터 프로그램 기록매체.pdf",
        url: "/pdf/인지 진단 게임을 이용한 인지 진단 평가를 위한 컴퓨터 프로그램 기록매체.pdf",
        image: "/floor_plan/d3.png",
      },
    ],
  };

  const currentLinks = pdfLinks[selectedInput] || [];

  const toggleSection = (index) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const styles = {
    container: {
      width: "250px",
      height: "100vh",
      backgroundColor: isDarkTheme ? "#333333" : "#f1f1f1", // 다크모드 배경
      color: isDarkTheme ? "#ffffff" : "#333", // 다크모드 텍스트 색상
      padding: "20px",
      position: "fixed",
      right: "0",
      top: "0",
      overflowY: "auto",
      zIndex: 10,
    },
    header: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: isDarkTheme ? "#ffffff" : "#000000", // 글씨 색상 고정
    },
    section: {
      marginBottom: "15px",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      backgroundColor: isDarkTheme ? "#444444" : "#cceeff", // 섹션 헤더 배경
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      color: isDarkTheme ? "#ffffff" : "#333", // 텍스트 색상
    },
    sectionContent: {
      padding: "10px",
      borderRadius: "5px", // 경계선 삭제
      marginTop: "5px",
      backgroundColor: isDarkTheme ? "#555555" : "#cceeff", // 섹션 내용 배경
    },
    imageContainer: {
      position: "relative",
      cursor: "pointer",
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: "5px",
    },
    tooltip: {
      position: "absolute",
      bottom: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "12px",
      whiteSpace: "nowrap",
      visibility: "hidden",
      opacity: 0,
      transition: "visibility 0.2s, opacity 0.2s",
    },
    tooltipVisible: {
      visibility: "visible",
      opacity: 1,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>추천 자료</div>
      {currentLinks.map((link, index) => (
        <div key={index} style={styles.section}>
          <div
            style={styles.sectionHeader}
            onClick={() => toggleSection(index)}
          >
            {link.name}
            <span>{expandedSections[index] ? "▼" : "▲"}</span>
          </div>

          {expandedSections[index] && (
            <div style={styles.sectionContent}>
              <div
                style={styles.imageContainer}
                onClick={() => window.open(link.url, "_blank")}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={link.image}
                  alt={link.name}
                  style={styles.image}
                />
                <div
                  style={{
                    ...styles.tooltip,
                    ...(hoveredIndex === index ? styles.tooltipVisible : {}),
                  }}
                >
                  PDF로 이동하기
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
