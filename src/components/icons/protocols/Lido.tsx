import React from 'react'
import NextImage from 'next/image'

export const Lido = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/lido.svg" width={width} height={height} />
)
