import { useEffect } from "react"

type Size = {
  width: number,
  height: number
}

export const windowSize = () => {
  const size = {
    width: 0,
    height: 0
  }

  useEffect(() => {
    function handleResize() {
      size.width = window.innerWidth;
      size.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [size])
}