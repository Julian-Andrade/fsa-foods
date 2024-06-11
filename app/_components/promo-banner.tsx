// Next
import Image, { ImageProps } from 'next/image'

const PromoBanner = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      width={0}
      height={0}
      className="mb-6 h-auto w-full object-contain md:mb-0"
      sizes="100vw"
      quality={100}
      {...props}
    />
  )
}

export default PromoBanner
