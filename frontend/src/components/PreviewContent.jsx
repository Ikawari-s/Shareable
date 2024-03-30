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
            {post.images && post.images.map((image, index) => (
              <img key={index} src={image.image} alt={`Preview ${index}`} />
            ))}
            {post.videos && post.videos.map((video, index) => (
              <video key={index} controls>
                <source src={video.video} type="video/mp4" /> 
                Your browser does not support the video tag.
              </video>
            ))}
            {post.files && post.files.map((file, index) => (
              <a key={index} href={file.file}>Download File {index + 1}</a>
            ))}
          </div>
        ))
      ) : (
        <p>No preview content available.</p>
      )}
    </div>
  );
}

export default PreviewContent;
