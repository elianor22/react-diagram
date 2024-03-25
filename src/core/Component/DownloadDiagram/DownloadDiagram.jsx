import { useReactFlow, getNodesBounds, getViewportForBounds } from "reactflow";
import { toJpeg} from "html-to-image";

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "Diagram.jpeg");
  a.setAttribute("href", dataUrl);
  a.click();
  
  const nodeDot = document.querySelectorAll(".react-flow__handle");
  nodeDot.forEach((node) => {
    node.classList.remove("hide");
  });
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadDiagram() {
  const { getNodes } = useReactFlow();
  const onClick = () => {

    const nodesBounds = getNodesBounds(getNodes());
    const transform = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    const nodeDot = document.querySelectorAll(".react-flow__handle");
    nodeDot.forEach((node) => {
      node.classList.add("hide");
    });
    toJpeg(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#1a365d",
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
