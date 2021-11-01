import cheerio  from 'cheerio'; 
import axios from 'axios';

export default async function getArticle(url){
    try{
        const response = await axios(
        {   METHOD: 'GET',
            url: url,
        });
        const $ = cheerio.load(response.data);  
        let image = $('figure img').attr('src');
        //console.log(image);
        let paragraphs = [];
        $('body article p').each((i, article) => {
            let para = $(article).text();
            if(para.length > 50){
                //console.log(para)
                paragraphs.push(para);
            }
        })
        //console.log(paragraphs)
        let tags = []
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
        return error;
    }
}

