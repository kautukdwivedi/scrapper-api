const cheerio = require('cheerio')
const axios = require('axios')

async function getBlogs(url){
    try{
        const response = await axios(
        {   METHOD: 'GET',
            url: url,
        });
        //console.log(response.data);
        const $ = cheerio.load(response.data);
        const selector = ".fn.ar.l"
        const data = []
        $(selector).each((i, blog) => {
            let links = [];
            $(blog).find('a').each((j, subElement) => {
                links.push($(subElement).attr('href'));
            });
            link = links[links.length - 1];
            if(link.includes('https://') == false){
                link = "https://medium.com" + link;
            }
            //console.log(link);
            creator = $(blog).find('h4').text();
            //console.log(title);
            title = $(blog).find('h2').text();
            //console.log(creator);
            date = $(blog).find('.ae.t>p').text();
            //console.log(date);
            data.push({
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
        console.log(error)
    }
}

module.exports = {
    getBlogs
};