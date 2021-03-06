import React, { Component } from "react";
import ReactDOM from "react-dom";

import { font } from "./font1";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default class Html2Pdf extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  exportPDF = () => {
    var doc = new jsPDF();

    let html = `<!DOCTYPE html><html><body><p style="font-family:times">İstanbul</p></body></html>`;
    doc.fromHTML(html, 10, 10);

    doc.addFileToVFS("times-normal.ttf", font);
    doc.addFont("times-normal.ttf", "times", "normal");
    doc.setFont("times"); // set font
    doc.setFontSize(50);

    doc.text("İstanbul", 100, 100);
    doc.text("Ağaç", 100, 200);

    doc.save("a1.pdf");
  };

  printDocument() {
    const input =  this.myRef.current;
    const pdf = new jsPDF();
    if (pdf) {
      html2canvas(input, {
        useCORS: true
      })
        .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          console.log(imgData); //Maybe blank, maybe full image, maybe half of image
          pdf.addImage(imgData, 'PNG', 10, 10);
          pdf.save('download.pdf');
        });
    }
}

  render() {
    return (
      <main style={{ fontWeight: "normal" }}>
        <h1>---------------------------------------------------</h1>
        <button onClick={() => this.printDocument()}>Html2 to Canvas</button>
      </main>
    );
  }
}
