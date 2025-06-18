import { useParams } from 'next/navigation'
import React from 'react'

const Code = () => {
    const {uid} = useParams()
  return (
    <div>Code</div>
  )
}

export default Code