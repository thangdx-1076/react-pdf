import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Axios from "axios";
import React, { useState } from "react";
import { API_KEY } from "./constants";
import { PdfDocument } from "./Movie";

const years = [
  { value: "2010", text: "2010" },
  { value: "2011", text: "2011" },
  { value: "2012", text: "2012" },
  { value: "2013", text: "2013" },
  { value: "2014", text: "2014" },
  { value: "2015", text: "2015" },
  { value: "2016", text: "2016" },
  { value: "2017", text: "2017" },
  { value: "2018", text: "2018" },
  { value: "2019", text: "2019" },
];

export default function MovieList() {
  const [year, setYear] = useState("");
  const [movieDetails, setDetails] = useState([]);
  const [show, setHide] = useState(false);

  const fetchMovie = async (e) => {
    setYear(e.target.value);
    try {
      let res = await Axios(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_year=${year}&sort_by=vote_average.desc`
      );
      setDetails(res.data.results);
      setHide(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Best movies of the year</h2>
      <label htmlFor="movies">Select Year</label>
      <select id="movies" className="select" onChange={fetchMovie}>
        <option defaultValue="" disabled>
          Select your option
        </option>
        {years.map((year, index) => {
          return (
            <option key={index} value={year.value}>
              {year.text}
            </option>
          );
        })}
      </select>

      {show && (
        <React.Fragment>
          <PDFViewer
            style={{
              width: "100%",
              height: "80vh"
            }}
            children={<PdfDocument data={movieDetails} />}
          />
          
          {/* <BlobProvider document={<PdfDocument data={movieDetails} />}>
            {({ blob, url, loading, error }) => {
              // Do whatever you need with blob here
              return <div>There's something going on on the fly</div>;
            }}
          </BlobProvider> */}
          <PDFDownloadLink
            document={<PdfDocument data={movieDetails} />}
            fileName="movielist.pdf"
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#4a4a4a",
              backgroundColor: "green",
              border: "1px solid #4a4a4a",
              width: "25%",
              margin: "20px auto"
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Pdf"
            }
          </PDFDownloadLink>
        </React.Fragment>
      )}
    </div>
  );
}
