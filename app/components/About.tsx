'use client'
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// ── Inline SVG icon components ─────────────────────────────────────────────
const Icon = ({ d, viewBox = '0 0 24 24', className = 'w-4 h-4', fill = 'currentColor', stroke = 'none' }: {
  d: string; viewBox?: string; className?: string; fill?: string; stroke?: string;
}) => (
  <svg viewBox={viewBox} className={className} fill={fill} stroke={stroke} xmlns="http://www.w3.org/2000/svg">
    <path d={d} />
  </svg>
);

// Brand SVG paths
const BrainPath = 'M9.5 2C8.1 2 7 3.1 7 4.5c0 .4.1.8.3 1.1C6.5 6 6 6.9 6 8c0 1.3.8 2.4 1.9 2.8C7.3 11.4 7 12.2 7 13c0 1.7 1.3 3 3 3h4c1.7 0 3-1.3 3-3 0-.8-.3-1.6-.9-2.2C17.2 10.4 18 9.3 18 8c0-1.1-.5-2-1.3-2.4.2-.3.3-.7.3-1.1C17 3.1 15.9 2 14.5 2c-.7 0-1.3.3-1.8.7C12.3 2.3 11.7 2 11 2c-.5 0-1 .1-1.5.3-.3-.2-.6-.3-1-.3zm2 16c0 1.1.9 2 2 2s2-.9 2-2h-4zm-2 0c0 1.1.9 2 2 2v-2H9.5z';
const SparkPath = 'M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2zm0 4.54l-1.06 3.16L7.78 10.5l3.16 1.06L12 14.72l1.06-3.16 3.16-1.06-3.16-1.06L12 6.54z';
const FlaskPath = 'M9 2v7.5L5 16c-.83 1.39-.28 3.18 1.11 4.01.47.28 1 .44 1.56.44h8.66c1.62 0 2.94-1.32 2.94-2.94 0-.55-.16-1.08-.44-1.56L15 9.5V2H9zm2 2h2v6l3.5 6H7.5L11 10V4z';
const DBPath = 'M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.32 6 2s-2.13 2-6 2-6-1.32-6-2 2.13-2 6-2zm6 12c0 .68-2.13 2-6 2s-6-1.32-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4.5c0 .68-2.13 2-6 2s-6-1.32-6-2v-2.23C7.61 11.05 9.72 11.5 12 11.5s4.39-.45 6-1.23V12.5z';
const CloudPath = 'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z';
const TerminalPath = 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-2-2H8v-2h10v2zm-8.5-4L5 8.5l1.5-1.5L10.5 11 7 14.5 5.5 13l3-3z';
const WrenchPath = 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z';
const LayersPath = 'M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z';
const MonitorPath = 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z';
const GitPath = 'M2.6 10.59L8.38 4.8l1.69 1.7c-.24.85.15 1.78.93 2.23v5.54c-.6.34-1 .99-1 1.73 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.39-1-1.73V9.41l2.07 2.09c-.07.15-.07.32-.07.5 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.2 0-.37.04-.53.1L11.07 7.1A2 2 0 0 0 9.8 4.61L7.95 2.76c-.78-.78-2.05-.78-2.83 0L2.56 5.34C1.78 6.12 1.78 7.4 2.56 8.17l.04.04v2.38z';
const ChartPath = 'M3.5 18.5l6-8 4 5.5 3-3.5 5 6H3.5zM1 21h22V3H1v18zM23 1H1C.45 1 0 1.45 0 2v20c0 .55.45 1 1 1h22c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1z';
const PenPath = 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z';

