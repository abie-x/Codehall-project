import React, { useState, useEffect } from 'react';
import Searchbar from '../components/Searchbar';
import axios from 'axios';

const SearchPage = () => {
   const [bookData, setBookData] = useState([]);
   const [loading, setLoading] = useState(false);

   //    const fetchAuthorData = async (id) => {
   //       console.log(id);
   //       const { data } = await axios.get(
   //          `https://covers.openlibrary.org/b/id/{id}-L.jpg`
   //       );
   //       return data;
   //    };

   async function fetchImage(url) {
      const img = new Image();
      return new Promise((res, rej) => {
         img.onload = () => res(img);
         img.onerror = (e) => rej(e);
         img.src = url;
      });
   }

   const searchHandler = async (term) => {
      setLoading(true);
      try {
         const { data } = await axios.get(
            `https://openlibrary.org/search.json?q=${term}`
         );
         setBookData(data);
      } catch (err) {
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <Searchbar onClickHandler={searchHandler} />
         {loading === true ? <div>Fetching results..</div> : <div></div>}
         <div className="grid grid-cols-3 gap-12">
            {bookData.docs &&
               bookData.docs.map((ele, index) => {
                  let author = ele.cover_i;
                  const getSrc = async () => {
                     return await fetchImage(
                        `https://covers.openlibrary.org/b/${author}/12547191-L.jpg`
                     );
                  };
                  //   let src = fetchImage(
                  //      `https://covers.openlibrary.org/b/${author}/12547191-L.jpg1`
                  //   );
                  return (
                     <div className="" key={index}>
                        <h3>{ele.author_name}</h3>
                        <img src={getSrc()} />
                     </div>
                  );
               })}
         </div>
      </div>
   );
};

export default SearchPage;
