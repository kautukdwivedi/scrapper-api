const cheerio = require('cheerio')
const axios = require('axios')

async function getArticle(url){
    try{
        const response = await axios(
        {   METHOD: 'GET',
            url: url,
        });
        const $ = cheerio.load(response.data);  
        const image = $('figure img').attr('src');
        //console.log(image);
        const paragraphs = [];
        $('body article p').each((i, article) => {
            para = $(article).text();
            if(para.length > 50){
                //console.log(para)
                paragraphs.push(para);
            }
        })
        //console.log(paragraphs)
        const tags = []
        $('ul').last().find('li').each((i, tag) => {
            tags.push($(tag).text());
        });
        //console.log(tags);
        if(image == undefined){
            image = 'https://miro.medium.com/max/2000/1*jfdwtvU6V6g99q3G7gq7dQ.png';
        }
        if(paragraphs.length == 0){
            paragraphs.push('No article found');
        }
        if(tags.length == 0){
            tags.push('No tags found');
        }
        const details = {
            Image : image,
            Article : paragraphs,
            Tags : tags
        }
        //console.log(details);
        return details;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getArticle
};