// React SVG (multi-path, rendered separately)
const ReactIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#61DAFB" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2.139" />
    <path d="M12 8.009c3.955 0 7.517.993 9.698 2.532C23.761 11.904 24 13.076 24 14c0 2.482-3.656 4.741-8.741 5.589-.23.039-.461.074-.693.105.23-.573.437-1.168.621-1.775C18.765 17.232 22 15.617 22 14c0-.701-.557-1.47-1.563-2.149C18.527 10.568 15.412 9.75 12 9.75c-3.412 0-6.527.818-8.437 2.101C2.557 12.53 2 13.299 2 14c0 1.617 3.235 3.232 6.813 3.919.184.607.391 1.202.621 1.775-.232-.031-.463-.066-.693-.105C3.656 18.741 0 16.482 0 14c0-.924.239-2.096 2.302-3.459C4.483 9.002 8.045 8.009 12 8.009zm0 7.982c3.955 0 7.517-.993 9.698-2.532C23.761 12.096 24 10.924 24 10c0-2.482-3.656-4.741-8.741-5.589-.23-.039-.461-.074-.693-.105.23.573.437 1.168.621 1.775C18.765 6.768 22 8.383 22 10c0 .701-.557 1.47-1.563 2.149C18.527 13.432 15.412 14.25 12 14.25c-3.412 0-6.527-.818-8.437-2.101C2.557 11.47 2 10.701 2 10c0-1.617 3.235-3.232 6.813-3.919.184-.607.391-1.202.621-1.775-.232.031-.463.066-.693.105C3.656 5.259 0 7.518 0 10c0 .924.239 2.096 2.302 3.459C4.483 14.998 8.045 15.991 12 15.991z" />
  </svg>
);

const NextIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.42-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.516-.052 3.596a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.499-.054z" />
  </svg>
);

const PythonIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l.01-2.76.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l-.01 2.76-.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z" />
  </svg>
);

const JavaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149zm-.522-2.228s-1.029.761.542.924c2.032.209 3.636.227 6.213-.308 0 0 .384.389.987.602-5.501 1.61-11.634.142-7.742-1.218zm4.16-4.097c1.121 1.291-.295 2.454-.295 2.454s2.843-1.468 1.537-3.305c-1.219-1.714-2.154-2.565 2.905-5.498 0 0-7.941 1.985-4.147 6.349zm6.507 9.1s.677.558-.747.987c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.827-.093.827-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.978-1.816zm-10.6-7.31s-4.359 1.036-1.543 1.412c1.188.159 3.559.123 5.768-.062 1.806-.152 3.619-.477 3.619-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892zm7.826 4.371c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118zm-7.711-14.45c0 0 2.499 2.499-2.371 6.342-3.906 3.085-.891 4.843-.001 6.852-2.282-2.057-3.954-3.868-2.833-5.553C7.021 9.555 11.39 8.422 9.511 4.942z" />
  </svg>
);

const TSIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#3178C6" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
  </svg>
);

const TailwindIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const MongoIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#47A248" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z" />
  </svg>
);

const AzureIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#0078D4" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.05 4.24L6.56 18.05l-1.7.02 4.72-9.4-2.63-4.4 6.1-.03zM12.26 18.3l6.26-1.05L12.47 5.75l-1.86 5.56 2.57 2.58-2.06 3.62 1.14.79z" />
  </svg>
);

const FigmaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.354-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49c2.49 0 4.515 2.014 4.515 4.49S10.662 24 8.172 24zm0-7.509c-1.666 0-3.044 1.355-3.044 3.019s1.378 3.019 3.044 3.019c1.667 0 3.044-1.355 3.044-3.019s-1.377-3.019-3.044-3.019zm7.705 7.509c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.354-3.019 3.019s1.355 3.019 3.019 3.019S19 21.165 19 19.5s-1.354-3.019-3.019-3.019z" />
  </svg>
);

const NodeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#339933" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.24l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.087.05-.139.142-.139.241v10.15c0 .097.052.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.85 1.85 0 0 1-.919-1.604V6.921c0-.661.351-1.276.919-1.605l8.795-5.082c.554-.315 1.291-.315 1.840 0l8.794 5.082A1.85 1.85 0 0 1 22.629 6.921v10.15c0 .661-.351 1.273-.92 1.604l-8.794 5.078c-.28.163-.6.247-.917.247z" />
  </svg>
);

const MySQLIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#4479A1" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.134-.04-.040-.105-.066-.18-.158zm-1.798.007l-.01.01c.014.066.01.133.01.213v.02l.01-.02c.073-.106.147-.213.22-.32v-.01l-.02-.016c-.073.033-.146.066-.21.123zm3.24.007c-.034 0-.074.006-.12.013.254.373.28.666.447.873.113.14.273.26.427.374.087.06.187.1.287.147v-.007c-.053-.427-.246-.774-.46-1.05-.1-.127-.2-.227-.3-.32a.652.652 0 0 0-.28-.03zM0 7.35c.053 3.565 2.038 7.017 4.897 9.035 2.86 2.02 6.83 2.82 10.46 2.015-1.2-.654-2.293-1.5-3.26-2.487-1.287-1.32-2.247-2.9-2.76-4.634-.247-.853-.38-1.74-.38-2.634 0-.126.006-.254.006-.38 0-.053 0-.1.006-.147 0-.14.007-.28.02-.42-.14.407-.26.82-.367 1.247-.493 1.987-.433 4.047.133 5.986a11.64 11.64 0 0 0 1.787 3.728 10.18 10.18 0 0 0 2.553 2.56c.494.334 1.034.62 1.594.865-.694.053-1.393.04-2.087-.04a14.27 14.27 0 0 1-3.487-.887c-.233-.093-.46-.2-.693-.306a13.513 13.513 0 0 1-3.467-2.307c-1.04-.967-1.9-2.107-2.52-3.367-.353-.707-.62-1.46-.793-2.234a11.38 11.38 0 0 1-.26-2.42zm16.86.947c-.74 0-1.56.167-2.307.46h-.027v.027c.087.046.154.12.22.186.527.553.834 1.3.954 2.047.08.5.08 1.007-.007 1.507a4.89 4.89 0 0 1-.647 1.733c-.313.514-.72.974-1.187 1.36-.026.02-.053.04-.08.06.14-.02.28-.04.42-.066 1.827-.38 3.2-1.8 3.634-3.567.08-.34.12-.693.12-1.047 0-.766-.206-1.493-.554-2.113-.066-.12-.14-.234-.213-.347-.12-.02-.247-.04-.327-.04zm-2.5.134c-.16 0-.32.013-.48.04a5.107 5.107 0 0 1 1.294 1.707c.28.58.42 1.22.4 1.86-.014.38-.08.754-.18 1.12-.1.366-.247.72-.433 1.047-.18.312-.4.598-.647.847.14-.027.28-.06.42-.1a4.108 4.108 0 0 0 2.007-1.36c.48-.594.773-1.334.82-2.107.034-.56-.04-1.127-.26-1.64-.327-.76-.967-1.347-1.74-1.6a2.913 2.913 0 0 0-1.2-.014z" />
  </svg>
);

const GitHubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const FastAPIIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#009688" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.376 0 0 5.376 0 12c0 6.627 5.376 12 12 12 6.627 0 12-5.373 12-12 0-6.624-5.373-12-12-12zm-.624 21.6v-7.2H6l7.2-10.8v7.2H19.2L12 21.6z" />
  </svg>
);

const GSAPIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#88CE02" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L3 6v12l9 6 9-6V6L12 0zm0 2.4l7.2 4.8v9.6L12 21.6 4.8 16.8V7.2L12 2.4z" />
  </svg>
);


// ── Skill data with icon components ───────────────────────────────────────
type SkillItem = { name: string; IconEl: React.FC<{ className?: string }> };
type SkillGroup = { category: string; color: string; TabIconEl: React.FC<{ className?: string }>; items: SkillItem[] };

