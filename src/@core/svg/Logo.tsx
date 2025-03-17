// React Imports
import type { SVGAttributes } from 'react'
import Image from 'next/image';
import logo from '../../assets/iconify-icons/svg/logo.png';

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <Image src={logo} alt="Logo" width={30} height={25} />
  )
}

export default Logo
