import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Cookies from "js-cookie";
import classes from "./UrlData.module.css";

import axios from "axios";

function UrlData({ loading, setLoading }) {
  const [urls, setUrls] = useState([]);

  const [click, setClick] = useState(false);

  const userId = localStorage.getItem("userId");

  const token = Cookies.get("jwt");

  const redirectHandler = (_id) => {
    fetch(`http://localhost:4000/api/v1/urlShortner/getShortUrl/${_id}`, {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            const errorMessage = `${data.message}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const { fullUrl } = data.data;
        console.log(fullUrl);
        setClick(!click);
        window.open(fullUrl);
      });
  };

  useEffect(() => {
    const loadUrls = async () => {
      const response = await axios.get(
        "https://shortly-urlshortner-backend.herokuapp.com/api/v1/urlShortner/getAllUrls"
      );

      const { data } = response.data;

      setUrls(data.urls);
    };
    loadUrls();
  }, [click, urls]);

  return (
    <div className={classes.table}>
      <Table bordered responsive="sm">
        <thead>
          <tr>
            <th>Full Url</th>
            <th>Short Url</th>
            <th>Visit Count</th>
          </tr>
        </thead>
        <tbody>
          {urls
            .filter((url) => url.user._id === userId)
            .map((data) => {
              return (
                <tr key={data._id}>
                  <td>{data.fullUrl}</td>
                  <td
                    onClick={() => redirectHandler(data._id)}
                    className={classes.shortUrl}
                  >
                    {data.shortUrl}
                  </td>
                  <td>{data.clicks}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default UrlData;
