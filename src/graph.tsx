import React from 'react';
import styles from './graph.module.css'

type Props = {
  data: { current: number; previous: number | null }[];
  width: number;
  height: number;
  color: string;
  title: string;
  bottomTitle?: string;
};

const Graph: React.FC<Props> = ({
  data,
  width,
  height,
  color,
  title,
  bottomTitle
}) => {
  const space: number = 14;
  const partWidth =(300 / data.length);
  const totalWidth = partWidth /2;
  const maxValue = Math.max(...data.map(item => item.current));
  const topContainer = 30;
  const bottomAreaContainer = 30;
  const contentContainer = height - topContainer - bottomAreaContainer;
  const { mainContainer, top_Container, content_Container, dataBar, graphColumn, spanValue, graphColumn_previous, blockGroup} = styles
  const mainContainerStyle = {
    '--main-container-width': `${width}px`,
    '--main-container-height': `${height}px`
  } as React.CSSProperties;
  const graphColumnStyle = {
    '--backgr-color-column': `${color}`,
    width: totalWidth
  } as React.CSSProperties;
const blockGroupCss = {
  '--height_blockGroup': `${height}px`,
  '--blockGroup_Width': `calc(${width}px / (${data.length }) - ${space}`

 } as React.CSSProperties;
  const graphColumn_previousStyle = {
    '--backgr-color-column': `${color}`,
    width: totalWidth
  } as React.CSSProperties;

  const spanValueStyle = {
    '--spanColor': `${color}`
  } as React.CSSProperties;
  const minWContContainer = {
    '--min-Width': `${width}`
  } as React.CSSProperties;
  return (
    <div className={mainContainer} style={mainContainerStyle}>
      <div className={top_Container} style={{ minHeight: topContainer }}>{title}</div>
      <div className={content_Container} style={{ minHeight: contentContainer, ...minWContContainer }}>
        {data.map(({ current, previous }, index) => (
          <div key={index} className={blockGroup} style={{ ...blockGroupCss}}>
            <div className={dataBar} key={`current-${index}`}>
              <div className={graphColumn} style={{ height: `${(current / maxValue) * contentContainer}px`, ...graphColumnStyle}} />
              <span className={spanValue} style={spanValueStyle}>{current}</span>
            </div>
            {previous !== null && (
              <div className={dataBar} key={`previous-${index}`}>
                <div className={graphColumn_previous} style={{ height: `${(previous / maxValue) * contentContainer}px`, ...graphColumn_previousStyle }} />
                <span className={spanValue} style={spanValueStyle}>{previous}</span>
              </div>
            )}
          </div>


        ))}
      </div>

      <div className="bottomArea" style={{ minHeight: bottomAreaContainer }}>{bottomTitle}</div>
    </div>

  );
};
export default Graph;