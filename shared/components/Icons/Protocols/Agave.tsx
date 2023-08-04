import React from 'react'
import NextImage from 'next/image'

const Agave = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/agave.png" width={width} height={height} />
)

export default Agave
