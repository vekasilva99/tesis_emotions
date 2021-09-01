import React from 'react'
import styled from 'styled-components'
import "../../styles/components/__components-dir.scss";

export default ({ notMove,text, objectSize, spacing, offset, overlap = true,position,color, font,top,left,zIndex }) => {
  const d = objectSize + spacing * 2
  const r = objectSize / 2 + spacing / 2
  const animation = notMove ? "none" :"spin 15s linear infinite"
  const degree = notMove ? "-90" :"90"
  const CurvedText = styled.div`
    margin-bottom: ${overlap ? `-${r}px` : '0'};
    width: ${d + offset * 2}px;
    height: ${r + offset}px;
    z-index:${zIndex} !important;
    position:${position};
    -webkit-animation: ${animation};
    animation: ${animation};
    top:${top};
    overflow:hidden;
    left:${left};
    transform: rotate(${degree}deg);
    

    // border-radius:100%;
  
    path {
        background:pink;
      fill: transparent;
    }
    text {
      fill: currentColor;
      text-anchor: middle;

    }
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  `

  return (
    <CurvedText className="curved-text">
      <svg viewBox={`0 0 ${d + offset * 2} ${r + offset * 2}`}>
        <path id="curve" d={`M${offset},${r + offset} A${r},${r} 0 0,1 ${d + offset},${r + offset}`} />
        <text width="500">
          <textPath xlinkHref="#curve" className="circular-text" style={{fontSize:font,color:color}} startOffset="50%">
            {text}
          </textPath>
        </text>
      </svg>
    </CurvedText>
  )
}