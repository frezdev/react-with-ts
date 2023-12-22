'use client'
import { useRef, useEffect, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string,
  width: string | number
  height: string | number
  alt: string
  onLazyLoad?: (imgNode: HTMLImageElement) => void
}

const defaultLoadImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='

export const LazyImage = ({ src, onLazyLoad, alt, ...imgProps }: LazyImageProps): JSX.Element => {
  const node = useRef<HTMLImageElement>(null)
  const [srcImage, setSrcImage] = useState(defaultLoadImage)
  const [isLazyLoaded, setIsLazyLoaded] = useState(false)

  useEffect(() => {
    const loadImage = (img: HTMLImageElement | null) => {
      if (!img || !onLazyLoad) return
      img.onload = () => {
        if (typeof onLazyLoad === 'function') onLazyLoad(img)
      }
    }
    // new observer
    if (isLazyLoaded) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) return;

        setSrcImage(src)
        observer.disconnect()
        loadImage(node.current)
        setIsLazyLoaded(true)
      })
    })

    // observe node
    if (node.current) {
      observer.observe(node.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [src, onLazyLoad, isLazyLoaded])

  return (
    <img
      alt={alt}
      src={srcImage}
      ref={node}
      {...imgProps}
    />
  )
}
