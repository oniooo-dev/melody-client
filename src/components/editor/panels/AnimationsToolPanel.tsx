import React from 'react'
import TransitionButton from '../buttons/TransitionButton'
import { TRANSITIONS } from '@/constants/editor'

const TransitionToolPanel = () => {
    return (
        <div className='grid grid-cols-2 w-full h-fit gap-x-2 gap-y-4 p-2'>
            {
                TRANSITIONS.map(
                    (transition, index) => (
                        <TransitionButton
                            key={index}
                            {...transition}
                        />
                    ))
            }
        </div>
    )
}

export default TransitionToolPanel