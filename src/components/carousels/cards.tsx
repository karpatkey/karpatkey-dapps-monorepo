import React from 'react'
import Slider from 'react-slick'
import { Box, Chip } from '@mui/material'
import NextArrow from '@mui/icons-material/ArrowForwardIos'
import PrevArrow from '@mui/icons-material/ArrowBackIos'
import { BoxWrapperRow } from 'components/wrappers'

interface CarouselProps {
  children: React.ReactNode
  className?: string
  totalSlides: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PrevArrowCustom = ({ currentSlide, slideCount, ...arrowProps }: any) => (
  <PrevArrow sx={{ fill: 'black', fontSize: '14px' }} {...arrowProps} />
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NextArrowCustom = ({ currentSlide, slideCount, ...arrowProps }: any) => (
  <NextArrow sx={{ fill: 'black', fontSize: '14px' }} {...arrowProps} />
)

export const CarouselCards = ({ children, className, totalSlides }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  let firstDotIndex = Math.max(0, activeIndex - 2)
  const lastDotIndex = Math.min(totalSlides - 1, firstDotIndex + 4)

  if (lastDotIndex === totalSlides - 1) {
    firstDotIndex = Math.max(0, totalSlides - 5)
  }

  const settings = {
    dots: false,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: className,
    swipeToSlide: true,
    nextArrow: <NextArrowCustom />,
    prevArrow: <PrevArrowCustom />,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    beforeChange: (_: number, next: number) => setActiveIndex(next),
    customPaging: () => <div />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>
      <Chip
        label={`${activeIndex + 1}/${totalSlides}`}
        sx={{
          left: '20px',
          display: 'flex',
          position: 'absolute'
        }}
      />

      <Box className="slider-container" component={'div'} sx={{ marginY: '50px', marginX: '20px' }}>
        <Slider {...settings}>{children}</Slider>
        <BoxWrapperRow className="pagination-dots" sx={{ marginTop: '40px' }}>
          {Array.from({ length: totalSlides }, (_, i) => i)
            .slice(firstDotIndex, lastDotIndex + 1)
            .map((index) => {
              const dotClass = index === activeIndex ? 'dot active' : 'dot'
              const dotSize =
                Math.abs(activeIndex - index) === 0
                  ? '10px'
                  : `${10 - Math.abs(activeIndex - index) * 2}px`
              const dotStyle = {
                width: dotSize,
                height: dotSize,
                backgroundColor: index === activeIndex ? 'black' : 'gray'
              }

              return (
                <div
                  key={index}
                  className={dotClass}
                  style={dotStyle}
                  onClick={() => setActiveIndex(index)}
                />
              )
            })}
        </BoxWrapperRow>
      </Box>
    </>
  )
}
