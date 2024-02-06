const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const PORT = 3000;

const website = 'https://news.sky.com';


app.get("/" , async(req,res)=>{

    try {
      await axios(website).then((response) => {
        const data = response.data;
        const $ = cheerio.load(data);
        var content = [];
    
        $('.ui-story-content').each(function (index , element) {
          const title = $(element).text();
          const url = $(element).find('.ui-story-headline > a').attr('href');
          content.push({
            title,
            url,
          });
        })
        res.json(content);
      });
    } catch (error) {
      console.log(error, error.message);
    }


})


app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
