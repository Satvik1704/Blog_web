import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();

const {axios} = useAppContext();

  const [data, setData] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogData = async()=>{

    try {
      const { data } = await axios.get(`/api/blog/${id}`)
data.success ? setData(data.blog) : toast.error(data.message)   
    } catch (error) {
      toast.error(error.message)
      
    }
  }


  const fetchComments = async()=>{
    try {
      const {data} = await axios.post('/api/blog/comments', {blogId: id})
      if(data.success){
        setComments(data.comments)
      }else{
toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }



  const addComment = async (e) => {
    e.preventDefault();
try {
   const {data} = await axios.post('/api/blog/add-comments', {blog: id, name, content});
   if(data.success){
    toast.success(data.message)
    setName('')
    setContent('')

   }
else{
  toast.error(data.message);
}

} catch (error) {
  toast.error(error.message)
  
}


  //   if (!name.trim() || !content.trim()) return;

  //   const newComment = {
  //     name,
  //     content,
  //     createdAt: new Date().toISOString(),
  //   };

  //   setComments(prev => [newComment, ...prev]); // Add new comment to top
  //   setName('');
  //   setContent('');
  //
   };

  useEffect(() => {
    const found = blog_data.find(item => item._id === id);
    setData(found || null);
    setComments(comments_data || []);
  }, [id]);

  if (data === undefined) return <div className="text-center mt-10">Loading...</div>;
  if (data === null) return <div className="text-center mt-10">Blog not found.</div>;

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-10 opacity-50"
        loading="lazy"
      />
      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.suTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          {data.category || 'General'}
        </p>
      </div>

      {/* Blog Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          src={data.image}
          alt={data.title}
          className="rounded-3xl mb-5 w-full object-cover"
          loading="lazy"
        />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-3 text-lg text-gray-800">
            Comments ({comments.length})
          </p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/5 border border-primary/10 p-4 rounded text-gray-700"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={assets.user_icon}
                    alt="User"
                    className="w-6 h-6 object-cover"
                    loading="lazy"
                  />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 text-xs text-gray-500">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Form */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
            />
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="max-w-3xl mx-auto mt-10">
          <p className="font-semibold my-4">Share this article</p>
          <div className="flex gap-4">
            <img src={assets.facebook_icon} width={40} alt="Facebook" />
            <img src={assets.twitter_icon} width={40} alt="Twitter" />
            <img src={assets.googleplus_icon} width={40} alt="Google Plus" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
