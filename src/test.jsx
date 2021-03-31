import {
  Document, Page,
  Text
} from "@react-pdf/renderer";
import React from "react";

export function Test() {
  return (
    <Document>
      <Page>
        <Text>TEZ</Text>
      </Page>
    </Document>
  );
}
