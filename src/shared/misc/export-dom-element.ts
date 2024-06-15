import html2canvas from "html2canvas";

export const exportDomElement = (element: HTMLElement, name: string) => {
  html2canvas(element).then((canvas) => {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${name}.png`;
    link.click();
  });
};
