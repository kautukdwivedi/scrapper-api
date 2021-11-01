import express from 'express';
const router = express.Router();
import getArticle from '../src/article.js'
import getBlogs from '../src/blogs.js'

router.get('/:id', async (req, res) => {
    const url = 'https://medium.com/tag/'
    let blogs = await getBlogs(url + req.params.id);
    for (let i = 0; i < blogs.length; i++) {
        let articles = await getArticle(blogs[i].Link);
        blogs[i].Article = articles.Article;
        blogs[i].Tags = articles.Tags;
        blogs[i].Image = articles.Image;
        //console.log(blogs[i]);
    }
    res.send(blogs);
});

/*router.get('/:id', async (req, res) => {
    const url = 'https://medium.com/tag/'
    let blogs = []
    getBlogs(url + req.params.id).then((data)=>{
            blogs = data;
            for(let i = 0; i < blogs.length; i++){
                 getArticle(blogs[i].Link).then((data) =>{
                     blogs[i].Image = data.Image;
                     blogs[i].Article = data.Article;
                     blogs[i].Tags = data.Tags;
                });
            }
        });
    res.send(blogs);
});*/

export default router;