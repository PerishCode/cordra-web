import React, { useRef } from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont'

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2305986_9z05q865927.js',
})

export default function (props: IconFontProps) {
  const iconRef = useRef<HTMLDivElement>(null)

  return <Icon {...props} ref={iconRef} />
}
