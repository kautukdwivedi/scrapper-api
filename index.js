const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const article = require('./src/article')
const blog = require('./src/blogs')
/*async function getArticle(url){
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
}*/

const data = async () => {
    let blogs = await blog.getBlogs('https://medium.com/tag/cooking/')
    for(let i = 0; i < blogs.length; i++){
        let articles = await article.getArticle(blogs[i].Link);
        blogs[i].Article = articles.Article;
        blogs[i].Image = articles.Image;
        blogs[i].Tags = articles.Tags;
        console.log(blogs[i]);
    }
};
data();