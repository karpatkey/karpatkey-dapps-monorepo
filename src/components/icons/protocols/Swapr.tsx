import React from 'react'

export const Swapr = (props: any) => (
  <svg
    style={{ width: 'inherit', height: 'inherit' }}
    {...props}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="200" height="200" rx="100" fill="url(#paint0_linear)" />
    <g filter="url(#filter0_i)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6343 127.248V99.9996C21.6343 56.7196 56.7196 21.6343 99.9996 21.6343C121.347 21.6343 140.701 30.1703 154.835 44.0153L138.175 54.4252C127.847 45.7648 114.533 40.55 99.9996 40.55C67.1665 40.55 40.55 67.1665 40.55 99.9996H59.4658L21.6343 127.248ZM61.537 145.332C71.9047 154.138 85.332 159.45 100 159.45C132.833 159.45 159.45 132.833 159.45 100H140.534L178.364 72.3022L178.365 100C178.365 143.28 143.28 178.366 100 178.366C78.52 178.366 59.0584 169.723 44.9027 155.726L61.537 145.332ZM130.062 126.009H108.444L100 114.602L91.556 126.009H69.9379L89.5232 100.449L69.9374 73.9912H90.2043L100 86.7757L109.796 73.9913H130.063L110.477 100.449L130.062 126.009Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_i"
        x="21.6343"
        y="21.6343"
        width="156.731"
        height="156.731"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.14902 0 0 0 0 0.196078 0 0 0 0 0.219608 0 0 0 0.25 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="100"
        y1="0"
        x2="100"
        y2="200"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#14248A" />
        <stop offset="1" stopColor="#6200EA" />
      </linearGradient>
    </defs>
  </svg>
)