const skillsData: SkillGroup[] = [
  {
    category: 'AI & ML',
    color: '#a78bfa',
    TabIconEl: ({ className }) => <Icon d={BrainPath} className={className} />,
    items: [
      { name: 'Machine Learning', IconEl: ({ className }) => <Icon d={BrainPath} className={className} /> },
      { name: 'Generative AI', IconEl: ({ className }) => <Icon d={SparkPath} className={className} /> },
      { name: 'scikit-learn', IconEl: ({ className }) => <Icon d={FlaskPath} className={className} /> },
      { name: 'Pandas', IconEl: PythonIcon },
      { name: 'Matplotlib', IconEl: ({ className }) => <Icon d={ChartPath} className={className} /> },
      { name: 'Seaborn', IconEl: ({ className }) => <Icon d={ChartPath} className={className} /> },
    ],
  },
  {
    category: 'Frontend',
    color: '#60a5fa',
    TabIconEl: ({ className }) => <Icon d={MonitorPath} className={className} />,
    items: [
      { name: 'React.js', IconEl: ReactIcon },
      { name: 'Next.js', IconEl: NextIcon },
      { name: 'TypeScript', IconEl: TSIcon },
      { name: 'JavaScript', IconEl: ({ className }) => <Icon d={TerminalPath} className={className} /> },
      { name: 'Tailwind CSS', IconEl: TailwindIcon },
      { name: 'GSAP', IconEl: GSAPIcon },
      { name: 'Three.js', IconEl: ({ className }) => <Icon d={LayersPath} className={className} /> },
      { name: 'HTML / CSS', IconEl: ({ className }) => <Icon d={MonitorPath} className={className} /> },
    ],
  },
  {
    category: 'Backend',
    color: '#34d399',
    TabIconEl: ({ className }) => <Icon d={WrenchPath} className={className} />,
    items: [
      { name: 'FastAPI', IconEl: FastAPIIcon },
      { name: 'Flask', IconEl: ({ className }) => <Icon d={FlaskPath} className={className} /> },
      { name: 'Node.js', IconEl: NodeIcon },
      { name: 'Next.js', IconEl: NextIcon },
      { name: 'REST APIs', IconEl: ({ className }) => <Icon d={LayersPath} className={className} /> },
    ],
  },
  {
    category: 'Databases',
    color: '#fb923c',
    TabIconEl: ({ className }) => <Icon d={DBPath} className={className} />,
    items: [
      { name: 'MySQL', IconEl: MySQLIcon },
      { name: 'MongoDB', IconEl: MongoIcon },
      { name: 'NoSQL', IconEl: ({ className }) => <Icon d={DBPath} className={className} /> },
    ],
  },
  {
    category: 'Languages',
    color: '#f472b6',
    TabIconEl: ({ className }) => <Icon d={TerminalPath} className={className} />,
    items: [
      { name: 'Python', IconEl: PythonIcon },
      { name: 'Java', IconEl: JavaIcon },
      { name: 'C', IconEl: ({ className }) => <Icon d={TerminalPath} className={className} /> },
    ],
  },
  {
    category: 'Tools & Cloud',
    color: '#facc15',
    TabIconEl: ({ className }) => <Icon d={WrenchPath} className={className} />,
    items: [
      { name: 'Git / GitHub', IconEl: GitHubIcon },
      { name: 'Azure Cloud', IconEl: AzureIcon },
      { name: 'PowerBI', IconEl: ({ className }) => <Icon d={ChartPath} className={className} /> },
      { name: 'Figma', IconEl: FigmaIcon },
      { name: 'Excel', IconEl: ({ className }) => <Icon d={ChartPath} className={className} /> },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────
const AboutMeContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const skillsHeadingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    if (!gridRef.current) { setActiveTab(index); return; }
    gsap.to(gridRef.current, {
      opacity: 0, y: 10, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setActiveTab(index);
        gsap.fromTo(gridRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' });
      }
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set([leftRef.current, rightRef.current], { opacity: 0 });
      gsap.set(leftRef.current, { x: -40 });
      gsap.set(rightRef.current, { x: 40 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 85%', end: 'top 30%', scrub: 0.8 } });
      tl.to(leftRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
        .to(rightRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.7');

      if (skillsRef.current && skillsHeadingRef.current) {
        gsap.set(skillsHeadingRef.current, { y: 40, opacity: 0 });
        gsap.set(skillsRef.current.querySelectorAll('.tab-btn'), { y: 20, opacity: 0 });
        const stl = gsap.timeline({ scrollTrigger: { trigger: skillsRef.current, start: 'top 88%', end: 'top 40%', scrub: 0.5 } });
        stl.to(skillsHeadingRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
          .to(skillsRef.current.querySelectorAll('.tab-btn'), { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: { each: 0.07 } }, '-=0.4');
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const active = skillsData[activeTab];

  return (
    <div id="about" ref={containerRef} className="relative bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-indigo-50 dark:bg-indigo-950/20 blur-[100px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-violet-50 dark:bg-violet-950/20 blur-[90px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">

        {/* About + avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          <div ref={leftRef} className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              About Me
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-black dark:text-white leading-[1.05]">Who I am</h2>
            <div className="space-y-4 text-base sm:text-lg font-light leading-relaxed text-gray-600 dark:text-gray-400">
              <p>I am a <span className="text-black dark:text-white font-normal">pre-final year B.Tech student majoring in Computer Science Engineering (Data Science)</span> at Dayananda Sagar University, Bengaluru, with a current <span className="text-black dark:text-white font-normal">CGPA of 8.56</span>.</p>
              <p>Deeply passionate about AI, I focus on solving real-world problems through full-stack development integrated with intelligent systems. Currently upskilling in <span className="text-black dark:text-white font-normal">AI/ML</span> and <span className="text-black dark:text-white font-normal">DSA</span>, with a special interest in <span className="text-black dark:text-white font-normal">Generative AI</span>.</p>
              <p>Recently, my team won the <span className="text-black dark:text-white font-normal">Art and Technology Award</span> at the <span className="text-black dark:text-white font-normal">NASA Space Apps Challenge 2024</span>.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-normal text-sm tracking-wide hover:opacity-85 transition-all duration-200 shadow-lg shadow-black/10">
                <Icon d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" className="w-3.5 h-3.5" />
                Contact Me
              </button>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 font-light text-sm tracking-wide hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200">
                <Icon d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>
          </div>

          <div ref={rightRef} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] aspect-square">
              <div className="absolute -top-3 -left-4 z-20 flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-4 py-2.5 shadow-lg shadow-black/5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-500" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>
                <div><p className="text-xs font-medium text-black dark:text-white leading-tight">CGPA 8.56</p><p className="text-[10px] text-gray-400 leading-tight">DSU Bengaluru</p></div>
              </div>
              <div className="absolute -bottom-3 -right-4 z-20 flex items-center gap-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl px-4 py-2.5 shadow-lg shadow-black/5">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-500" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <div><p className="text-xs font-medium text-black dark:text-white leading-tight">NASA Award</p><p className="text-[10px] text-gray-400 leading-tight">Space Apps 2024</p></div>
              </div>
              <div className="w-full h-full rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950 shadow-2xl shadow-black/10 dark:shadow-black/40 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 dark:from-indigo-900/10 to-transparent pointer-events-none z-10" />
                <Image src="/Avatar.png" alt="Adithya profile" width={300} height={300} className="w-64 h-64 object-contain hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills showcase */}
        <div ref={skillsRef}>
          <div ref={skillsHeadingRef} className="mb-10">
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-sm font-light text-gray-500 dark:text-gray-400 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Skills &amp; Technologies
            </div>
            <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight text-black dark:text-white">What I work with</h2>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skillsData.map((group, i) => {
              const isActive = i === activeTab;
              return (
                <button key={i} onClick={() => handleTabChange(i)}
                  className={`tab-btn flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-200 border font-light ${isActive
                    ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-md'
                    : 'bg-white/60 dark:bg-zinc-900/60 backdrop-blur text-gray-600 dark:text-gray-400 border-gray-200 dark:border-zinc-700 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'
                    }`}>
                  <group.TabIconEl className="w-3.5 h-3.5" />
                  {group.category}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${active.color}18` }}>
                <active.TabIconEl className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white">{active.category}</h3>
                <p className="text-xs font-light text-gray-400 mt-0.5">{active.items.length} technologies</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: active.color, boxShadow: `0 0 8px ${active.color}` }} />
            </div>

            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {active.items.map((skill, i) => (
                <div key={i} className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-black dark:hover:border-zinc-500 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-200 cursor-default">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${active.color}15` }}>
                    <skill.IconEl className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-light text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-200 leading-tight">{skill.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 h-px w-full rounded-full" style={{ background: `linear-gradient(to right, ${active.color}50, transparent)` }} />
          </div>

          {/* All skills summary */}
          <div className="mt-6 flex flex-wrap gap-2">
            {skillsData.flatMap(g => g.items).map((skill, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-light text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-zinc-800">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeContainer;
