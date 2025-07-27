import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { blog_data } from '../assets/assets';
import { useEffect } from 'react';

const Blog = () => {
const {id} = useParams()

const [data,setData] = useState(null)
const fetchBlogData = async()=>{
    blog_data.find(item => item._id === id)
    setData(data)
}

useEffect(()=>{
    fetchBlogData()
})

  return data ? (
    <div>


<div></div>


    </div>
  ) : <div>Loading...</div>
}

export default Blog;