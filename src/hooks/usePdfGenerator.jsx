import jsPDF from "jspdf";

export const usePdfGenerator = (headData, mapBodyData, textSave) => {
  const generatePDF = (data) => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [
        (document.documentElement.clientWidth * 0.8) / 72,
        (document.documentElement.clientHeight * 0.8) / 72,
      ],
    });

    doc.setFontSize(8);

    const bodyData = mapBodyData(data);

    doc.autoTable({
      head: [headData],
      body: bodyData,
      margin: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      styles: { cell: { fontSize: 12 }, halign: "center" },
      headStyles: {
        halign: "center",
        valign: "middle",
      },
    });

    doc.save(`${textSave} - ${new Date().toLocaleDateString("pt-BR")}`);
  };

  return generatePDF;
};
