const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

async function getDetails(url){
    try{
        const response = await axios(
        {   METHOD: 'GET',
            url: url,
        });
        const $ = cheerio.load(response.data);  

        const title = $('.gg.dm.gh.bc.b.gi.gj.gk.gl.gm.gn.go.gp.gq.gr.gs.gt.gu.gv.gw.gx.gy.gz.ha.hb.hc.bf').text();
        //console.log(title);
        const creator = $('p.bc.b.bd.be.fd:nth-of-type(1)').text();
        //console.log(creator);
        const date = $('a > .bc.b.bd.be.ca').text();
        //console.log(date);
        const blog = $('.ie.if.gh.bc.b.ig.ih.ii.ij.ik.il.im.in.io.ip.iq.ir.is.it.iu.iv.iw.ix.iy.iz.ja.do.bf').text();
        //console.log(blog);
        const tags = []
        $('.bx.mt.mu.mv').each((i, tag) => {
            tags.push($(tag).text())
        })
        //console.log(tags);
        const details = {
            Title: title,
            Creator: creator,
            Date: date,
            Blog: blog,
            Tags: tags
        }
        console.log((details));
        return details;
    }catch(error){
        console.log(error);
    }
}

async function getLinks(url){
    try{
        const response = await axios(
        {   METHOD: 'GET',
            url: url,
        });
        //console.log(response.data);
        const $ = cheerio.load(response.data);
        const selector = ".t.cn"
        const links = []
        console.log($(selector).length);
        $(selector).each((i, link) => {
            console.log(i);
            links.push($(link).attr('href'))
        })
        return links
    }catch(error){
        console.log(error)
    }
}

//let links = getLinks('https://medium.com/tag/cooking/top/year')
let details = getDetails('https://stephanievuckovic.medium.com/?source=topics_v2---------1-84--------------------781689a1_ce09_4cab_bc7b_59a8d155d59a-------19')