import path from "path";
import React from "react";
import reactPkg from "@react-pdf/renderer";
const {
  StyleSheet,
  Page,
  View,
  Text,
  Document,
  renderToFile
} = reactPkg;
const styles = StyleSheet.create({
  cadreInfoContainer: {
    width: "50%",
    marginLeft: "25%",
    marginTop: "16px",
    textAlign: "center",
    border: "1px solid #000000",
    padding: "8px"
  },
  cadreInfo: {
    fontSize: 16
  },
  cadreInfoBoldSpan: {
    fontSize: 16,
    fontWeight: "bold"
  },
  cadreInfoPrenomNom: {
    fontSize: 24,
    fontWeight: "extrabold",
    marginBottom: "16px"
  },
  table: {
    display: "table",
    marginHorizontal: "auto",
    marginTop: "50px",
    textAlign: "center",
    fontSize: "8px",
    border: "1px solid #000000"
  },
  tableRowHead: {
    flexDirection: "row",
    fontWeight: "bold",
    borderRight: "1px solid #000000",
    borderBottom: "1px solid #000000"
  },
  tableRow: {
    flexDirection: "row",
    borderRight: "1px solid #000000",
    borderBottom: "1px solid #000000"
  },
  tableCell6: {
    width: "6%",
    paddingVertical: "6px"
  },
  tableCell12: {
    width: "12%",
    paddingVertical: "6px"
  },
  tableCell8: {
    width: "8%",
    paddingVertical: "6px"
  }
});

const MyDocument = ({
  semaine,
  PDFversion
}) => {
  // Ligne nom du jour
  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  };

  const FormatDateColumn = dateObject => {
    const date = new Date(dateObject).toLocaleDateString("fr-FR", dateOptions);
    return date;
  };

  const debutSemaine = FormatDateColumn(semaine.pointages[0].date);
  const finSemaine = FormatDateColumn(semaine.pointages[11].date);
  let nameDayLine = [];

  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const formatedDateColumn = FormatDateColumn(semaine.pointages[i].date);
    nameDayLine.push( /*#__PURE__*/React.createElement(Text, {
      style: styles.tableCell12
    }, formatedDateColumn));
  } // ligne AM / PM


  let momentDayLine = [];

  for (let i = 0; i < semaine.pointages.length; i++) {
    momentDayLine.push( /*#__PURE__*/React.createElement(Text, {
      style: styles.tableCell6
    }, semaine.pointages && semaine.pointages[i].moment ? "P.M" : "A.M"));
  } // ligne des valeurs (heures)


  let valueLine = [];

  for (let i = 0; i < semaine.pointages.length; i++) {
    valueLine.push( /*#__PURE__*/React.createElement(Text, {
      style: styles.tableCell6
    }, semaine.pointages[i].valeur));
  } // ligne des affaires


  let affaireLine = [];

  for (let i = 0; i < semaine.pointages.length; i++) {
    affaireLine.push( /*#__PURE__*/React.createElement(Text, {
      style: styles.tableCell6
    }, semaine.pointages[i].affaireId ? semaine.pointages[i].affaireId : ""));
  } // ligne des montants totaux


  let totalWeekValue = 0;
  let valueTotalLine = [];

  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const valueAm = semaine.pointages[i].valeur;
    const valuePm = semaine.pointages[i + 1].valeur;
    const valueDay = valueAm + valuePm;
    totalWeekValue += valueDay;
    valueTotalLine.push( /*#__PURE__*/React.createElement(Text, {
      style: styles.tableCell12
    }, valueDay));
  } // ligne des paniers


  let totalWeekPanier = 0;
  let panierLine = [];

  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const panierAm = semaine.pointages[i].valeur;
    const panierPm = semaine.pointages[i + 1].valeur;
    let panierDay = 0;

    if (panierAm >= 5 || panierAm && panierPm) {
      panierDay = 1;
    }

    totalWeekPanier += panierDay;
    panierLine.push( /*#__PURE__*/React.createElement(Text, {
      style: styles.tableCell12
    }, panierDay));
  } // ligne des motifs


  let motifLine = [];

  for (let i = 0; i < semaine.pointages.length; i++) {
    motifLine.push( /*#__PURE__*/React.createElement(Text, {
      style: styles.tableCell6
    }, semaine.pointages[i].motifAbsenceId ? semaine.pointages[i].motifAbsenceId : ""));
  }

  return /*#__PURE__*/React.createElement(Document, null, /*#__PURE__*/React.createElement(Page, {
    orientation: "landscape"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.cadreInfoContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.cadreInfoPrenomNom
  }, semaine.user.firstname, " ", semaine.user.lastname), /*#__PURE__*/React.createElement(Text, {
    style: styles.cadreInfo
  }, "Ann\xE9e : ", semaine.annee), /*#__PURE__*/React.createElement(Text, {
    style: styles.cadreInfo
  }, "Semaine : ", semaine.numero, " (", debutSemaine, " au ", finSemaine, ")"), /*#__PURE__*/React.createElement(Text, {
    style: styles.cadreInfo
  }, "\xC9tat : ", semaine.etatSemaine.name)), /*#__PURE__*/React.createElement(View, {
    style: styles.table
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.tableRowHead
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, " "), nameDayLine, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, "Totaux")), /*#__PURE__*/React.createElement(View, {
    style: styles.tableRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, " "), momentDayLine, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, " ")), /*#__PURE__*/React.createElement(View, {
    style: styles.tableRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, "Heures"), valueLine, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, " ")), /*#__PURE__*/React.createElement(View, {
    style: styles.tableRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, "Affaire"), affaireLine, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, " ")), /*#__PURE__*/React.createElement(View, {
    style: styles.tableRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, "Total Heure"), valueTotalLine, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, totalWeekValue)), /*#__PURE__*/React.createElement(View, {
    style: styles.tableRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, "Panier"), panierLine, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, totalWeekPanier)), /*#__PURE__*/React.createElement(View, {
    style: styles.tableRow
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, "Autre"), motifLine, /*#__PURE__*/React.createElement(Text, {
    style: styles.tableCell6
  }, " ")))));
};

const pdfGenerate = async semaine => {
  const userName = `${semaine.user.firstname}${semaine.user.lastname}`;
  const version = semaine.PDFversion == "PDFemploye" ? 0 : 1;
  const fileName = `${userName}-${semaine.annee}-${semaine.numero}-${version}`;
  await renderToFile( /*#__PURE__*/React.createElement(MyDocument, {
    semaine: semaine
  }), `${path.resolve()}/documents/pdf/${fileName}.pdf`);
};

export default pdfGenerate;