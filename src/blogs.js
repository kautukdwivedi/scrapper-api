import cheerio  from 'cheerio'; 
import axios from 'axios';

export default async function getBlogs(url){
    try{
        console.log(url);
        const response = await axios(
        {   METHOD: 'GET',
            url: url,
        });
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        const selector = ".fn.ar.l"
        const data = []
        $(selector).each((i, blog) => {
            let links = [];
            $(blog).find('a').each((j, subElement) => {
                links.push($(subElement).attr('href'));
            });
            let link = links[links.length - 1];
            if(link.includes('https://') == false){
                link = "https://medium.com" + link;
            }
            // console.log(link);
            let creator = $(blog).find('h4').text();
            //console.log(title);
            let title = $(blog).find('h2').text();
            //console.log(creator);
            let date = $(blog).find('.ae.t>p').text();
            //console.log(date);
            data.push({
                Number: i + 1,
                Link : link,
                Title : title,
                Creator : creator,
                Date : date,
            })
            if(i == 9){
                return data;
            }
        });
        return data;
    }catch(error){
        return error;
    }
}

