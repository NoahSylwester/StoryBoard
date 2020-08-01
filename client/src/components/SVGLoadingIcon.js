import React from 'react'
import styled, { keyframes } from 'styled-components'
import Colors from '../themes/colors'

const loadingAnimation = (spinRadius) => keyframes`
    from {
        transform: rotate(0deg) translateX(${spinRadius}px) rotate(0deg);
    }
    to {
        transform: rotate(360deg) translateX(${spinRadius}px) rotate(-360deg);
    }
`
const loadingPulseAnimation = () => keyframes`
    0% {
        r: 20;
        opacity: 1;
        stroke-width: 10;
    }
    100% {
        fill: white;
        stroke-width: 10;
        r: 70;
        opacity: 0;
    }
`


const LoadingSVGWrapper = styled.svg`
    width: 50vw;
    height: 80vh;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3000px;
`

const LoadingCircle = styled.circle`
    animation: ${props => props.animationDuration} ${props => loadingAnimation(props.spinRadius)} linear infinite;
    fill: ${props => props.fill};
`

const LoadingPulse = styled.circle`
    animation: ${props => props.animationDuration} ${loadingPulseAnimation} ease-out infinite;
    fill: ${props => props.fill};
`

export default function SVGLoadingIcon(props) {

    return (
        <LoadingSVGWrapper>
            <LoadingCircle
                cx="50%"
                cy="50%"
                r="20"
                fill={Colors.title}
                animationDuration={`${props.duration || 0.7}s`}
                spinRadius="30"
            ></LoadingCircle>
            <LoadingCircle
                cx="50%"
                cy="50%"
                r="20"
                fill={Colors.background3}
                animationDuration={`${props.duration || 0.7}s`}
                spinRadius="-30"
            ></LoadingCircle>
        </LoadingSVGWrapper>
    )
}