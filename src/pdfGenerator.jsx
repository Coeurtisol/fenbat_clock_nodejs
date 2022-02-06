import path from "path";
import React from "react";
import reactPkg from "@react-pdf/renderer";
const { StyleSheet, Page, View, Text, Document, renderToFile } = reactPkg;

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
    fontSize: 16,
  },
  cadreInfoBoldSpan: {
    fontSize: 16,
    fontWeight: "bold",
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
    border: "1px solid #000000",
  },
  tableRowHead: {
    flexDirection: "row",
    fontWeight: "bold",
    borderRight: "1px solid #000000",
    borderBottom: "1px solid #000000",
  },
  tableRow: {
    flexDirection: "row",
    borderRight: "1px solid #000000",
    borderBottom: "1px solid #000000",
  },
  tableCell6: {
    width: "6%",
    paddingVertical: "6px",
  },
  tableCell12: {
    width: "12%",
    paddingVertical: "6px",
  },
  tableCell8: {
    width: "8%",
    paddingVertical: "6px",
  },
});

const MyDocument = ({ semaine, PDFversion }) => {
  // Ligne nom du jour
  const dateOptions = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  };
  const FormatDateColumn = (dateObject) => {
    const date = new Date(dateObject).toLocaleDateString("fr-FR", dateOptions);
    return date;
  };
  const debutSemaine = FormatDateColumn(semaine.pointages[0].date);
  const finSemaine = FormatDateColumn(semaine.pointages[11].date);

  let nameDayLine = [];
  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const formatedDateColumn = FormatDateColumn(semaine.pointages[i].date);
    nameDayLine.push(
      <Text style={styles.tableCell12}>{formatedDateColumn}</Text>
    );
  }
  // ligne AM / PM
  let momentDayLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    momentDayLine.push(
      <Text style={styles.tableCell6}>
        {semaine.pointages && semaine.pointages[i].moment ? "P.M" : "A.M"}
      </Text>
    );
  }
  // ligne des valeurs (heures)
  let valueLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    valueLine.push(
      <Text style={styles.tableCell6}>{semaine.pointages[i].valeur}</Text>
    );
  }
  // ligne des affaires
  let affaireLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    affaireLine.push(
      <Text style={styles.tableCell6}>
        {semaine.pointages[i].affaireId ? semaine.pointages[i].affaireId : ""}
      </Text>
    );
  }
  // ligne des montants totaux
  let totalWeekValue = 0;
  let valueTotalLine = [];
  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const valueAm = semaine.pointages[i].valeur;
    const valuePm = semaine.pointages[i + 1].valeur;
    const valueDay = valueAm + valuePm;
    totalWeekValue += valueDay;
    valueTotalLine.push(<Text style={styles.tableCell12}>{valueDay}</Text>);
  }
  // ligne des paniers
  let totalWeekPanier = 0;
  let panierLine = [];
  for (let i = 0; i < semaine.pointages.length; i += 2) {
    const panierAm = semaine.pointages[i].valeur;
    const panierPm = semaine.pointages[i + 1].valeur;
    let panierDay = 0;
    if (panierAm >= 5 || (panierAm && panierPm)) {
      panierDay = 1;
    }
    totalWeekPanier += panierDay;
    panierLine.push(<Text style={styles.tableCell12}>{panierDay}</Text>);
  }
  // ligne des motifs
  let motifLine = [];
  for (let i = 0; i < semaine.pointages.length; i++) {
    motifLine.push(
      <Text style={styles.tableCell6}>
        {semaine.pointages[i].motifAbsenceId
          ? semaine.pointages[i].motifAbsenceId
          : ""}
      </Text>
    );
  }

  return (
    <Document>
      <Page orientation="landscape">
        <View style={styles.cadreInfoContainer}>
          <Text style={styles.cadreInfoPrenomNom}>
            {semaine.user.firstname} {semaine.user.lastname}
          </Text>
          <Text style={styles.cadreInfo}>Année : {semaine.annee}</Text>
          <Text style={styles.cadreInfo}>
            Semaine : {semaine.numero} ({debutSemaine} au {finSemaine})
          </Text>
          <Text style={styles.cadreInfo}>
            État : {semaine.etatSemaine.name}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRowHead}>
            <Text style={styles.tableCell6}> </Text>
            {nameDayLine}
            <Text style={styles.tableCell6}>Totaux</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell6}> </Text>
            {momentDayLine}
            <Text style={styles.tableCell6}> </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell6}>Heures</Text>
            {valueLine}
            <Text style={styles.tableCell6}> </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell6}>Affaire</Text>
            {affaireLine}
            <Text style={styles.tableCell6}> </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell6}>Total Heure</Text>
            {valueTotalLine}
            <Text style={styles.tableCell6}>{totalWeekValue}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell6}>Panier</Text>
            {panierLine}
            <Text style={styles.tableCell6}>{totalWeekPanier}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell6}>Autre</Text>
            {motifLine}
            <Text style={styles.tableCell6}> </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const pdfGenerate = async (semaine) => {
  // const today = new Date();
  // const year = today.getFullYear();
  // let month = today.getMonth() + 1;
  // if (month < 10) {
  //   month = `0${month}`;
  // }
  // let day = today.getDate();
  // if (day < 10) {
  //   day = `0${day}`;
  // }
  // const formatedDate = `${year}${month}${day}`;
  const userName = `${semaine.user.firstname}${semaine.user.lastname}`;
  let version;
  if (semaine.PDFversion == "PDFemploye") version = 0;
  else version = 1;

  const fileName = `${userName}-${semaine.annee}-${semaine.numero}-${version}`;

  await renderToFile(
    <MyDocument semaine={semaine} />,
    `${path.resolve()}/documents/pdf/${fileName}.pdf`
  );
};

export default pdfGenerate;
