import express from 'express';
const router = express.Router();
import getArticle from '../src/article.js'

router.get('/:id', async (req, res) => {
    let blog = await getArticle(req.params.id);
    res.send(blog);
});

export default router;