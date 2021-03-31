import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

export function Test() {
  return (
    <Document>
      <Page>
        <Text>TEZ</Text>
      </Page>
    </Document>
  );
}
