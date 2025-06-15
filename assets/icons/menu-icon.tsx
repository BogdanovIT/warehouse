import * as React from 'react'
import { Svg, Rect} from 'react-native-svg'
const MenuIcon = () => (
    <Svg
        //xmlns='http://www.w3.org/2000/svg'
        width={26}
        height={24}
        fill='none'
        viewBox='0 0 26 24'
        >
    <Rect width={10} height={1.65} x={4.96} y={4} fill='#AFB2BF' rx={0.825} />
    <Rect width={16} height={1.65} x={4.96} y={8.65} fill='#AFB2BF' rx={0.825} />
    <Rect width={12} height={1.65} x={4.96} y={13.3} fill='#AFB2BF' rx={0.825} />
    <Rect width={16} height={1.65} x={4.96} y={17.95} fill='#AFB2BF' rx={0.825} />
    </Svg>
)
export default MenuIcon