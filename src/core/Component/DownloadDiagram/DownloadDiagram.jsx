import { Panel, useReactFlow, getNodesBounds, getViewportForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
  const a = document.createElement('a');

  a.setAttribute('download', 'Diagram.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadDiagram() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const transform = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    toPng(document.querySelector('.react-flow__viewport'), {
    //   backgroundColor: '#1a365d',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
      <button className="download-btn" onClick={onClick}>
        Export to Image
      </button>
  );
}

export default DownloadDiagram;