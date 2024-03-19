import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { FetchSharerPreviewList } from '../actions/sharerActions';

function PreviewContent({ sharerId }) {
  const dispatch = useDispatch();
  const previews = useSelector(state => state.sharerPreviewList.previews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        dispatch(FetchSharerPreviewList(sharerId));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching preview data:', error);
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [sharerId, dispatch]);

  console.log('Loading:', loading);
  console.log('Preview data:', previews);

  return (
    <div>
      {loading ? (
        <p>Loading preview content...</p>
      ) : previews && previews.length > 0 ? (
        previews.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.image && <img src={post.image} alt="Preview" />}
            {post.video && (
              <video controls>
                <source src={post.video} type="video/mp4" /> 
                Your browser does not support the video tag.
              </video>
            )}
            {post.file && <a href={post.file}>Download File</a>} 
          </div>
        ))
      ) : (
        <p>No preview content available.</p>
      )}
    </div>
  );
}

export default PreviewContent;
